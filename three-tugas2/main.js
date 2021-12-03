import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import Stats from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/libs/stats.module.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.118/examples/jsm/controls/OrbitControls.js';

let container, stats;
let camera, scene, raycaster, renderer, controls, object;
let score=0,amount = 0,tick=50,n=1,cek=[];

let INTERSECTED;
let theta = 0;

let colors = [0xFF1493,0x00FA9A,0xFF0000,
                0x00FFFF,0x0000CD];

const pointer = new THREE.Vector2();
const mouse = new THREE.Vector2();
const radius = 100;

init();
animate();

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0,0,300);

    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    const light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 0, 0, 10 ).normalize();
    scene.add( light );

    raycaster = new THREE.Raycaster();

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    
    stats = new Stats();
    container.appendChild( stats.dom );
    
    document.addEventListener('click',onMouseClick);

    // 

    document.addEventListener( 'mousemove', onPointerMove );
    
    //
    
    window.addEventListener( 'resize', onWindowResize );
    
    // controls = new OrbitControls( camera, renderer.domElement );
    // controls.target.set(0, 0, 0);
    // controls.update();

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    mouse.z = 1;
}

function onPointerMove( event ) {

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function cekInter() {
    console.log(cek[0].material.color);
    console.log(cek[1].material.color);
    if(cek[0].material.color.equals(cek[1].material.color)){
        score+=1;
        scene.remove(cek[0]);
        scene.remove(cek[1]);
        cek=[];
        amount-=2;
        console.log(amount);
    }else{
        cek=[];
    }
}

function genObj() {
    const geometry = new THREE.SphereGeometry( 15, 32, 16 );
    if(amount<=30){
        // for ( ; amount < 10; amount ++ ) {

        object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: colors[Math.floor(Math.random() *colors.length)] } ) );

        object.position.x = Math.random() * 400 - 200;
        object.position.y = Math.random() * 250 - 100;
        object.position.z = 0;

        object.rotation.x = Math.random() * 2 * Math.PI;
        object.rotation.y = Math.random() * 2 * Math.PI;
        object.rotation.z = Math.random() * 2 * Math.PI;

        scene.add( object );
        amount++;
        document.getElementById("info").innerHTML = 
            "Pecahkan balon yang memiliki warna sama<br>jika jumlah balon sudah 30, permainan berakhir.<br>Balon: "
                +amount+"/30.<br>Score "+score+".";
        n+=1;
    // }
    }
    if(50 -n>10)
        tick = 50 - n;
    else
        tick = 10;
}

//

function animate() {

    requestAnimationFrame( animate );
    render();
    stats.update();
    
}

function render() {
    console.log(amount);
    if(amount!=30)
        tick--;
    else{
        alert("Permainan Berakhir!");
        window.location.reload();
    }
    if(tick==0)
        genObj();
    
    theta += 0.1;

    // camera.position.x = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
    // camera.position.y = radius * Math.sin( THREE.MathUtils.degToRad( theta ) );
    // camera.position.z = radius * Math.cos( THREE.MathUtils.degToRad( theta ) );
    // camera.lookAt( scene.position );

    camera.updateMatrixWorld();

    // find intersections

    raycaster.setFromCamera( mouse, camera );

    const intersects = raycaster.intersectObjects( scene.children, false );

    if ( intersects.length > 0 ) {

        if ( INTERSECTED != intersects[ 0 ].object ) {

            if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );

            INTERSECTED = intersects[ 0 ].object;
            INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
            INTERSECTED.material.emissive.setHex( 0xff0000 );
            cek.push(INTERSECTED);
        }

    } else {

        if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        cek=[];
        INTERSECTED = null;

    }

    if(cek.length == 2){
        cekInter()
    }
    
    renderer.render( scene, camera );

}