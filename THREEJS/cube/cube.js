import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.module.js';

//THREEJS les angles sont en radians mais pas pour les caméras

let cube, renderer, scene, camera;

function main() {
    const canvas = document.querySelector('#c');
    //WebGLRebderer va recup toutes les données fournis et les show sur le canvas
    renderer = new THREE.WebGLRenderer({antialias: true, canvas});


//fov = field of view -> 75 deg sur position vertical
const fov = 75;
//L'aspect d'affichage du canvas = 300px x 150px ou 2 
const aspect = 2;  
//Near ou far tout ce qui est near les coté seront rogné(non desssiné)
const near = 0.1;
const far = 5;
// fov, aspect, near, far = frustum = nom du forme 3D
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

//On doit créer la scene, tout ce que je veux qui soit dessiner
//par threejs doit etre ajouter a a scène
scene = new THREE.Scene();


//step-3 - LA LUMIERE 
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
//position legere sur la gauche, au dessus, et derriere la caméra
light.position.set(-1, 2, 4);
scene.add(light);
//FIN DE LA STEP - 3

// création d'un box geometrie qui contient les data d'une boite
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

//creation du materiel et ajout d'une couleur
// const material = new THREE.MeshBasicMaterial({color: 0x44aa88});

//au lieu d'utiliser la couleur ci-dessu, il faut utiliser Phong pour jouer avec 
//les couleurs et le slumières 

const material = new THREE.MeshPhongMaterial({color: 0x44aa88});

//creation de mesh = 3 choses, geometry, materiel et (The position, orientation, and scale )
cube = new THREE.Mesh(geometry, material);
scene.add(cube);

render();
}




//step 2 - L ' ANIMATION 

function render(time) {
    time *= 0.001; 
   
    cube.rotation.x = time;
    cube.rotation.y = time;
   
    renderer.render(scene, camera);
    
   
    requestAnimationFrame(render);
  }



  


  main();