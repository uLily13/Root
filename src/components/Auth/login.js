import React, { useState, useContext } from "react";
import { LoginContext, LanguageContext } from "../../context";
import { Form, Input, Button, Checkbox, Card, Spin } from "antd";
import { Redirect, Link } from "react-router-dom";
import { LockOutlined, MailOutlined, } from "@ant-design/icons";
import Cookies from "js-cookie"
import ChangeLanguage from "../../ChangeLanguage";


export default function Login() {
    const { login, setLogin } = useContext(LoginContext);
    const { language } = useContext(LanguageContext);
    const [checkState] = useState(
        Cookies.get("rememberEmail") !== null ? true : false
    );
    const [name, setName] = useState(
        Cookies.get("rememberEmail") !== null
            ? Cookies.get("rememberEmail")
            : ""
    );
    const [loading, setLoading] = useState(false);
    const [pass, setPass] = useState("");

    const onFinish = (values) => {
        setLoading(true);
        setLogin("true")
        setLoading(false);

        if (values.remember === true) {
            Cookies.set("rememberEmail", values.email);
        } else {
            localStorage.removeItem("rememberEmail");
        }
    };

    const onFinishFailed = (errorInfo) => {
        setLoading(false);
        console.log("Failed:", errorInfo);
    };

    const { from } = {
        from: {
            pathname: language === "en" ? "/en" : "/mn",
        },
    };

    return (
        <>
            {login === "true" ? (
                <Redirect to={from} />
            ) : null}
            <div className="bg-backColor h-screen w-screen flex justify-center items-center px-2 md:px-0">
                <Card
                    className="shadow-xl w-full sm:w-96 xl:w-3/12"
                    style={{ borderRadius: "25px" }}
                >
                    <div className="w-full my-5 p-0 m-0 text-right">
                        <ChangeLanguage />
                    </div>

                    <Spin spinning={loading}>
                        <Form
                            name="basic"
                            initialValues={{
                                remember: checkState,
                                email: name,
                            }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                name="email"
                                rules={[
                                    {
                                        type: "email",
                                        message:
                                            language === "eng"
                                                ? "The mail number is incorrect!"
                                                : "Цахим хаяг буруу байна!",
                                    },
                                    {
                                        required: true,
                                        message:
                                            language === "eng"
                                                ? "Please input your mail!"
                                                : "Цахим хаягаа оруулна уу!",
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input
                                    prefix={<MailOutlined className="site-form-item-icon" />}
                                    autoComplete="off"
                                    placeholder={
                                        language === "eng" ? "Your email?" : "Таны цахим хаяг?"
                                    }
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            language === "eng"
                                                ? "Please input your password!"
                                                : "Нууц үгээ оруулна уу!",
                                    },
                                ]}
                            >
                                <Input.Password
                                    autoComplete="off"
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    placeholder={
                                        language === "eng" ? "Your password?" : "Таны нууц үг?"
                                    }
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </Form.Item>
                            <div className="grid grid-cols-2">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox className="text-gray-500">
                                        <span className="text-gray-500">
                                            {language === "eng" ? "Remember me" : "Намайг сана"}{" "}
                                        </span>
                                    </Checkbox>
                                </Form.Item>
                                <Link to="/forget" className="text-xs text-right text-rootColor">
                                    {language === "eng" ? "Forget password?" : "Нууц үг мартсан?"}
                                </Link>
                            </div>
                            <div className="text-center">

                                <Form.Item>
                                    <Button
                                        htmlType="submit"
                                        block
                                        disabled={pass === ""}
                                        className="mt-4"
                                        onClick={() => {
                                            setLoading(true);
                                        }}
                                    >
                                        {language === "eng" ? "Sign in" : "Нэвтрэх"}
                                    </Button>
                                </Form.Item>
                                <Link
                                    to={language === "eng" ? "/en/signup" : "/mn/signup"}
                                    className=" text-gray-400 hover:text-rootColor"
                                >
                                    {language === "eng" ? "Register?" : "Бүртгүүлэх"}
                                </Link>
                            </div>
                        </Form>
                    </Spin>
                </Card>
            </div>
        </>
    );
}
