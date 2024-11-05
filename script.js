const container = document.getElementById("canvas-container");

// Constants for later use
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new THREE.Color(0xeeeeee);
container.appendChild(renderer.domElement);

// Setting the camera position
camera.position.z = 5;

// Directional light that simulates the sunlight
const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(0, 5, 10);
directionalLight.castShadow = true;
scene.add(directionalLight)

// Loading the 3D model
const loader = new THREE.GLTFLoader();
let model;
loader.load(
    'path/to/your/model.glb', // Replace with the path to your GLB file. If the model is inside a folder inside of the project folder you only have to write the models folder and the name of the model. For instance: /ModelsFolder/model.glb
    (gltf) => {
    model = gltf.scene;

    model.scale.set(15, 15, 15)

    scene.add(model);
    },
    undefined,
    (error) => {
    console.error('Error loading the model:', error); // Printing out error if one should occur
    }
);

// Adding the eventlistener to check if you scroll
window.addEventListener("scroll", () => {
    if (model) {
    const scrollY = window.scrollY;
    model.rotation.y = scrollY * 0.005;
    }
});

// Making the animation smooth
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});