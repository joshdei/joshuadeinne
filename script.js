// Three.js scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({canvas: document.getElementById('bg'), alpha:true});
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.z = 50;

// Water plane
const waterGeometry = new THREE.PlaneGeometry(200,200,50,50);
const waterMaterial = new THREE.MeshBasicMaterial({color:0x00e5ff, wireframe:true, opacity:0.2, transparent:true});
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI/2;
scene.add(water);

// Floating particles
const particleCount = 500;
const particles = new THREE.BufferGeometry();
const positions = [];

for(let i=0; i<particleCount; i++){
  positions.push((Math.random()-0.5)*200);
  positions.push(Math.random()*100);
  positions.push((Math.random()-0.5)*200);
}

particles.setAttribute('position', new THREE.Float32BufferAttribute(positions,3));
const particleMaterial = new THREE.PointsMaterial({color:0x00e5ff, size:0.7});
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Animate
function animate(){
  requestAnimationFrame(animate);
  // Water waving
  water.geometry.vertices.forEach(v=>{
    v.z = Math.sin(Date.now()*0.001 + v.x + v.y)*0.5;
  });
  water.geometry.verticesNeedUpdate = true;

  // Particle floating
  particleSystem.rotation.y += 0.001;
  particleSystem.position.y = -window.scrollY*0.05;

  renderer.render(scene,camera);
}
animate();

// Scroll reveal for sections
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if(top < window.innerHeight - 150){
      section.style.opacity = 1;
      section.style.transform = 'translateY(0)';
    }
  });
});

// Handle resize
window.addEventListener('resize', ()=>{
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
