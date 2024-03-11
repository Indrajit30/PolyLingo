import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { catalogData } from "../apis";

const { CATALOGPAGEDATA_API } = catalogData;

export const getCatalogPageData = async (categoryId) => {
	const toastId = toast.loading("Loading...");
	let result = [];
	try {
    const response = await apiConnector("POST", CATALOGPAGEDATA_API,
      {categoryId:categoryId});
    
    result = response?.data;
  } catch (error) {
    console.log("CATALOG PAGE DATA API ERROR....", error);
    toast.error(error.message);
    result = error.response?.data;
  }
	toast.dismiss(toastId);
	return result;
};
