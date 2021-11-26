//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./Api.sol";

interface Keeper {
    function addAddrs(address _add) external;
}

contract FPL {
    struct league {
        address League;
        string Name;
    }
    mapping(address => league) public UserLeagues;
    address public keepAdd;

    function createNew() public {
        APIConsumer _api = new APIConsumer();
        address lg_add = address(_api);
        UserLeagues[msg.sender] = league(lg_add, "Farmer League");

        // keeper push
        Keeper(keepAdd).addAddrs(lg_add);
    }

    function setKeeper(address _kp) public {
        keepAdd = _kp;
    }
}
