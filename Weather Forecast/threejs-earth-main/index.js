import * as THREE from "three";
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from "../../threejs-earth-main/src/getStarfield.js";
import { getFresnelMat } from "../../threejs-earth-main/src/getFresnelMat.js";
import { initSwipeText } from "../../threejs-earth-main/src/swipeText.js";
import { startCloudAnimation } from "../../threejs-earth-main/src/cloudAnimation.js"; // Import cloud animation
// Importing the sun function
import { createSun } from '../../threejs-earth-main/src/Sun.js';




const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();
// Creating and adding the sun
const sun = createSun();
scene.add(sun);
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
camera.position.z = 4;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

const earthGroup = new THREE.Group();
earthGroup.scale.set(2, 2, 2);
earthGroup.rotation.z = 3.4 * Math.PI / 180;
scene.add(earthGroup);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableRotate = true;
controls.enableZoom = false;
controls.maxPolarAngle = Math.PI / 2 + Math.PI / 6;
controls.minPolarAngle = Math.PI / 2 - Math.PI / 6;

const detail = 12;
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1, detail);

const material = new THREE.MeshPhongMaterial({
  map: loader.load("./textures/00_earthmap1k.jpg"),
  specularMap: loader.load("./textures/02_earthspec1k.jpg"),
  bumpMap: loader.load("./textures/01_earthbump1k.jpg"),
  bumpScale: 0.04,
});
const earthMesh = new THREE.Mesh(geometry, material);
earthGroup.add(earthMesh);

const lightsMat = new THREE.MeshBasicMaterial({
  map: loader.load("./textures/03_earthlights1k.jpg"),
  blending: THREE.AdditiveBlending,
});
const lightsMesh = new THREE.Mesh(geometry, lightsMat);
earthGroup.add(lightsMesh);

const cloudsMat = new THREE.MeshStandardMaterial({
  map: loader.load("./textures/04_earthcloudmap.jpg"),
  transparent: true,
  opacity: 0.8,
  blending: THREE.AdditiveBlending,
  alphaMap: loader.load('./textures/05_earthcloudmaptrans.jpg'),
});
const cloudsMesh = new THREE.Mesh(geometry, cloudsMat);
cloudsMesh.scale.setScalar(1.003);
earthGroup.add(cloudsMesh);

const fresnelMat = getFresnelMat();
const glowMesh = new THREE.Mesh(geometry, fresnelMat);
glowMesh.scale.setScalar(1.01);
earthGroup.add(glowMesh);

const stars = getStarfield({ numStars: 2000 });
scene.add(stars);

const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
sunLight.position.set(-2, 0.5, 1.5);
scene.add(sunLight);

let zooming = false;
let zoomTargetUrl = "";

function animateZoom() {
  if (zooming) {
    earthGroup.scale.x += (5 - earthGroup.scale.x) * 0.005;
    earthGroup.scale.y += (5 - earthGroup.scale.y) * 0.005;
    earthGroup.scale.z += (5 - earthGroup.scale.z) * 0.005;

    if (Math.abs(earthGroup.scale.x - 5) < 0.05) {
      window.location.href = zoomTargetUrl;
    }
  }
}

function restrictRotation() {
  const maxTilt = THREE.MathUtils.degToRad(30);
  earthGroup.rotation.x = THREE.MathUtils.clamp(earthGroup.rotation.x, -maxTilt, maxTilt);
}

function animate() {
  requestAnimationFrame(animate);

  if (!zooming) {
    earthMesh.rotation.y += 0.002;
    lightsMesh.rotation.y += 0.002;
    cloudsMesh.rotation.y += 0.0043;
    glowMesh.rotation.y += 0.02;
    stars.rotation.y += 0.001;
    controls.update();
    restrictRotation();
  }

  animateZoom();
  renderer.render(scene, camera);
}

// Start cloud animation with loading message
export function startZoomAnimation(targetUrl) {
  zoomTargetUrl = targetUrl;
  zooming = true;
  startCloudAnimation(targetUrl);  // Trigger cloud animation
}

window.addEventListener('resize', () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

animate();
initSwipeText();
