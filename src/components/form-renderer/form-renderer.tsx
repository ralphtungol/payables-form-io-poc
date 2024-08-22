import React from "react";
import { FormGrid } from "@formio/react";
import { Card, Container } from "react-bootstrap";
import { CopyBlock, atomOneLight } from "react-code-blocks";
import { Form, FormProps } from "@formio/react";

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
      <h5>Result</h5>
      <div className="bg-light rounded-3 p-5 mb-4">
        <Form {...formProps} />
      </div>
    </Card>
  );
};

export const FormRenderer = () => {
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
  const submissionData = {
    data: {
      firstName: "Joe",
      lastName: "Smith",
      email: "joe@example.com",
    },
  };

  return (
    <>
      <h2>FormRenderer</h2>

      <Container className="pt-5">
        <div className="bg-light rounded-3 p-5 mb-4">
          <h2>
            JavaScript Powered Forms for React by
            <a
              href="https://form.io"
              target="_blank"
              rel="noreferrer"
              style={{ padding: "0 0.4rem" }}
            >
              {/* <img alt="Form.io logo" src={logo} style={{ height: "3rem", display: "inline" }} /> */}
            </a>
          </h2>
          <p>
            This library provides JavaScript powered forms for{" "}
            <a target="_blank" href="https://reactjs.org" rel="noreferrer">
              React
            </a>
            . This allows you to render the JSON schema forms produced by Form.io and render those
            within your application using React, as well as provides an interface SDK to communicate
            to the Form.io API's. The benefits of this library include.
          </p>
          <ul>
            <li>Renders a JSON schema as a webform and hooks up that form to the Form.io APIs</li>
            <li>
              Nested components, layouts, Date/Time, Select, Input Masks, and many more included
              features
            </li>
            <li>Full JavaScript API SDK library on top of Form.io</li>
          </ul>
        </div>

        <p>Pass a JSON form definition directly to the component...</p>
        <ExampleForm
          textContent={`<Form form={${JSON.stringify(formDefinition, null, 2)}} />`}
          src={formDefinition}
        />
        {/* <p>Editing forms: populate the form at runtime with submission data.</p>

        <ExampleForm
          textContent={`<Form form={${JSON.stringify(
            formDefinition,
            null,
            2,
          )}} submission={${JSON.stringify(submissionData, null, 2)}} />`}
          src={formDefinition}
          submission={submissionData}
        /> */}
      </Container>
    </>
  );
};
