import { Property } from "../models/propertyModel.js";
import { APIFeatures } from "../utils/APIFeatures.js";

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

export { getProperties, getProperty };
