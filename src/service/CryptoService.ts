import { randomBytes, createHash } from 'crypto';
export class CryptoService {
  static getSalt(pw: string) {
    const salt = randomBytes(128).toString('base64'); //salt 생성
    const hashedPassword = createHash('sha512')
      .update(pw + salt)
      .digest('hex');
    return { hashedPassword, salt };
  }
}
