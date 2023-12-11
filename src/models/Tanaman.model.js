import { DataTypes } from "sequelize";
import db from "../configs/database.config.js";

const Tanaman = db.define(
  "tanaman",
  {
    nama_tanaman: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nama_latin: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Tanaman;
