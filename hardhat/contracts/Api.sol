//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract APIConsumer is ChainlinkClient, ERC721 {
    using Chainlink for Chainlink.Request;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;
    string private tokenURI_str =
        "ipfs://bafyreiclzbgq6cdaau5fmspx5l54hmixb55q6kktb4zvrkzkbgby7vpjve/metadata.json";

    // FPL DAta
    string public volume;
    string public leagueCode;
    mapping(string => address) public players;
    uint256 public playerCount;
    uint256 public price;

    constructor(
        string memory _name,
        string memory _code,
        uint256 _price
    ) ERC721(_name, _name) {
        setPublicChainlinkToken();
        oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
        jobId = "7401f318127148a894c00c292e486ffd";

        fee = 0.1 * 10**18; // (Varies by network and job)
        leagueCode = _code;
        price = _price;
    }

    function join(string memory name) public payable {
        require(msg.value >= price, "ETH Price was less");
        players[name] = msg.sender;
        playerCount += 1;
        _safeMint(msg.sender, playerCount);
    }

    function fetch() external returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        // TODO: Fix this
        // use of proxy server as the fpl api not working
        // string memory _baseURL = "https://fplchainlink.herokuapp.com/data?id=";
        // string memory _baseURL = "https://fantasy.premierleague.com/api/leagues-classic/";
        string memory _baseURL = "https://fplchainlink.herokuapp.com/data?id=";
        string memory _url = string(abi.encodePacked(_baseURL, leagueCode));
        request.add("get", _url);
        request.add("path", "standings.results.0.entry_name");
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, bytes32 _res)
        public
        recordChainlinkFulfillment(_requestId)
    {
        string memory winner = bytes32ToString(_res);

        // award winner
        if (players[winner] != address(0)) {
            // TODO: make the amt distributable
            // payable(players[winner]).transfer(0.001 ether);
            payable(players[winner]).transfer(price);
        }
    }

    function bytes32ToString(bytes32 _bytes32)
        public
        pure
        returns (string memory)
    {
        uint8 i = 0;
        while (i < 32 && _bytes32[i] != 0) {
            i++;
        }
        bytes memory bytesArray = new bytes(i);
        for (i = 0; i < 32 && _bytes32[i] != 0; i++) {
            bytesArray[i] = _bytes32[i];
        }
        return string(bytesArray);
    }

    function getFunding() public payable returns (bool) {
        return true;
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return tokenURI_str;
    }
}
