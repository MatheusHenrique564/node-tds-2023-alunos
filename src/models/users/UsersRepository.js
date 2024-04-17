import pg from "../../database/index.js";


export default class UsersRepository {
  constructor() {
    this.pg = pg;
  }

  async getUsers() {
    try {
      const users = await this.pg.query("SELECT * FROM userss");
      console.log(users);
      return users;
    } catch (error) {
      console.error('Falid to get all users ', error);
      throw error;
    }
  }

  async getUserById(id) {
    try {
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE id = $1", [id]);
      console.log(user);
      return user;
    }
    catch (error) {
      console.error('Falid to get user by id ',id , error);
      throw error;
    }
  }

  async getUserByEmail(email) {
    try {
      const user = await this.pg.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
      console.error(user);
      return user;
    }
    catch (error) {
      console.error('Falid to get user by email ',email , error);
      throw error;
    }
  }

 async createUser(user) {
    try {
      await this.pg.none("INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)", [user.id, user.name, user.email, user.password]);
    }
    catch (error) {
      console.error('Falid to create user ', error);
      throw error;
    }
  }

 async updateUser(id, name, email, password) {
    try {
      await this.pg.none("UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4", [name, email, password, id]);
    }
    catch (error) {
      console.error('Falid to update user ', error);
      throw error;
    }
  }
}
