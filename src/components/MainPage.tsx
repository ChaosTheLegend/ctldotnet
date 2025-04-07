import React from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import {OrbitControls, PerspectiveCamera, useGLTF} from '@react-three/drei';
import * as THREE from 'three';
//import css styles
import './MainPage.css';
import {Particles} from "./utils/Particles.tsx"; // Adjust the path if needed


const Spaceship = ({shipPosition = {x: 0, y: 0, z: 0}}) => {
    // Path to your spaceship model
    const path = '/models/cargo_spaceship.glb'; // Adjust the path if needed
    const gltf = useGLTF(path); // Adjust the path if needed

    const particleOffset = [
        {x: 1.3, y: 0.05, z: 1.8},
        {x: -0.23, y: 0.05, z: 1.8},
        {x: 1.3, y: 0.55, z: 1.6},
        {x: -0.23, y: 0.55, z: 1.6},
    ];

    //particleOffset + shipPosition
    const particlePosition = [
        {
            x: shipPosition.x + particleOffset[0].x,
            y: shipPosition.y + particleOffset[0].y,
            z: shipPosition.z + particleOffset[0].z
        },
        {
            x: shipPosition.x + particleOffset[1].x,
            y: shipPosition.y + particleOffset[1].y,
            z: shipPosition.z + particleOffset[1].z
        },
        {
            x: shipPosition.x + particleOffset[2].x,
            y: shipPosition.y + particleOffset[2].y,
            z: shipPosition.z + particleOffset[2].z
        },
        {
            x: shipPosition.x + particleOffset[3].x,
            y: shipPosition.y + particleOffset[3].y,
            z: shipPosition.z + particleOffset[3].z
        },
    ];


    return (
        <>
            <primitive
                object={gltf.scene}
                //use basic green material
                material={new THREE.MeshBasicMaterial({color: 0x00ff00})}
                scale={0.5} // Scale the model to match your scene
                position={[shipPosition.x, shipPosition.y, shipPosition.z]} // Adjust the position of the model
            />
            <Particles
                particleCount={200}
                particleSpeed={{x: 0, y: 0, z: 0.02}}
                particleCenterPosition={particlePosition[0]}
                particleSpread={{x: 0.3, y: 0.3, z: 3}}
                color={0x00ffff}
            />
            <Particles
                particleCount={200}
                particleSpeed={{x: 0, y: 0, z: 0.02}}
                particleCenterPosition={particlePosition[1]}
                particleSpread={{x: 0.3, y: 0.3, z: 3}}
                color={0x00ffff}
            />
            <Particles
                particleCount={200}
                particleSpeed={{x: 0, y: 0, z: 0.02}}
                particleCenterPosition={particlePosition[2]}
                particleSpread={{x: 0.3, y: 0.3, z: 3}}
                color={0x00ffff}
            />
            <Particles
                particleCount={200}
                particleSpeed={{x: 0, y: 0, z: 0.02}}
                particleCenterPosition={particlePosition[3]}
                particleSpread={{x: 0.3, y: 0.3, z: 3}}
                color={0x00ffff}
            />
        </>

    );

};

const SaveCameraPosition = () => {
    const {camera} = useThree();

    React.useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'f') { // Press 's' to save the camera position

            }
        };

        window.addEventListener('keypress', handleKeyPress);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [camera]);

    return null;
};


const MainPage = () => {
    const cameraPosition = {x: -6.70, y: 2.49, z: 4.72};
    const cameraRotation = {x: -0.34, y: -0.69, z: -0.22};
    const shipPosition = {x: 0, y: 0, z: 0};


    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <Canvas>
                <PerspectiveCamera
                    makeDefault
                    position={[cameraPosition.x, cameraPosition.y, cameraPosition.z]}
                    rotation={[cameraRotation.x, cameraRotation.y, cameraRotation.z]}
                />
                <SaveCameraPosition/>
                <OrbitControls/>
                {/* Add ambient light */}
                <ambientLight intensity={0.5}/>
                {/* Add directional light */}
                <directionalLight position={[10, 10, 10]} intensity={1.5}/>
                {/* Spaceship Model */}
                <Spaceship
                    shipPosition={shipPosition}
                />
            </Canvas>
        </div>
    );
};

export default MainPage;
