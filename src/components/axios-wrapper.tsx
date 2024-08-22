import { useRequestOptions } from "hooks";
import { ReactElement } from "react";

interface AxiosWrapperProps {
  children: ReactElement;
}

export const AxiosWrapper = ({ children }: AxiosWrapperProps) => {
  useRequestOptions();

  return children;
};
