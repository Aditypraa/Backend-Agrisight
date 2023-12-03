import userModel from "../Models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  // USER REGISTRATION
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
            const saved_user = await userModel.findOne({ email: email });

            // Generate JWT Token
            const token = jwt.sign(
              { userId: saved_user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );

            res.status(201).send({
              status: "success",
              message: "Registrasi Berhasil",
              token: token,
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

  // USER LOGIN
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await userModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            // Generate JWT Token
            const token = jwt.sign(
              { userId: user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            res.send({
              status: "success",
              message: "Login Berhasil",
              token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "Email or Password is not valid",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not a Register user",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are required" });
      }
    } catch (error) {
      console.log(error);
      res.send({
        status: "failed",
        message: "Unable to login",
      });
    }
  };

  // Change Password
  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.send({
          status: "failed",
          message: "New Password and Confirm New Password doesn't match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await userModel.findByIdAndUpdate(req.user._id, {
          $set: { password: newHashPassword },
        });
        res
          .status(401)
          .send({ status: "Success", message: "Password change Succesfully" });
      }
    } else {
      res.send({
        status: "failed",
        message: "All fields are required",
      });
    }
  };

  // Logged User/User yang Login
  static loggedUser = async (req, res) => {
    res.send({ user: req.user });
  };

  // Send User Password Reset Email
  static sendUserPasswordResetEmail = async (req, res) => {
    const { email } = req.body;
    if (email) {
      const user = await userModel.findOne({ email: email });
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({ userId: user._id }, secret, {
          expiresIn: "15m",
        });
        const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
        console.log(link);
        res.send({
          status: "success",
          message: "Password reset Email sent... Please Check Your Email",
        });
      } else {
        res.send({
          status: "failed",
          message: "Email doesn't not exist",
        });
      }
    } else {
      res.send({
        status: "failed",
        message: "Email Field is required",
      });
    }
  };

  // User Password Reset
  static userPasswordReset = async (req, res) => {
    const { password, password_confirmation } = req.body;
    const { id, token } = req.params;
    const user = await userModel.findById(id);
    const new_secret = user._id + process.env.JWT_SECRET_KEY;
    try {
      jwt.verify(token, new_secret);
      if (password && password_confirmation) {
        if (password !== password_confirmation) {
          res.send({
            status: "failed",
            message: "New Password and New Password Confirmation Doesn't match",
          });
        } else {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);
          await userModel.findByIdAndUpdate(user._id, {
            $set: { password: newHashPassword },
          });
          res.send({
            status: "success",
            message: "Password reset successfully",
          });
        }
      } else {
        res.send({
          status: "failed",
          message: "All Fields are required",
        });
      }
    } catch (error) {
      res.send({
        status: "failed",
        message: "Invalid Token",
      });
    }
  };
}

export default UserController;
