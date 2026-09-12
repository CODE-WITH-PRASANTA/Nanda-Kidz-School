const Gallery = require("../models/Gallery");

/* =========================================================
   GET ALL GALLERY ITEMS
========================================================= */

exports.getGalleries = async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search && search.trim() !== "") {
      query.title = {
        $regex: search.trim(),
        $options: "i",
      };
    }

    const galleries = await Gallery.find(query)
      .sort({
        createdAt: -1,
      });

    return res.status(200).json(galleries);
  } catch (error) {
    console.error(
      "GET GALLERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/* =========================================================
   CREATE GALLERY
========================================================= */

exports.createGallery = async (req, res) => {
  try {
    const {
      title,
      image: bodyImage,
    } = req.body;

    /* ---------------------------------------------
       Validate title
    --------------------------------------------- */

    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Gallery title is required.",
      });
    }

    /* ---------------------------------------------
       Get uploaded image
    --------------------------------------------- */

    let imagePath = "";

    if (req.processedFile) {
      imagePath = `${req.protocol}://${req.get(
        "host"
      )}${req.processedFile.path}`;
    } else if (bodyImage) {
      imagePath = bodyImage;
    } else {
      return res.status(400).json({
        success: false,
        message: "Image is required.",
      });
    }

    /* ---------------------------------------------
       Uploaded date
    --------------------------------------------- */

    const now = new Date();

    const uploadedOn =
      now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      ", " +
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    /* ---------------------------------------------
       Create gallery
    --------------------------------------------- */

    const newGallery = new Gallery({
      title: title.trim(),
      image: imagePath,
      uploadedOn,
    });

    const savedGallery =
      await newGallery.save();

    return res.status(201).json({
      success: true,
      message: "Gallery image uploaded successfully.",
      data: savedGallery,
    });
  } catch (error) {
    console.error(
      "CREATE GALLERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/* =========================================================
   UPDATE GALLERY
========================================================= */

exports.updateGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      image: bodyImage,
    } = req.body;

    /* ---------------------------------------------
       Validate title
    --------------------------------------------- */

    if (!title || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Gallery title is required.",
      });
    }

    /* ---------------------------------------------
       Find existing gallery
    --------------------------------------------- */

    const existingGallery =
      await Gallery.findById(id);

    if (!existingGallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    /* ---------------------------------------------
       Update data
    --------------------------------------------- */

    const updateData = {
      title: title.trim(),
    };

    /* ---------------------------------------------
       New uploaded image
    --------------------------------------------- */

    if (req.processedFile) {
      updateData.image = `${req.protocol}://${req.get(
        "host"
      )}${req.processedFile.path}`;
    } else if (bodyImage) {
      updateData.image = bodyImage;
    }

    /* ---------------------------------------------
       Updated date
    --------------------------------------------- */

    const now = new Date();

    updateData.uploadedOn =
      now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }) +
      ", " +
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    /* ---------------------------------------------
       Save update
    --------------------------------------------- */

    const updatedGallery =
      await Gallery.findByIdAndUpdate(
        id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    return res.status(200).json({
      success: true,
      message: "Gallery updated successfully.",
      data: updatedGallery,
    });
  } catch (error) {
    console.error(
      "UPDATE GALLERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/* =========================================================
   DELETE GALLERY
========================================================= */

exports.deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedGallery =
      await Gallery.findByIdAndDelete(id);

    if (!deletedGallery) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE GALLERY ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};