import React from "react";
import Sidebar from "../../features/password/Sidebar";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        <div className="w-1/4 p-4">
          <Sidebar />
        </div>
        <div className="w-3/4 p-4">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
