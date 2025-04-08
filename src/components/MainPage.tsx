import React from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, PerspectiveCamera, useGLTF} from '@react-three/drei';
import * as THREE from 'three';
//import css styles
import './MainPage.css';
import {Particles} from "./utils/Particles.tsx";


const Spaceship = ({shipPosition = {x: 0, y: 0, z: 0}}) => {
    // Path to your spaceship model
    const path = './models/cargo_spaceship.glb'; // Adjust the path if needed
    const gltf = useGLTF(path); // Adjust the path if needed

    const [position] = React.useState(shipPosition);

    // React.useEffect(() => {
    //     const moveForward = () => {
    //         setPosition((prev) => ({
    //             ...prev,
    //             z: prev.z - 0.02, // Adjust the speed of forward movement
    //         }));
    //     };
    //
    //     const animationFrame = requestAnimationFrame(moveForward);
    //     return () => cancelAnimationFrame(animationFrame);
    // }, [position]);

    return (
        <>
            <primitive
                object={gltf.scene}
                material={new THREE.MeshBasicMaterial({color: 0x00ff00})}
                scale={0.5} // Scale the model to match your scene
                position={[position.x, position.y, position.z]} // Adjust the position of the model
            />
        </>
    );
};

const InteractiveSpaceship = () => {
    const shipPosition = {x: 0, y: 0, z: 3};
    const [position, setPosition] = React.useState(shipPosition);

    React.useEffect(() => {
        const moveForward = () => {
            setPosition((prev) => ({
                ...prev,
                z: prev.z - 0.02, // Adjust the speed of forward movement
            }));
        };

        const animationFrame = requestAnimationFrame(moveForward);
        return () => cancelAnimationFrame(animationFrame);
    }, [position]);

    return (
        <Spaceship shipPosition={position}/>
    );
}

const MainPage = () => {
    const cameraPosition = {x: -6.70, y: 2.49, z: 4.72};
    const cameraRotation = {x: -0.34, y: -0.69, z: -0.22};


    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <Canvas>
                <PerspectiveCamera
                    makeDefault
                    position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
                    rotation={[cameraRotation.x, cameraRotation.y, cameraRotation.z]}
                />
                <OrbitControls/>
                {/* Add ambient light */}
                <ambientLight intensity={0.5}/>
                {/* Add directional light */}
                <directionalLight position={[10, 10, 10]} intensity={1.5}/>
                {/* Spaceship Model */}
                <InteractiveSpaceship/>

                <Particles particleCount={3000}
                           particleSpeed={{x: 0, y: 0, z: 0.005}}
                           particleCenterPosition={{x: 0, y: 0, z: -20}}
                           particleSpread={{x: 10, y: 10, z: 30}}
                           color={0xffffff}
                />
            </Canvas>
        </div>
    );
};

export default MainPage;
