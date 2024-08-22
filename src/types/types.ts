export type PayableType = "account" | "invoice" | "order" | "freeform";

export type FormFieldType =
  | "Id"
  | "Authenticator"
  | "NonblankText"
  | "Integer"
  | "Boolean"
  | "PhoneNumber"
  | "Email"
  | "Date"
  | "Time"
  | "Address"
  | "SelectOne"
  | "SelectMany"
  | "MonetaryAmount"
  | "UsdAmount"
  | "CadAmount";
export interface FormField {
  name: string;
  labels: {
    [key: string]: string;
  };
  type: FormFieldType;
  options?: Array<{
    value: string;
    labels: {
      [key: string]: string;
    };
  }>;
}

export type Payable = {
  krn: string;
  versionDescription: string;
  clientKrn: string;
  stereotype: PayableType;
  realms: ("live" | "sandbox")[];
  pedecessorVersionKrn: string;
  labels: {
    [key: string]: string;
  };
  formFields: Array<FormField>;
  whereIsExternalIdImg?: string;
  unitPrice?: {
    currency: string;
    value: string;
  };
  maxQuantity?: number;
};
