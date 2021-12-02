import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    // controls.enableZoom = false;
    controls.enablePan = false;
    controls.minPolarAngle = 1; // radians
	controls.maxPolarAngle = 1.65; // radians
    return controls;
    }

export { createControls };