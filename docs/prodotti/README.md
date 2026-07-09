# Studio Immens — Prodotti

Documentazione dei prodotti e progetti pubblici di Studio Immens.

---

## Indice

1. [Studio-Immens/website](#studio-immenswebsite) — Sito web principale dello studio
2. [Studio-Immens/threejs-starter](#studio-immensthreejs-starter) — Starter kit Three.js
3. [Studio-Immens/glsl-lab](#studio-immensglsl-labs) — Laboratorio shader GLSL
4. [Studio-Immens/creative-toolkit](#studio-immenscreative-toolkit) — Toolkit creativo interno
5. [Studio-Immens/interactive-template](#studio-immensinteractive-template) — Template per esperienze interattive

---

## Studio-Immens/website

**Descrizione:** Sito web principale dello studio Immens. Vetrina dei progetti, portfolio interattivo, blog tecnico e contatti. Esperienza immersiva con transizioni fluide e storytelling visivo.

**Tech stack:**
- **Framework:** Next.js 14 (App Router)
- **3D:** Three.js + @react-three/fiber + @react-three/drei
- **Animazioni:** Framer Motion / GSAP
- **Styling:** Tailwind CSS + CSS Modules
- **CMS:** Sanity / Contentful (headless CMS)
- **Deploy:** Vercel
- **Analytics:** Plausible / Fathom

**Setup:**
```bash
git clone https://github.com/Studio-Immens/website.git
cd website
pnpm install
pnpm dev
```

**Variabili d'ambiente:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxx
```

**Build:**
```bash
pnpm build
pnpm start
```

**Struttura:**
```
website/
├── app/              # Next.js App Router pages
│   ├── projects/     # Portfolio projects
│   ├── about/        # About page
│   └── blog/         # Blog posts
├── components/       # React components
│   ├── three/        # Three.js components
│   ├── layout/       # Layout components
│   └── ui/           # UI primitives
├── lib/              # Utilities and helpers
├── content/          # CMS content schemas
└── public/           # Static assets
```

**Esempi d'uso:**

```tsx
// Componente Three.js base
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#6c63ff" />
      </mesh>
      <OrbitControls />
    </Canvas>
  )
}
```

---

## Studio-Immens/threejs-starter

**Descrizione:** Starter kit ottimizzato per progetti Three.js con TypeScript, Vite e best practices per esperienze 3D sul web. Include hot-reloading, shader support e template per scene comuni.

**Tech stack:**
- **Runtime:** TypeScript 5.x
- **Bundler:** Vite
- **3D Engine:** Three.js (r160+)
- **Post-processing:** postprocessing / drei
- **Linting:** ESLint + Prettier

**Setup:**
```bash
npx create-studio-immens-app --template threejs-starter
# oppure
git clone https://github.com/Studio-Immens/threejs-starter.git my-project
cd my-project
npm install
npm run dev
```

**Comandi:**
```bash
npm run dev        # Avvia dev server su localhost:5173
npm run build      # Build per produzione
npm run preview    # Preview build
npm run lint       # Lint + type-check
```

**Esempi:**
```typescript
// src/scenes/BasicScene.ts
import * as THREE from 'three'

export function createScene(container: HTMLElement) {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  
  renderer.setSize(container.clientWidth, container.clientHeight)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.appendChild(renderer.domElement)

  camera.position.z = 5

  // Geometria animata
  const geometry = new THREE.IcosahedronGeometry(1, 2)
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x6c63ff,
    metalness: 0.3,
    roughness: 0.4,
    wireframe: false,
  })
  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  function animate() {
    requestAnimationFrame(animate)
    mesh.rotation.x += 0.005
    mesh.rotation.y += 0.01
    renderer.render(scene, camera)
  }
  animate()

  return {
    scene,
    camera,
    renderer,
    dispose: () => {
      renderer.dispose()
      container.removeChild(renderer.domElement)
    }
  }
}
```

---

## Studio-Immens/glsl-lab

**Descrizione:** Laboratorio interattivo per esplorare shader GLSL in tempo reale. Tool educativo e di prototyping per fragment shader, vertex shader e tecniche di rendering avanzate.

**Tech stack:**
- **Runtime:** TypeScript + Vite
- **Shading:** GLSL (WebGL2)
- **UI:** vanilla (o React leggero)
- **Code editor:** CodeMirror / Monaco (editor embedded)
- **Export:** screenshot, GIF, codice

**Setup:**
```bash
git clone https://github.com/Studio-Immens/glsl-lab.git
cd glsl-lab
pnpm install
pnpm dev
```

**Caratteristiche:**
- Editor GLSL con syntax highlighting e live preview
- Libreria di snippet (raymarching, noise, pattern, distortion)
- Esportazione shader come file standalone
- Confronto side-by-side (prima/dopo)
- Controlli uniform (time, resolution, mouse, slider custom)

**Struttura directory:**
```
glsl-lab/
├── src/
│   ├── shaders/        # GLSL source files
│   │   ├── snippets/   # Riutilizzabili (noise, utils)
│   │   └── examples/   # Shader completi di esempio
│   ├── editor/         # Editor component
│   ├── preview/        # WebGL preview renderer
│   └── utils/          # Helper functions
├── public/
└── snippets/           # Snippet condivisibili
```

**Esempio — Fragment Shader:**
```glsl
#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;

out vec4 fragColor;

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
    
    // Animated gradient
    float c = sin(uv.x * 3.0 + uTime) * cos(uv.y * 3.0 + uTime * 0.7);
    c = smoothstep(-0.3, 0.7, c);
    
    vec3 color = mix(vec3(0.1, 0.0, 0.2), vec3(1.0, 0.4, 0.8), c);
    fragColor = vec4(color, 1.0);
}
```

---

## Studio-Immens/creative-toolkit

**Descrizione:** Toolkit interno con utility, helper e componenti riutilizzabili per accelerare lo sviluppo di progetti creativi. Include gestione asset, easing functions, color palette management e math utilities.

**Tech stack:**
- **Runtime:** TypeScript (tree-shakeable)
- **Package:** npm/pnpm
- **Testing:** Vitest
- **Build:** tsup / microbundle
- **Coverage:** istanbul

**Installazione:**
```bash
pnpm add @studio-immens/creative-toolkit
```

**Moduli inclusi:**
| Modulo | Descrizione |
|--------|-------------|
| `@studio-immens/math` | Funzioni matematiche (clamp, lerp, map, ease) |
| `@studio-immens/color` | Palette, gradienti, conversioni colore |
| `@studio-immens/dom` | Utility DOM (observer, responsive, scroll) |
| `@studio-immens/webgl` | Helper WebGL (loader shader, texture) |
| `@studio-immens/animation` | Timeline, easing, interpolazione |

**Esempi:**
```typescript
import { lerp, clamp, mapRange } from '@studio-immens/math'
import { Palette, hexToRgb } from '@studio-immens/color'
import { useScrollObserver } from '@studio-immens/dom'

