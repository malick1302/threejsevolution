import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

let camera, scene, renderer; 

function main() {
//Création d'une nouvelle scene de couleur grise claire
scene = new THREE.Scene();
scene.background = new THREE.Color(0xAAAAAA);

//creation de la camera : 
//field of view a 40
const fov = 40;
//CA va utiliser la taille de la 
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
//C'est al distance max possible
const far = 1000; 
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 120;




// Création du rendu WebGL et du canvas
renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('c') });
// Ajuste la taille du rendu
renderer.setSize(window.innerWidth, window.innerHeight); 


    // Ajouter un Torus Knot à la scène
    addTorusKnot(0, 0);

    //Lancer l'animation 
    animate();

}



//Creation d'une fonction une postion X et Y et un object 3D
//Puis sl'ajoute a la scène
function addTorusKnot(x, y) {
const radius =  5.8;  
const tubeRadius =  1.0;  
const radialSegments =  9;  
const tubularSegments =  20;  
const p =  1;  
const q = 13; 

const geometry = new THREE.TorusKnotGeometry(
radius, tubeRadius, tubularSegments, radialSegments, p, q );

//Creation mesh avec le materiau
const mesh = new THREE.Mesh(geometry, createMaterial());

//Positionner le mesh : 
mesh.position.x = x;
mesh.position.y = y; 

//Ajout du mesh a la scène 
scene.add(mesh);

}

//création d'un materiel coloré aleatoire

function createMaterial () {
const material = new THREE.MeshPhongMaterial({
    //Double Side veut dire que que Three doit dessiner les deux cotés
    //Pas besoin d'utiiliser cela pour les forme ronde comme les sphère
    //On ne voit pas l'interiere
    side : THREE.DoubleSide,
})
//HUe correspond a la teinte
const hue = Math.random(); 
//LA saturation est compris entre 0 et 1 
const saturation = 1;
//LUminosité comprise entre 0 et 1 (1 = noir)
const luminance = 0.5; 
material.color.setHSL(hue, saturation, luminance);

return material;
}









  function animate() {
    requestAnimationFrame(animate);

    // Faire tourner l'objet sur l'axe Y (par exemple)
    scene.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
            child.rotation.y += 0.01; // Rotation lente autour de l'axe Y
        }
    });

    // Rendu de la scène
    renderer.render(scene, camera);
}

main();