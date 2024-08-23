import React, { createContext, PropsWithChildren, useContext, useMemo, useState } from "react";

const UseFormContext = createContext<any>(null);

const FormContextProvider = ({ children }: PropsWithChildren) => {
  const [formSubmitData, setFormSubmitData] = useState<Record<string, any>>({});

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    return JSON.stringify(formSubmitData, null, 2);
  };

  const handleOnChange = () => {};

  const value = useMemo(
    () => ({
      handleSubmit,
      formSubmitData,
      setFormSubmitData,
    }),
    [formSubmitData],
  );

  return <UseFormContext.Provider value={value}>{children}</UseFormContext.Provider>;
};

const useFormContext = () => {
  const context = useContext(UseFormContext);

  if (context === undefined) {
    throw new Error("useDocumentsContext must be used within a DocumentsContextProvider component");
  }

  return context;
};

export { FormContextProvider, useFormContext };
