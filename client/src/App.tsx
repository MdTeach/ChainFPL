import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import JoinGame from "pages/Join";
import Help from "pages/Help";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

import { Menu, Layout } from "antd";

import Logo from "assets/bpl.png";

import "antd/dist/antd.css";
import "./style.css";
import Chains from "components/ConnectChains";
import { ConnectedIcon } from "components/ConnectChains/ConnectChains";
import Create from "./pages/Create";
import TokenDetail from "./pages/Detail";

const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "60px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: 600,
  },
} as const;
const App = () => {
  const {
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
    authenticate,
  } = useMoralis();

  useEffect(() => {
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) {
      enableWeb3();
    }
    console.log(isAuthenticated, isWeb3Enabled);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout>
      <Router>
        <Header
          style={{
            ...styles.header,
          }}
        >
          <div style={{ flex: 1 }}>
            <LogoBar />
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            style={{
              flex: 3,
              display: "flex",
              fontSize: "17px",
              // fontWeight: "500",
              width: "100%",
              justifyContent: "center",
            }}
            defaultSelectedKeys={["create"]}
          >
            <Menu.Item key="create">
              <NavLink to="/">🚀 Create League</NavLink>
            </Menu.Item>
            <Menu.Item key="join">
              <NavLink to="/join">🏆 Join Leagues</NavLink>
            </Menu.Item>
            <Menu.Item key="help">
              <NavLink to="/help">👋 Help</NavLink>
            </Menu.Item>
          </Menu>
          <div style={{ ...styles.headerRight, flex: "1" }}>
            {!isWeb3Enabled ? <Chains /> : <ConnectedIcon />}
          </div>
        </Header>

        <div style={{ height: "10vh" }} />

        {isWeb3Enabled ? (
          <Switch>
            <Route exact path="/">
              <Create />
            </Route>
            <Route exact path="/join">
              <JoinGame />
            </Route>
            <Route path="/detail/:token_id">
              <TokenDetail />
            </Route>
            <Route exact path="/help">
              <Help />
            </Route>
          </Switch>
        ) : (
          <h1
            style={{
              height: "100vh",
              fontSize: "3em",
              textAlign: "center",
              marginTop: "20vh",
            }}
          >
            Connect Wallet
          </h1>
        )}
      </Router>
    </Layout>
  );
};

export const LogoBar = () => (
  <div style={{ display: "flex", justifyContent: "center" }}>
    <img src={Logo} alt="Logo" />
  </div>
);

export default App;
