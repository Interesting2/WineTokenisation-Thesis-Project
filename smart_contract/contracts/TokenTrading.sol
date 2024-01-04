// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./TokenIssuance.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/IERC20Upgradeable.sol";


contract TokenTrading is Initializable{
    WineToken public wineToken;
    ManagementToken public managementToken;

    uint256 public wineTokenPrice;
    uint256 public managementTokenPrice;
    address public owner;
    mapping(address => uint256) public pendingRewards; // The revenue for each management token holder

    event TokenPricesUpdated(uint256 newWineTokenPrice, uint256 newManagementTokenPrice);
    event TokensBought(address indexed buyer, uint256 amount, string tokenType);
    event TokensSold(address indexed seller, uint256 amount, string tokenType);
    event WineToManagementExchanged(address indexed user, uint256 wineTokenAmount, uint256 managementTokenAmount);
    event ManagementToWineExchanged(address indexed user, uint256 managementTokenAmount, uint256 wineTokenAmount);
    event OrderPlaced(uint256 orderId, address indexed trader, bool isBuyOrder, address tokenAddress, uint256 tokenAmount, uint256 etherAmount);
    event OrderFilled(uint256 orderId, address indexed filler, uint256 amount);
    event OrderCancelled(uint256 orderId, address indexed trader);
    event RevenueDistributed(uint256 totalRevenue, uint256 revenuePerToken);
    event RewardClaimed(address indexed holder, uint256 rewardAmount);



    // Exchange between users
    // Order for token and ether exchange
    struct Order {
        address payable trader;
        bool isBuyOrder;
        IERC20Upgradeable token;
        uint256 tokenAmount;
        uint256 etherAmount;
        uint256 filled;
        bool isActive; // Whether the order is canceled
    }

    Order[] public orders;

    function initialize(WineToken _wineToken, ManagementToken _managementToken) public initializer {
        wineToken = _wineToken;
        managementToken = _managementToken;
        wineTokenPrice = 1; // Just for demonstration. initialized as 1 (wei)
        managementTokenPrice = 2;
        owner = msg.sender;
    }


    // Set the token price for wine token and management token
    function setTokenPrices(uint256 _wineTokenPrice, uint256 _managementTokenPrice) public {
        require(msg.sender == owner, "Only the owner can change token prices");
        wineTokenPrice = _wineTokenPrice;
        managementTokenPrice = _managementTokenPrice;

        emit TokenPricesUpdated(_wineTokenPrice, _managementTokenPrice);
    }

    // Buy wine token with Ether from platform storage
    function buyWineTokens(uint256 amount) public payable {
        uint256 totalPrice = amount * wineTokenPrice;
        require(msg.value >= totalPrice, "Not enough Ether provided");

        // If any excess ether value sent, the excess should be returned to user
        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }

        // wineToken.transferFrom(wineToken.owner(), msg.sender, amount * (10**wineToken.decimals()));
        // wineToken.transferFrom(wineToken.owner(), msg.sender, amount);
        // wineToken.transfer(msg.sender, amount * (10**managementToken.decimals()));
        wineToken.transfer(msg.sender, amount);

        emit TokensBought(msg.sender, amount, "WineUtilityToken");
    }

    // Buy management token with Ether from the platform storage
    function buyManagementTokens(uint256 amount) public payable {
        uint256 totalPrice = amount * managementTokenPrice;
        require(msg.value >= totalPrice, "Not enough Ether provided");

        // If any excess ether value sent, the excess should be returned to user
        if (msg.value > totalPrice) {
            payable(msg.sender).transfer(msg.value - totalPrice);
        }

        // managementToken.transfer(msg.sender, amount * (10**managementToken.decimals()));
        managementToken.transfer(msg.sender, amount);
        // managementToken.transferFrom(managementToken.owner(), msg.sender, amount * (10**managementToken.decimals()));
        //  managementToken.transferFrom(managementToken.owner(), msg.sender, amount);

        emit TokensBought(msg.sender, amount, "WineManagementToken");
    }

    // Sell wine token with Ether to the platform
    function sellWineTokens(uint256 amount) public {
        require(wineToken.balanceOf(msg.sender) >= amount, "Not enough WineTokens to sell");
        // wineToken.approve(address(this), amount * (10**wineToken.decimals()));// This should be done by user
        
        uint256 totalPrice = amount * wineTokenPrice;
        // wineToken.transferFrom(msg.sender, wineToken.owner(), amount * (10**wineToken.decimals()));
        // wineToken.transferFrom(msg.sender, wineToken.owner(), amount);
        wineToken.transferFrom(msg.sender, address(this), amount );
        payable(msg.sender).transfer(totalPrice);

        emit TokensSold(msg.sender, amount, "WineUtilityToken");
    }

    // Sell management token with Ether to the platform
    function sellManagementTokens(uint256 amount) public {
        require(managementToken.balanceOf(msg.sender) >= amount, "Not enough ManagementTokens to sell");
        // managementToken.approve(address(this), amount * (10**managementToken.decimals()));// This should be done by user

        uint256 totalPrice = amount * managementTokenPrice;
        // managementToken.transferFrom(msg.sender, managementToken.owner(), amount * (10**managementToken.decimals()));
        // managementToken.transferFrom(msg.sender, managementToken.owner(), amount);
        managementToken.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(totalPrice);

        emit TokensSold(msg.sender, amount, "WineManagementToken");
    }

    // Exchange Wine Tokens to Management Tokens in the platform storage
    function exchangeWineToManagement(uint256 wineTokenAmount) public {
        // require(wineToken.balanceOf(msg.sender) >= wineTokenAmount * (10**wineToken.decimals()), "Not enough WineTokens for exchange");
        require(wineToken.balanceOf(msg.sender) >= wineTokenAmount, "Not enough WineTokens for exchange");
        // wineToken.approve(address(this), wineTokenAmount * (10**wineToken.decimals()));//This should be done by user
        
        // uint256 managementTokenExchange = wineTokenAmount* (10**wineToken.decimals()) * wineTokenPrice / managementTokenPrice;
        uint256 managementTokenExchange = wineTokenAmount * wineTokenPrice / managementTokenPrice;
        // wineToken.transferFrom(msg.sender, address(this), wineTokenAmount* (10**wineToken.decimals()));
        wineToken.transferFrom(msg.sender, address(this), wineTokenAmount);
        managementToken.transfer(msg.sender, managementTokenExchange);
        // managementToken.transferFrom(managementToken.owner(), msg.sender, managementTokenExchange);

        emit WineToManagementExchanged(msg.sender, wineTokenAmount, managementTokenExchange);
    }

    // Exchange Management Tokens to Wine Tokens in the platform storage
    function exchangeManagementToWine(uint256 managementTokenAmount) public {
        // require(managementToken.balanceOf(msg.sender) >= managementTokenAmount * (10**managementToken.decimals()), "Not enough ManagementTokens for exchange")
        require(managementToken.balanceOf(msg.sender) >= managementTokenAmount, "Not enough ManagementTokens for exchange");
        //managementToken.approve(address(this), managementTokenAmount * (10**managementToken.decimals()));//This should be done by user
            
        
        uint256 wineTokenExchange = managementTokenAmount * managementTokenPrice / wineTokenPrice;
        managementToken.transferFrom(msg.sender, address(this), managementTokenAmount);
        wineToken.transfer(msg.sender, wineTokenExchange);
        // wineToken.transferFrom(wineToken.owner(), msg.sender, wineTokenExchange);

        emit ManagementToWineExchanged(msg.sender, managementTokenAmount, wineTokenExchange);
    }


    // User place a buy or sell order for token trading in the marktet
    function placeOrder(bool isBuyOrder, IERC20Upgradeable token, uint256 tokenAmount, uint256 etherAmount) public payable {
        if(isBuyOrder) {
            // for buy orders, the trader sends ether
            require(msg.value == etherAmount, "Incorrect ether sent");
        } else {
            // for sell orders, the trader sends tokens
            require(token.balanceOf(msg.sender) >= tokenAmount, "Not enough tokens");
            token.transferFrom(msg.sender, address(this), tokenAmount);
        }

        orders.push(Order({
            trader: payable(msg.sender),
            isBuyOrder: isBuyOrder,
            token: token,
            tokenAmount: tokenAmount,
            etherAmount: etherAmount,
            filled: 0,
            isActive: true
        }));

        emit OrderPlaced(orders.length - 1, msg.sender, isBuyOrder, address(token), tokenAmount, etherAmount);
    }

    // Fill or partially fill an order after matching in the market
    function fillOrder(uint256 orderId, uint256 amount) public payable {
        Order storage order = orders[orderId];

        // require that the trader is not the one filling the order
        // require(order.trader != msg.sender, "Trader cannot fill own order");
        // require that the amount is not higher than the remaining order amount
        require(amount <= order.tokenAmount - order.filled, "Amount is too high");

        // require that the order is active
        require(order.isActive, "Order is canceled");

        // calculate the equivalent ether amount
        uint256 etherAmount = order.etherAmount * amount / order.tokenAmount;
        
        // for buy orders, require that the contract has enough tokens to send
        // for sell orders, require that the contract has enough ether to send
        require(order.isBuyOrder ? order.token.balanceOf(address(this)) >= amount : address(this).balance >= etherAmount, "Insufficient balance in contract to fill order");


        if(order.isBuyOrder) {
            // for buy orders, the filler sells tokens and receives ether

            // send tokens to the trader
            order.token.transfer(order.trader, amount);
        } else {
            // for sell orders, the filler buys tokens and pays with ether

            // send ether to the trader
            order.trader.transfer(etherAmount);
        }

        // update the filled amount
        order.filled += amount;

        emit OrderFilled(orderId, msg.sender, amount);
    }

    // Get current order count in the market
    function getOrdersCount() public view returns (uint256) {
        return orders.length;
    }

    // Cancel an order in the market if not fully filled
    function cancelOrder(uint256 orderId) external {
        require(orderId < orders.length, "Invalid order ID");
        Order storage order = orders[orderId];
        
        require(msg.sender == order.trader, "Only the trader can cancel their order");
        require(order.isActive, "Order is already canceled");

        order.isActive = false;
        
        // Refund
        if (order.isBuyOrder) {
            address payable payee = payable(order.trader);
            payee.transfer(order.etherAmount - order.filled);
        } else {
            order.token.transfer(msg.sender, order.tokenAmount - order.filled);
        }

        emit OrderCancelled(orderId, msg.sender);
    }

    // The contract receives ethers from the users
    receive() external payable {
        // Leave empty or could add some functions to record transactions later
    }


    
    // Distrubute revenues to all of the management token holders in one time
    // function distributeRevenue(uint256 revenue) public {
    //     uint256 totalSupply = managementToken.totalSupply();
    //     require(totalSupply > 0, "No management tokens have been issued");
    //     uint256 revenuePerManagementToken = revenue / totalSupply;
        
    //     for (uint256 i = 0; i < managementToken.holderCount(); i++) {
    //         address holder = managementToken.getHolder(i);
    //         uint256 holderBalance = managementToken.balanceOf(holder);
    //         uint256 revenueForHolder = revenuePerManagementToken * holderBalance;
    //         wineToken.transfer(holder, revenueForHolder);
    //         // wineToken.transferFrom(wineToken.owner(), holder, revenueForHolder);
    //     }
    // }

    //  Update pending rewards for management token holders
    function distributeRevenue(uint256 revenue) public {
        uint256 totalSupply = managementToken.totalSupply();
        require(totalSupply > 0, "No management tokens have been issued");
        uint256 revenuePerManagementToken = revenue * 1e18 / totalSupply;

        for (uint256 i = 0; i < managementToken.holderCount(); i++) {
            address holder = managementToken.getHolder(i);
            uint256 holderBalance = managementToken.balanceOf(holder);
            uint256 revenueForHolder = revenuePerManagementToken * holderBalance / 1e18;
            pendingRewards[holder] += revenueForHolder; 
        }

        emit RevenueDistributed(revenue, revenuePerManagementToken);
    }

    // The managment token holders claim their revenues
    function claimRewards() public {
        uint256 reward = pendingRewards[msg.sender];
        require(reward > 0, "No rewards available");
        wineToken.transfer(msg.sender, reward);
        pendingRewards[msg.sender] = 0; // After receiveing revenue

        emit RewardClaimed(msg.sender, reward);
    }

    // Get the owner address
    function getOwner() public view returns (address) {
        return owner;
    }
}