import { ReactElement } from "react";
import { Toaster } from "./ui/sonner";

type Props = {
  children?: JSX.Element | JSX.Element[] | string;
};

export const RootLayout = ({ children }: Props): ReactElement => {
  return (
    <div className="p-4">
      <div className="flex flex-row items-center justify-between">
        <div className="text-xl font-bold">Test POC</div>
      </div>
      {children}
      <Toaster />
    </div>
  );
};
