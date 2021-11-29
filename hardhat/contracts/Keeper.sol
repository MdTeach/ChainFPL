// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
import "@chainlink/contracts/src/v0.7/KeeperCompatible.sol";

interface Api {
    function fetch() external returns (bytes32 requestId);
}

contract Counter is KeeperCompatibleInterface {
    uint256 public immutable interval;
    uint256 public lastTimeStamp;

    address[] public leagues;

    constructor() {
        interval = 604800; //1 week
        lastTimeStamp = block.timestamp;
    }

    function checkUpkeep(
        bytes calldata /* checkData */
    )
        external
        override
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    function addAddrs(address _add) external {
        leagues.push(_add);
    }

    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        lastTimeStamp = block.timestamp;

        for (uint256 i = 0; i < leagues.length; i++) {
            address a1 = leagues[i];
            bytes32 d = Api(a1).fetch();
        }
    }
}
