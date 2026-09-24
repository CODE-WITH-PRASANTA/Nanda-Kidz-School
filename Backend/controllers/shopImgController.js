const ShopImg = require("../models/ShopImg");
const fs = require("fs");
const path = require("path");

// =====================================================
// UPLOAD DIRECTORY
// =====================================================

const uploadDir = path.join(__dirname, "../uploads");

// =====================================================
// HELPER: DELETE IMAGE FILE
// =====================================================

const deleteImageFile = (imageUrl) => {
  try {
    if (!imageUrl || typeof imageUrl !== "string") {
      return;
    }

    // Example:
    // /uploads/shop-123.webp
    // http://localhost:5000/uploads/shop-123.webp

    let filename = imageUrl;

    if (imageUrl.includes("/uploads/")) {
      filename = imageUrl.split("/uploads/")[1];
    }

    filename = path.basename(filename);

    if (!filename) {
      return;
    }

    const filePath = path.join(
      uploadDir,
      filename
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);

      console.log(
        "SHOP IMAGE DELETED FROM STORAGE:",
        filename
      );
    }
  } catch (error) {
    console.error(
      "DELETE IMAGE FILE ERROR:",
      error
    );
  }
};

// =====================================================
// HELPER: GET PROCESSED IMAGE URL
// =====================================================

const getProcessedImage = (req) => {
  if (
    req.processedFile &&
    req.processedFile.url
  ) {
    return req.processedFile.url;
  }

  return null;
};

// =====================================================
// CREATE SHOP IMAGE
// POST /api/shop-images
// =====================================================

const createShopImg = async (req, res) => {
  try {
    const {
      title,
      price,
      discountPrice,
      rating,
    } = req.body;

    // -------------------------------------------------
    // TITLE VALIDATION
    // -------------------------------------------------

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    // -------------------------------------------------
    // PRICE VALIDATION
    // -------------------------------------------------

    if (
      price === undefined ||
      price === null ||
      price === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Price is required",
      });
    }

    const numericPrice = Number(price);

    if (
      Number.isNaN(numericPrice) ||
      numericPrice < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid price",
      });
    }

    // -------------------------------------------------
    // IMAGE VALIDATION
    // -------------------------------------------------

    const processedImage =
      getProcessedImage(req);

    if (!processedImage) {
      return res.status(400).json({
        success: false,
        message: "Shop image is required",
      });
    }

    // -------------------------------------------------
    // DISCOUNT PRICE
    // -------------------------------------------------

    let numericDiscountPrice = null;

    if (
      discountPrice !== undefined &&
      discountPrice !== null &&
      discountPrice !== ""
    ) {
      numericDiscountPrice =
        Number(discountPrice);

      if (
        Number.isNaN(
          numericDiscountPrice
        ) ||
        numericDiscountPrice < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid discount price",
        });
      }
    }

    // -------------------------------------------------
    // RATING
    // -------------------------------------------------

    let numericRating = 4;

    if (
      rating !== undefined &&
      rating !== ""
    ) {
      numericRating = Number(rating);
    }

    if (
      Number.isNaN(numericRating) ||
      numericRating < 1 ||
      numericRating > 5
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Rating must be between 1 and 5",
      });
    }

    // -------------------------------------------------
    // CREATE DOCUMENT
    // -------------------------------------------------

    const shopImg =
      await ShopImg.create({
        title: title.trim(),

        price: numericPrice,

        discountPrice:
          numericDiscountPrice,

        rating: numericRating,

        image: processedImage,
      });

    // -------------------------------------------------
    // RESPONSE
    // -------------------------------------------------

    return res.status(201).json({
      success: true,
      message:
        "Shop image created successfully",
      data: shopImg,
    });
  } catch (error) {
    console.error(
      "createShopImg error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to create shop image",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL SHOP IMAGES
// GET /api/shop-images
// =====================================================

const getShopImgs = async (
  req,
  res
) => {
  try {
    const shopImgs =
      await ShopImg.find()
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: shopImgs.length,
      data: shopImgs,
    });
  } catch (error) {
    console.error(
      "getShopImgs error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch shop images",
      error: error.message,
    });
  }
};

// =====================================================
// GET SINGLE SHOP IMAGE
// GET /api/shop-images/:id
// =====================================================

