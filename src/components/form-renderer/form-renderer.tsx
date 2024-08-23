import React from "react";

import { Card, Container } from "react-bootstrap";
import { CopyBlock, atomOneLight } from "react-code-blocks";
import { Form, FormProps, FormGrid, Formio } from "@formio/react";
import { order, invoice, freeform } from "__mocks__/payables-schema";
import { capitalize } from "lodash";

// form.io recognized components
//https://github.com/formio/formio.js/wiki/Components-JSON-Schema#common-parameters

// creating custom components
// https://help.form.io/developers/form-development/custom-components

export const ExampleForm = ({ textContent, ...formProps }: { textContent: string } & FormProps) => {
  return (
    <Card className="p-4 mb-4">
      <h5>Code</h5>
      <CopyBlock
        showLineNumbers={false}
        text={textContent}
        theme={atomOneLight}
        language={"jsx"}
        codeBlock={true}
      />
      <div className="spacer" />

      <Container className="pt-5">
        <h5>Result</h5>
        <div className="bg-light rounded-3 p-5 mb-4">
          <Form {...formProps} />
        </div>
      </Container>
    </Card>
  );
};

export const FormRenderer = () => {
  const [showComponent, setShowComponent] = React.useState("FormWithPayablesSchema");

  const generateFormIOComponents = (schema: any) => {
    return {
      components: [
        ...schema.formFields.map((field: any) => {
          return {
            type: field.type,
            label: field.labels["en-US"],
            key: field.name,
            input: true,
          };
        }),
        {
          type: "button",
          action: "Submit",
          label: "Submit",
          theme: "primary",
        },
      ],
    };
  };
  const formDefinitions = {
    order: generateFormIOComponents(order),
    invoice: generateFormIOComponents(invoice),
    freeform: generateFormIOComponents(freeform),
  };

  return (
    <>
      <h2>FormRenderer</h2>
      <button onClick={() => setShowComponent("ProvidedReactExample")}>
        Show ProvidedReactExample
      </button>
      <button onClick={() => setShowComponent("FormWithPayablesSchema")}>
        Show FormWithPayablesSchema
      </button>
      <button onClick={() => setShowComponent("FormWithForge")}>Show FormWithForge</button>
      {showComponent === "ProvidedReactExample" && <ProvidedReactExample />}
      {showComponent === "FormWithPayablesSchema" && (
        <FormWithPayablesSchema forms={formDefinitions} />
      )}
      {showComponent === "FormWithForge" && <FormWithForge />}
    </>
  );
};

export const ProvidedReactExample = () => {
  const formDefinition = {
    components: [
      {
        type: "textfield",
        label: "First Name",
        key: "firstName",
        input: true,
      },
      {
        type: "textfield",
        label: "Last Name",
        key: "lastName",
        input: true,
      },
      {
        type: "email",
        label: "Email",
        key: "email",
        input: true,
      },
      {
        type: "button",
        action: "Submit",
        label: "Submit",
        theme: "primary",
      },
    ],
  };

  return (
    <Container className="pt-5">
      <p>Pass a JSON form definition directly to the component...</p>
      <ExampleForm
        textContent={`<Form form={${JSON.stringify(formDefinition, null, 2)}} />`}
        src={formDefinition}
        onChange={() => console.log("The form changed!")}
        onSubmit={() => console.log("The form was submitted!")}
      />
    </Container>
  );
};

export const FormWithPayablesSchema = (forms: { [key: string]: any }) => {
  return (
    <>
      {Object.entries(forms.forms).map(([formType, formDefinition]) => (
        <Container key={formType} className="pt-5 mb-2">
          <h3>{capitalize(formType)}</h3>
          <ExampleForm
            textContent={`<Form form={${JSON.stringify(formDefinition, null, 2)}} />`}
            src={formDefinition}
            onChange={() => console.log("The form changed!")}
            onSubmit={() => alert("The form was submitted!")}
          />
        </Container>
      ))}
    </>
  );
};

export const FormWithForge = () => {
  return <></>;
};
