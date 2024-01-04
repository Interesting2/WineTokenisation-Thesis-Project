// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";


contract WineToken is Initializable, ERC20Upgradeable {
    address public owner;
    mapping(address => bool) private _whitelist;

    function initialize(uint256 initialSupply) public initializer {
        __ERC20_init("WineUtilityToken", "WUT");
        owner = msg.sender;
        _whitelist[owner] = true;
        _mint(msg.sender, initialSupply);
    }

    // Mint more tokens
    function mint(uint256 amount) public {
        require(_whitelist[msg.sender], "Only the owner or admins can mint new tokens.");
        // _mint(owner, amount * (10**decimals()));
        _mint(owner, amount);
    }

    // Add an admin
    function addToWhitelist(address account) public {
        require(msg.sender == owner, "Only the owner can manage the whitelist.");
        _whitelist[account] = true;
    }

    // Remove an admin
    function removeFromWhitelist(address account) public {
        require(msg.sender == owner, "Only the owner can manage the whitelist.");
        _whitelist[account] = false;
    }

    // Check admin
    function isWhitelisted(address account) public view returns (bool) {
        return _whitelist[account];
    }

    // Get the owner address
    function getOwner() public view returns (address) {
        return owner;
    }
}

contract ManagementToken is Initializable, ERC20Upgradeable {
    address public owner;

    // The holders with management token
    address[] private _holders;
    mapping(address => bool) private _isHolder;
    
    mapping(address => bool) private _whitelist;

    function initialize(uint256 initialSupply) public initializer {
        __ERC20_init("WineManagementToken", "WMT");
        owner = msg.sender;
        _whitelist[owner] = true;
        _mint(msg.sender, initialSupply);
    }

    // Mint more tokens
    function mint(uint256 amount) public {
        require(_whitelist[msg.sender], "Only the owner or admins can mint new tokens.");
        // _mint(owner, amount * (10**decimals()));
        _mint(owner, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal override {
        // If the holder's management token becomes 0
        if (from != address(0)) {
            if (balanceOf(from) == amount) {
                _removeHolder(from);
            }
        }

        // Add the recipient to the holder list
        if (to != address(0)) {
            if (!_isHolder[to]) {
                _holders.push(to);
                _isHolder[to] = true;
            }
        }

        super._beforeTokenTransfer(from, to, amount);
    }

    function _removeHolder(address holder) private {
        for (uint256 i = 0; i < _holders.length; i++) {
            if (_holders[i] == holder) {
                _holders[i] = _holders[_holders.length - 1];
                _holders.pop();
                _isHolder[holder] = false;
                break;
            }
        }
    }

    // Get the number of holders
    function holderCount() public view returns (uint256) {
        return _holders.length;
    }

    // Get a holder by index
    function getHolder(uint256 index) public view returns (address) {
        require(index < _holders.length, "Index out of bounds");
        return _holders[index];
    }

    // Add an admin
     function addToWhitelist(address account) public {
        require(msg.sender == owner, "Only the owner can manage the whitelist.");
        _whitelist[account] = true;
    }

    // Remove an admin
    function removeFromWhitelist(address account) public {
        require(msg.sender == owner, "Only the owner can manage the whitelist.");
        _whitelist[account] = false;
    }

    // Check admin
    function isWhitelisted(address account) public view returns (bool) {
        return _whitelist[account];
    }


    // Get the owner address
    function getOwner() public view returns (address) {
        return owner;
    }
}