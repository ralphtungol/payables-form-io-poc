import { FormRenderer } from "components/form-renderer/form-renderer";
import React from "react";
import { TwoColumnLayout } from "kubra-ux-forge";
import { FormBuilder } from "components/form-builder/form-builder";

export const PayablesMfe = () => {
  return (
    <>
      <h1>PayablesMfe</h1>
      <TwoColumnLayout>
        <FormBuilder />
        <FormRenderer />
      </TwoColumnLayout>
    </>
  );
};
