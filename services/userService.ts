import {
  ChangePasswordRequest,
  IUserRegistrationRequest,
  ResetPasswordRequest,
  UserProfileUpdateRequest,
} from "@/types/user";
import { axiosInstance } from "./axiosConfig";
import { UpdateAgencyRequest } from "@/types/agency";

export const _registerUser = async (payload: IUserRegistrationRequest) => {
  const response = await axiosInstance.post("/api/accounts/register", payload, {
    validateStatus: (status) => status < 500,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const _loginUser = async (email: string, password: string) => {
  const response = await axiosInstance.post(
    "/api/accounts/authenticate",
    { email, password },
    {
      validateStatus: (status) => status < 500,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const _forgetPassword = async (email: string) => {
  const response = await axiosInstance.post(
    `/api/accounts/forgetPassword/${email}`,
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

export const _resetPassword = async (payload: ResetPasswordRequest) => {
  const response = await axiosInstance.post(
    `/api/accounts/resetPassword`,
    { ...payload },
    {
      validateStatus: (status) => status < 500,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
};

export const _changePassword = async (
  payload: ChangePasswordRequest,
  authToken: string
) => {
  const response = await axiosInstance.post(
    `/api/accounts/changePassword`,
    { ...payload },
    {
      validateStatus: (status) => status < 500,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return response;
};

export const _getCurrentUser = async (authToken: string) => {
  const response = await axiosInstance.get("/api/accounts/profile", {
    validateStatus: (status) => status < 500,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response;
};

export const _updateProfile = async (
  payload: Partial<UserProfileUpdateRequest>,
  authToken: string
) => {
  const response = await axiosInstance.put(
    "/api/accounts/updateProfile",
    { ...payload },
    {
      validateStatus: (status) => status < 500,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response;
};

export const _getAgency = async (authToken: string) => {
  const response = await axiosInstance.get("/api/agencies", {
    validateStatus: (status) => status < 500,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  return response;
};

export const _updateAgency = async (
  payload: UpdateAgencyRequest,
  authToken: string
) => {
  const response = await axiosInstance.put(
    "/api/agencies/update",
    { ...payload },
    {
      validateStatus: (status) => status < 500,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  return response;
};

export const _uploadProfilePhoto = async (file: File, authToken: string) => {
  console.log("file", file);
  const formData = new FormData();
  formData.append(`file`, file, file.name);
  const response = await axiosInstance.put(
    "/api/accounts/updateProfilePhoto",
    { file },
    {
      validateStatus: (status) => status < 500,
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response;
};
