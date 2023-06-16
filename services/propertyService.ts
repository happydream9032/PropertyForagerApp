import { axiosInstance } from "./axiosConfig";

export const _getLatestProperties = async () => {
  const response = await axiosInstance.post(
    "/api/properties/latestProperties",
    {},
    {
      validateStatus: (status) => status < 500,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};
