import { AppDataSource } from '../data-source';
import { User } from '../entity/User';

export class UserDAO {
  static Repo = AppDataSource.getRepository(User);
  static async getUser(id: string) {
    return await UserDAO.Repo.findOne({
      where: {
        id: id,
      },
    });
  }
  static async signUp(
    id: string,
    pw: string,
    name: string,
    age: number,
    salt: string
  ) {
    const user = new User();
    user.id = id;
    user.pw = pw;
    user.age = age;
    user.name = name;
    user.salt = salt;
    await UserDAO.Repo.save(user);
  }
}
