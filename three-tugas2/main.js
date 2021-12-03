import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

let light,helper,torusKnot,cube,cone,lineTorus,sphere,lineSphere, curLight;

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
// {
//     const color = 0xFFFFFF;
//     const density = 0.1;
//     scene.fog = new THREE.FogExp2(color, density);
// }


const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
let controls = new OrbitControls(camera, renderer.domElement);
camera.position.set( 0, 20, 100 );

controls.update();

// scene.background = new THREE.Color(0xababab);
{
    const near = 80;
    const far = 100;
    const color = 'lightblue';
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color(0xababab);
  }

let dirLight = function(){
    const color = 0xFFFFFF;
    const intensity = 1;
    light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 50);
    scene.add(light);
    
    helper = new THREE.DirectionalLightHelper( light, 5 );
    scene.add( helper );   
}
let ambLight  = function () {
    light = new THREE.AmbientLight( 0x404040 ); // soft white light
    light.position.set(-1, 2, 4);
    scene.add( light );
}
let hemLight  = function () {
    light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    light.position.set(-1, 2, 4);
    scene.add( light );

    helper = new THREE.HemisphereLightHelper( light, 5 );
    scene.add( helper );
}
let poiLight  = function () {
    light = new THREE.PointLight( 0xFFFFFF, 1, 100 );
    light.position.set(-1, 2, 40);
    scene.add( light );

    const sphereSize = 1;
    helper = new THREE.PointLightHelper( light, sphereSize );
    scene.add( helper );
}
let spoLight = function () {
    light = new THREE.SpotLight( 0xffffff );
    light.position.set(-1, 2, 40);
    light.castShadow = true;

    light.shadow.mapSize.width = 1024;
    light.shadow.mapSize.height = 1024;

    light.shadow.camera.near = 500;
    light.shadow.camera.far = 4000;
    light.shadow.camera.fov = 30;
    scene.add( light );

    helper = new THREE.SpotLightHelper( light );
    scene.add( helper );
}

let createTorusKnots = function () {
    const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
    const material = new THREE.MeshNormalMaterial(  );
    torusKnot = new THREE.Mesh( geometry, material );
    scene.add( torusKnot );
}

let createSphere = function () {
    let geometry = new THREE.SphereGeometry( 10, 32, 16 );
    let material = new THREE.MeshToonMaterial( { color: 0xffff00 } );
    sphere = new THREE.Mesh( geometry, material );
    let wireframe = new THREE.WireframeGeometry( geometry );
    lineSphere = new THREE.LineSegments( wireframe );
    lineSphere.material.depthTest = false;
    lineSphere.material.opacity = 3;
    lineSphere.material.transparent = true;
    scene.add( lineSphere );
    scene.add( sphere );
}

let createCube = function () {
    let geometry = new THREE.BoxGeometry(10,10,10);
    let material = new THREE.MeshStandardMaterial({
        color:0x00a1cb,
        roughness: 0.05,
        metalness: 0.05,
    });
    cube = new THREE.Mesh(geometry,material);
    scene.add(cube);
};

let createTorus = function () {
    let geometry = new THREE.TorusGeometry(4, 2, 10, 50);
    let wireframe = new THREE.WireframeGeometry( geometry );
    lineTorus = new THREE.LineSegments( wireframe );
    lineTorus.material.depthTest = false;
    lineTorus.material.opacity = 0.5;
    lineTorus.material.transparent = true;
    scene.add( lineTorus );
}

let createCone = function () {
    let geometry = new THREE.ConeGeometry( 5, 10, 32 );
    let material = new THREE.MeshPhongMaterial({
        color: 0xFF0000,
        shininess: 50,   
        });
    cone = new THREE.Mesh( geometry, material );
    // let wireframe = new THREE.WireframeGeometry( geometry );
    // lineSphere = new THREE.LineSegments( wireframe );
    // lineSphere.material.depthTest = false;
    // lineSphere.material.opacity = 0.5;
    // lineSphere.material.transparent = true;
    // scene.add( lineSphere );
    scene.add( cone );
}

document.getElementById("light").addEventListener("change",function () {
    var lights = document.getElementById("light").value;
    scene.remove(light);
    scene.remove(helper);
    if(lights == 'dir'){
        dirLight();
    }else if(lights == 'ambi'){
        ambLight();
    }else if(lights == 'hem'){
        hemLight();
    }else if(lights == 'poi'){
        poiLight();
    }else if(lights == 'spo'){
        spoLight();
    }
})

let initShape = function() {
    // dirLight();
    // hemLight();
    // spoLight();
    // poiLight();
    // ambLight();
    createTorusKnots();
    createCube();
    createTorus();
    createCone();
    createSphere();
}

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


function render() {
    renderer.render(scene, camera);

    cone.rotation.z +=0.01;
    cone.rotation.y +=0.01;
    cone.position.set(30,0,0);
    
    cube.position.set(0,30,0);
    cube.rotation.x +=0.01;
    cube.rotation.y +=0.01;
    
    torusKnot.rotation.z+=0.05;
    torusKnot.rotation.y+=0.05;
    
    lineTorus.position.set(-30,0,0);
    lineTorus.rotation.x+=0.05;
    
    sphere.position.set(0,-30,0);
    sphere.rotation.x+=0.05;
    sphere.rotation.z+=0.05;
    lineSphere.rotation.z +=0.01;
    lineSphere.rotation.y +=0.01;
    lineSphere.position.set(0,-30,0);

    requestAnimationFrame(render);
}
initShape();
requestAnimationFrame(render);