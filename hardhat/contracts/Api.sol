//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract APIConsumer is ChainlinkClient {
    using Chainlink for Chainlink.Request;
    string public volume;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    mapping(string => address) public players;

    constructor() {
        setPublicChainlinkToken();
        oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
        jobId = "7401f318127148a894c00c292e486ffd";

        // init the players
        players["Kings"] = 0xA60CF19C2152a84952747648a1C8b2623016c10d;
        players["Pirates"] = 0x5365222f776dFA3e2E22ad1c401B93b8732d186f;

        fee = 0.1 * 10**18; // (Varies by network and job)
    }

    function fetch(uint256 league_id) external returns (bytes32 requestId) {
        Chainlink.Request memory request = buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
        string memory _baseURL = "https://fplchainlink.herokuapp.com/data?id=";
        // uint league_id = 2351845;
        string memory _url = string(
            abi.encodePacked(_baseURL, Strings.toString(league_id))
        );
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
            payable(players[winner]).transfer(0.001 ether);
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
}
