import ErrorStatus from '../utils/ErrorStatus';
import jwt from 'jsonwebtoken';

export class JWTService {
  static async verify(token: string) {
    if (!token) {
      throw new ErrorStatus('JWT가 필요합니다', 401);
    }
    try {
      return jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
          throw err;
        }
        return decoded;
      });
    } catch (err) {
      throw new ErrorStatus('JWT가 유효하지 않습니다.', 401);
    }
  }

  static async refreshVerify(token) {
    const { access, refreshToken } = token;
    return jwt.verify(refreshToken, process.env.SECRET, (err, decoded) => {
      if (err) {
        throw new ErrorStatus('refresh 토큰이 만료되었습니다.', 401);
      }
      if (decoded.access == access) return decoded;
      else throw new ErrorStatus('유효하지 않은 refreshToken입니다.', 401);
    });
  }

  static async make(id) {
    const payload = { id: id };
    const secret = process.env.SECRET;
    const options = {
      expiresIn: '1m',
    };
    const accessToken = jwt.sign(payload, secret, options);
    const refreshToken = jwt.sign(
      { access: accessToken, id: id },
      process.env.SECRET,
      {
        expiresIn: '3m',
      }
    );
    return { accessToken, refreshToken };
  }
}
