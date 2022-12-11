import { initializeApp } from "firebase/app"
import type { FirebaseOptions } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig: FirebaseOptions = {
  // envファイルを読み込まないCI上で空文字やundefinedだとbuildに失敗するため、適当な文字列を入れておく
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "sample",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const firebaseApp = initializeApp(firebaseConfig)

export const db = getFirestore(firebaseApp)
