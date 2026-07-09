# Guide — Studio Immens

Guide pratiche per lavorare con i tool e i pattern di Studio Immens.

---

## Indice

1. [Guida Rapida: Nuovo Progetto Interattivo](#guida-rapida-nuovo-progetto-interattivo)
2. [Integrare Three.js in Next.js](#integrare-threejs-in-nextjs)
3. [Creare uno Shader Personalizzato](#creare-uno-shader-personalizzato)
4. [Ottimizzare Texture e Modelli 3D](#ottimizzare-texture-e-modelli-3d)
5. [Animazione Scroll-Based](#animazione-scroll-based)

---

## Guida Rapida: Nuovo Progetto Interattivo

### 1. Scegli il template

```bash
# Per esperienze Three.js pure
npx create-vite@latest my-experience --template studio-immens/threejs-starter

# Per siti web con pagine + 3D
npx create-next-app@latest my-site --example https://github.com/Studio-Immens/interactive-template
```

### 2. Struttura iniziale

```
my-experience/
├── src/
│   ├── components/
│   │   ├── three/
│   │   │   ├── Scene.tsx          # Canvas wrapper
│   │   │   ├── Experience.tsx     # Contenuto 3D
│   │   │   └── shaders/          # Shader personalizzati
│   │   ├── ui/                   # Componenti UI
│   │   └── layout/               # Layout
│   ├── hooks/                    # Custom hooks
│   │   ├── useScrollAnimation.ts
│   │   └── useResponsiveThree.ts
│   ├── lib/                      # Utility
│   │   ├── math.ts
│   │   └── colors.ts
│   ├── styles/                   # CSS / Tailwind
│   └── assets/                   # Texture, modelli
├── public/
├── package.json
└── tsconfig.json
```

### 3. Aggiungi interazione base

```typescript
// components/three/Scene.tsx
'use client'
import { Canvas } from '@react-three/fiber'
import { Experience } from './Experience'

export default function Scene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Experience />
      </Canvas>
    </div>
  )
}
```

### 4. Build e deploy

```bash
npm run build
# Deploy su Vercel, Netlify o Cloudflare Pages
```

---

## Integrare Three.js in Next.js

### Configurazione Next.js

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['three'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      exclude: /node_modules/,
      use: ['raw-loader'],
    })
    return config
  },
}
module.exports = nextConfig
```

### Componente Canvas con caricamento differito

```tsx
// components/SceneWrapper.tsx
'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => <LoadingFallback />,
})

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="w-16 h-16 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function SceneWrapper() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Scene />
    </Suspense>
  )
}
```

### R3F + Next.js App Router

```tsx
// app/layout.tsx
import { ThreeProvider } from '@/lib/three-context'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <ThreeProvider>
          {children}
        </ThreeProvider>
      </body>
    </html>
  )
}
```

---

## Creare uno Shader Personalizzato

### Passo 1: Definisci lo shader

```typescript
// components/three/shaders/WaveShader.ts
export const WaveShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: [0.42, 0.39, 1.0] },
    uIntensity: { value: 0.5 },
  },
  vertexShader: `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uIntensity;

    void main() {
      vUv = uv;
      vec3 pos = position;
      pos.z += sin(pos.x * 3.0 + uTime) * uIntensity * 0.1;
      pos.z += cos(pos.y * 3.0 + uTime * 1.3) * uIntensity * 0.1;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform vec3 uColor;
    uniform float uTime;

    void main() {
      float pulse = sin(vUv.x * 10.0 + uTime * 2.0) * 0.5 + 0.5;
      vec3 color = mix(uColor, uColor * 0.5, pulse);
      gl_FragColor = vec4(color, 1.0);
    }
  `,
}
```

### Passo 2: Usalo in un componente

```tsx
// components/three/WaveMesh.tsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import { extend } from '@react-three/fiber'
import { WaveShader } from './shaders/WaveShader'

const WaveMaterial = shaderMaterial(
  WaveShader.uniforms,
  WaveShader.vertexShader,
  WaveShader.fragmentShader
)

extend({ WaveMaterial })

