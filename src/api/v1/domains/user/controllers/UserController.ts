import mongoose, { Schema } from 'mongoose';

import errors from '../../../../../common/errors/error-helper';

interface User {
  _id?: string
  name?: string
  save?(): User
}

interface UserModel {
  new(property: User): User
  find(): User[]
  update(_id: User, name: User): User
  deleteOne(_id: User): User
}

class UserController {
  public database;

  public userSchema: Schema;

  constructor() {
    this.database = this.database || mongoose.connect('MONGO+SRV', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  async createUserSchema(): Promise<UserModel> {
    const database = await this.database;

    if (this.userSchema) {
      const { User } = database.models;

      return User;
    }

    this.userSchema = new database.Schema({
      name: String,
    }, {
      timestamps: true,
    });

    database.model('User', this.userSchema);

    const { User } = database.models;

    return User;
  }

  async getUSer(): Promise<User[]> {
    try {
      const User = await this.createUserSchema();

      const users = User.find();

      return users;
    } catch (error) {
      throw errors.generic.notFound();
    }
  }

  async createUSer({ name }: User): Promise<User> {
    try {
      const User = await this.createUserSchema();

      const user = new User({
        name,
      });

      return user.save();
    } catch {
      throw errors.generic.unprocessableEntity();
    }
  }

  async updateUser({ _id, name }: User): Promise<User> {
    try {
      const User = await this.createUserSchema();

      return User.update({
        _id,
      }, {
        name,
      });
    } catch {
      throw errors.generic.unprocessableEntity();
    }
  }

  async deleteUser({ _id }: User): Promise<User> {
    try {
      const User = await this.createUserSchema();

      return User.deleteOne({
        _id,
      });
    } catch {
      throw errors.generic.unprocessableEntity();
    }
  }
}

export default UserController;
