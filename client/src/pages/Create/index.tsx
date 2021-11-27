import { Input } from "antd";
import { Button } from "antd";
import {
  UserOutlined,
  DollarOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

import { AbiItem } from "web3-utils";
import { FPL, FPL_ARRDRS } from "abis/FPL";
import { Contract } from "web3-eth-contract";
import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";

import { notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";

import { useHistory } from "react-router-dom";

const Gap = () => <div style={{ height: "2vh" }} />;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [leagueName, setLeagueName] = useState("");
  const [leagueCode, setLeagueCode] = useState("");
  const [leagueFee, setLeagueFee] = useState("");
  const [contract, setContract] = useState<Contract>();
  const { web3 }: any = useMoralis();
  const context = useMoralisDapp();
  let history = useHistory();

  const handleSumbmmit = async () => {
    setIsLoading(true);
    await contract?.methods
      .createNew(leagueName, leagueCode, parseInt(leagueFee) * Math.pow(10, 18))
      .send({ from: context.walletAddress });
    openNotification();
    setIsLoading(false);

    setTimeout(() => {
      history.push("/join");
    }, 1000);
  };

  useEffect(() => {
    const fpl_abi = FPL as AbiItem[];
    const contract_instance = new web3.eth.Contract(fpl_abi, FPL_ARRDRS);
    setContract(contract_instance);
    console.log(contract_instance.methods);
    console.log(context);
  }, []);

  const openNotification = () => {
    notification.open({
      message: "Transaction Completed",
      description: "League successfully created",
      icon: <SmileOutlined style={{ color: "green" }} />,
    });
  };

  return (
    <div style={{ minHeight: "90vh", textAlign: "center" }}>
      <div
        style={{
          // backgroundColor: "#b8b8b8",
          width: "50%",
          padding: "40px 10px",
          margin: "0 auto",
          marginTop: "5vh",
          borderRadius: "10px",
          border: "1px solid #b8b8b8",
        }}
      >
        <h1 style={{ fontSize: "2em" }}>Create Classical League</h1>
        <br />
        <div style={{ width: "60%", margin: "2px auto" }}>
          <Input
            size="large"
            placeholder="League Name"
            prefix={<UserOutlined />}
            onChange={(e: any) => {
              setLeagueName(e.target.value);
            }}
          />
          <Gap />
          <Input
            size="large"
            placeholder="League Code from FPL, exact match required"
            prefix={<QrcodeOutlined />}
            onChange={(e: any) => {
              setLeagueCode(e.target.value);
            }}
          />
          <Gap />
          <Input
            size="large"
            placeholder="Joining Fee in Eth"
            prefix={<DollarOutlined />}
            onChange={(e: any) => {
              setLeagueFee(e.target.value);
            }}
          />
          <Gap />
          <Gap />
          <Button
            type="primary"
            size="large"
            loading={isLoading}
            style={{
              borderRadius: "6px",
              width: "100px",
              fontWeight: "bold",
            }}
            onClick={handleSumbmmit}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
