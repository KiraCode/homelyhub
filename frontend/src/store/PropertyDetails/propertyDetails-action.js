import { propertyDetailsAction } from "./propertyDetails-slice.js";
import { axiosInstance } from "../../utils/axios.js";

export const getPropertyDetails = (id) => async (dispatch) => {
  try {
    dispatch(propertyDetailsAction.setListRequest());
    const response = await axiosInstance(`/api/v1/rent/listing/${id}`);
    if (!response) {
      throw new Error("Could not fetch any property details");
    }
    const { data } = response.data;
    console.log(data, 'data');
    
    dispatch(propertyDetailsAction.getPropertyDetails(data));
  } catch (error) {
    dispatch(propertyDetailsAction).getErrors(error.response.data.error);
  }
};
