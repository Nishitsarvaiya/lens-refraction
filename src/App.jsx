import { Canvas } from "@react-three/fiber";
import Experience from "./components/Experience";
import { NoToneMapping } from "three";

const App = () => {
	return (
		<Canvas
			camera={{ position: [0, 0, 20], fov: 15 }}
			// camera={{ position: [0, 0, 1], fov: 15, far: 1000, near: -1000, zoom: 100 }}
			gl={{ alpha: true, antialias: true, toneMapping: NoToneMapping }}>
			<Experience />
		</Canvas>
	);
};

export default App;
