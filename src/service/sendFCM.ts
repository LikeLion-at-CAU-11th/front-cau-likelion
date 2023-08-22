import { ServiceAccount } from 'firebase-admin';
import admin from 'firebase-admin';
import dotenv from 'dotenv';
import { FCMTokenDAO } from '../DAO/FCMTokenDAO';
interface NotificationData {
  data: {
    title: string;
    body: string;
    image: string;
    click_action: string;
  };
}

export const sendFCMNotification = async (data: NotificationData) => {
  dotenv.config();
  // Firebase Admin SDK 초기화
  const serviceAccount: ServiceAccount = {
    // 얘는 기존 파이어베이스 api 키
    projectId: process.env.PROJECT_ID,
    // 얘네는 새로 구해온 서비스 계정 비공개 키
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  // 토큰 불러오기
  // 앞서 푸시 권한과 함께 발급받아 저장해둔 토큰들을 모조리 불러온다.
  // 본인에게 익숙한 방법으로 저장하고 불러오면 된다.
  // 내 경우 firestore에 저장하고 불러오도록 했다.
  const tokens = await FCMTokenDAO.Repo.find();
  let tokenList: Array<string> = tokens.map((token) => token.token);
  if (tokenList.length === 0) return;

  // 푸시 데이터
  // api 호출할 때 받아올 데이터와 방금 불러온 토큰
  const notificationData = {
    ...data,
    tokens: tokenList,
  };

  // 푸시 발송
  // sendMulticast()는 여러개의 토큰으로 푸시를 전송한다.
  // 외에도 단일 토큰에 발송하는 등의 다양한 메소드 존재
  const res = await admin.messaging().sendMulticast(notificationData);

  return res;
};
