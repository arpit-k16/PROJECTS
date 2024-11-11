// src/Sun.js
import * as THREE from 'three';

export function createSun() {
  const sunGroup = new THREE.Group();

  // Sun Sphere: Make it large, bright, and place it far from Earth
  const sunGeometry = new THREE.SphereGeometry(5, 64, 64);  // Large radius for the sun
const sunMaterial = new THREE.MeshStandardMaterial({
    color: 0xffa500,             // Orange yellow color
    emissive: 0xffa500,          // Emissive color to make it glow
    emissiveIntensity: 20.0,     // Adjusted emissive intensity for a sun-like glow
});
  const sunMesh = new THREE.Mesh(sunGeometry, sunMaterial);
  sunGroup.add(sunMesh);

  // Directional Light for sunlight: Increase intensity for distance
  const sunLight = new THREE.DirectionalLight(0xffffff, 2.0);
  sunLight.position.set(-50, 20, 50);  // Positioning it far from the Earth
  sunGroup.add(sunLight);

  // Large glow effect around the sun using a sprite
  const spriteMaterial = new THREE.SpriteMaterial({
    map: createWhiteGlowTexture(),
    color: 0xffffff,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.7,
  });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(200, 200, 10); // Large scale for the glow
  sunGroup.add(sprite);

  // Position the sun far away from Earth
  sunGroup.position.set(-50, 10, -100);
  return sunGroup;
}

// Helper function to create a soft white glow texture
function createWhiteGlowTexture() {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(
    size / 2, size / 2, 0, size / 2, size / 2, size / 2
  );

  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.6)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.3)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}
