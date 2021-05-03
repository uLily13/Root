import React, { useState, useContext } from "react";
import { Form, Input, Button, Spin, Card } from "antd";
import { Link } from "react-router-dom";
import ChangeLanguage from "../../ChangeLanguage";
import { LanguageContext } from "../../context";
export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const { language } = useContext(LanguageContext);
    const onFinish = (values) => {
        setLoading(false);
        window.location.replace("/")
    };

    const onFinishFailed = (errorInfo) => {
        setLoading(false);
        console.log("Failed:", errorInfo);
    };

    const formItemLayout = {
        labelAlign: "left",
        size: "sm",
        labelCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 8,
            },
        },
        wrapperCol: {
            xs: {
                span: 24,
            },
            sm: {
                span: 16,
            },
        },
    };

    return (
        <div className="bg-backColor h-screen w-screen flex justify-center items-center px-2 md:px-0">
            <Card
                className="shadow-xl w-full md:w-7/12 lg:w-5/12 xl:w-3/12 "
                style={{ borderRadius: "25px" }}
            >
                <div className="w-full my-5 p-0 m-0 text-right">
                    <ChangeLanguage />
                </div>

                <Spin spinning={loading}>
                    <Form
                        {...formItemLayout}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        scrollToFirstError
                    >
                        <Form.Item
                            name="email"
                            label={language === "eng" ? "Email" : "Цахим хаяг"}
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
                                autoComplete="off"
                                style={{
                                    width: "100%",
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="password"
                            label={language === "eng" ? "Password" : "Нууц үг"}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        language === "eng"
                                            ? "Please input your password!"
                                            : "Нууц үгээ оруулна уу!",
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            label={language === "eng" ? "Confirm Password" : "Нууц үг давтах"}
                            dependencies={["password"]}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message:
                                        language === "eng"
                                            ? "Please confirm your password!"
                                            : "Нууц үгээ баталгаажуулна уу!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue("password") === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            language === "eng"
                                                ? "The two passwords that you entered do not match!"
                                                : "Таны оруулсан хоёр нууц үг таарахгүй байна!"
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <div className="text-center ">

                            <Form.Item noStyle>
                                <Button
                                    htmlType="submit"
                                    className="my-5"
                                    block
                                    onClick={() => {
                                        setLoading(true);
                                    }}
                                >
                                    {language === "eng" ? "Sign up" : "Бүртгүүлэх"}
                                </Button>
                            </Form.Item>

                            <Link to="/" className="text-gray-400 hover:text-blue-500">
                                {language === "eng" ? "Login page" : "Нэвтрэх"}
                            </Link>
                        </div>
                    </Form>
                </Spin>
            </Card>

        </div>
    );
}

