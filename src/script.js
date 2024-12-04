import "./style.css"
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import gsap from 'gsap'
import GUI from 'lil-gui'
import { GLTFLoader } from "three/examples/jsm/Addons.js"
import { Sky } from 'three/examples/jsm/objects/Sky.js'
console.log(Sky);

/**
 * Base
 */
// Debug
const gui = new GUI()
gui.hide()
// TODO: change the ground
// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

//Fog

// const fog = new THREE.Fog('#262837', 1, 50)
const fog = new THREE.FogExp2('#02343f', 0.04)
scene.fog = fog
gui.add(fog, 'density').min(0).max(1).step(0.001)
/**
 * House
 */
const loader = new GLTFLoader();
let models = []
const modelLoader = async (url, onLoad) =>{
     loader.load(url,
       async (gltf) => {
        const model = gltf.scene;
         models.push(model);
         await onLoad(model);
     },
     undefined,
     function (error) {
        console.error(error);
     })  
}
//Models

modelLoader('/3d-models/house_2.glb', (model) => {

    scene.add(model);
    for (const mesh of model.children[0].children[0].children[0].children[0].children[0].children) {
        mesh.castShadow = true
        mesh.receiveShadow = true
    }
    for (const mesh of model.children[0].children[0].children[0].children[0].children[1].children) {
        mesh.castShadow = true
        mesh.receiveShadow = true
    }
    // model.children[0].children[0].children[0].children[0].children[0].castShadow = true
    // model.children[0].children[0].children[0].children[0].children[0].receiveShadow = true
    // model.children[0].children[0].children[0].children[0].children[1].castShadow = true
    // model.children[0].children[0].children[0].children[0].children[1].receiveShadow = true
for(let i = 2; i < model.children[0].children[0].children[0].children[0].children.length; i++){
    model.children[0].children[0].children[0].children[0].children[i].visible = false
}

model.position.set(0.8, 0.04, -1.3)  
gui.add(model.position, 'y').min(- 5).max(10).step(0.001).name('House position')

model.rotation.y =  Math.PI    
})
// Gate
modelLoader('/3d-models/rusty_old_gate.glb', (model) => {
scene.add(model);
model.position.set(-5.4, 0,19)
model.scale.set(2, 1.5, 2.5)
})

modelLoader('/3d-models/piller.glb', (model) => {
scene.add(model);
model.position.set(-2.7, 0,19.5)
model.scale.set(0.020, 0.020, 0.020)
// gui.add(model.position, 'x').min(- 5).max(10).step(0.001)
// gui.add(model.position, 'y').min(- 5).max(15).step(0.001)
// gui.add(model.position, 'z').min(- 17).max(20).step(0.001)
})

modelLoader('/3d-models/piller.glb', (model) => {
    scene.add(model);
    model.position.set(3.2, 0,19.3)
    model.scale.set(0.020, 0.020, 0.020)
    // gui.add(model.position, 'x').min(- 5).max(10).step(0.001)
    // gui.add(model.position, 'y').min(- 5).max(15).step(0.001)
    // gui.add(model.position, 'z').min(- 17).max(20).step(0.001)
    })

// Walkway

modelLoader('/3d-models/long_paved_walkway.glb', (model) => {
scene.add(model);
for(let i = 0; i < model.children[0].children[0].children.length; i++){
    model.children[0].children[0].children[i].receiveShadow = true
}

model.position.set(1, -0.55,18.9)
model.rotation.y = - Math.PI / 2
model.scale.set(1.8, 1, 2)
})

// Tree

modelLoader('/3d-models/old_tree.glb', (model) => {
scene.add(model);
model.position.set(10, 0,15)
model.scale.set(2, 1.5, 1.5)
})
// hanging ghost
modelLoader('/3d-models/skeleton.glb', (model) => {
scene.add(model);
model.position.set(6.1, 4.6, 15.5)
// gui.add(model.position, 'x').min(- 5).max(10).step(0.001)
// gui.add(model.position, 'y').min(- 5).max(15).step(0.001)
// gui.add(model.position, 'z').min(- 50).max(50).step(0.001)
model.scale.set(0.75, 0.75, 0.75)
gsap.to(model.rotation, { duration: 3,repeat: -1,  y:  Math.PI/2 ,ease: 'power2.out'})
gsap.to(model.rotation, { duration: 3,repeat: -1, delay: 2.8,  y:  -Math.PI/2, ease: 'power2.out'})
// gui.add(model.rotation, 'y').min(- Math.PI / 2).max(Math.PI / 2).step(0.001)
// gui.add(model.rotation, 'x').min(- Math.PI / 2).max(Math.PI / 2).step(0.001)
// gui.add(model.rotation, 'z').min(- Math.PI / 2).max(Math.PI / 2).step(0.001)
})

