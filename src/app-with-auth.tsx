import { AuthProvider } from "kubra-ui-lib-auth";
import { App, AppProps } from "app";
import { FormContextProvider } from "hooks/use-form";

export const AppWithAuth = ({ analytics, basePath }: AppProps) => {
  return (
    <AuthProvider>
      <FormContextProvider>
        <App analytics={analytics} basePath={basePath} />
      </FormContextProvider>
    </AuthProvider>
  );
};