const getShopImgById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const shopImg =
      await ShopImg.findById(id);

    if (!shopImg) {
      return res.status(404).json({
        success: false,
        message:
          "Shop image not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: shopImg,
    });
  } catch (error) {
    console.error(
      "getShopImgById error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch shop image",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE SHOP IMAGE
// PUT /api/shop-images/:id
// =====================================================

const updateShopImg = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      title,
      price,
      discountPrice,
      rating,
    } = req.body;

    // -------------------------------------------------
    // FIND EXISTING ITEM
    // -------------------------------------------------

    const existingItem =
      await ShopImg.findById(id);

    if (!existingItem) {
      return res.status(404).json({
        success: false,
        message:
          "Shop image not found",
      });
    }

    // -------------------------------------------------
    // TITLE
    // -------------------------------------------------

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message:
            "Title cannot be empty",
        });
      }

      existingItem.title =
        title.trim();
    }

    // -------------------------------------------------
    // PRICE
    // -------------------------------------------------

    if (
      price !== undefined &&
      price !== ""
    ) {
      const numericPrice =
        Number(price);

      if (
        Number.isNaN(numericPrice) ||
        numericPrice < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please enter a valid price",
        });
      }

      existingItem.price =
        numericPrice;
    }

    // -------------------------------------------------
    // DISCOUNT PRICE
    // -------------------------------------------------

    if (discountPrice !== undefined) {
      if (
        discountPrice === "" ||
        discountPrice === null
      ) {
        existingItem.discountPrice =
          null;
      } else {
        const numericDiscountPrice =
          Number(discountPrice);

        if (
          Number.isNaN(
            numericDiscountPrice
          ) ||
          numericDiscountPrice < 0
        ) {
          return res.status(400).json({
            success: false,
            message:
              "Please enter a valid discount price",
          });
        }

        existingItem.discountPrice =
          numericDiscountPrice;
      }
    }

    // -------------------------------------------------
    // RATING
    // -------------------------------------------------

    if (
      rating !== undefined &&
      rating !== ""
    ) {
      const numericRating =
        Number(rating);

      if (
        Number.isNaN(numericRating) ||
        numericRating < 1 ||
        numericRating > 5
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Rating must be between 1 and 5",
        });
      }

      existingItem.rating =
        numericRating;
    }

    // -------------------------------------------------
    // NEW IMAGE
    // -------------------------------------------------

    const newImage =
      getProcessedImage(req);

    if (newImage) {
      const oldImage =
        existingItem.image;

      existingItem.image =
        newImage;

      // Save first
      const updatedItem =
        await existingItem.save();

      // Delete old image only after
      // successful database update
      if (
        oldImage &&
        oldImage !== newImage
      ) {
        deleteImageFile(oldImage);
      }

      return res.status(200).json({
        success: true,
        message:
          "Shop image updated successfully",
        data: updatedItem,
      });
    }

    // -------------------------------------------------
    // SAVE WITHOUT NEW IMAGE
    // -------------------------------------------------

    const updatedItem =
      await existingItem.save();

    return res.status(200).json({
      success: true,
      message:
        "Shop image updated successfully",
      data: updatedItem,
    });
  } catch (error) {
    console.error(
      "updateShopImg error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to update shop image",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE SHOP IMAGE
// DELETE /api/shop-images/:id
// =====================================================

const deleteShopImg = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const shopImg =
      await ShopImg.findById(id);

    if (!shopImg) {
      return res.status(404).json({
        success: false,
        message:
          "Shop image not found",
      });
    }

    // -------------------------------------------------
    // DELETE DATABASE RECORD
    // -------------------------------------------------

    await ShopImg.findByIdAndDelete(id);

    // -------------------------------------------------
    // DELETE IMAGE FILE
    // -------------------------------------------------

    if (shopImg.image) {
      deleteImageFile(
        shopImg.image
      );
    }

    return res.status(200).json({
      success: true,
      message:
        "Shop image deleted successfully",
    });
  } catch (error) {
    console.error(
      "deleteShopImg error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete shop image",
      error: error.message,
    });
  }
};

// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createShopImg,
  getShopImgs,
  getShopImgById,
  updateShopImg,
  deleteShopImg,
};