import { AddPropertyPayload } from "@/types/property";
import { IUserRegistrationRequest, RoleType } from "@/types/user";
import * as yup from "yup";

export const getSignUpValidationSchema = (
  signupState: IUserRegistrationRequest
) => {
  const schema: yup.ObjectSchema<IUserRegistrationRequest> = yup.object({
    firstName: yup
      .string()
      .required("Your first name is required")
      .typeError("Your first name is required"),
    lastName: yup
      .string()
      .required("Your last name is required")
      .typeError("Your last name is required"),
    email: yup
      .string()
      .email()
      .required("A valid email is required")
      .typeError("A valid email is required"),
    password: yup
      .string()
      .min(8)
      .required(
        "The password must be a minimum of 8 characters in length and should include at least one special character."
      )
      .typeError(
        "The password must be a minimum of 8 characters in length and should include at least one special character."
      )
      .matches(/[$&+,:;=?@#|'<>.^*()%!-]/gm),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .typeError("Phone is required")
      .matches(/^(?:\d{2}-\d{3}-\d{3}-\d{3}|\d{13})$/gm),
    roleType: yup.number().required(),
    agencyName:
      signupState.roleType == RoleType.Agency
        ? yup
            .string()
            .required("Agency name is required")
            .typeError("Agency name is required")
        : yup.string().optional(),
    agencyCity:
      signupState.roleType == RoleType.Agency
        ? yup
            .string()
            .required("Agency City is required")
            .typeError("Agency City is required")
        : yup.string().optional(),
    agencyState:
      signupState.roleType == RoleType.Agency
        ? yup
            .string()
            .required("Agency State is required.")
            .typeError("Agency State is required.")
        : yup.string().optional(),
  });

  return schema;
};

export const getPropertyAdditionValidationSchema = () => {
  const schema: yup.ObjectSchema<AddPropertyPayload> = yup.object({
    title: yup
      .string()
      .required("The property's title is required")
      .typeError("The property's title is required"),
    description: yup
      .string()
      .required("The property's description is required")
      .typeError("The property's description is required"),
    locality: yup
      .string()
      .required("The property's locality is required")
      .typeError("The property's locality is required"),
    street: yup
      .string()
      .required("The property's street is required")
      .typeError("The property's street is required"),
    propertyType: yup
      .number()
      .required("The property type is required")
      .typeError("The property type is required"),
    price: yup
      .number()
      .moreThan(
        0,
        "The property's price must be a valid number greater than zero"
      )
      .required("The property's price is required")
      .typeError(
        "The property's price is required and must be a valid number greater than zero"
      ),
    priceType: yup
      .number()
      .required("The property's price type is required")
      .typeError(
        "The property's price is required and must be a valid number greater than zero"
      ),
    numberOfBedrooms: yup
      .number()
      .moreThan(
        0,
        "Number of bedrooms must be a valid number greater than zero"
      )
      .required("Number of bedrooms is required")
      .typeError(
        "Number of bedrooms is required and must be a valid number greater than zero"
      ),
    numberOfBathrooms: yup
      .number()
      .moreThan(
        0,
        "Number of bathrooms must be a valid number greater than zero"
      )
      .required("Number of bathrooms is required")
      .typeError(
        "Number of bathrooms is required and must be a valid number greater than zero"
      ),
    numberOfToilets: yup
      .number()
      .moreThan(0, "Number of toilets must be a valid number greater than zero")
      .required("Number of toilets is required")
      .typeError(
        "Number of toilets is required and must be a valid number greater than zero"
      ),
    parkingSpace: yup
      .number()
      .moreThan(
        0,
        "Parking space value must be a valid number greater than zero"
      )
      .required("Parking space value is required")
      .typeError(
        "Parking space value is required and must be a valid number greater than zero"
      ),
    totalLandArea: yup
      .number()
      .moreThan(0, "Total land area must be a valid number greater than zero")
      .required("Total land area is required")
      .typeError(
        "Total land area is required and must be a valid number greater than zero"
      ),
    furnished: yup.boolean().optional(),
    serviced: yup.boolean().optional(),
    shared: yup.boolean().optional(),
  });

  return schema;
};
