import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118.1/build/three.module.js';
import {RGBELoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/RGBELoader.js';
import {FlakesTexture} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/textures/FlakesTexture.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/controls/OrbitControls.js';

let box;

class BasicWorldDemo{
    constructor(){
        this._Initialize();
    }

    _Initialize(){

        var myCanvas = document.getElementById("canvas")

        //webGl renderer
        this._threejs = new THREE.WebGLRenderer({canvas: myCanvas});
        this._threejs.shadowMap.enabled = true;
        this._threejs.shadowMap.type = THREE.PCFSoftShadowMap;
        this._threejs.setPixelRatio(window.devicePixelRatio);
        this._threejs.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this._threejs.domElement);

        //resizing event listener
        window.addEventListener('resize',()=>{
            this._OnWindowResize();
        },false);


        //camera
        const fov = 60;
        const aspect = 1920/1080;
        const near =1.0;
        const far = 1000.0;
        this._camera = new THREE.PerspectiveCamera(fov,aspect,near,far);
        this._camera.position.set(50, 50, -50);

        
        //scene instantation
        this._scene = new THREE.Scene();
        
        //scene fog
        {
          const near = 80;
          const far = 100;
          const color = 'lightblue';
          this._scene.fog = new THREE.Fog(color, near, far);
          this._scene.background = new THREE.Color(0xababab);
        }

        //lighting for the world
        let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        light.position.set(100,100,100);
        light.target.position.set(0,0,0);
        light.castShadow = true;
        light.shadow.bias = -0.001;
        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.near = 0.5;
        light.shadow.camera.far = 500.0;
        light.shadow.camera.left = 200;
        light.shadow.camera.right = -200;
        light.shadow.camera.top = 200;
        light.shadow.camera.bottom = -200;        
        
        //add ligthing to the scenen
        this._scene.add(light);

        // light helper
        const helper = new THREE.DirectionalLightHelper( light, 5 );
        this._scene.add( helper );
        
        //add another light (ambient lighting)
        light = new THREE.AmbientLight(0x404040);
        this._scene.add(light);

        //camera movement
        const controls = new OrbitControls(
            this._camera, this._threejs.domElement);
        controls.target.set(0, -1, 0);
        controls.screenSpacePanning = false;
        // controls.enablePan = false;
        controls.update();

        this._camera.lookAt(0, -1, 0);

        //box texture
        const loader = new THREE.CubeTextureLoader();
        const texture = loader.load([
            './resources/posx.jpg',
            './resources/negx.jpg',
            './resources/posy.jpg',
            './resources/negy.jpg',
            './resources/posz.jpg',
            './resources/negz.jpg',
        ]);
        this._scene.background = texture;

        //surface texture
        var texturePlane,materialPlane;
        texturePlane = new THREE.TextureLoader().load( "./resources/ground.jpeg" );
        texturePlane.wrapS = THREE.RepeatWrapping; 
        texturePlane.wrapT = THREE.RepeatWrapping;
        materialPlane = new THREE.MeshLambertMaterial({ map : texturePlane });

        //add surface
        const plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100, 10, 10),
                materialPlane);
        plane.castShadow = false;
        plane.receiveShadow = true;
        plane.rotation.x = -Math.PI / 2;
        this._scene.add(plane);

        // this._threejs.outputEncoding = THREE.sRGBEncoding;
        // this._threejs.toneMapping = THREE.ACESFilmicToneMapping;
        // this._threejs.toneMappingExposure =1.25;

        let envmaploader =  new THREE.PMREMGenerator(this._threejs);

        new RGBELoader().setPath('./resources/').load('abandoned_tank_farm_05_4k.hdr',hdrmap=> {
            let envmap =envmaploader.fromCubemap(hdrmap);
            let ballText = new THREE.CanvasTexture(new FlakesTexture());
            ballText.wrapS = THREE.RepeatWrapping;
            ballText.wrapT = THREE.RepeatWrapping;
            ballText.repeat.x = 10;
            ballText.repeat.y = 6;
    
            const ballMaterial = {
                clearcoat:1.0,
                clearcoatRoughness:0.1,
                metalness:0.9,
                roughness:0.5,
                color:0x8418ca,
                normalMap:ballText,
                normalScale: new THREE.Vector2(0.15,0.15),
                envMap:envmap.texture
            }
    
            let ballGeo = new THREE.SphereGeometry(20,64,64);
            let ballMat = new THREE.MeshPhysicalMaterial(ballMaterial);
            let ballMesh = new THREE.Mesh(ballGeo,ballMat);
            ballMesh.position.set(0,50,0);
            this._scene.add(ballMesh);
        });      
        

        box = new THREE.CubeGeometry(4,10,4);
        let boxMat = new THREE.MeshPhysicalMaterial({
            clearcoat:1.0,
            clearcoatRoughness:0.1,
            metalness:0.9,
            roughness:0.5,
            control:0x8418ca,
            normalMap:texture,
            normalScale: new THREE.Vector2(0.15,0.15)
        });
        let boxMesh = new THREE.Mesh(box,boxMat);
        
        boxMesh.position.set(-10, 5, -10);
        boxMesh.castShadow = true;
        boxMesh.receiveShadow =true;

        this._scene.add(boxMesh);
        
        this._LoadModel();
        this._RAF(this._scene);
    }

    _LoadModel(){
      const loader = new GLTFLoader();
      loader.load('./resources/rocket/Rocket_Ship_01.gltf',(gltf) =>{
          gltf.scene.traverse(
              c =>{
                  c.castShadow = true;
                  c.receiveShadow=true;
              }
          );
          this._scene.add(gltf.scene);
      })
    }

    _OnWindowResize(){
        this._camera.aspect= window.innerWidth/window.innerHeight;
        this._camera.updateProjectMatrix();
        this._threejs.setSize(window.innerWidth,window.innerHeight);
    }   

    _RAF(_scene){
        requestAnimationFrame(()=>{
            this._threejs.render(this._scene,this._camera);
            this._RAF(_scene);
        });
    }
}
let _APP = null;

window.addEventListener('DOMContentLoaded', () => {
  _APP = new BasicWorldDemo();
});