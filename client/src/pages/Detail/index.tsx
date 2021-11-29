import { useMoralisDapp } from "providers/MoralisDappProvider/MoralisDappProvider";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { useParams } from "react-router-dom";
import { Contract } from "web3-eth-contract";
import { AbiItem } from "web3-utils";
import { API } from "abis/API";
import { Typography, Button, Spin, Input } from "antd";
import Web3 from "web3";
import { Alert } from "antd";

import QrcodeOutlined from "@ant-design/icons/lib/icons/QrcodeOutlined";

const { Title, Paragraph } = Typography;

interface RouteParams {
  token_id: string;
}

const App = () => {
  const context = useMoralisDapp();
  const { token_id } = useParams<RouteParams>();
  const { isWeb3Enabled } = useMoralis();

  const { web3 }: any = useMoralis();

  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [contract, setContract] = useState<Contract>();
  const [userCode, setUserCode] = useState("");
  const [leagueData, setLeagueData] = useState({
    totalSales: 0,
    price: "",
    name: "",
    code: "",
    userTokens: 0,
  });

  useEffect(() => {
    (async () => {
      const fpl_abi = API as AbiItem[];
      const contract_instance = new web3.eth.Contract(fpl_abi, token_id);

      const userTokens = await contract_instance.methods
        .balanceOf(context.walletAddress)
        .call();
      const totalSales = await contract_instance.methods.playerCount().call();
      const price = await contract_instance.methods.price().call();
      const name = await contract_instance.methods.name().call();
      const code = await contract_instance.methods.leagueCode().call();

      const _state = {
        totalSales: parseInt(totalSales),
        price,
        name,
        code,
        userTokens: parseInt(userTokens),
      };

      console.log("abi", _state);

      setContract(contract_instance);
      setLeagueData(_state);
      setLoading(false);
    })();
  }, []);

  const handleBuy = async () => {
    setIsFetching(true);
    await contract?.methods.join(userCode).send({
      value: leagueData.price,
      from: context.walletAddress,
    });
    window.location.reload();

    setIsFetching(false);
  };
  if (loading)
    <div>
      <Spin size="large" />
    </div>;
  return (
    <div style={{ minHeight: "90vh", textAlign: "center" }}>
      <div
        style={{
          padding: "1em",
          border: "6px solid #E7EAF3",
          width: "40%",
          margin: "35px auto",
          borderRadius: "10px",
          fontFamily: "sans-serif",
          fontSize: "1.2em",
        }}
      >
        <div>
          <Title level={2}>{leagueData.name}League</Title>
        </div>
        <div>
          {" "}
          <Paragraph copyable>{token_id}</Paragraph>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div>
            <Title level={5}>
              Fee: {Web3.utils.fromWei(leagueData.price)} Eth
            </Title>
          </div>
          <div style={{ marginLeft: "14px" }}>
            <Title level={5}>Code: {leagueData.code}</Title>
          </div>
          <div style={{ marginLeft: "14px" }}>
            <Title level={5}>Total members: {leagueData.totalSales}</Title>
          </div>
        </div>

        {leagueData.userTokens === 0 ? (
          <div>
            <br />
            <Input
              style={{ width: "80%" }}
              size="large"
              placeholder="Enter your entry name"
              prefix={<QrcodeOutlined />}
              onChange={(e: any) => {
                setUserCode(e.target.value);
              }}
            />
            <br />
            <br />
            <Button
              loading={isFetching}
              type="primary"
              size="large"
              style={{ width: "100px", borderRadius: "6px" }}
              onClick={handleBuy}
            >
              Join
            </Button>
          </div>
        ) : (
          <div>
            <Alert
              style={{ width: "80%", margin: "16px auto" }}
              message="You have joined the league. Winner position will be rewared every week :D"
              type="info"
            />
            <GetMetaData addrs={token_id} />
          </div>
        )}
      </div>
    </div>
  );
};

const GetMetaData = ({ addrs }: { addrs: string }) => {
  const options = { address: addrs, token_id: "1", chain: "kovan" };
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ name: "", description: "", image: "" });
  const { Moralis }: any = useMoralis();

  useEffect(() => {
    (async () => {
      const tokenIdMetadata = await Moralis.Web3API.token.getTokenIdMetadata(
        options
      );

      const { metadata } = tokenIdMetadata;
      const metadataJson = JSON.parse(metadata);
      metadataJson.image =
        "https://ipfs.io/ipfs/" + metadataJson.image.substr(7);
      setData(metadataJson);
      setLoading(false);
    })();
  }, []);

  // if (loading) return <div></div>;

  return (
    <div style={{ marginTop: "20px" }}>
      <div>
        <br />
        <Title level={4}>
          {/* {data.name}  */}
          NFT Token
        </Title>
        <img
          src={
            "https://bafybeicmuyvvlanngyd2ojr5xbt5c3wzifs2jfw3mmf7hqhmueaykihipu.ipfs.dweb.link/nft.png"
          }
          // src={data.image}
          alt="eqW"
          style={{ width: "40%", margin: "20px auto", borderRadius: "20px" }}
        />
        <br />
        <Title level={5}>{data.description}</Title>
        <br />
      </div>
    </div>
  );
};

export default App;
