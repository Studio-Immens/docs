# Guide Tecniche — Studio Immens

Documentazione tecnica su architetture, pattern e strumenti utilizzati in Studio Immens.

---

## Indice

1. [Architettura Next.js + Three.js](#architettura-nextjs--threejs)
2. [Pipeline Asset Creativi](#pipeline-asset-creativi)
3. [Shader GLSL — Pattern e Best Practices](#shader-glsl)
4. [Performance WebGL](#performance-webgl)
5. [Deploy e CI/CD](#deploy-e-cicd)

---

## Architettura Next.js + Three.js

### Pattern consigliato

```
┌─────────────────────────────────────────────────┐
│                  Next.js (SSR)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
│  │  Pages   │  │  API     │  │  Middleware   │  │
│  └────┬─────┘  └──────────┘  └──────────────┘  │
│       │                                          │
│  ┌────▼─────────────────────────────────────┐   │
│  │        Client Components                  │   │
│  │  ┌──────────┐  ┌─────────────────────┐   │   │
│  │  │  UI      │  │  Three.js Canvas    │   │   │
│  │  └──────────┘  │  @react-three/fiber │   │   │
│  │                └─────────────────────┘   │   │
│  └────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Lazy Loading del Canvas 3D

Per evitare di caricare Three.js su pagine che non ne hanno bisogno:

```tsx
// components/Scene.tsx — Dynamic import
import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('@/components/three/SceneCanvas'), {
  ssr: false,
  loading: () => <div className="scene-placeholder" />,
})

export default function Page() {
  return (
    <main>
      <h1>Progetto Interattivo</h1>
      <Scene3D />
    </main>
  )
}
```

### Comunicazione UI ↔ Three.js

Usa un contesto React condiviso:

```tsx
// lib/three-context.tsx
import { createContext, useContext, useState } from 'react'
import type { Mesh } from 'three'

interface ThreeContextValue {
  activeMesh: Mesh | null
  setActiveMesh: (mesh: Mesh | null) => void
  triggerAnimation: (name: string) => void
}

const ThreeContext = createContext<ThreeContextValue>(null!)

export function ThreeProvider({ children }: { children: React.ReactNode }) {
  const [activeMesh, setActiveMesh] = useState<Mesh | null>(null)
  
  const triggerAnimation = (name: string) => {
    // Dispatch event to Three.js scene
    window.dispatchEvent(new CustomEvent('three:animate', { detail: { name } }))
  }

  return (
    <ThreeContext.Provider value={{ activeMesh, setActiveMesh, triggerAnimation }}>
      {children}
    </ThreeContext.Provider>
  )
}

export const useThreeContext = () => useContext(ThreeContext)
```

---

## Pipeline Asset Creativi

### Workflow tipico

```
Design (Figma/Blender) → Export ottimizzato → Pipeline automazione → Build → Deploy
```

### Ottimizzazione texture

```bash
# Usa sharp per convertire texture in WebP/AVIF con resize automatico
npx sharp-cli input.png --resize 2048 --format webp --output output.webp

# Genera multiple risoluzioni per responsive images
npx sharp-cli texture.png --resize 1024 --format webp --output texture@1x.webp
npx sharp-cli texture.png --resize 2048 --format webp --output texture@2x.webp
```

### DRACO compression per modelli 3D

```typescript
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const loader = new GLTFLoader()
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/')
loader.setDRACOLoader(dracoLoader)

const model = await loader.loadAsync('/models/scene-draco.glb')
```

---

## Shader GLSL

### Template Fragment Shader

```glsl
#version 300 es
precision highp float;

// Uniforms standard passati dal codice
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

// Varyings from vertex shader
in vec2 vUv;

out vec4 fragColor;

// ─── Utility functions ───

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

// ─── Main ───

void main() {
    vec2 uv = vUv;
    // Center coordinates
    vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
    
    // Pattern
    float n = noise(p * 3.0 + uTime * 0.2);
    float dist = length(p - uMouse * 0.5);
    
    vec3 color = mix(
        vec3(0.1, 0.0, 0.2),
        vec3(0.9, 0.4, 0.8),
        smoothstep(0.5, 0.0, dist + n * 0.3)
    );
    
    // Vignette
    float vignette = 1.0 - length(p * 0.8);
    color *= vignette;
    
    fragColor = vec4(color, 1.0);
}
```

### Best Practices

1. **Usa `#version 300 es`** per WebGL2 (migliore performance e feature set)
2. **Minimizza le texture lookups** — ogni fetch è costoso
3. **Preferisci `highp`** solo dove necessario; usa `mediump` per performance
4. **Branching minimo** — GPU odia gli if/else; usa `mix()` e `step()`
5. **Bundle shader come stringhe** nel codice TypeScript per hot-reload

---

## Performance WebGL

### Checklist

- [ ] `renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))`
- [ ] Utilizza `BufferGeometry` con interleaved buffer
- [ ] Pooling di oggetti invece di creazione/distruzione continua
- [ ] `FrustumCulling` abilitato (default)
- [ ] LOD (Level of Detail) per modelli complessi
- [ ] Texture atlas per ridurre draw call
- [ ] Instancing per geometrie duplicate
- [ ] Shadow map resolution adattiva

### Monitoraggio FPS

```typescript
import Stats from 'three/examples/jsm/libs/stats.module.js'

const stats = new Stats()
document.body.appendChild(stats.dom)

function animate() {
  stats.begin()
  renderer.render(scene, camera)
  stats.end()
  requestAnimationFrame(animate)
}
```

### Riduzione draw call

```typescript
// ❌ Inefficiente — draw call per ogni mesh
scenes.children.forEach((child) => {
  if (child.isMesh) scene.remove(child)
})

// ✅ Efficiente — merge geometries
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

const geometries = meshes.map(m => m.geometry)
const merged = mergeGeometries(geometries)
const mergedMesh = new THREE.Mesh(merged, material)
scene.add(mergedMesh)
```

---

## Deploy e CI/CD

### Vercel (consigliato per Next.js)

```yaml
# vercel.json
{
  "framework": "nextjs",
  "regions": ["fra1", "iad1"],
  "headers": [
    {
      "source": "/three-assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### GitHub Actions — Build e Deploy

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 8
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

> **Nota:** Questa documentazione tecnica è generata basandosi sui pattern e tech stack comunemente usati da Studio Immens e da studi creativi simili. Per informazioni specifiche sui repository ufficiali, consultare il profilo GitHub dell'organizzazione.
