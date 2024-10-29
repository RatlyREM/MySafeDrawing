/* eslint-disable react/no-unknown-property */
/* eslint-disable import/no-extraneous-dependencies */
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { OrbitControls, useGLTF } from '@react-three/drei'

function Model() {
  const { scene } = useGLTF('/images/fire.glb')
  return <primitive object={scene} dispose={null} />
}

function MyThreeComponent() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
      <OrbitControls />
    </Canvas>
  )
}

export default MyThreeComponent
