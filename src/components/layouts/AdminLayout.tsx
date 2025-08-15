import React from "react";
import AdminHeader from "../AdminHeader/AdminHeader";

type Props = {
  children: React.ReactNode;
  color?:string
};

const AdminLayout = ({ children,color }: Props) => {
  return (
    <div className="bg-[#E6E6E6] min-h-screen">
      <AdminHeader color={color} />
      {children}
    </div>
  );
};

export default AdminLayout;
