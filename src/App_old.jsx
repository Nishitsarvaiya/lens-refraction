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

export function Lens({ children, damping = 0.15, ...props }) {
	const ref = useRef();
	const { nodes } = useGLTF("/lens-transformed.glb");
	const buffer = useFBO();
	const viewport = useThree((state) => state.viewport);
	const [scene] = useState(() => new Scene());
	useFrame((state, delta) => {
		// Tie lens to the pointer
		// getCurrentViewport gives us the width & height that would fill the screen in threejs units
		// By giving it a target coordinate we can offset these bounds, for instance width/height for a plane that
		// sits 15 units from 0/0/0 towards the camera (which is where the lens is)
		const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 2]);
		easing.damp3(
			ref.current.position,
			[(state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 2],
			damping,
			delta
		);
		// This is entirely optional but spares us one extra render of the scene
		// The createPortal below will mount the children of <Lens> into the new THREE.Scene above
		// The following code will render that scene into a buffer, whose texture will then be fed into
		// a plane spanning the full screen and the lens transmission material
		state.gl.setRenderTarget(buffer);
		state.gl.setClearColor("#ffffff");
		state.gl.render(scene, state.camera);
		state.gl.setRenderTarget(null);
	});

	return (
		<>
			{createPortal(children, scene)}
			<mesh scale={[viewport.width, viewport.height, 1]}>
				<planeGeometry />
				<meshBasicMaterial map={buffer.texture} />
			</mesh>
			<mesh
				scale={1}
				ref={ref}
				rotation-x={Math.PI / 2}
				geometry={new SphereGeometry(1, 64, 64)}
				// geometry={nodes.Cylinder.geometry}
				{...props}>
				<MeshTransmissionMaterial
					buffer={buffer.texture}
					transmission={1}
					ior={1.2}
					roughness={0}
					thickness={1.5}
					anisotropy={0.1}
					chromaticAberration={0.04}
				/>
			</mesh>
		</>
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
