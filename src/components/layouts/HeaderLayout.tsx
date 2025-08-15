import React from "react";
import Header from "../Headers/Header";
import Footer from "../common/Footer";

type Props = {
  children: React.ReactNode;
  variant?: "dark" | "light";
};

const HeaderLayout = ({ children, variant }: Props) => {
  return (
    <div className="bg-[#E6E6E6]">
      <Header variant={variant} />
      <section className="min-h-screen">{children}</section>
      <Footer />
    </div>
  );
};

export default HeaderLayout;
