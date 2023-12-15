const { tanamanRef } = require("../../configs/firebase");

class TanamanControllerApi {
  static getTanaman = async (req, res) => {
    try {
      const snapshot = await tanamanRef.get();
      const tanamans = [];
      snapshot.forEach((doc) => {
        tanamans.push({ id: doc.id, ...doc.data() });
      });

      // Ganti res.render dengan res.json
      res.json({
        message: "Tanaman get all successfully",
        tanamans,
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };
  static getTanamanById = async (req, res) => {
    try {
      const tanamanId = req.params.id; // Assumes ID is in a parameter named "id"

      const docSnapshot = await tanamanRef.doc(tanamanId).get();

      if (!docSnapshot.exists) {
        res
          .status(404)
          .json({ message: `Artikel with ID ${tanamanId} not found` });
        return;
      }

      const artikelData = docSnapshot.data();
      const artikel = { id: tanamanId, ...artikelData };

      res.json({ message: "Product retrieved successfully", tanamanId });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  };
}

module.exports = TanamanControllerApi;
