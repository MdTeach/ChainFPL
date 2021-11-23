// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

contract League is ERC721, ChainlinkClient {
    using Chainlink for Chainlink.Request;

    // public info
    uint256 public price;
    uint256 public tokenCounter;
    address public owner;
    mapping(string => uint256) public players;
    uint256 public volume;
    bool public called;

    // private
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    constructor() ERC721("_lname", "_ltitle") {
        // ChainLink init
        setPublicChainlinkToken();
        oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
        jobId = "d5270d1c311941d0b08bead21fea7747";
        fee = 0.1 * 10**18;

        // NFT init
        price = 0.001 ether;
        tokenCounter = 1;
    }

    function requestVolumeData() public returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );

        // request.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD");
        // request.add("path", "RAW.ETH.USD.VOLUME24HOUR");

        // Set the URL to perform the GET request on
        request.add(
            "get",
            "https://fantasy.premierleague.com/api/leagues-classic/2351845/standings/"
        );
        // request.add("path", "STANDINGS.PAGE");
        request.add("path", "standings.page");

        // request.add("path", "standings.results.0.id");

        // Multiply the result by 1000000000000000000 to remove decimals
        int256 timesAmount = 10**18;
        request.addInt("times", timesAmount);

        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }

    function fulfill(bytes32 _requestId, uint256 _volume)
        public
        recordChainlinkFulfillment(_requestId)
    {
        called = true;
        volume = _volume;
    }

    // constructor(uint _price, string memory _lname,string memory _ltitle)
    // ERC721(_lname,_ltitle){
    //     price = _price;
    // }

    function RequestJoin(string memory _playerId) public payable {
        // require(msg.value >= price, "Price low");

        // allow the player to join league
        _safeMint(msg.sender, tokenCounter);
        players[_playerId] = tokenCounter;
        tokenCounter += 1;
    }
}
