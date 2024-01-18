import { Suspense, useEffect, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Preload, useGLTF } from "@react-three/drei" //useGLTF will allow for importation of 3D models

import CanvasLoader from '../Loader'

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf') //path to model and store in variable

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor="black" />  {/*adds light to see the model*/}
      <pointLight intensity={5} />   {/*adds light that creates a glare on the screen of the PC*/}
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={2}
      />
      <primitive 
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}   //Model position on Screen
        rotation={[-0.01, -0.2, -0.1]}    //Tilt the displayed model
      />
    </mesh>
  )
}

const ComputersCanvas = () => {
  const [isMobile, setisMobile] = useState(false);


  //useEffect below will check if device screen size if of mobile phones
  useEffect(() => {
    const mediaQuerry = window.matchMedia('(max-width: 500px)');    //listener for changes to the screen size

    setisMobile(mediaQuerry.matches);   //set initial value for isMobile state variable

    //Callback function to handle changes to the media querry
    const handleMediaQuerryChange = (event) => {
      setisMobile(event.matches);
    }

    mediaQuerry.addEventListener('change', handleMediaQuerryChange);   //Callback function as a listener for changes to the media querry


    //Remove listener when the component is unmouted(screen size becomes PC)
    return () => {
      mediaQuerry.removeEventListener('change', handleMediaQuerryChange);
    }
  
  }, [])
  

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className='z-[0]'
    >
      <Suspense>
        <OrbitControls enableZoom={false} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2}  />   {/*to control the orbit camera of the model*/}
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas