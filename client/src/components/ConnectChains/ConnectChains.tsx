import useChain from "hooks/useChain";
import { Button } from "antd";
import { PolygonLogo } from "./Logos";
import { useMoralis } from "react-moralis";

const styles = {
  item: {
    display: "flex",
    alignItems: "center",
    height: "42px",
    fontWeight: 500,
    fontFamily: "Roboto, sans-serif",
    fontSize: "14px",
    padding: "0 10px",
  },
  button: {
    border: "2px solid rgb(231, 234, 243)",
    borderRadius: "12px",
  },
} as const;

const menuItems = {
  main: {
    key: "0x89",
    value: "Polygon",
    icon: <PolygonLogo />,
  },
  test: {
    key: "0x13881",
    value: "Mumbai",
    icon: <PolygonLogo />,
  },
};

const ConnectChains = () => {
  const { switchNetwork } = useChain();
  const { isWeb3EnableLoading } = useMoralis();

  const handleMenuClick = (e: any) => {
    console.log("switch to: ", e.key);
    switchNetwork(e.key);
  };

  return (
    <div>
      <Button
        type="primary"
        size="large"
        loading={isWeb3EnableLoading}
        disabled={isWeb3EnableLoading}
        style={{ fontWeight: "bold", borderRadius: "10px" }}
        onClick={() => {
          handleMenuClick(menuItems.test);
        }}
      >
        Connect Wallet
      </Button>
    </div>
  );
};

const ConnectedIcon = () => {
  const selected = menuItems.test;
  return (
    <Button
      key={selected?.key}
      icon={selected?.icon}
      style={{ ...styles.button, ...styles.item }}
    >
      <span style={{ marginLeft: "5px" }}>{selected?.value}</span>
    </Button>
  );
};

export default ConnectChains;
export { ConnectedIcon };
