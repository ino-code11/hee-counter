// Firebase SDK（index.htmlと同じく type="module" なら import を使う）
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getFirestore, doc, getDoc, updateDoc, onSnapshot, setDoc } 
  from "https://www.gstatic.com/firebasejs/10.12.4/firebase-firestore.js";

// Firebase 設定（自分のプロジェクト用に差し替えてね）
const firebaseConfig = {
  apiKey: "AIzaSyAr8etX574HAPKISDxjGNFru_WrFcNthHo",
  authDomain: "hee-counter-1.firebaseapp.com",
  projectId: "hee-counter-1",
  storageBucket: "hee-counter-1.firebasestorage.app",
  messagingSenderId: "487272221928",
  appId: "1:487272221928:web:48f40b93de7acbb8800d5d"
};

// Firebase 初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// HTML要素
const btn = document.getElementById("btn");
const countDisplay = document.getElementById("count");

// 「へー！」音を JS 内で作成
const sound = new Audio("https://ino-code11.github.io/hee-counter/hee.mp3");

// Firestore ドキュメント参照
const counterRef = doc(db, "counter", "hee");

// 初期化（まだ無ければ0を作る）
const init = async () => {
  const snap = await getDoc(counterRef);
  if (!snap.exists()) {
    await setDoc(counterRef, { count: 0 });
  }
};
init();

// ボタン押したらカウント+音再生
btn.addEventListener("click", async () => {
  const snap = await getDoc(counterRef);
  if (snap.exists()) {
    const current = snap.data().count || 0;
    await updateDoc(counterRef, { count: current + 1 });

    // 音を再生
    sound.currentTime = 0;
    sound.play();
  }
});

// リアルタイムで表示更新
onSnapshot(counterRef, (docSnap) => {
  if (docSnap.exists()) {
    countDisplay.textContent = docSnap.data().count;
  }
});

