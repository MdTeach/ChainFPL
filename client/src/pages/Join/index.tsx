import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { AbiItem } from "web3-utils";
import { FPL, FPL_ARRDRS } from "abis/FPL";
import { Contract } from "web3-eth-contract";
import LeagueItem from "./league";
import { Typography, Button, Spin } from "antd";

import Web3 from "web3";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;
const Gap = () => <div style={{ height: "2vh" }} />;

const App = () => {
  const { web3 }: any = useMoralis();

  const [loading, setLoading] = useState(true);
  const [contract, setContract] = useState<Contract>();
  const [leagueData, setLeagueData] = useState<Array<LeagueItem>>();

  useEffect(() => {
    (async () => {
      const fpl_abi = FPL as AbiItem[];
      const contract_instance = new web3.eth.Contract(fpl_abi, FPL_ARRDRS);
      setContract(contract_instance);

      const datas = await contract_instance.methods.getAllLeagues().call();
      const _leagueData = datas.map((e: any) => ({
        Code: e.Code,
        Fee: e.Fee,
        League: e.League,
        Name: e.Name,
      }));
      console.log(_leagueData);

      setLeagueData(_leagueData);
      setLoading(false);
    })();
  }, []);

  return (
    <div style={{ minHeight: "90vh", textAlign: "center" }}>
      {loading ? (
        <div>
          {" "}
          <Spin size="large" />
        </div>
      ) : (
        <div>
          {leagueData?.map((el) => (
            <div
              key={el.League}
              style={{
                padding: "1em",
                border: "4px solid gray",
                width: "40%",
                margin: "35px auto",
                borderRadius: "10px",
                fontFamily: "sans-serif",
                fontSize: "1.2em",
              }}
            >
              <div>
                <Title level={2}>{el.Name} League</Title>
              </div>
              <div>
                {" "}
                <Paragraph copyable>{el.League}</Paragraph>
              </div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <Title level={5}>Fee: {Web3.utils.fromWei(el.Fee)} Eth</Title>
                </div>
                <div style={{ marginLeft: "14px" }}>
                  <Title level={5}>Code: {el.Code}</Title>
                </div>
              </div>
              <Gap />
              <Link to={`/detail/${el.League}}`}>
                <Button
                  type="primary"
                  size="large"
                  style={{ fontWeight: "bold", borderRadius: "4px" }}
                >
                  View More
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
