// SPDX-License-Identifier: MIT

pragma solidity 0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/*

*/
contract TaxOracle is Ownable {
    using SafeMath for uint256;

    IERC20 public tomb;
    IERC20 public wftm;
    address public pair;

    constructor(
        address _tomb,
        address _wftm,
        address _pair
    ) public {
        require(_tomb != address(0), "tomb address cannot be 0");
        require(_wftm != address(0), "wftm address cannot be 0");
        require(_pair != address(0), "pair address cannot be 0");
        tomb = IERC20(_tomb);
        wftm = IERC20(_wftm);
        pair = _pair;
    }

    function consult(address _token, uint256 _amountIn) external view returns (uint144 amountOut) {
        require(_token == address(tomb), "token needs to be tomb");
        uint256 tombBalance = tomb.balanceOf(pair);
        uint256 wftmBalance = wftm.balanceOf(pair);
        return uint144(wftmBalance.mul(_amountIn).div(tombBalance));
    }

    function getTombBalance() external view returns (uint256) {
	return tomb.balanceOf(pair);
    }

    function getWftmBalance() external view returns (uint256) {
	return wftm.balanceOf(pair);
    }

    function getPrice() external view returns (uint256) {
        uint256 tombBalance = tomb.balanceOf(pair);
        uint256 wftmBalance = wftm.balanceOf(pair);
        return wftmBalance.mul(1e18).div(tombBalance);
    }


    function setTomb(address _tomb) external onlyOwner {
        require(_tomb != address(0), "tomb address cannot be 0");
        tomb = IERC20(_tomb);
    }

    function setWftm(address _wftm) external onlyOwner {
        require(_wftm != address(0), "wftm address cannot be 0");
        wftm = IERC20(_wftm);
    }

    function setPair(address _pair) external onlyOwner {
        require(_pair != address(0), "pair address cannot be 0");
        pair = _pair;
    }
}