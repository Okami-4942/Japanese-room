import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

let scene, camera, renderer, model;
let scrollPercent = 0;

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function getScrollValue(start, end, minScroll, maxScroll) {
  // スクロール率を minScroll 〜 maxScroll の範囲に制限
  let t = (scrollPercent - minScroll) / (maxScroll - minScroll);
  t = Math.max(0, Math.min(1, t)); // 0 〜 1 に制限
  return lerp(start, end, t);
}

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 10);

  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("canvas"),
    alpha: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // 環境光 & 平行光
  const ambientLight = new THREE.AmbientLight(0xf2f2f2, 2.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // GLTFモデルの読み込み
  const loader = new GLTFLoader();
  loader.load("/yawaraginagomi.glb", function (gltf) {
    model = gltf.scene;

    // 初期スケール & 角度調整
    model.scale.set(0.4, 0.4, 0.4);
    model.rotation.set(Math.PI / 18, Math.PI / 4, 0);
    model.position.set(0, 0, 0);

    scene.add(model);
    console.log("Model loaded and initialized!");
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  if (model) {
    // スクロール率を計算 (0.0 〜 1.0)
    scrollPercent =
      window.scrollY / (document.body.scrollHeight - window.innerHeight);

    // スクロール率をコンソールに表示
    console.log(scrollPercent);

    // **スクロール率に応じた変化**

    // Math.PI = 180度
    //例) スクロール率が 0.08 〜 0.11 の間で回転、ポジション変更
    //getScrollValue(開始値, 終了値, 開始スクロール率, 終了スクロール率)
    

    if(scrollPercent >= 0.04 && scrollPercent <= 0.10){
    model.position.x = getScrollValue(0,8.5 , 0.04, 0.10);
    model.rotation.y = getScrollValue(Math.PI/4, 0,0.04,0.10);
    model.position.z = getScrollValue(0, -2, 0.04, 0.10);
    model.rotation.x = getScrollValue(Math.PI/18, 0.4, 0.04, 0.10);
    }

    else if(scrollPercent >= 0.2 && scrollPercent <= 0.25){
      model.position.x = getScrollValue(8.5, -5, 0.2, 0.25);
      model.rotation.y = getScrollValue(0, Math.PI/1.1,0.2,0.25);
      model.rotation.x = getScrollValue(0.3, 0.4, 0.2, 0.25);
      model.position.y = getScrollValue(0,1.5,0.2,0.25);
      model.position.z = getScrollValue(-4, -2, 0.2, 0.25);
    }

    else if(scrollPercent >= 0.36 && scrollPercent <= 0.42){
      model.position.x = getScrollValue(-5, 4.5, 0.36, 0.42);
      model.rotation.y = getScrollValue(Math.PI/1.1, Math.PI/10,0.36,0.42);
      model.position.z = getScrollValue(-2, 7, 0.36, 0.42);
      model.rotation.x = getScrollValue(0.4, 0.55, 0.36, 0.42);
      model.position.y = getScrollValue(1.5,-1,0.36,0.42);
    }  

    else if(scrollPercent >= 0.52 && scrollPercent <= 0.57){
      model.position.x = getScrollValue(4.5, 0, 0.52, 0.57);
      model.rotation.y = getScrollValue(Math.PI/10, Math.PI/2,0.52,0.57);
      model.position.z = getScrollValue(7, -3, 0.52, 0.57);
      model.position.y = getScrollValue(-1,0,0.52,0.57);
    }  

    else if(scrollPercent >= 0.57 && scrollPercent <= 0.6){
      model.position.x = getScrollValue(0, -2, 0.57, 0.6);
      model.position.z = getScrollValue(-3, 7, 0.57, 0.6);
      model.rotation.x = getScrollValue(0.55, 0.5, 0.57, 1);
      model.position.y = getScrollValue(0.3,-1,0.57,0.6);
    }  

    else if(scrollPercent >= 0.70 && scrollPercent <= 0.77){
      model.position.x = getScrollValue(-2, 0, 0.70, 0.77);
      model.position.z = getScrollValue(7, -3, 0.70, 0.77);
      model.rotation.y = getScrollValue(Math.PI/2, 0,0.70,0.77);
    }  

    else if(scrollPercent >= 0.77 && scrollPercent <= 0.8){
      model.position.x = getScrollValue(0,2.5, 0.77, 0.8);
      model.position.z = getScrollValue(-3, 8, 0.77, 0.8);
      model.rotation.y = getScrollValue(0,Math.PI/2,0.77,0.8);
      model.rotation.x = getScrollValue(0.5, 0.4, 0.77, 0.8);
      model.position.y = getScrollValue(-1,-2,0.77,0.8);
    }  

    else if(scrollPercent >= 0.86 && scrollPercent <= 0.91){
      model.position.x = getScrollValue(2.5, 0, 0.86, 0.91);
      model.position.z = getScrollValue(8, -3, 0.86, 0.91);
      model.rotation.y = getScrollValue(Math.PI/2, 0,0.86,0.91);
      model.rotation.x = getScrollValue(0.4, Math.PI/18, 0.86, 0.91);
    }

    else if(scrollPercent >= 0.91 && scrollPercent <= 0.95){
      model.position.x = getScrollValue(0,-5.7, 0.91, 0.95);
      model.position.z = getScrollValue(-3,4, 0.91, 0.95);
      model.rotation.y = getScrollValue(0,Math.PI/3,0.91,0.95);
      model.rotation.x = getScrollValue(Math.PI/18,0.6,0.91, 0.95);
      model.position.y = getScrollValue(-2,0.7,0.91,0.95);
    }

  }

  renderer.render(scene, camera);
}

// スクロールイベント
window.addEventListener("scroll", () => {
  scrollPercent =
    window.scrollY / (document.body.scrollHeight - window.innerHeight);
});

// ウィンドウリサイズ対応
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
