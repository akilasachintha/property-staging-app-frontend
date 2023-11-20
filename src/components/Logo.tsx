import LogoImage from "assets/logo.png";
import React from "react";

export default function Logo() {
    return (
        <div className="logo">
            <img src={LogoImage} alt="Logo" className="mx-auto h-28 w-auto" />
        </div>
    )
}