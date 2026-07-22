import { Canvas, useFrame } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import type { Group } from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

type SceneKind = 'hero' | 'music';

function webGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch {
    return false;
  }
}

function HeroObject({ still }: { still: boolean }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current || still) return;
    group.current.rotation.y += delta * 0.13;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
  });

  return (
    <group ref={group} rotation={[0.2, -0.35, 0.12]}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[1.32, 1.32, 0.62, 96, 1, true]} />
        <meshPhysicalMaterial color="#282828" roughness={0.22} metalness={0.82} clearcoat={0.9} clearcoatRoughness={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.32, 0.085, 24, 120]} />
        <meshPhysicalMaterial color="#ef554c" roughness={0.32} metalness={0.55} emissive="#4b0b08" emissiveIntensity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={0.67}>
        <torusGeometry args={[1.32, 0.018, 12, 120]} />
        <meshPhysicalMaterial color="#e9e7e2" roughness={0.18} metalness={0.9} />
      </mesh>
    </group>
  );
}

function MusicObject({ still }: { still: boolean }) {
  const group = useRef<Group>(null);
  useFrame((state, delta) => {
    if (!group.current || still) return;
    group.current.rotation.z += delta * 0.07;
    group.current.rotation.x = -0.12 + Math.sin(state.clock.elapsedTime * 0.35) * 0.04;
  });

  return (
    <group ref={group} rotation={[-0.12, 0.45, -0.25]}>
      <mesh>
        <cylinderGeometry args={[1.6, 1.6, 0.12, 128]} />
        <meshPhysicalMaterial color="#292929" roughness={0.16} metalness={0.68} clearcoat={1} clearcoatRoughness={0.1} transmission={0.08} />
      </mesh>
      {[0.62, 0.94, 1.26, 1.48].map((radius) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.071, 0]}>
          <torusGeometry args={[radius, 0.006, 8, 120]} />
          <meshStandardMaterial color={radius === 0.94 ? '#ef554c' : '#77736f'} roughness={0.34} metalness={0.8} />
        </mesh>
      ))}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.14, 48]} />
        <meshPhysicalMaterial color="#ef554c" roughness={0.4} metalness={0.25} />
      </mesh>
    </group>
  );
}

export default function SceneCanvas({ kind }: { kind: SceneKind }) {
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const reduced = useReducedMotion();
  const [supported] = useState(webGLAvailable);

  useEffect(() => {
    if (!container.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '120px' });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);

  if (!supported) return <div className={`scene-fallback scene-fallback--${kind}`} aria-hidden="true" />;

  return (
    <div ref={container} className={`scene scene--${kind}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: kind === 'hero' ? 42 : 48 }}
        dpr={[1, 1.5]}
        frameloop={visible && !reduced ? 'always' : 'demand'}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <AdaptiveDpr pixelated />
        <ambientLight intensity={0.95} />
        <directionalLight position={[3, 4, 5]} intensity={3.2} color="#f6eee7" />
        <spotLight position={[-4, 1.5, 3]} intensity={8} angle={0.35} penumbra={0.8} color="#ef554c" />
        {kind === 'hero' ? <HeroObject still={reduced} /> : <MusicObject still={reduced} />}
      </Canvas>
    </div>
  );
}
