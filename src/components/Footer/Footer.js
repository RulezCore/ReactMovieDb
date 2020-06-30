import React from "react";
import { Layout } from "antd";

// CSS
import "./Footer.scss";

const Footer = () => {
  const { Footer } = Layout;
  return (
    <Footer className="footer">
      <p>Daniel Casado &copy; 2020</p>
    </Footer>
  );
};

export default Footer;
