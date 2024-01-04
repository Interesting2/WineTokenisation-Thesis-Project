import styles from "./Exchange.module.css";
import {useEffect, useState } from 'react';
import axios from 'axios';
import Web3 from 'web3';
import dayjs from 'dayjs';
import moment from 'moment-timezone';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';

import Chart from '../components/Chart';
import ConfirmationModal from '../components/ConfirmationModal';

const Exchange = ({ }) => {
 
const [tradeButtonText, setTradeButtonText] = useState("Buy");
const [selectedToken, setSelectedToken] = useState('WUT');
const [isBuy, setIsBuy] = useState(true);
 
// Function to handle token selection
const handleTokenChange = (event) => {
  setSelectedToken(event.target.value);

  if (event.target.value === 'WUT') {
    console.log("WUT token selected")

    setTokenAddress("0xb22cB2F9B620ede24CB06C8f0C8892e464A9439b");
    const ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
    setTokenABI(ABI);

  } else if (event.target.value === 'WMT'){
    console.log("WMT token selected")
    
    setTokenAddress("0xEdFcC3B0c67E8b048beA38a19709C71da188c603");
    const ABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getHolder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"holderCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
    setTokenABI(ABI);
  }
};
 
const [cryptoAmount, setCryptoAmount] = useState(0);
const [tokenAmount, setTokenAmount] = useState(0);
 
 
const handleCryptoAmountChange = (event) => {
  // setSelectedToken(event.target.value);
  setCryptoAmount(event.target.value);
};
 
const handleTokenAmountChange = (event) => {
  // setSelectedToken(event.target.value);
  setTokenAmount(event.target.value);
};
 
const changeToBuy = () => {
  setTradeButtonText("Buy");
  setIsBuy(true);

}
 
const changeToSell = () => {
  setTradeButtonText("Sell");
  setIsBuy(false);
}
 
 
const addTradeToMatch = async (orderCount) => {
  // fetch the http://localhost:3500/trade/addTrade api with axios
  // with the following data: trade type, trade_id, user_id, price, num
  console.log("ADD TRADE TO MATCH\n")
  // const trader_id = await getOrderCount(contract);
  const price =  cryptoAmount/tokenAmount;
 
  console.log(Number(orderCount), price, parseInt(tokenAmount), isBuy ? "buy" : "sell");
  axios.post('http://localhost:3500/trade/addTrade', {
    trade_type: isBuy ? "buy" : "sell",
    trade_id: Number(orderCount) -1,
    price: price,
    num: parseInt(tokenAmount),
    token_type: selectedToken
  }, {
    withCredentials: true,
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
}

const handleCancelOrder = async (tradeId) => {
 
  axios.post('http://localhost:3500/trade/cancelTrade', {
    trade_id: tradeId,

  }, {
    withCredentials: true,
  })
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.log(error);
  })
}
 
const [tokenAddress, setTokenAddress] = useState('0xb22cB2F9B620ede24CB06C8f0C8892e464A9439b');
const [tokenABI, setTokenABI] = useState([{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]);
const contractABI = [{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyManagementTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"buyWineTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"}],"name":"cancelOrder","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimRewards","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"revenue","type":"uint256"}],"name":"distributeRevenue","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"managementTokenAmount","type":"uint256"}],"name":"exchangeManagementToWine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineTokenAmount","type":"uint256"}],"name":"exchangeWineToManagement","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"orderId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"fillOrder","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"contract WineToken","name":"_wineToken","type":"address"},{"internalType":"contract ManagementToken","name":"_managementToken","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"managementTokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"wineTokenAmount","type":"uint256"}],"name":"ManagementToWineExchanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"orderId","type":"uint256"},{"indexed":true,"internalType":"address","name":"trader","type":"address"}],"name":"OrderCancelled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"orderId","type":"uint256"},{"indexed":true,"internalType":"address","name":"filler","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"OrderFilled","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"orderId","type":"uint256"},{"indexed":true,"internalType":"address","name":"trader","type":"address"},{"indexed":false,"internalType":"bool","name":"isBuyOrder","type":"bool"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"etherAmount","type":"uint256"}],"name":"OrderPlaced","type":"event"},{"inputs":[{"internalType":"bool","name":"isBuyOrder","type":"bool"},{"internalType":"contract IERC20Upgradeable","name":"token","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint256","name":"etherAmount","type":"uint256"}],"name":"placeOrder","outputs":[],"stateMutability":"payable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"totalRevenue","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"revenuePerToken","type":"uint256"}],"name":"RevenueDistributed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"holder","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewardAmount","type":"uint256"}],"name":"RewardClaimed","type":"event"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sellManagementTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"sellWineTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_wineTokenPrice","type":"uint256"},{"internalType":"uint256","name":"_managementTokenPrice","type":"uint256"}],"name":"setTokenPrices","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newWineTokenPrice","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newManagementTokenPrice","type":"uint256"}],"name":"TokenPricesUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"tokenType","type":"string"}],"name":"TokensBought","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"seller","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"string","name":"tokenType","type":"string"}],"name":"TokensSold","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"uint256","name":"wineTokenAmount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"managementTokenAmount","type":"uint256"}],"name":"WineToManagementExchanged","type":"event"},{"stateMutability":"payable","type":"receive"},{"inputs":[],"name":"getOrdersCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"managementToken","outputs":[{"internalType":"contract ManagementToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"managementTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"orders","outputs":[{"internalType":"address payable","name":"trader","type":"address"},{"internalType":"bool","name":"isBuyOrder","type":"bool"},{"internalType":"contract IERC20Upgradeable","name":"token","type":"address"},{"internalType":"uint256","name":"tokenAmount","type":"uint256"},{"internalType":"uint256","name":"etherAmount","type":"uint256"},{"internalType":"uint256","name":"filled","type":"uint256"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"pendingRewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wineToken","outputs":[{"internalType":"contract WineToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wineTokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
 
const handlePlaceOrder = async () => {
  
  console.log("HANDLE PLACE ORDER");
  try {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
 
      await window.ethereum.request({ method: 'eth_requestAccounts' });
 
      const accounts = await web3.eth.getAccounts();
      // const contractAddress = '0x10e8c28562Db222B02540D65816739c95231Af3d'; // Replace with your contract address
      const contractAddress = '0x61De0402cEFb675C6738D33cEd517Be23392b326'; // Replace with your contract address
 
      // Create a contract instance
      const contract = new web3.eth.Contract(contractABI, contractAddress);
 
      console.log("CONFIGURATION before transaction")
      console.log(selectedToken);
      console.log(contractABI);
      console.log(tokenAddress);
      // add trade
      // addTradeToMatch(contract);
      // return;
 
    if (isBuy) {
      console.log("BUY ORDER");
      // Call the contract's placeOrder method for a buy order
      console.log(tokenAmount, cryptoAmount)
      const tokenWeiAmount = web3.utils.toWei(tokenAmount, "ether");  // Converts 1 Ether to wei

      const tx = await contract.methods.placeOrder(isBuy, tokenAddress, tokenWeiAmount, cryptoAmount)
        .send({ from: accounts[0], value: cryptoAmount })
        .on('transactionHash', function(hash){
          // 当你收到交易hash时触发
          console.log("Transaction Hash:", hash);
      })
      .on('receipt', function(receipt){
          // 当你收到交易回执时触发
          console.log("Receipt:", receipt);
      })
      .on('confirmation', function(confirmationNumber, receipt){ 
          // 在每次确认时触发
          console.log("CONFIRMATION HERE");
          console.log(confirmationNumber.confirmations);
          if(Number(confirmationNumber.confirmations) == 1) {  // 只在第一次确认时处理，但可以根据需要进行调整
              console.log("Transaction was confirmed");
              // handleToggleModal();
 
              contract.methods.getOrdersCount().call()
              .then(result => {
                console.log('Number of orders:', result);
                setShowConfirmation(true);
                
                setConfirmationText("You've successfully placed an Buy Order: " + cryptoAmount + "eth for " + tokenAmount + " " + selectedToken);
                setConfirmationTitle("Place Buy Order Sucess");
                setIsError(true);
                addTradeToMatch(result);
              })
              .catch(error => {
                console.error('An error occurred:', error);
              });
          }
      })
      .on('error', console.error);  // 如果交易失败，则触发
     
      console.log('Transaction: ', tx);
 
    } else {
        console.log("SELL ORDER");  
        const tokenWeiAmount = web3.utils.toWei(tokenAmount, "ether");  // Converts 1 Ether to wei

        const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
        await tokenContract.methods.approve(contractAddress, tokenWeiAmount).send({ from: accounts[0] });
 
        // Then, you can place the sell order
        const tx = await contract.methods.placeOrder(isBuy, tokenAddress, tokenWeiAmount, cryptoAmount)
          .send({ from: accounts[0] })
         .on('transactionHash', function(hash){
            // 当你收到交易hash时触发
            console.log("Transaction Hash:", hash);
        })
        .on('receipt', function(receipt){
            // 当你收到交易回执时触发
            console.log("Receipt:", receipt);
        })
        .on('confirmation', function(confirmationNumber, receipt){ 
            // 在每次确认时触发
          console.log("CONFIRMATION HERE");
          console.log(confirmationNumber.confirmations);
          if(Number(confirmationNumber.confirmations) == 1) {  // 只在第一次确认时处理，但可以根据需要进行调整
              console.log("Transaction was confirmed");
              // handleToggleModal();
 
              contract.methods.getOrdersCount().call()
              .then(result => {
                console.log('Number of orders:', result);

                setShowConfirmation(true);
                
                setConfirmationText("You've successfully placed an Sell Order: " + tokenAmount + " " + selectedToken + " for " + cryptoAmount + "eth");

                setConfirmationTitle("Place Sell Order Success");
                setIsError(true);

                addTradeToMatch(result);
              })
              .catch(error => {
                console.error('An error occurred:', error);
              });
          }
        })
        .on('error', console.error);  // 如果交易失败，则触发
       
        console.log('Transaction: ', tx);
      }
  
    }
    else {
      console.error('Ethereum provider not found');
    }
  }
  catch (error) {
    console.error('Error:', error);
  }
}



const [showConfirmation, setShowConfirmation] = useState(false);
const [confirmationText, setConfirmationText] = useState("");
const [confirmationTitle, setConfirmationTitle] = useState("");
const [isError, setIsError] = useState(false);


const fetchUserWalletBalance = async (userAddress) => {
  try {
    const web3 = new Web3(window.ethereum);

    const balanceInWei = await web3.eth.getBalance(userAddress);

    console.log('User wallet balance:', balanceInWei, 'WEI');
    return parseInt(balanceInWei);

  } catch (error) {
    console.error('Error fetching user wallet balance:', error);
  }
};

const checkCryptoEnough = async () => {
  if (window.ethereum.selectedAddress) {
    const userAddress = window.ethereum.selectedAddress;
    const walletBalance = await fetchUserWalletBalance(userAddress);
    console.log("You have ", walletBalance, "WEI");

    console.log(cryptoAmount, walletBalance);

    if (cryptoAmount > walletBalance) {
      setConfirmationText("You don't not sufficient funds to buy " + tokenAmount + "" + selectedToken);
      setConfirmationTitle("Buy token Error");
      setIsError(true);
    } else {
      // can purchase
      setShowConfirmation(false); 
      handlePlaceOrder();

    }
  } else {
    setConfirmationText("Please Connect to your Metamask");
    setConfirmationTitle("Wallet not logged in");
    setIsError(true);
  }
}


const getWMT = async (userAddress, web3) => {
  const managementTokenABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getHolder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"holderCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
  const managementTokenAddress = "0xEdFcC3B0c67E8b048beA38a19709C71da188c603";
  const managementTokenContract = new web3.eth.Contract(managementTokenABI, managementTokenAddress);
  const managementTokenBalance = await managementTokenContract.methods.balanceOf(userAddress).call();

  const myWineToken = parseInt(web3.utils.fromWei(managementTokenBalance, 'ether'));
  console.log("Management Token: " + myWineToken);

  return myWineToken;
}

const getWUT = async (userAddress, web3) => {
  const wineTokenABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
  const wineTokenAddress = "0xb22cB2F9B620ede24CB06C8f0C8892e464A9439b";

  const wineTokenContract = new web3.eth.Contract(wineTokenABI, wineTokenAddress);
  const wineTokenBalance = await wineTokenContract.methods.balanceOf(userAddress).call();
  
  const myWineToken = parseInt(web3.utils.fromWei(wineTokenBalance, 'ether'));
  console.log("Utility Token: " + myWineToken);

  return myWineToken;

}

const checkTokenAmountEnough = async () => {
  const web3 = new Web3(window.ethereum)
  const accounts = await web3.eth.getAccounts();
  const userAddress = accounts[0];  

  if (selectedToken === "WUT") {
    const wut = await getWUT(userAddress, web3);

    console.log(tokenAmount, wut)
    if (tokenAmount > wut) {

      setConfirmationText("You don't have sufficient tokens to sell " + tokenAmount + " " + selectedToken);
      setConfirmationTitle("Sell token Error");
      setIsError(true);
    } else {
      // can purchase
      setShowConfirmation(false); 
      handlePlaceOrder();
    }
  } else if (selectedToken === "WMT") {
    const wmt = await getWMT(userAddress, web3);
    if (tokenAmount > wmt) {
      setConfirmationText("You don't not sufficient funds to sell " + tokenAmount + " " + selectedToken);
      setConfirmationTitle("Sell token Error");
      setIsError(true);
    } else {
      // can purchase
      setShowConfirmation(false); 
      handlePlaceOrder();
    }
  }
}

const checkTokenEnough = async() => {
    
  if (isBuy) {
    // does user have enough crypto to buy
    checkCryptoEnough();
  } else {
    checkTokenAmountEnough();
    // does user have enough tokenAmount

  }
}

const handleUserConfirmPurchase = () => {
  // testDeactivateWine();
  checkTokenEnough();
}

const showConfirmationModal = () => {
  setIsError(false); //reset

  const action = isBuy === true ? "Buy" : "Sell"
  setShowConfirmation(true);
  setConfirmationText("Are you sure you want to " + action + " " + tokenAmount + " " + selectedToken + " for " + cryptoAmount + "eth?");
  setConfirmationTitle("Trade Token");
  // alert("Are you sure you want to buy " + quantity + " bottles of " + wine.wine_name + "?");
}

const handleTradeButton = async () => {
  if (tokenAmount == 0 || cryptoAmount == 0) {
    // alert("Amount cannot be 0");
    setShowConfirmation(true);
                
    setConfirmationText("Amount cannot be 0");
    setConfirmationTitle("Token Trading Failed");
    setIsError(true);
    return;
  }

  showConfirmationModal();

}
 
 
  // endpoint for buytrades is trade/getBuyTrade
  // endpoint for selltrades is trade/getSellTrade
  // it will return fields from the db: current_num, price, trade_type (buy or sell)
  // i will use it to update the order book
 
  // const [buyTrades, setBuyTrades] = useState([]); // Initialize state with an empty array
  // const [sellTrades, setSellTrades] = useState([]); // Initialize state with an empty array
  const [buyTrades, setBuyTrades] = useState([
   
  ]);

  const [sellTrades, setSellTrades] = useState([
   
  ]);

  const [buyHighest, setBuyHighest] = useState(0);
  const [sellHighest, setSellHighest] = useState(0);

  const [prevBuyHighest, setPrevBuyHighest] = useState(0);
  const [prevSellHighest, setPrevSellHighest] = useState(0);
 
  const getBuyTrade = () => {
    axios.get('http://localhost:3500/trade/getBuyTrade')
      .then(function (response) {
          // console.log(response);
          // get the current_num, price, and trade_type (buy or sell) from response
          // update the order book using the data
 
          const {buyTrades} = response.data;

          console.log(buyTrades)
          // update the order book using the data
          setBuyTrades(buyTrades);

          setPrevBuyHighest(buyHighest)
          // Find the maximum price in buyTrades
          const maxBuyPrice = buyTrades.reduce((max, trade) => Math.max(max, trade.price), 0);
          // console.log("Max Buy Price: ", maxBuyPrice)
          setBuyHighest(maxBuyPrice);

          buyTrades.forEach(trade => {
              const { price, current_num, trade_type } = trade;
              console.log(`Price: ${price}, Current Num: ${current_num}, Trade Type: ${trade_type}`);
              // You can perform further operations with these extracted fields
          });
 
 
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  const getSellTrade = () => {
    axios.get('http://localhost:3500/trade/getSellTrade')
      .then(function (response) {
          // console.log(response);
          // get the current_num, price, and trade_type (buy or sell) from response
          // update the order book using the data
          const {sellTrades} = response.data;
          // update the order book using the data
          setSellTrades(sellTrades);
          
          setPrevSellHighest(sellHighest)

          // Find the maximum price in sellTrades
          const maxSellPrice = sellTrades.reduce((max, trade) => Math.max(max, trade.price), 0);
          // console.log("Max sell price: ", maxSellPrice);
          setSellHighest(maxSellPrice);

          sellTrades.forEach(trade => {
              const { price, current_num, trade_type } = trade;
              console.log(`Price: ${price}, Current Num: ${current_num}, Trade Type: ${trade_type}`);
              // You can perform further operations with these extracted fields
          });
 
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  // Determine the CSS class based on price change
  const priceChangeClass = prevBuyHighest + prevSellHighest > buyHighest + sellHighest ? styles.red : styles.green;
  const arrowSymbol = prevBuyHighest + prevSellHighest > buyHighest + sellHighest ? '▼' : '▲';

  const [buyTransactions, setBuyTransactions] = useState([
    
  ]);
  const [sellTransactions, setSellTransactions] = useState([{
    
  },]);

  const [transactions, setTransactions] = useState([

  ]);

  const getBuyTransaction = async () => {
    // do the same for transaciton
     // endpoint for transactions is transaction/getBuyTransaction
    // endpoint for transactions is transaction/getSellTransaction
    try {
      axios.get("http://localhost:3500/transaction/getBuyTransaction", {
        withCredentials: true,
      })
      .then((response) => {
        const {transactions} = response.data;
        // console.log(transactions)
        setBuyTransactions(transactions);
      })
      .catch((error) => {
        console.error(error);
      });

     
    } catch (error) {
      console.error(error);
    }
 
    // it will return fields from the db: transaction_type, token_type, token_num, value, transaction_time
  }
 
  const getSellTransaction = async () => {
    // do the same for transaciton
     // endpoint for transactions is transaction/getBuyTransaction
    // endpoint for transactions is transaction/getSellTransaction
    try {
      axios.get("http://localhost:3500/transaction/getSellTransaction", {
        withCredentials: true,
      })
      .then((response) => {
        const {transactions} = response.data;
        setSellTransactions(transactions);
      })
      .catch((error) => {
        console.error(error);
      });

     
    } catch (error) {
      console.error(error);
    }
 
    // it will return fields from the db: transaction_type, token_type, token_num, value, transaction_time
  }
 
  const getAllTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:3500/transaction/getAllTransaction");
      const {transactions} = response.data;
      console.log(transactions)
      setTransactions(transactions);
    } catch (error) {
      console.error(error);
    } 
  }

  const getTransactionClass = (transactionType) => {
    return transactionType === 'sell' ? styles.red : styles.green;
  };


  

  const [myOrders, setMyOrders] = useState([  
  
  ]);

  const getMyOrders = async () => {
 
    // console.log("GETTING MY ORDERS");
    try {
      const response = await axios.get(`http://localhost:3500/trade/getTradeById/`, {
        withCredentials: true, // Enable credentials
      });
      
      // Handle the response data
      // console.log(response.data)
      const {trades} = response.data; 
      // console.log(trades);
      setMyOrders(trades);
      
    } catch (error) {
      console.error(error);
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return 'Completed';
      case 1:
        return 'Partial Matched';
      case 2:
        return 'Not Matched';
      case 3:
        return 'Refunded';
      default:
        return 'Unknown Status';
    }
  };

  const [walletAmount, setWalletAmount] = useState(0);
  const handleWalletAmount = async () => {
    if (window.ethereum.selectedAddress) {
      try {
        const web3 = new Web3(window.ethereum);
    
        const balanceInWei = await web3.eth.getBalance(window.ethereum.selectedAddress);
        const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
    
        console.log('User wallet balance:', balanceInEther, 'ETH');
        setWalletAmount(parseFloat(balanceInEther).toFixed(4));
    
      } catch (error) {
        console.error('Error fetching user wallet balance:', error);
      }
    }
  }

 
  const cancelOrder = async (orderId) => {
    const web3 = new Web3(window.ethereum);
    const contractAddress = '0x0A71680743D411752fCc9cBA15DAF9BE5912e07C'; // Replace with your contract address
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    console.log("cancel trade id is ",orderId);
    try {

      const tx = await contract.methods.cancelOrder(orderId).send({ from: accounts[0] })
      .on('confirmation', function(confirmationNumber, receipt){ 
          if(Number(confirmationNumber.confirmations) == 1) {  // 只在第一次确认时处理，但可以根据需要进行调整
              console.log("Trade was canceled");
              handleCancelOrder(orderId)
              .catch(error => {
                console.error('An error occurred:', error);
              });
          }
    })
    } catch (error) {
      console.error("Error canceling order:", error);
    } 
  }

  const [toggleTransaction, setToggleTransaction] = useState(0);
  const showAllTransactions = () => {
    setToggleTransaction(0);
  }

  const showBuyTransactions = () => {
    setToggleTransaction(1);
  }

  const showSellTransactions = () => {
    setToggleTransaction(2);
  }
  
  const getStatusClass = (statusType) => {
    switch (statusType) {
      case 0:
        return styles.completeMatch;
      case 1:
        return styles.partialMatch;
      case 2:
        return styles.notMatched;
      default:
        return styles.all;
    }
  }


  const [chartData, setChartData] = useState({
    series: [
      {
        name: 'candle',
        data: [
        ],
      },
    ],
    theme: {
        mode: 'dark', 
        palette: 'palette3', 
        monochrome: {
            enabled: false,
            color: '#255aee',
            shadeTo: 'dark',
            shadeIntensity: 0.65
        },
    },
  
    options: {
      chart: {
        height: 350,
        type: 'candlestick',
      },
      title: {
        text: '',
        align: 'left',
      },
      annotations: {
        
      },
      tooltip: {
        enabled: true,
      },
      xaxis: {
        type: 'category',
        labels: {
          formatter: function (val) {
            return dayjs(val).format('MMM DD HH:mm');
          },
        },
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
    },
  });
 
  const updateChartData = (newSeriesData) => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      series: [
        {
          data: newSeriesData, // Update only the series data
        },
      ],
    }));
  };

  const [aggregateMode, setAggregateMode] = useState(120);
  useEffect(() => {
    getStockData();
  }, [aggregateMode]);

  const getStockData = () => {
    axios.get(`http://localhost:3500/transaction/getAggregateTransaction?aggregate_rule=${aggregateMode}`)
      .then(function (response) {
          console.log(response);
          // get the current_num, price, and trade_type (buy or sell) from response
          // update the order book using the data
 
          const {transactions} = response.data;

          const aggregatedData = transactions.map((transaction) => ({
            x: moment(transaction.formmatDate, 'DD/MM/YYYY, HH:mm:ss').toDate(),
            y: [transaction.minPrice, transaction.minPrice, transaction.maxPrice, transaction.maxPrice],
          }));
          console.log("AGGREGATED DATA\n")
          console.log(aggregatedData);

          updateChartData(aggregatedData)

      })
      .catch(function (error) {
          console.log(error);
      });
  }

  
  const navigation = useNavigate();
  const [isUserVerified, setIsUserVerified] = useState(false);

  const verifyUser = async () => {
    axios.post('http://localhost:3500/users/verify-user', {}, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log("VERIFYING USER");
        console.log(response.status);
        console.log(response.data.user_id);
        
        console.log("LOGGED IN");
        setIsUserVerified(true);

        getStockData();
        

        handleWalletAmount();
      })
      .catch(function (error) {
        console.log(error);
        console.log("NOT LOGGED IN");
        navigation('/')
      });
  };

  useEffect(() => {
    verifyUser();

    const getInfo = setInterval(() => {
      // fetch data from backend every 3 seconds to update the order book using axios
      // uncomment 下面的

      getBuyTrade();
      getSellTrade();
        
      getMyOrders();

      getBuyTransaction();
      getSellTransaction();
      getAllTransactions(); 
    
    }, 3000); 

    return () => clearInterval(getInfo); // Cleanup the timer on unmount
    
  }, []);

  

  const [showModal, setShowModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Processing your details");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.dashboard}>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {isLoading && (
              <div className={styles.modalContentText}>
                {/* <div className={styles.loadingIcon}></div> */}
                <Loading />
                <p className={styles.loadingText}>{loadingText}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {isUserVerified ? (
        <>
          <NavBar setShowModal={setShowModal} setIsLoading={setIsLoading} setLoadingText={setLoadingText} clickedButton={"exchange"}/>
          {showConfirmation && (
            <ConfirmationModal 
              confirmationText={confirmationText} 
              confirmationTitle={confirmationTitle} 
              closeModal={setShowConfirmation}
              confirmPurchase={handleUserConfirmPurchase} 
              isError={isError}
            />
          )}
          <div className={styles.dashboardcontent}>
            <div className={styles.topBar}>
              <h2 className={styles.title}>
                <div>
                  <span>Exchange</span>
                </div>
              </h2>
              {/* <div className={styles.dashboard2}>Exchange</div> */}
              <div className={styles.topBar1}>
                {/* <div className={styles.icons}>
                  <img
                    className={styles.search11Icon}
                    alt=""
                    src="/search1-1.svg"
                  />
                  <img
                    className={styles.search11Icon}
                    alt=""
                    src="/notificationbing5-1.svg"
                  />
                </div> */}
                
              </div>
            </div>
            <div className={styles.frameParent}>
              <div className={styles.frameGroup}>
                <h2 className={styles.title}>
                  <div>
                    <span>Transaction Graph</span>
                  </div>
                </h2>
                  {/* <b className={styles.graphTitle}>Transaction Graph</b> */}
              </div>
              <div className={styles.tabBarItemParent}>
                <div className={styles.tabBarItem}>
                  <img className={styles.histortIcon} alt="" src="/histort.svg" />
                </div>
                <div className={styles.myWalletBalanceEthParent}>
                  <div className={styles.select}>My Wallet Balance (ETH)</div>
                </div>
                <div className={styles.wrapper}>
                  <b className={styles.b}>{walletAmount}</b>
                </div>
              </div>
            </div>
            <div className={styles.dashboarddataParent}>
              <div className={styles.dashboarddata}>
                
                <div className={styles.chart}>
                  <Chart series={chartData.series} options={chartData.options} theme={chartData.theme} setAggregateMode={setAggregateMode} />

                </div>
                <div className={styles.quickBuy}>
                  <div className={styles.buyParent}>
                    {isBuy ? (
                      <>
                        <button className={styles.buy} onClick={changeToBuy}>Buy</button>
                        <div className={styles.frameItem} />
                        <button className={styles.sell} onClick={changeToSell}>Sell</button>
                      </>
    
                    ) : (
                      <>
                        <button className={styles.buyNotSelected} onClick={changeToBuy}>Buy</button>
                        <div className={styles.frameItem} />
                        <button className={styles.sellSelected} onClick={changeToSell}>Sell</button>
                      </>
                    )}
                  </div>
                  <div className={styles.frameContainer}>
                    <div className={styles.wutUtilityTokenPriceParent}>
                      <div className={styles.wutUtilityToken}>
                        {selectedToken} Price
                      </div>
                      <div className={styles.div}>$</div>
                    </div>
                    <div className={styles.parent}>
                      <div className={styles.test}>Price</div>

                      <div className={styles.labelContainer}>
                        <input 
                          className={styles.btc}
                          type="number"
                          placeholder="0"
                          onChange={handleCryptoAmountChange}
                          onKeyDown={(e) => {
                            // Prevent the hyphen key (key code 189) from being input
                            if (e.keyCode === 189) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {/* <div className={styles.cryptoLabel}>ETH</div> */}
                        <div className={styles.frameParent4}>
                          <div className={styles.logo}>
                            <select id="tokenCrypto" value="ETH" onChange={()=>{}}>
                              <option value="WUT">ETH</option>
                            </select>
                            {/* <div className={styles.btc}>ETH</div> */}
                          </div>
                        </div>
                      </div>
                      {/* <select className={styles.frameItem} /> */}
                      {/* <select id="tokenCrypto" value="ETH" onChange={()=>{}}>
                        <option value="WUT">ETH</option>
                        <option value="WMT">BTC</option>
                        <option value="WOT">SOL</option>
                      </select> */}
                    </div>
                    <div className={styles.group}>
                      <div >Amount</div>

                    
                      {/* <div className={styles.div1}>0.1824|</div> */}
                      {/* <select className={styles.frameItem} /> */}
                      <div className={styles.labelContainer}>
                        <input 
                          className={styles.btc}
                          type="number"
                          placeholder="0"
                          onChange={handleTokenAmountChange}
                          onKeyDown={(e) => {
                            // Prevent the hyphen key (key code 189) from being input
                            if (e.keyCode === 189) {
                              e.preventDefault();
                            }
                          }}
                        />
                        {/* <div className={styles.cryptoLabel}>WUT</div> */}
                        <div className={styles.frameParent5}>
                          <div className={styles.logo}>
                            <select id="token" value={selectedToken} onChange={handleTokenChange}>
                              <option value="WUT">WUT</option>
                              <option value="WMT">WMT</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* <select id="token" value={selectedToken} onChange={handleTokenChange}>
                        <option value="WUT">WUT</option>
                        <option value="WMT">WMT</option>
                        <option value="WOT">WOT</option>
                      </select> */}
                    </div>
                    <button className={styles.buyWutWrapper} onClick={handleTradeButton}>
                      {/* <div className={styles.buyWut}>Buy WUT</div>
                      */}
                      <div className={styles.buyWut}>{tradeButtonText} {selectedToken}</div>
                    </button>
                  </div>
                </div>
                <div className={styles.recentTransaction}>
                  <div className={styles.top}>
                    <div className={styles.select}>My Orders</div>
                    <button className={styles.viewAllParent}>
                      <div className={styles.viewAll}>View All</div>
                      <img
                        className={styles.icExpandMore24px1Icon}
                        alt=""
                        src="/icexpandmore24px-1.svg"
                      />
                    </button>
                  </div>
                  <div className={styles.index1}>
                    <div className={styles.priceethParent}>
                      <div className={styles.priceeth}>Price(ETH)</div>
                      <div className={styles.amountwut}>Amount(WUT)</div>
                      <div className={styles.amountwut}>Filled(WUT)</div>
                      <div className={styles.time}>Time</div>
                      <div className={styles.time}>Status</div>
                      <div className={styles.time}>Action</div>
                    </div>
                  </div>
                  {/* <div className={styles.main1}>
                    <div className={styles.container}>
                      <div className={styles.div3}>0.9987</div>
                      <div className={styles.div4}>10</div>
                      <div className={styles.div4}>10</div>
                      <div className={styles.div5}>11:21:47</div>
                      <div className={styles.partial}>Partial</div>
                      <button className={styles.button} onClick={cancelOrder}>
                        <div className={styles.listItem}>Cancel</div>
                      </button>
                    </div>
                  </div> */}
                  
                  {myOrders.map((tradeItem) => (
                    <div className={styles.main1} key={tradeItem.id}>
                        <div className={styles.container} >
                          <div className={`${styles.div3} ${getTransactionClass(tradeItem.trade_type)}`}>{tradeItem.price}</div>
                          <div className={styles.div4}>{tradeItem.initial_num}</div>
                          <div className={styles.div4}>{tradeItem.current_num}</div>
                          <div className={styles.div5}>{tradeItem.create_time}</div> {/* You can replace this with the actual time */}
                          <div className={`${styles.partial} ${getStatusClass(tradeItem.status)}`}>{getStatusText(tradeItem.status)}</div>
                          {tradeItem.status === 0 || tradeItem.status === 1 ? (
                            <button className={styles.cancelButton} onClick={() => cancelOrder(tradeItem.trade_id)}>
                              <div className={styles.listItem}>Cancel</div>
                            </button>
                          ) : <button className={styles.cancelButtonDis} onClick={() => cancelOrder(tradeItem.trade_id)}>
                                <div className={styles.listItem}></div>
                              </button>
                          }
                        </div>
                    </div>
                  ))}
    
                  <div className={styles.main4} />
                </div>
              </div>
              <div className={styles.walletSchedule}>
                <div className={styles.titelParent}>
                  <div className={styles.titel}>
                    <div className={styles.select}>Order Book</div>
                  </div>
                  <div className={styles.orderBook1}>
                    <div className={styles.main5}>
                      <div className={styles.main6}>
                        <div className={styles.priceParent}>
                          <div className={styles.select}>Price</div>
                          <div className={styles.select}>Amount</div>
                          <div className={styles.select}>Total</div>
                        </div>
                      </div>
                      {sellTrades.map((trade) => (
                        <div className={styles.priceParent} key={trade.id}>
                          <div className={styles.div12}>{trade.price}</div>
                          <div className={styles.div13}>{trade.current_num}</div>
                          <div className={styles.div14}>{(trade.price * trade.current_num).toFixed(4)}</div>
                        </div>
                      ))}
                    </div>

                    <div className={`${styles.averagePrice} ${priceChangeClass}`}>
                        {(buyHighest + sellHighest) / 2} {arrowSymbol}
                    </div>
                    <div className={styles.main15}>

                    {buyTrades.map((trade) => (
                        <div className={styles.chart} key={trade.id}>
                          <div className={styles.priceParent}>
                            <div className={styles.div36}>{trade.price}</div>
                            <div className={styles.div13}>{trade.current_num}</div>
                            <div className={styles.div14}>{(trade.price * trade.current_num).toFixed(4)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.recentTransaction1}>
                  <div className={styles.top}>
                    <div className={styles.select}> Transactions </div>
                    <button className={styles.viewAllParent}>
                      <div className={styles.viewAll}>View All</div>
                      <img
                        className={styles.icExpandMore24px1Icon}
                        alt=""
                        src="/icexpandmore24px-1.svg"
                      />
                    </button>
                  </div>
                  <div className={styles.transactionButtonContainer}> 
                  {/* {`${styles.div3} ${getTransactionClass(transaction.transaction_type)} */}
                    <button className={`${styles.changeTransactionBtn} ${toggleTransaction === 0 ? styles.toggle : ''}`} onClick={showAllTransactions}>
                      <div className={styles.changeTransactionText}>All</div>
                    </button>
                    <button className={`${styles.changeTransactionBtn} ${toggleTransaction === 1 ? styles.toggle : ''}`} onClick={showBuyTransactions}>
                      <div className={styles.changeTransactionText}>Your Buy Transactions</div>
                    </button>
                    <button className={`${styles.changeTransactionBtn} ${toggleTransaction === 2 ? styles.toggle : ''}`} onClick={showSellTransactions}>
                      <div className={styles.changeTransactionText}>Your Sell Transactions</div>
                    </button>
                  </div>
                  <div className={styles.index2}>
                    <div className={styles.priceethParent}>
                      <div className={styles.time}>Price(ETH)</div>
                      <div className={styles.amountwut}>Amount(WUT)</div>
                      <div className={styles.time1}>Time</div>
                    </div>
                  </div>
                  {/* {transactions.map(transaction => (
                    <div key={transaction.transaction_time} className={styles.main1}>
                      <div className={styles.priceethParent}>
                        <div className={styles.div3}>{transaction.value}</div>
                        <div className={styles.div55}>{transaction.token_num}</div>
                        <div className={styles.div56}>{transaction.transaction_time}</div>
                      </div>
                    </div>
                  ))} */}

                  {toggleTransaction === 0 &&
                    transactions.map(transaction => (
                      <div
                        key={transaction.transaction_id}
                        className={`${styles.main1} ${getTransactionClass(transaction.transaction_type)}`}
                      >
                        <div className={styles.priceethParent}>
                          <div className={`${styles.div3} ${getTransactionClass(transaction.transaction_type)}`}>
                            {transaction.value}
                          </div>
                          <div className={`${styles.div55} ${getTransactionClass(transaction.transaction_type)}`}>
                            {transaction.token_num}
                          </div>
                          <div className={`${styles.div56} ${getTransactionClass(transaction.transaction_type)}`}>
                            {transaction.transaction_time}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  {toggleTransaction === 1 &&
                    buyTransactions.map(transaction => (
                      <div
                        key={transaction.transaction_id}
                        className={`${styles.main1} ${getTransactionClass(transaction.transaction_type)}`}
                      >
                        <div className={styles.priceethParent}>
                          <div className={`${styles.div3} ${getTransactionClass(transaction.transaction_type)}`}>
                            {transaction.value}
                          </div>
                          <div className={`${styles.div55} ${getTransactionClass(transaction.transaction_type)}`}>
                            {transaction.token_num}
                          </div>
                          <div className={`${styles.div56} ${getTransactionClass(transaction.transaction_type)}`}>
                            {transaction.transaction_time}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  {toggleTransaction === 2 &&
                    sellTransactions.map(transaction => (
                      <div
                        key={transaction.transaction_id}
                        className={`${styles.main1} ${getTransactionClass(transaction.transaction_type)}`}
                      >
                        <div className={styles.priceethParent}>
                          <div className={`${styles.div3} ${getTransactionClass(transaction.transaction_type)}`}>
                            {transaction.value}
                          </div>
                          <div className={`${styles.div55} ${getTransactionClass(transaction.transaction_type)}`}>
                            {transaction.token_num}
                          </div>
                          <div className={`${styles.div56} ${getTransactionClass(transaction.transaction_type)}`}>
                            {transaction.transaction_time}
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  
                  {/* <div className={styles.main1}>
                    <div className={styles.priceethParent}>
                      <div className={styles.div3}>0.9987</div>
                      <div className={styles.div55}>10</div>
                      <div className={styles.div56}>11:21:47</div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </>
        ) : (
          <div >
          </div>
          
      )}
    </div>
  );
};
 
export default Exchange;