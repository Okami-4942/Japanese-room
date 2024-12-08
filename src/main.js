import "./style.css";
import * as THREE from "three";

// cansavsの取得
const canvas = document.querySelector("#canvas");

// サイズの取得
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// シーンの作成
const scene = new THREE.Scene();

// GridHelperの作成 (必要なければコメントアウト)
var size = 100; // グリッドのサイズ
var step = 1; // グリッドの間隔
const gridHelper = new THREE.GridHelper(size, step);
// シーンに追加
scene.add(gridHelper);

// カメラの作成
const camera = new THREE.PerspectiveCamera(
  75, // 視野角
  sizes.width / sizes.height, // アスペクト比
  0.1, // カメラの最小表示距離
  1000 // カメラの最大表示距離
);
// カメラの位置(高さ)を設定
camera.position.z = 3;
// カメラをシーンに追加
scene.add(camera);

// レンダラーの作成
const renderer = new THREE.WebGLRenderer({
  antialias: true, //tureにすると、線が滑らかになるが、重くなるので注意
  canvas: canvas,
});
// レンダラーのサイズを設定
renderer.setSize(sizes.width, sizes.height);
// レンダラーの解像度を設定
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//オブジェクトの追加　ここから書いていく ※この段階ではまだ何も表示されてない！！
