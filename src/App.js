import { useContext } from "react";
import './index.css';
import './App.less';
import { LoginContext, LanguageContext } from "./context";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import NotFound from "./notFount";
import Login from "./components/Auth/login";
import Home from "./components/Home";
import SignUp from "./components/Auth/signup";
function App() {
  const { login } = useContext(LoginContext);
  const { language } = useContext(LanguageContext);
  return (
    <Router>
      <div
        className="bg-backColor w-screen h-screen"
      >
        <Switch>
          {login !== "true" ? (
            <Route
              exact
              path={language === "eng" ? "/en" : "/mn"}
              component={Login}
            />
          ) : (
            <Route path={language === "eng" ? "/en" : "/mn"} component={Home} />
          )}
          <Route
            path="/"
            exact
            render={() => <Redirect to={language === "eng" ? "/en" : "/mn"} />}
          />
          <Route
            path={language === "eng" ? "/en/signup" : "/mn/signup"}
            component={SignUp}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
