//SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./Api.sol";

interface Keeper {
    function addAddrs(address _add) external;
}

contract FPL {
    address _keepAdd;

    constructor(address _keepAdd) {
        keepAdd = _keepAdd;
    }

    struct league {
        address League;
        string Name;
        string Code;
        uint256 Fee;
    }
    league[] public UserLeagues;
    address public keepAdd;

    //for debuging purpose
    function createNewD() public {
        APIConsumer _api = new APIConsumer("dadda", "dadada", 0);
        address lg_add = address(_api);
        UserLeagues.push(league(lg_add, "dadda", "2351845", 0));

        // keeper push
        Keeper(keepAdd).addAddrs(lg_add);
    }

    function createNew(
        string memory league_name,
        string memory league_code,
        uint256 league_fee
    ) public {
        APIConsumer _api = new APIConsumer(
            league_name,
            league_code,
            league_fee
        );
        address lg_add = address(_api);
        UserLeagues.push(league(lg_add, league_name, league_code, league_fee));

        // keeper push
        // Keeper(0x13C506874797DB4c46A09da4303b59Fb24977b6f).addAddrs(lg_add);
        Keeper(keepAdd).addAddrs(lg_add);
    }

    function getAllLeagues() public returns (league[] memory) {
        return UserLeagues;
    }

    function setKeeper(address _kp) public {
        keepAdd = _kp;
    }
}
