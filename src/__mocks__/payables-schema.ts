// Freeform

export const freeform: Payable = {
  krn: "krn:pybl:freeform",
  versionDescription: "initial version",
  clientKrn: "krn:...",
  stereotype: "freeform",
  realms: ["live", "sandbox"],
  pedecessorVersionKrn: "krn:pytp:no-predecessor",
  labels: {
    "en-US": "Donation",
  },
  formFields: [
    {
      name: "payableAmount",
      type: "UsdAmount",
      labels: {
        "en-US": "Amount to donate",
      },
    },
  ],
} as const;

// Invoice

import { Payable } from "types/types";

export const invoice: Payable = {
  versionDescription: "initial version",
  clientKrn: "krn:...",
  realms: ["live"],
  pedecessorVersionKrn: "krn:pytp:no-predecessor",
  krn: "krn:pybl:invoice",
  stereotype: "invoice",
  labels: {
    "en-US": "Parking Ticket",
    "fr-US": "Ticket de parking",
    "es-CA": "Multa de estacionamiento",
  },
  formFields: [
    {
      name: "ticketNum",
      labels: {
        "en-US": "Ticket #",
        "fr-CA": "...",
        "es-US": "...",
      },
      type: "Id",
    },
    {
      name: "licensePlateNum",
      labels: {
        "en-US": "License Plate",
        "fr-CA": "...",
        "es-US": "...",
      },
      type: "Authenticator",
    },
  ],
} as const;

// Order

export const order: Payable = {
  krn: "krn:pybl:order",
  versionDescription: "initial version",
  clientKrn: "krn:...",
  stereotype: "order",
  realms: ["live"],
  pedecessorVersionKrn: "krn:pytp:no-predecessor",
  whereIsExternalIdImg: "https://.../sample-invoice.pdf",
  unitPrice: { currency: "usd", value: "42.42" },
  maxQuantity: 1,
  labels: {
    "en-US": "Dog License",
  },
  formFields: [
    {
      name: "phone-number",
      labels: {
        "en-US": "Phone number",
      },
      type: "PhoneNumber",
    },
    {
      name: "Address",
      labels: {
        "en-US": "Home Address",
      },
      type: "Address",
    },
  ],
} as const;
