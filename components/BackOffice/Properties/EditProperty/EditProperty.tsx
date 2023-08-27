import React, { FC } from "react";
import PropertyFactory from "../Factory/PropertyFactory";

interface IProps {
  propertyId: string;
}
const EditProperty: FC<IProps> = ({ propertyId }) => {
  return (
    <PropertyFactory
      key="editProperty"
      actionType="edit"
      propertyToUpdateId={propertyId}
    />
  );
};

export default EditProperty;
