import { Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import React, { forwardRef } from "react";
import { CurvedPlane1 } from "./CurvedPlane1";
import { CurvedPlane2 } from "./CurvedPlane2";

const HeroTitle = forwardRef(function ({}, ref) {
	const { viewport } = useThree();
	const shared = { font: "/ClashDisplay-Medium.ttf", color: "white", anchorX: "center" };

	return (
		<group ref={ref} scale={viewport.width * 0.11}>
			<CurvedPlane1 scale={0.7} position={[2, 1.2, 0]} />
			<CurvedPlane2 scale={0.7} position={[-2.3, 0, 0]} />
			<Text {...shared} position={[-2, 1.2, 0]}>
				We are
			</Text>
			<Text position={[1.4, 0, 0]} {...shared}>
				Creative
			</Text>
			<Text {...shared} position={[-2.1, -1.2, 0]}>
				Design
			</Text>
			<Text {...shared} position={[1.95, -1.2, 0]}>
				Studio
			</Text>
		</group>
	);
});

export default HeroTitle;
