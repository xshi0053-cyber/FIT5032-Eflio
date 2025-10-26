// src/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// 你自己的配置（保持不变）
const firebaseConfig = {
  apiKey: 'AIzaSyBtZdU0shJoiTcVq7wFf1wYiJQ3PpTVqBw',
  authDomain: 'week7-xianhe.firebaseapp.com',
  projectId: 'week7-xianhe',
  storageBucket: 'week7-xianhe.appspot.com',
  messagingSenderId: '685503545696',
  appId: '1:685503545696:web:e1f4ea2544c1530c4f1e05'
}

const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)
setPersistence(auth, browserLocalPersistence).catch(() => {})

export const db = getFirestore(app)

// ★ 云函数 URL（用你的实际地址）
export const COUNT_BOOKS_URL =
  'https://australia-southeast1-week7-xianhe.cloudfunctions.net/countBooks'

export default app
