import { renderWithBaseProviders, screen } from "test-utils";
import { App } from "app";

describe("App", (): void => {
  it("renders successfully", async (): Promise<void> => {
    renderWithBaseProviders(<App basePath="/" />);

    expect(await screen.findByText(/Welcome/i)).toBeInTheDocument();
  });
});
