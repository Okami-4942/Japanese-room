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
  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // GLTFモデルの読み込み
  const loader = new GLTFLoader();
  loader.load("/myroom.glb", function (gltf) {
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
    if(scrollPercent >= 0.04 && scrollPercent <= 0.08){
    model.rotation.x = getScrollValue(Math.PI / 18, 0, 0.04, 0.08);
    model.rotation.y = getScrollValue(Math.PI / 4, Math.PI , 0.04, 0.075);
    model.position.x = getScrollValue(0, -5, 0.04, 0.075);
    model.position.z = getScrollValue(0, -3, 0.04, 0.075);
    }
    else if(scrollPercent >= 0.09 && scrollPercent <= 0.16){
    model.position.x = getScrollValue(-5,8.5 , 0.09, 0.12);
    model.rotation.y = getScrollValue(Math.PI, 0,0.09,0.12);
    model.position.z = getScrollValue(-3, -4, 0.09, 0.12);
    model.rotation.x = getScrollValue(0, 0.3, 0.09, 0.12);
    
    }

    else if(scrollPercent >= 0.2 && scrollPercent <= 0.25){
      model.position.x = getScrollValue(8.5, -6, 0.2, 0.25);
      model.rotation.y = getScrollValue(0, Math.PI,0.2,0.25);
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
