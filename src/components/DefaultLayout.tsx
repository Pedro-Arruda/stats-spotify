import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface IDefaultLayout {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: IDefaultLayout) => {
  return (
    <div className="flex gap-10 h-screen ">
      <Sidebar />
      <div className="flex-1 py-10 overflow-auto">{children}</div>
    </div>
  );
};
