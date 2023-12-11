import Tanaman from "../models/Tanaman.model.js";

class TanamanController {
  static create = async (req, res) => {
    try {
      const { nama_tanaman, nama_latin, gambar } = req.body;

      const tanaman = await Tanaman.create({
        nama_tanaman,
        nama_latin,
        gambar,
      });

      return res.status(201).json({
        status: 201,
        success: true,
        message: "Berhasil Membuat Tanaman!",
        data: {
          tanaman,
        },
        error: null,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "internal server error",
        data: null,
        error: "Internal Server Error",
      });
    }
  };

  static all = async (req, res) => {
    try {
      const tanamans = await Tanaman.findAll();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "ok",
        data: {
          tanamans,
        },
        error: null,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "internal server error",
        data: null,
        error: "Internal Server Error",
      });
    }
  };

  static find = async (req, res) => {
    try {
      const { id } = req.params;
      const tanaman = await Tanaman.findOne({
        where: {
          id: id,
        },
      });

      if (!tanaman) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "tanaman not found",
          data: null,
          error: "Tanaman Not Found",
        });
      }

      return res.status(200).json({
        status: 200,
        success: true,
        message: "ok",
        data: {
          tanaman,
        },
        error: null,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "internal server error",
        data: null,
        error: "Internal Server Error",
      });
    }
  };

  static update = async (req, res) => {
    try {
      const { id } = req.params;

      const updated = await Tanaman.update(req.body, {
        where: {
          id: id,
        },
      });

      if (!updated[0]) {
        return res.status(200).json({
          status: 200,
          success: false,
          message: "failed to update tanaman",
          data: null,
          error: "Failed To Update Tanaman",
        });
      }

      return res.status(200).json({
        status: 200,
        success: true,
        message: "Tanaman Berhasil DiUpdate!",
        data: null,
        error: null,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "internal server error",
        data: null,
        error: "Internal Server Error",
      });
    }
  };

  static destroy = async (req, res) => {
    try {
      const { id } = req.params;

      const destroyed = await Tanaman.destroy({
        where: {
          id: id,
        },
      });

      if (!destroyed) {
        return res.status(200).json({
          status: 200,
          success: false,
          message: "failed to delete tanaman",
          data: null,
          error: "Failed To Delete Tanaman",
        });
      }

      return res.status(200).json({
        status: 200,
        success: true,
        message: "Sukses Menghapus Tanaman!",
        data: null,
        error: null,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "internal server error",
        data: null,
        error: "Internal Server Error",
      });
    }
  };
}

export default TanamanController;