modelLoader('/3d-models/rope.glb', (model) => {
scene.add(model);   
model.position.set(6.1, 6.8, 15.5)  
model.scale.set(0.009, 0.003, 0.005)
// gui.add(model.position, 'x').min(- 5).max(10).step(0.001)
// gui.add(model.position, 'y').min(- 5).max(15).step(0.001)   
// gui.add(model.position, 'z').min(- 50).max(50).step(0.001)
})

// Graves

modelLoader('/3d-models/grave.glb', (model) => {
for (let i = 0; i < 10; i++) {
    for(let i = 0; i < model.children[0].children[0].children.length; i++){
        model.children[0].children[0].children[i].castShadow = true
        model.children[0].children[0].children[i].receiveShadow = true
    }
    // console.log(model);
    
    const instance = model.clone();
    const radius = 10 + Math.random() * 9.5
    const angle = (Math.random() * - Math.PI * 1.5)  +  45 
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    instance.position.x = x
    instance.position.y = - Math.random() * 2
    instance.position.z = z
    instance.rotation.y = Math.random() * Math.PI * 2
    scene.add(instance);
    }
})

modelLoader('/3d-models/tombstone.glb', (model) => {
for (let i = 0; i < 50; i++) {
    for(let i = 0; i < model.children[0].children[0].children[0].children.length; i++){
        model.children[0].children[0].children[0].children[i].children[0].castShadow = true
        model.children[0].children[0].children[0].children[i].children[0].receiveShadow = true
    }
    const instance = model.clone();
    const radius = 10 + Math.random() * 9.5
    const angle = (Math.random() * - Math.PI * 1.5)  +  45 
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    instance.position.x = x
    instance.position.y = - Math.random() * 1
    instance.position.z = z
    instance.rotation.y = Math.random() * Math.PI * 2
    instance.scale.set(3, 3, 3)
    scene.add(instance);
    }
})
// coffin area
modelLoader('/3d-models/ancient_tree.glb', (model) => {
    for (const mesh of model.children[0].children[0].children[0].children[0].children) {
        mesh.castShadow = true
        mesh.receiveShadow = true
    }
    console.log(model);
    const instance = model.clone();
    instance.position.set(-7, .1, 4)
    instance.scale.set(0.008, 0.01, 0.008)
    scene.add(instance);
    
})
modelLoader('/3d-models/coffin.glb', (model) => {
    const instance = model.clone();
    instance.position.set(-6, .1, 15)
    instance.scale.set(0.03, 0.03, 0.03)
    scene.add(instance);
    
})
modelLoader('/3d-models/coffin.glb', (model) => {
const instance = model.clone();
instance.position.set(-10, 0, 12)
instance.scale.set(0.03, 0.03, 0.03)
instance.rotation.y = Math.PI / 2
scene.add(instance);

})
// skulls

// modelLoader('/3d-models/skull.glb', (model) => {
// for (let i = 0; i < 10 ; i++) {
//     model.children[0].children[0].children[0].castShadow = true
//     // console.log(model);
    
//     const instance = model.clone();
//     const radius = 10 + Math.random() * 9
//     const angle = (Math.random() * -Math.PI  * 2 ) 
//     const x = Math.sin(angle) * radius
//     const z = Math.sin(angle) * radius
//     instance.position.x = x
//     instance.position.z = z
//     instance.position.y = 0.5
//     instance.rotation.y = Math.random() * Math.PI * 2
//     instance.scale.set(.53, 0.53, 0.53)
//     scene.add(instance);
//     }
// })
modelLoader('/3d-models/skull_black.glb', (model) => {
for (let i = 0; i <30 ; i++) {
    model.children[0].children[0].children[0].children[0].castShadow = true
    model.children[0].children[0].children[0].children[1].castShadow = true
    const instance = model.clone();
    const radius = 10 + Math.random() * 9
    const angle = (Math.random() * - Math.PI *1.5 ) + 45 
    const x = Math.cos(angle) * radius
    const z = Math.sin(angle) * radius
    instance.position.x = x
    instance.position.z = z
    instance.position.y = 0.5
    instance.rotation.y = Math.random() * Math.PI * 2
    instance.scale.set(.53, 0.53, 0.53)
    scene.add(instance);
    }
})
// ghosts

