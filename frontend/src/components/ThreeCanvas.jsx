import { Canvas } from '@react-three/fiber'
import { SoftShadows } from '@react-three/drei'
import Sculpture from './Sculpture'

export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 18], fov: 45 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
      >
        <color attach="background" args={['#ffffff']} />
        <ambientLight intensity={1.0} />
        
        <directionalLight
          position={[10, 20, 15]}
          intensity={3}
          color="#ffffff"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        
        <directionalLight
          position={[-10, -10, -10]}
          intensity={1.5}
          color="#f8fafc"
        />
        
        <directionalLight
          position={[0, 0, 15]}
          intensity={1.5}
          color="#ffffff"
        />
        
        <SoftShadows size={25} samples={10} focus={0.5} />
        
        <Sculpture />
      </Canvas>
    </div>
  )
}
