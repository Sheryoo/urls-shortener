import { Model, DataTypes } from "sequelize";
import sequelize from "./database";

class Urls extends Model {}

Urls.init(
  {
    originalUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    visits: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "urls",
  }
);

export default Urls;
