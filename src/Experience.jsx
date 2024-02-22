import { OrbitControls } from "@react-three/drei";
import HeroTitle from "./HeroTitle";
import { Lens } from "./App_old";

export default function Experience() {
	return (
		<>
			<Lens>
				{/* <directionalLight /> */}
				<HeroTitle />
				<OrbitControls />
			</Lens>
		</>
	);
}
