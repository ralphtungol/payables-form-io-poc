/* eslint-disable testing-library/prefer-screen-queries */
import { act, getByText, queryByText, waitFor } from "test-utils";
import { mount, unmount } from "bootstrap";
import { appLoader } from "kubra-ui-lib-mfe";
import { abcEnergyClient } from "__mocks__/client";

describe("bootstrap", () => {
  test("mount and unmount app successfully", async () => {
    const appId = "payables-form-io-poc";
    let root: HTMLElement;

    act(() => {
      root = appLoader({ mount, appId, client: abcEnergyClient });
    });

    await waitFor(() => {
      expect(getByText(root, /Welcome/i)).toBeInTheDocument();
    });

    act(() => unmount());

    await waitFor(() => {
      expect(queryByText(root, /Welcome/i)).not.toBeInTheDocument();
    });
  });
});
