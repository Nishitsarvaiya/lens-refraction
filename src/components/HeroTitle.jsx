import { Image, RoundedBox, Text, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { forwardRef, useRef } from "react";
import { DoubleSide } from "three";
import { CurvedPlane1 } from "./CurvedPlane1";
import { CurvedPlane2 } from "./CurvedPlane2";

const HeroTitle = forwardRef(function ({}, ref) {
	const { viewport } = useThree();
	const shared = { font: "/ClashDisplay-Medium.ttf", color: "black", anchorX: "center", fontSize: 1.2 };

	return (
		<group ref={ref}>
			<CurvedPlane1 position={[2.3, viewport.height * 0.22, 0]} scale={0.8} />
			<CurvedPlane2 position={[-3, 0, 0]} scale={0.7} />
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
});

export default HeroTitle;
