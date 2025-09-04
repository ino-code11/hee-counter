// Firestoreを使う場合は、Firebaseの設定をここに貼る
// （前にFirebaseからコピーした「const firebaseConfig = { ... }」のやつ）
    const firebaseConfig = {
      apiKey: "AIzaSyAr8etX574HAPKISDxjGNFru_WrFcNthHo",
      authDomain: "hee-counter-1.firebaseapp.com",
      projectId: "hee-counter-1",
      storageBucket: "hee-counter-1.firebasestorage.app",
      messagingSenderId: "487272221928",
      appId: "1:487272221928:web:48f40b93de7acbb8800d5d"
    };

// 初期化（前に案内したfirebase.initializeApp(firebaseConfig); が必要）
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const btn = document.getElementById("heyBtn");
const countDiv = document.getElementById("count");

// Firestoreのドキュメント参照
const counterRef = db.collection("counter").doc("main");

// 音声ファイルのURL（任意の効果音に差し替え可）
const audioUrl = 'https://www.myinstants.com/media/sounds/hee-62617.mp3';
const audio = new Audio(audioUrl);

// 初期読み込み & リアルタイム更新
counterRef.onSnapshot((doc) => {
  if (doc.exists) {
    countDiv.textContent = doc.data().value;
  } else {
    counterRef.set({ value: 0 });
  }
});

// ボタン押したときの処理
btn.addEventListener("click", () => {
  // ① 音を再生
  audio.play();

  // ② Firestoreのカウントを増やす
  counterRef.update({
    value: firebase.firestore.FieldValue.increment(1)
  });
});
