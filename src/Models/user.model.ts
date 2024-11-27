import { Model, DataTypes } from "sequelize";
import sequelize from "../Config/db.config"; // Adjust path to your DB connection

class User extends Model {
  public id!: number;
  public full_name!: string;
  public phone!: string | null;
  public password!: Date;
  public role!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
