import React from "react";
import "./Header.css";

const Header = ({ appTitle = "Community Mangrove Watch" }) => {
  return (
    <header className="header">
      {/* App Title / Logo */}
      <div className="header-left">
        <span className="app-logo">🌿</span>
        <h1 className="app-title">{appTitle}</h1>
      </div>
    </header>
  );
};

export default Header;
