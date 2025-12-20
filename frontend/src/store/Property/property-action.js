import { propertyAction } from "../Property/property-slice.js";
import { axiosInstance } from "../../utils/axios.js";
export const getAllProperties = () => async (dispatch, getState) => {
  try {
    dispatch(propertyAction.setRequest());
    const { searchParams } = getState().properties;
    console.log(searchParams);

    const response = await axiosInstance.get("/api/v1/rent/listing", {
      params: { ...searchParams },
    });

    if (!response) {
      throw new Error("Could not fetch any properties");
    }

    const { data } = response;
    dispatch(propertyAction.getProperties(data));
  } catch (error) {
    dispatch(propertyAction.getErrors(error.message));
  }
};
