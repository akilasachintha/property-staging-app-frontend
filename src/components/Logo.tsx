import LogoImage from "assets/logo.png";
import React from "react";

// https://assets.unlayer.com/stock-templates/1700683717039-logo-white.png

export default function Logo() {
    return (
        <div className="logo">
            <img src={LogoImage} alt="Logo" className="mx-auto h-20 mb-8 w-auto" />
        </div>
    )
}