export function WaveMesh() {
  const ref = useRef<any>(null!)

  useFrame((state) => {
    ref.current.uniforms.uTime.value = state.clock.elapsedTime
  })

  return (
    <mesh>
      <planeGeometry args={[3, 3, 64, 64]} />
      <waveMaterial ref={ref} />
    </mesh>
  )
}
```

### Passo 3: Integra nella scena

```tsx
// components/three/Experience.tsx
import { WaveMesh } from './WaveMesh'

export function Experience() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <WaveMesh />
      <OrbitControls />
    </>
  )
}
```

---

## Ottimizzare Texture e Modelli 3D

### Texture

```bash
# Tool consigliati
npx sharp-cli texture.png --resize 2048 --format webp --output texture.webp
npx @squoosh/cli texture.png --quant '{enabled:true,quality:80}' --output texture-opt.webp
```

**Raccomandazioni:**
| Tipo | Formato | Max Risoluzione | Compressione |
|------|---------|----------------|--------------|
| Foto | WebP | 2048px | 80-85% quality |
| Pattern | PNG (lossless) | 1024px | - |
| Normal map | PNG | 2048px | lossless |
| HDR | EXR | 1024px | zip |
| Video texture | WebM | 1080p | VP9 |

### Modelli 3D (glTF/GLB)

```bash
# Installa gli strumenti
npm install -g @gltf-transform/cli

# Comprimi con Draco
gltf-transform draco model.glb model-draco.glb

# Ottimizza texture embedded
gltf-transform optimize model.glb model-opt.glb

# Ispeziona
gltf-transform inspect model.glb
```

**Best practice:**
- Usa Draco compression (riduce 60-80% il peso)
- Limita il numero di materiali (merge dove possibile)
- Preferisci texture esterne a embedded
- Usa LOD per modelli visibili da lontano
- Target: < 5MB per modello, < 2MB per texture

---

## Animazione Scroll-Based

### Setup base con GSAP + ScrollTrigger

```typescript
// hooks/useScrollAnimation.ts
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollAnimation(
  target: React.RefObject<HTMLElement>,
  options?: {
    start?: string
    end?: string
    scrub?: number | boolean
  }
) {
  useEffect(() => {
    if (!target.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        target.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: target.current,
            start: options?.start || 'top 80%',
            end: options?.end || 'top 20%',
            scrub: options?.scrub ?? true,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [target, options])
}
```

### Timeline narrativa

```typescript
// components/Narrative.tsx
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function Narrative() {
  const containerRef = useRef<HTMLDivElement>(null!)
  const panels = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const sections = panels.current
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        end: () => `+=${sections.length * 100}%`,
      },
    })

    sections.forEach((section, i) => {
      tl.fromTo(
        section,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5 }
      )
      if (i < sections.length - 1) {
        tl.to(section, { opacity: 0, scale: 1.1, duration: 0.3 })
      }
    })

    return () => tl.kill()
  }, [])

  return (
    <div ref={containerRef} className="h-screen relative">
      {['Introduzione', 'Concept', 'Sviluppo', 'Risultato'].map((title, i) => (
        <div
          key={i}
          ref={(el) => { panels.current[i] = el! }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <h2 className="text-6xl font-bold text-white">{title}</h2>
        </div>
      ))}
    </div>
  )
}
```

### Integrazione con Three.js + scroll

```typescript
// hooks/useThreeScroll.ts
import { useFrame } from '@react-three/fiber'
import { useEffect, useState } from 'react'

export function useThreeScroll() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(window.scrollY / totalHeight)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useFrame((state, delta) => {
    // Usa scrollProgress per animare la scena 3D
    state.camera.position.z = 5 - scrollProgress * 3
    state.camera.position.y = scrollProgress * 2
    state.camera.lookAt(0, 0, 0)
  })

  return scrollProgress
}
```

---

> **Nota:** Queste guide sono basate su pattern standard del settore e best practice comunemente adottate da Studio Immens. Per esempi concreti dai repository ufficiali, consultare il profilo GitHub dell'organizzazione.
