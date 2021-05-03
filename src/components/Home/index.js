import React, { useState, useContext } from "react"
import { Layout, Menu, Divider } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Switch, Route, Redirect, Link, useLocation } from "react-router-dom";
import { LanguageContext } from "../../context";
import ChangeLanguage from "../../ChangeLanguage";
import logo from "../../assets/image/logo.png"
import NotFound from "../../notFount";
import Logout from "../Auth/logout";
import Dashboard from "../Dashboard";


export default function Home() {
    const location = useLocation()
    const [collapsed, setCollapsed] = useState(false);
    const { Header, Content, Sider } = Layout;
    const { language } = useContext(LanguageContext);
    const onCollapse = () => {
        setCollapsed(!collapsed);
    };

    return <Layout style={{ minHeight: '100vh' }} className="select-none">
        <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={() => { onCollapse() }} theme="light">
            <div className="mx-4 my-1 mt-3 flex justify-evenly items-center" ><img className="max-h-10" src={logo} alt="logo" /> <span hidden={collapsed} className="text-blue-500 font-extrabold">Root-Demo </span></div>
            <Divider style={{ margin: 0, padding: 0, backgroundColor: "white", marginBottom: 15 }} dashed />
            <Menu defaultSelectedKeys={[location.pathname.substr(4)]} mode="inline">
                <Menu.Item key="dashboard" icon={<PieChartOutlined />}>
                    <Link to="dashboard">  {language === "eng"
                        ? "Dashboard"
                        : "Хянах самбар"}</Link>
                </Menu.Item>

                <Menu.Item key="ex1" icon={<UserOutlined />}>
                    <Link to="ex1">   {language === "eng"
                        ? "Example"
                        : "Жишээ"}</Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Layout className="site-layout">
            <Header className="bg-white flex justify-between items-center" style={{ padding: 0 }}>
                <div className="w-8 mx-5">{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: onCollapse,
                })}</div>
                <div className="flex items-center mr-10">
                    <ChangeLanguage />
                    <Logout />
                </div>
            </Header>
            <Content className="mx-5 py-10">

                <div className="min-h-lg flex items-center justify-center">
                    <Switch>
                        <Route
                            path={language === "eng" ? "/en" : "/mn"}
                            exact
                            render={() => (
                                <Redirect
                                    to={language === "eng" ? "/en/dashboard" : "/mn/dashboard"}
                                />
                            )}
                        />
                        <Route
                            exact
                            path={language === "eng" ? "/en/dashboard" : "/mn/dashboard"}
                            component={Dashboard}
                        />

                        <Route component={NotFound} />
                    </Switch>

                </div>
            </Content>
        </Layout>
    </Layout>;
}