// modelLoader('/3d-models/ghost.glb', (model) => {
// for (let i = 0; i < 5; i++) {
//     const instance = model.clone();
//     const radius = 10 + Math.random() * 9.5
//     const angle = (Math.random() * - Math.PI * 2)  
//     const x = Math.cos(angle) * radius
//     const z = Math.sin(angle) * radius
//     instance.position.x = x
//     instance.position.y = - Math.random() * 2
//     instance.position.z = z
//     instance.rotation.y = Math.random() * Math.PI * 2
//     instance.scale.set(.5, .5, .5)
//     gsap.to(instance.position, { y: "+=1", repeat: -1, yoyo: true, duration: 2 });
//     gsap.to(instance.rotation, { y: "+=Math.PI", repeat: -1, duration: 4 });

//     // gsap.to(instance.position, { y: Math.PI / 4 , duration: 10, repeat: -1})
//     // gsap.to(instance.position, {x: Math.sin(angle) * radius, duration: 5, repeat: -1})
//     // gsap.to(instance.position, {z: Math.cos(angle) * radius, duration: 5, repeat: -1})
//     scene.add(instance);

// }
// })
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const floorAlphaTexture = textureLoader.load('/floor/alpha.jpg')
const floorColorTexture = textureLoader.load('/floor/color.jpg')
floorColorTexture.colorSpace = THREE.SRGBColorSpace
const floorNormalTexture = textureLoader.load('/floor/normal.jpg')
const floorDisplacementTexture = textureLoader.load('/floor/displacement.jpg')
const floorARMTexture = textureLoader.load('/floor/arm.jpg')

floorColorTexture.repeat.set(8,8,8)
floorColorTexture.wrapS = THREE.RepeatWrapping
floorColorTexture.wrapT = THREE.RepeatWrapping

floorNormalTexture.repeat.set(8,8,8)
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping

floorDisplacementTexture.repeat.set(8,8,8)
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping   

floorARMTexture.repeat.set(8,8,8)
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping    


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40, 100, 100),
    new THREE.MeshStandardMaterial({ 
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorColorTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.3,
        displacementBias: - 0.2,
        normalMap: floorNormalTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture

     })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
floor.receiveShadow = true
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.2)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#86cdff', .7)
moonLight.position.set(-2.4, 2.98, -5)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
moonLight.castShadow = true
scene.add(moonLight)
// ghost light
const ghostLight1 = new THREE.PointLight('#8800ff', 6)
const ghostLigh2 = new THREE.PointLight('#ff0088', 6)
const ghostLight3 = new THREE.PointLight('#ff0000', 6)

ghostLight1.castShadow = true
ghostLigh2.castShadow = true
ghostLight3.castShadow = true
scene.add(ghostLight1, ghostLigh2, ghostLight3)




for (const group of models) {
    group.children[0].children[0].children[0].castShadow = true
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 2
camera.position.z = 12
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor('#262837')
renderer.shadowMap.enabled = true
// renderer.shadowMap.type = THREE.PCFSoftShadowMap

moonLight.shadow.camera.top = 10;
moonLight.shadow.camera.bottom = -10;
moonLight.shadow.camera.left = -10;
moonLight.shadow.camera.right = 10;
moonLight.shadow.camera.near = 0.1;
moonLight.shadow.camera.far = 50;
moonLight.shadow.mapSize.width = 2048;
moonLight.shadow.mapSize.height = 2048;

const sky = new Sky();
sky.scale.set(100, 100, 100);

sky.material.uniforms['turbidity'].value = 10;
sky.material.uniforms['rayleigh'].value = 3;
sky.material.uniforms['mieCoefficient'].value = 0.1;
sky.material.uniforms['mieDirectionalG'].value = 0.95;
sky.material.uniforms['sunPosition'].value.set(-0.5, -0.038, -0.95)  
scene.add(sky);
/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Ghost Lights Animations
    const ghostAngle1 = elapsedTime * 0.5
    ghostLight1.position.x = Math.cos(ghostAngle1) * 10
    ghostLight1.position.z = Math.sin(ghostAngle1) * 10
    ghostLight1.position.y = Math.sin(ghostAngle1) * Math.sin(ghostAngle1 * 2.34) * Math.sin(ghostAngle1 * 3.45)

    const ghostAngle2 = - elapsedTime * 0.38
    ghostLigh2.position.x = Math.cos(ghostAngle2) * 8
    ghostLigh2.position.z = Math.sin(ghostAngle2) * 8
    ghostLight1.position.y = Math.sin(ghostAngle2) * Math.sin(ghostAngle2 * 2.34) * Math.sin(ghostAngle2 * 3.45)

    const ghostAngle3 = - elapsedTime * 0.25
    ghostLight3.position.x = Math.cos(ghostAngle3) * 13
    ghostLight3.position.z = Math.sin(ghostAngle3) * 13
    ghostLight1.position.y = Math.sin(ghostAngle3) * Math.sin(ghostAngle3 * 2.34) * Math.sin(ghostAngle3 * 3.45)
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()