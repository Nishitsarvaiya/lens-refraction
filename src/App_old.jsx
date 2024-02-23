import {
	MeshTransmissionMaterial,
	OrbitControls,
	RoundedBox,
	Text,
	useFBO,
	useGLTF,
	useTexture,
} from "@react-three/drei";
import { Canvas, createPortal, useFrame, useThree } from "@react-three/fiber";
import { useRef, useState } from "react";
import { DoubleSide, NoToneMapping, Scene, SphereGeometry } from "three";
import { easing } from "maath";

export default function App() {
	return (
		<Canvas
			camera={{ position: [0, 0, 20], fov: 15 }}
			gl={{ alpha: true, antialias: true, toneMapping: NoToneMapping }}>
			{/* <ScrollControls damping={0.2}>
				<Lens>
					<Scroll>
						<Text font="/ClashDisplay-Medium.ttf" color="black">
							We are creative design studio
						</Text>
					</Scroll>
					* This is a helper that pre-emptively makes threejs aware of all geometries, textures etc
               By default threejs will only process objects if they are "seen" by the camera leading 
               to jank as you scroll down. With <Preload> that's solved. 
					<Preload />
				</Lens>
			</ScrollControls> */}
			<Lens>
				<HeroTitle />
			</Lens>
			<OrbitControls />
		</Canvas>
	);
}

const HeroTitle = () => {
	const { viewport } = useThree();
	const fontSize = viewport.width * 0.1;
	const texture = useTexture("/hero-1.png");

	return (
		<group>
			{/* <RoundedBox
				args={[3, 1, 5]}
				radius={0.5}
				smoothness={4}
				bevelSegments={4}
				creaseAngle={0.4}
				position={[2, 1.3, 0]}>
				<meshStandardMaterial map={texture} side={DoubleSide} />
			</RoundedBox> */}
			<Text
				font="/ClashDisplay-Medium.ttf"
				color="black"
				anchorX="right"
				position={[0, -1.3, 0]}
				fontSize={fontSize}>
				We are
			</Text>
			<Text
				font="/ClashDisplay-Medium.ttf"
				color="black"
				position={[-0.8, 0, 0]}
				anchorX="left"
				fontSize={fontSize}>
				Creative
			</Text>
			<Text
				font="/ClashDisplay-Medium.ttf"
				color="black"
				anchorX="right"
				position={[0, -1.3, 0]}
				fontSize={fontSize}>
				Design
			</Text>
			<Text
				font="/ClashDisplay-Medium.ttf"
				color="black"
				position={[0.5, -1.3, 0]}
				anchorX="left"
				fontSize={fontSize}>
				Studio
			</Text>
		</group>
	);
};
