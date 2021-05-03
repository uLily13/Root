import React, { useContext } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import { LanguageContext,LoginContext } from "../../context";
import { Tooltip } from "antd";
export default function Logout() {

    const { language } = useContext(LanguageContext);
    const { setLogin } = useContext(LoginContext);
    const doLogout = () => {
        window.location.replace("/");
        setLogin("false");
    };
    return (
        <span
            className=" cursor-pointer pt-1"
            onClick={() => doLogout()}
        >
            <Tooltip title={language === "eng"
                ? "Exit the system completely."
                : "Системээс гарах."}>
                <PoweroffOutlined className=" pl-3" style={{ fontSize: "17px" }} />
            </Tooltip>

        </span>
    );
}
