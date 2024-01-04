// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./TokenIssuance.sol"; 

contract WineTrading is Initializable{
    WineToken public wineToken; 
    address public owner;

    struct Wine {
        uint256 id;
        string name;
        uint256 price;
        uint256 stock;
        string intro;
        uint16 vintage; 
        address seller;
        bool isActive;
    }

    mapping(uint256 => Wine) public wines;
    uint256 public nextWineId;

    // Events
    event WineAdded(uint256 indexed wineId, string name, uint256 price, uint256 stock, string intro, uint16 vintage, address indexed seller);
    event WinePurchased(uint256 indexed wineId, address indexed buyer, uint256 amount);
    event WineStockUpdated(uint256 indexed wineId, uint256 newStock);
    event WinePriceUpdated(uint256 indexed wineId, uint256 newPrice);
    event WineNameUpdated(uint256 indexed wineId, string newName);
    event WineIntroUpdated(uint256 indexed wineId, string newIntro);


    function initialize(WineToken _wineToken) public initializer {
        wineToken = _wineToken;
        owner = msg.sender;
    }

    function addWine(string memory name, uint256 price, uint256 stock, string memory intro, uint16 vintage) public {
        wines[nextWineId] = Wine(nextWineId, name, price, stock, intro, vintage, msg.sender, true);
        emit WineAdded(nextWineId, name, price, stock, intro,vintage, msg.sender);
        nextWineId++;
    }

    function purchaseWine(uint256 wineId, uint256 amount) public {
        Wine storage wine = wines[wineId];
        require(wine.isActive, "Wine is not available");
        require(wine.stock >= amount, "Not enough stock");

        uint256 totalPrice = wine.price * amount;
        require(wineToken.balanceOf(msg.sender) >= totalPrice, "Insufficient tokens");

        wine.stock -= amount;
        wineToken.transferFrom(msg.sender, wine.seller, totalPrice);

        emit WinePurchased(wineId, msg.sender, amount);
    }

    function deactivateWine(uint256 wineId) public {
        Wine storage wine = wines[wineId];
        require(msg.sender == wine.seller || msg.sender == owner, "Only the seller or owner can deactivate a wine");
        wine.isActive = false;
    }

    function activateWine(uint256 wineId) public {
        Wine storage wine = wines[wineId];
        require(msg.sender == wine.seller || msg.sender == owner, "Only the seller or owner can activate a wine");
        wine.isActive = true;
    }

    function updateWineStock(uint256 wineId, uint256 newStock) public {
        Wine storage wine = wines[wineId];
        require(msg.sender == wine.seller || msg.sender == owner, "Only the seller or owner can update the stock");
        wine.stock = newStock;

        emit WineStockUpdated(wineId, newStock);
    }

    function updateWinePrice(uint256 wineId, uint256 newPrice) public {
        Wine storage wine = wines[wineId];

        require(msg.sender == wine.seller || msg.sender == owner, "Only the seller or owner can update the price");

        wine.price = newPrice;

        emit WinePriceUpdated(wineId, newPrice);
    }

    function updateWineName(uint256 wineId, string memory newName) public {
        Wine storage wine = wines[wineId];
        require(msg.sender == wine.seller || msg.sender == owner, "Only the seller or owner can update the name");
        wine.name = newName;

        emit WineNameUpdated(wineId, newName);
    }

    function updateWineIntro(uint256 wineId, string memory newIntro) public {
        Wine storage wine = wines[wineId];
        require(msg.sender == wine.seller || msg.sender == owner, "Only the seller or owner can update the intro");
        wine.intro = newIntro;

        emit WineIntroUpdated(wineId, newIntro);
    }

    // If seller could update wine name, srock, price, and intro at one time
    function updateWineDetails(uint256 wineId, string memory newName, uint256 newStock, uint256 newPrice, string memory newIntro) public {
        Wine storage wine = wines[wineId];
        require(msg.sender == wine.seller || msg.sender == owner, "Only the seller or owner can update the wine details");

        wine.name = newName;
        wine.stock = newStock;
        wine.price = newPrice;
        wine.intro = newIntro;

        emit WineNameUpdated(wineId, newName);
        emit WineStockUpdated(wineId, newStock);
        emit WinePriceUpdated(wineId, newPrice);
        emit WineIntroUpdated(wineId, newIntro);
    }

    function getWinesCount() public view returns (uint256) {
        return nextWineId;
    }

    function getWinePrice(uint256 wineId) public view returns (uint256) {
        return wines[wineId].price;
    }

    function getWineStock(uint256 wineId) public view returns (uint256) {
        return wines[wineId].stock;
    }

    function getWineDetails(uint256 wineId) public view returns (uint256, string memory, uint256, uint256, string memory, uint16, address, bool) {
        Wine memory wine = wines[wineId];
        return (wine.id, wine.name, wine.price, wine.stock, wine.intro, wine.vintage, wine.seller, wine.isActive);
    }

    // Get the owner address
    function getOwner() public view returns (address) {
        return owner;
    }

}
