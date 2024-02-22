import { Image, RoundedBox, Text, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React from "react";
import { DoubleSide } from "three";

export default function HeroTitle() {
	const { viewport } = useThree();
	const shared = { font: "/ClashDisplay-Medium.ttf", color: "black", anchorX: "center", fontSize: 1.2 };
	const texture = useTexture("/hero-2.png");

	return (
		<group>
			{/* <mesh position={[2, viewport.height * 0.22, 0]}>
				<planeGeometry args={[4, 1]} />
				<meshBasicMaterial map={texture} side={DoubleSide} />
			</mesh> */}
			<Image url={"/hero-2.png"} transparent side={DoubleSide}>
				<bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
			</Image>
			<mesh position={[-3.2, 0, 0]}>
				<planeGeometry args={[2.5, 1]} />
				<meshBasicMaterial map={texture} side={DoubleSide} />
			</mesh>
			<Text position={[-2.5, viewport.height * 0.22, 0]} {...shared}>
				We are
			</Text>
			<Text position={[1.5, 0, 0]} {...shared}>
				Creative
			</Text>
			<Text position={[-2.5, viewport.height * -0.22, 0]} {...shared}>
				Design
			</Text>
			<Text position={[2.175, viewport.height * -0.22, 0]} {...shared}>
				Studio
			</Text>
		</group>
	);
}
