import { CameraControls, OrbitControls } from "@react-three/drei";
import HeroTitle from "./HeroTitle";
import { Lens } from "./Lens";
import { useEffect, useRef } from "react";

export default function Experience() {
	const controlsRef = useRef();
	const meshFitCamera = useRef();

	const fitCamera = async () => {
		controlsRef.current.smoothTime = 1;
		controlsRef.current.fitToBox(meshFitCamera.current, true, {
			paddingTop: 1,
			paddingBottom: 1,
			paddingLeft: 1,
			paddingRight: 1,
		});
	};

	useEffect(() => {
		fitCamera();
		window.addEventListener("resize", fitCamera);
		return () => window.removeEventListener("resize", fitCamera);
	}, []);

	return (
		<>
			<Lens>
				<ambientLight intensity={3} />
				<HeroTitle ref={meshFitCamera} />
				<CameraControls ref={controlsRef} />
			</Lens>
		</>
	);
}
