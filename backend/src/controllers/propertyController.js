import { Property } from "../models/propertyModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";
import imagekit from "../utils/imagekitio.js";

const getProperties = async (req, res) => {
  try {
    const features = new APIFeatures(Property.find(), req.query)
      .filter()
      .search()
      .pagination();

    const allProperties = await Property.find();

    const doc = await features.query;

    res.status(200).json({
      status: "Success",
      no_of_response: doc.length,
      all_properties: allProperties.length,
      data: doc,
    });
  } catch (error) {
    console.error("Error searching properties ", error);
    res.status(500).json({ status: "Failed", error: "Internal server error" });
  }
};

const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    res.status(200).json({ status: "Success", data: property });
  } catch (error) {
    res.status(404).json({ status: "fail", message: error.message });
  }
};

const createProperty = async (req, res) => {
  try {
    const {
      propertyName,
      description,
      propertyType,
      roomType,
      extraInfo,
      images,
      amenities,
      address,
      checkIn,
      checkOut,
      maximumGuest,
      price,
    } = req.body;

    const uploadImages = [];

    for (const image of images) {
      const result = await imagekit.upload({
        file: image.url,
        fileName: `property_${Date.now()}.jpg`,
        folder: `property_images`,
      });

      uploadImages, push({ url: result.url, public_id: result.fileId });
    }

    const property = await Property.create({
      propertyName,
      description,
      propertyType,
      roomType,
      extraInfo,
      images: uploadImages,
      amenities,
      address,
      checkIn,
      checkOut,
      maximumGuest,
      price,
      userId: req.user.id,
    });

    res.status(200).json({ status: "Success", data: { data: property } });
  } catch (error) {
    console.error("Error creating Property", error);
    res.status(400).json({ message: "fail", error: "Internal server Error" });
  }
};

const getUserProperty = async (req, res) => {
  try {
    const userId = req.user._id;
    const property = await Property.find({ userId });

    res.status(200).json({ success: true, data: property });
  } catch (error) {
    res.status(404).json({ success: "false", message: error.message });
  }
};

export { getProperties, getProperty, createProperty, getUserProperty };
