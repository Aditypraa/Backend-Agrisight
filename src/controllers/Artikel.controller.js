import Artikel from "../models/Artikel.model.js";

class ArtikelController {
  static create = async (req, res) => {
    try {
      const { judul, deskripsi, tanggal, kategori, gambar } = req.body;

      const artikel = await Artikel.create({
        judul,
        deskripsi,
        tanggal,
        kategori,
        gambar,
      });

      return res.status(201).json({
        status: 201,
        success: true,
        message: "Berhasil Membuat Artikel!",
        data: {
          artikel,
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
      const artikels = await Artikel.findAll();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "ok",
        data: {
          artikels,
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
      const artikel = await Artikel.findOne({
        where: {
          id: id,
        },
      });

      if (!artikel) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "artikel not found",
          data: null,
          error: "Artikel Not Found",
        });
      }

      return res.status(200).json({
        status: 200,
        success: true,
        message: "ok",
        data: {
          artikel,
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

      const updated = await Artikel.update(req.body, {
        where: {
          id: id,
        },
      });

      if (!updated[0]) {
        return res.status(200).json({
          status: 200,
          success: false,
          message: "failed to update artikel",
          data: null,
          error: "Failed To Update Artikel",
        });
      }

      return res.status(200).json({
        status: 200,
        success: true,
        message: "Artikel Berhasil DiUpdate!",
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

      const destroyed = await Artikel.destroy({
        where: {
          id: id,
        },
      });

      if (!destroyed) {
        return res.status(200).json({
          status: 200,
          success: false,
          message: "failed to delete artikel",
          data: null,
          error: "Failed To Delete Artikel",
        });
      }

      return res.status(200).json({
        status: 200,
        success: true,
        message: "Sukses Menghapus Artikel!",
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

export default ArtikelController;
