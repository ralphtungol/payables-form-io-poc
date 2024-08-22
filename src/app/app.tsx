import { BrowserRouter } from "react-router-dom";
import { AnalyticsInstance } from "analytics";
import { useKubraTracking } from "kubra-ui-lib-mfe";
import { AppRoutes } from "./routes";
import { AxiosWrapper } from "components";

export interface AppProps {
  basePath?: string;
  analytics?: AnalyticsInstance;
}

export const App = ({ analytics, basePath }: AppProps) => {
  const { Track } = useKubraTracking({
    commonTrackingData: { mfe: "payables-form-io-poc" },
    analytics,
  });

  return (
    <Track>
      <AxiosWrapper>
        <BrowserRouter basename={basePath}>
          <AppRoutes />
        </BrowserRouter>
      </AxiosWrapper>
    </Track>
  );
};
