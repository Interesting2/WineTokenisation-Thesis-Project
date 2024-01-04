// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./TokenIssuance.sol";

contract IncentiveMechanism is Initializable{
    WineToken public wineToken;
    mapping(address => address) public referrals;

    //uint256 public referralRate = 5; // In percentage

    event ReferralRegistered(address indexed user, address indexed referrer);
    event RewardIssued(address indexed referrer, uint256 amount);


    function initialize(WineToken _wineToken) public initializer {
        wineToken = _wineToken;
    }

    // Register referral for a new user
    function registerReferral(address referrer) external {
        require(referrals[msg.sender] == address(0), "Referral already registered");
        require(referrer != msg.sender, "Self referral is not allowed");
        referrals[msg.sender] = referrer;

        emit ReferralRegistered(msg.sender, referrer);
    }

    // Issue rewards to a referral when the refered user place a wine order
    function issueReward(address buyer, uint256 amount) external {
        address referrer = referrals[buyer];
        if (referrer != address(0)) {
            wineToken.transfer(referrer, amount);
            // uint256 reward = amount * referralRate / 100;
            // wineToken.transfer(referrer, reward);
            
            emit RewardIssued(referrer, amount);
        }
    }

    // function setReferralRate(uint256 _referralRate) external {
    //     require(_referralRate <= 100, "Invalid referral rate");
    //     referralRate = _referralRate;
    // }
}

