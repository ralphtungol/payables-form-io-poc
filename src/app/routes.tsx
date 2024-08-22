import { Layout } from "components";
import { DocumentTitle, shells } from "kubra-ui-lib-mfe";
import { LearnMore, Welcome } from "pages";
import { PayablesMfe } from "pages/payables/payables";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "routing/routing";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to={routes.payables} replace />} />
        <Route
          path={routes.payables}
          element={
            <DocumentTitle shell={shells.ConfigHq} title="Payables">
              <PayablesMfe />
            </DocumentTitle>
          }
        />
        <Route
          path={routes.welcome}
          element={
            <DocumentTitle shell={shells.ConfigHq} title="Welcome">
              <Welcome />
            </DocumentTitle>
          }
        />
        <Route
          path={routes.learnMore}
          element={
            <DocumentTitle shell={shells.ConfigHq} title="Learn More">
              <LearnMore />
            </DocumentTitle>
          }
        />
        <Route
          path="*"
          element={
            <DocumentTitle shell={shells.ConfigHq} title="Page Not Found">
              <div>Page Not Found</div>
            </DocumentTitle>
          }
        />
      </Route>
    </Routes>
  );
};
