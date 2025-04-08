import React from "react";
import * as THREE from "three";

export const Particles = ({
                              particleCount = 0,
                              particleSpeed = {x: 0, y: 0, z: 0},
                              particleCenterPosition = {x: 0, y: 0, z: 0},
                              particleSpread = {x: 0, y: 0, z: 0},
                              color = 0xff4500,
                          }) => {
    const particlesGeometry = React.useMemo(() => {
        const positions = [];
        for (let i = 0; i < particleCount; i++) {
            const x = particleCenterPosition.x + (Math.random() - 0.5) * particleSpread.x; // Random x positions
            const y = particleCenterPosition.y + (Math.random() - 0.5) * particleSpread.y; // Random y positions
            const z = particleCenterPosition.z + (Math.random()) * particleSpread.z; // Random z positions
            positions.push(x, y, z);
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3)
        );

        return geometry;
    }, [particleCount, particleSpread]);

    const particlesMaterial = React.useMemo(() => {
        return new THREE.PointsMaterial({
            color: color, // Fire color
            size: 0.05, // Adjust particle size
        });
    }, [color]);

    
    React.useEffect(() => {
        const positions = particlesGeometry.attributes.position.array;

        const animate = () => {
            for (let i = 0; i < positions.length; i += 3) {
                positions[i] += particleSpeed.x; // Move the particles along the x-axis
                positions[i + 1] += particleSpeed.y; // Move the particles along the y-axis
                positions[i + 2] += particleSpeed.z; // Move the particles along the z-axis
                if (positions[i + 2] > particleCenterPosition.z + particleSpread.z) {
                    positions[i + 2] = particleCenterPosition.z; // Reset particle z-position if it moves too far
                }
            }
            particlesGeometry.attributes.position.needsUpdate = true;
            requestAnimationFrame(animate);
        };

        animate();
    }, [particlesGeometry, particleSpeed, particleCenterPosition, particleSpread]);

    return <points geometry={particlesGeometry} material={particlesMaterial}/>;
};