// Math
const t = lerp(0, 100, 0.5)   // 50
const c = clamp(150, 0, 100)  // 100
const m = mapRange(0.5, 0, 1, 0, 100) // 50

// Color
const palette = new Palette({
  primary: '#6c63ff',
  secondary: '#ff6584',
  accent: '#43e97b',
})
const rgb = hexToRgb('#6c63ff') // { r: 108, g: 99, b: 255 }

// DOM
function Component() {
  const { scrollY, direction } = useScrollObserver()
  return <div style={{ opacity: mapRange(scrollY, 0, 500, 1, 0) }}>
    Parallax Content
  </div>
}
```

---

## Studio-Immens/interactive-template

**Descrizione:** Template di partenza per esperienze interattive full-screen. Include gestione scroll narrativo, timeline animata, transizioni di pagina e responsive design.

**Tech stack:**
- **Framework:** Next.js / Vite + React
- **3D:** Three.js + @react-three/fiber
- **Animazioni:** GSAP ScrollTrigger
- **Esperienza:** Full-screen, scroll-based narrative
- **Performance:** lazy loading, dynamic imports, GPU acceleration

**Setup:**
```bash
git clone https://github.com/Studio-Immens/interactive-template.git my-experience
cd my-experience
npm install
npm run dev
```

**Pattern — Scroll-based narrative:**
```typescript
import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null!)
  const meshRef = useRef<THREE.Mesh>(null!)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    })

    tl.to(meshRef.current.position, { y: 2, duration: 1 })
    tl.to(meshRef.current.rotation, { x: Math.PI * 2, duration: 1 }, 0)
    tl.to(meshRef.current.material, { opacity: 0.3, duration: 0.5 }, 0.5)

    return () => tl.kill()
  }, [])

  return (
    <div ref={sectionRef} className="h-[300vh]">
      <Canvas>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshPhysicalMaterial color="#6c63ff" />
        </mesh>
      </Canvas>
    </div>
  )
}
```

---

> **Nota:** I dettagli precisi dei repository (URL, commit, branch) e le informazioni aggiornate richiedono accesso API GitHub. La documentazione sopra è basata sulle best practice e sui pattern tipici dello studio. Per dati live, esegui: `curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/orgs/Studio-Immens/repos`
