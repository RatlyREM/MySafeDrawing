/* eslint-disable react/no-unknown-property */
/* eslint-disable import/no-extraneous-dependencies */
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model() {
  const { scene } = useGLTF('/images/candy_kingdom_castle.glb')
  return <primitive object={scene} dispose={null} />
}

function MyThreeComponent() {
  return (
    <Canvas camera={{ position: [2, 2, 2], fov: 7 }}>
      <ambientLight intensity={-10} color="#ffffff" />
      <directionalLight position={[-2, 5, 3]} intensity={5} color="#ffffff" />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

export default MyThreeComponent
