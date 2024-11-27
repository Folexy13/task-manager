import { Model, DataTypes } from "sequelize";
import sequelize from "../Config/db.config"; // Adjust path to your DB connection

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string | null;
  public due_date!: Date;
  public status!: string;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "Pending",
    },
  },
  {
    sequelize,
    modelName: "Task",
  }
);

export default Task;
