import React, { useContext } from "react"; // useContext
import { LanguageContext } from "./context";
import mgl from "./assets/image/mgl.svg";
import eng from "./assets/image/eng.svg";
import { useLocation } from "react-router-dom";
export default function ChangeLanguage() {
  const location = useLocation();
  const { language, setLanguage } = useContext(LanguageContext);
  return (
    <span
      onClick={() => {
        setLanguage(language === "eng" ? "mn" : "eng");
        const path = location.pathname.substring(3, location.pathname.length);
        window.location.replace(
          language === "eng" ? "/mn" + path : "/en" + path
        );
      }}
      className="cursor-pointer text-right static"
    >
      {language === "eng" ? (
        <img
          src={mgl}
          alt="mn"
          width="25px"
          className="transform  hover:scale-110"
        />
      ) : (
        <img
          src={eng}
          alt="eng"
          width="25px"
          className="transform  hover:scale-110"
        />
      )}
    </span>
  );
}
