import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Sculpture() {
  const meshRef = useRef(null)
  const groupRef = useRef(null)
  const orb1Ref = useRef(null)
  const orb2Ref = useRef(null)
  const ringRef = useRef(null)

  const count = 150
  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    // 1. Mouse Parallax & Dynamic Tilt
    if (groupRef.current) {
      const targetRotX = state.pointer.y * 0.12
      const targetRotY = state.pointer.x * 0.2
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05)
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05)
    }

    // 2. Exact Mathematical Ribbon Sculpture Animation (Section 4.2)
    if (meshRef.current) {
      for (let i = 0; i < count; i++) {
        const baseT = i / 150
        const t = (baseT + time * 0.05) % 1
        const y = (0.5 - t) * 22
        const springRadius = 3.5
        const coils = 2
        const angle = t * Math.PI * 2 * coils
        const x = Math.sin(angle) * springRadius + 4
        const z = Math.cos(angle) * springRadius

        // Calculate tangent target point slightly ahead
        const t2 = t + 0.001
        const y2 = (0.5 - t2) * 22
        const angle2 = t2 * Math.PI * 2 * coils
        const x2 = Math.sin(angle2) * springRadius + 4
        const z2 = Math.cos(angle2) * springRadius

        dummy.position.set(x, y, z)
        dummy.lookAt(x2, y2, z2)
        dummy.rotateX(Math.PI / 2)

        const twist = t * Math.PI * 4 - time * 0.08
        dummy.rotateY(twist)

        // Scale animation entry/exit effect (0 to 1 at top, 1 to 0 at bottom)
        let scale = 1
        if (t < 0.1) {
          scale = t / 0.1
        } else if (t > 0.9) {
          scale = (1 - t) / 0.1
        }
        dummy.scale.set(scale, scale, scale)

        dummy.updateMatrix()
        meshRef.current.setMatrixAt(i, dummy.matrix)
      }
      meshRef.current.instanceMatrix.needsUpdate = true
    }

    // 3. Floating 3D Geometric Accents
    if (orb1Ref.current) {
      orb1Ref.current.rotation.x = time * 0.3
      orb1Ref.current.rotation.y = time * 0.4
      orb1Ref.current.position.y = Math.sin(time * 0.8) * 0.4 - 2
    }

    if (orb2Ref.current) {
      orb2Ref.current.rotation.x = time * 0.2
      orb2Ref.current.rotation.z = time * 0.3
      orb2Ref.current.position.y = Math.cos(time * 0.7) * 0.5 + 4
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.5) * 0.1
      ringRef.current.rotation.y = time * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      {/* Mathematical Ribbon Sculpture */}
      <instancedMesh
        ref={meshRef}
        args={[null, null, count]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[4, 0.3, 4]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.15}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </instancedMesh>

      {/* Floating 3D Wireframe Icosahedron Accent */}
      <mesh ref={orb1Ref} position={[-5, -2, -2]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="#111827"
          wireframe
          wireframeLinewidth={1.5}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Floating Ceramic Sphere Accent */}
      <mesh ref={orb2Ref} position={[6, 4, -4]} castShadow receiveShadow>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshPhysicalMaterial
          color="#f8fafc"
          roughness={0.15}
          clearcoat={1}
          metalness={0.1}
        />
      </mesh>

      {/* Floating 3D Metallic Ring Accent */}
      <mesh ref={ringRef} position={[4, -4, 2]} castShadow>
        <torusGeometry args={[2.5, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  )
}
