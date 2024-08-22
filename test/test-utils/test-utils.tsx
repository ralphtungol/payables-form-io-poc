import React, { ReactElement, ReactNode } from "react";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import { queries, render, RenderOptions, within } from "@testing-library/react";
import { ForgeThemeProvider } from "kubra-ux-forge";
import {
  memoryAnalyticsPlugin,
  MemoryAnalyticsStore,
  useKubraTracking,
} from "kubra-ui-lib-mfe";
import { Analytics } from "analytics";
import * as customQueries from "./custom-queries";
import { abcEnergyClient } from "../../src/__mocks__/client";
import { Client, ClientProvider } from "kubra-ui-lib-auth";

export const memoryAnalyticsStore = new MemoryAnalyticsStore();

const createTestAnalyticsInstance = (analyticsStore?: MemoryAnalyticsStore) =>
  Analytics({
    app: "payables-form-io-poc-tests",
    plugins: [
      memoryAnalyticsPlugin({ store: analyticsStore ?? memoryAnalyticsStore }),
    ],
  });

const allQueries = {
  ...queries,
  ...customQueries,
};

interface BaseWrapperProps {
  client?: Client;
  children: ReactNode;
  analyticsStore?: MemoryAnalyticsStore;
}

const BaseWrapper = ({
  client,
  children,
  analyticsStore,
}: BaseWrapperProps) => {
  const { Track } = useKubraTracking({
    commonTrackingData: { env: "dev" },
    analytics: createTestAnalyticsInstance(analyticsStore),
  });

  return (
    <Track>
      <ClientProvider client={client}>
        <ForgeThemeProvider>
          <>{children}</>
        </ForgeThemeProvider>
      </ClientProvider>
    </Track>
  );
};

interface BaseRouterWrapperProps extends BaseWrapperProps {
  initialEntries?: string[];
}

const BaseRouterWrapper = ({
  initialEntries,
  children,
  ...extraProps
}: BaseRouterWrapperProps) => {
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <BaseWrapper {...extraProps}>{children}</BaseWrapper>
    </MemoryRouter>
  );
};

interface RenderWithBaseProvidersProps
  extends Omit<RenderOptions, "queries" | "hydrate">,
    Omit<BaseWrapperProps, "children"> {}

export function renderWithBaseProviders(
  ui: React.ReactElement,
  {
    client = abcEnergyClient,
    analyticsStore,
    ...otherOptions
  }: RenderWithBaseProvidersProps = {}
) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <BaseWrapper client={client} analyticsStore={analyticsStore}>
      {children}
    </BaseWrapper>
  );

  return {
    ...render(ui, { wrapper: Wrapper, queries: allQueries, ...otherOptions }),
  };
}

interface RenderWithRouterProps
  extends Omit<RenderOptions, "queries" | "hydrate">,
    Omit<BaseRouterWrapperProps, "children"> {}

export function renderWithRouter(
  ui: React.ReactElement,
  {
    client = abcEnergyClient,
    initialEntries = ["/"],
    analyticsStore,
    ...otherOptions
  }: RenderWithRouterProps = {}
) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <BaseRouterWrapper
      initialEntries={initialEntries}
      client={client}
      analyticsStore={analyticsStore}
    >
      {children}
    </BaseRouterWrapper>
  );

  return {
    ...render(ui, { wrapper: Wrapper, queries: allQueries, ...otherOptions }),
  };
}

interface RenderWithRouterMatchProps extends RenderWithRouterProps {
  path?: string;
  route?: string;
}

export function renderWithRouterMatch(
  ui: React.ReactElement,
  {
    client = abcEnergyClient,
    path = "/",
    route = "/",
    initialEntries = [route],
    analyticsStore,
    ...extraOptions
  }: RenderWithRouterMatchProps = {}
) {
  const Wrapper = ({ children }: { children: ReactNode }) => (
    <BaseRouterWrapper
      initialEntries={initialEntries}
      client={client}
      analyticsStore={analyticsStore}
    >
      <Routes>
        <Route path={path} element={<>{children}</>} />
      </Routes>
    </BaseRouterWrapper>
  );

  return {
    ...render(ui, { wrapper: Wrapper, queries: allQueries, ...extraOptions }),
  };
}

const customScreen = within(document.body, allQueries);
const customWithin = (element: HTMLElement) => within(element, allQueries);
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries" | "hydrate">
) => render(ui, { queries: allQueries, ...options });

export * from "@testing-library/react";
export {
  customScreen as screen,
  customWithin as within,
  customRender as render,
};
