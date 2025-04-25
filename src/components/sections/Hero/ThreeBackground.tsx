import React, { useRef, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useTheme } from '@/store/ThemeContext';


const Particle = React.memo(({ position, color }: { position: [number, number, number]; color: string }) => {
    const mesh = useRef<THREE.Mesh>(null!);
    const initialPosition = useRef(position);

    useFrame((state) => {
        if (!mesh.current) return;

        // Более плавное движение
        const time = state.clock.getElapsedTime();

        mesh.current.position.x = initialPosition.current[0] + Math.sin(time + initialPosition.current[2]) * 0.5;
        mesh.current.position.y = initialPosition.current[1] + Math.cos(time + initialPosition.current[0]) * 0.5;
        mesh.current.rotation.x += 0.005;
        mesh.current.rotation.y += 0.005;
    });

    return (
        <mesh ref={mesh} position={position}>
            <dodecahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial
                color={color}
                toneMapped={false}
                roughness={0.7}
                metalness={0.5}
            />
        </mesh>
    );
});
Particle.displayName = 'Particle';

const MouseLight = React.memo(({ color }: { color: string }) => {
    const light = useRef<THREE.PointLight>(null!);
    const { viewport } = useThree();
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            });
        };

        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    useFrame(() => {
        if (light.current) {
            light.current.position.x = mousePosition.x * viewport.width / 2;
            light.current.position.y = mousePosition.y * viewport.height / 2;
        }
    });

    return (
        <pointLight
            ref={light}
            position={[0, 0, 2]}
            intensity={1}
            color={color}
            distance={10}
            decay={2}
        />
    );
});
MouseLight.displayName = 'MouseLight';

const ParticlesBackground: React.FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    const positions = useMemo(() =>
            Array.from({ length: 20 }).map(() => [
                Math.random() * 16 - 8,
                Math.random() * 10 - 5,
                Math.random() * 4 - 2,
            ] as [number, number, number]),
        []);

    const colors = useMemo(() => {
        const palette = isDark
            ? ['#4f46e5', '#818cf8', '#c7d2fe']
            : ['#4f46e5', '#6366f1', '#a5b4fc'];

        return positions.map(() => palette[Math.floor(Math.random() * palette.length)]);
    }, [isDark, positions]);

    return (
        <>
            <ambientLight intensity={0.2} />
            <MouseLight color={isDark ? '#818cf8' : '#4f46e5'} />
            {positions.map((pos, i) => (
                <Particle
                    key={`particle-${i}`}
                    position={pos}
                    color={colors[i]}
                />
            ))}
            <fog attach="fog" args={[isDark ? '#1f2937' : '#ffffff', 8, 25]} />
        </>
    );
};

export default ParticlesBackground;