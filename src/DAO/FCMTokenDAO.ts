import { AppDataSource } from '../data-source';
import { FCMToken } from '../entity/FCMToken';

export class FCMTokenDAO {
  static Repo = AppDataSource.getRepository(FCMToken);
  static async addToken(token: string) {
    const newToken = new FCMToken();
    newToken.token = token;
    return await FCMTokenDAO.Repo.save(newToken);
  }

  static async getAllToken() {
    return await FCMTokenDAO.Repo.find();
  }

  static async deleteToken(token: string) {
    return await FCMTokenDAO.Repo.delete({ token: token });
  }
}
