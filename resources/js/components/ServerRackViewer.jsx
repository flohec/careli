import React, { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function FrameBox({ position, size, color }) {
    return (
        <mesh position={position}>
            <boxGeometry args={size} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

function RearWall({ width, height, depth, color }) {
    return (
        <mesh position={[0, 0, -depth / 2 + 0.01]}>
            <boxGeometry args={[width, height, 0.02]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

function Shelf({ width, depth, y, color }) {
    return (
        <mesh position={[0, y, 0]}>
            <boxGeometry args={[width - 0.1, 0.02, depth - 0.1]} />
            <meshStandardMaterial color={color} />
        </mesh>
    )
}

function ServerRack({ width, height, depth, color, shelfCount = 0 }) {
    const wallThickness = 0.05
    const shelves = Array.from({ length: shelfCount }, (_, i) => {
        const spacing = height / (shelfCount + 1)
        const y = -height / 2 + spacing * (i + 1)
        return <Shelf key={i} width={width} depth={depth} y={y} color={color} />
    })

    return (
        <group>
            {/* 4 vertikale Ecken */}
            <FrameBox position={[-width / 2 + wallThickness / 2, 0, -depth / 2 + wallThickness / 2]} size={[wallThickness, height, wallThickness]} color={color} />
            <FrameBox position={[ width / 2 - wallThickness / 2, 0, -depth / 2 + wallThickness / 2]} size={[wallThickness, height, wallThickness]} color={color} />
            <FrameBox position={[-width / 2 + wallThickness / 2, 0,  depth / 2 - wallThickness / 2]} size={[wallThickness, height, wallThickness]} color={color} />
            <FrameBox position={[ width / 2 - wallThickness / 2, 0,  depth / 2 - wallThickness / 2]} size={[wallThickness, height, wallThickness]} color={color} />

            {/* Deckel */}
            <FrameBox position={[0, height / 2 - wallThickness / 2, 0]} size={[width, wallThickness, depth]} color={color} />

            {/* Boden */}
            <FrameBox position={[0, -height / 2 + wallThickness / 2, 0]} size={[width, wallThickness, depth]} color={color} />

            {/* Rückwand */}
            <RearWall width={width} height={height} depth={depth} color={color} />

            {/* Linke Seitenwand */}
            <mesh position={[-width / 2 + wallThickness / 2, 0, 0]}>
                <boxGeometry args={[wallThickness, height, depth]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Rechte Seitenwand */}
            <mesh position={[width / 2 - wallThickness / 2, 0, 0]}>
                <boxGeometry args={[wallThickness, height, depth]} />
                <meshStandardMaterial color={color} />
            </mesh>

            {/* Regalböden */}
            {shelves}
        </group>
    )
}

function AutoZoom({ width, height, depth }) {
    const { camera } = useThree()
    useEffect(() => {
        const maxDim = Math.max(width, height, depth)
        camera.position.set(maxDim * 1.2, maxDim * 1.2, maxDim * 1.2)
        camera.lookAt(0, 0, 0)
    }, [width, height, depth])
    return null
}

export default function ServerRackViewer({ width, height, depth, color, shelfCount }) {
    return (
        <Canvas style={{ height: 400 }} camera={{ fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 10, 5]} intensity={0.8} />
            <OrbitControls makeDefault />
            <AutoZoom width={width} height={height} depth={depth} />
            <ServerRack
                width={width}
                height={height}
                depth={depth}
                color={color}
                shelfCount={shelfCount}
            />
        </Canvas>
    )
}
