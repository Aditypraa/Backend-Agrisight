import userModel from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  static userRegistrasion = async (req, res) => {
    const { name, email, password, password_confirmation, tc } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "Email Sudah Digunakan" });
    } else {
      if (name && email && password && password_confirmation && tc) {
        if (password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const doc = new userModel({
              name: name,
              email: email,
              password: hashPassword,
              tc: tc,
            });
            await doc.save();
            res.status(201).send({
              status: "success",
              message: "Registrasi Berhasil",
            });
          } catch (error) {
            console.log(error);
            res.send({
              status: "failed",
              message: "Tidak Dapat Mendaftar",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "Kata sandi dan Konfirmasi kata sandi tidak cocok!",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are required" });
      }
    }
  };
}

export default UserController;
