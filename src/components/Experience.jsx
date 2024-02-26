import { CameraControls, OrbitControls } from "@react-three/drei";
import HeroTitle from "./HeroTitle";
import { Lens } from "./Lens";
import { useEffect, useRef } from "react";

export default function Experience() {
	return (
		<>
			<Lens>
				<ambientLight intensity={3} />
				<HeroTitle />
			</Lens>
		</>
	);
}
