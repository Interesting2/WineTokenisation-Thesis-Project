import React, {useState} from 'react'
import styles from './WineCard.module.css'
import axios from 'axios'
import Web3 from 'web3'
import { motion, AnimatePresence } from 'framer-motion';

import ConfirmationModal from './ConfirmationModal';
import Loading from './Loading';

const WineCard = ({wine, wineTradingContract, wineTradingAddress, getAllWine}) => {

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleBuyWineBackend = async () => {
    axios.post('http://localhost:3500/wineTransaction/addWineTransaction', {
      wine_id: wine.wine_id,
      seller_id: wine.seller_id,
      unit_price: wine.price,
      num: quantity
    }, {
      withCredentials: true,
    })
    .then(function (response) {
      console.log(response.data);
      getAllWine();

    })
    .catch(function (error) {
      console.log(error);
    })
    console.log("\n\n\n")
  }



  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [confirmationTitle, setConfirmationTitle] = useState("");
  const [isError, setIsError] = useState(false);

  const checkStockEnough = async () => {
    try {
      await wineTradingContract.methods.getWineStock(wine.wine_id).call()
      .then(result => {
        console.log('Wine stock:', result);
        if (parseInt(result) < quantity) {
          // alert("Transaction failed due to insufficient stock.")
          setConfirmationText("Transaction failed due to insufficient stock.");
          setConfirmationTitle("Error Purchasing Wine");
          setIsError(true);
          
          
          return;
        }
        checkPriceEnough();

      })
      .catch(error => {
        console.error('An error occurred:', error);
        setShowConfirmation(false);


      });
    }
    catch (err) {
      const endIndex = err.message.search('{')
    
      if (endIndex >= 0) {
        throw err.message.substring(0, endIndex);
        
      }
      setShowConfirmation(false);

    }
  }

  const checkPriceEnough = async() => {
    
    const web3 = new Web3(window.ethereum);

    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0]; 
    const wineTokenABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
    const wineTokenAddress = "0xb22cB2F9B620ede24CB06C8f0C8892e464A9439b";

    const wineTokenContract = new web3.eth.Contract(wineTokenABI, wineTokenAddress);
    const wineTokenBalance = await wineTokenContract.methods.balanceOf(userAddress).call();
    
    const myWineToken = web3.utils.fromWei(wineTokenBalance, 'ether');
    console.log("Utility Token: " + wineTokenBalance, myWineToken);

    if (myWineToken < (wine.price * quantity)) {

      setConfirmationText("Transaction failed due to insufficient utility token.");
      setConfirmationTitle("Error Purchasing Wine");
      setIsError(true);
    } else {
      setShowConfirmation(false); 
      handlePurchaseWine();
    }
  }

  const checkWineIsActive = async () => {
    try {
      await wineTradingContract.methods.getWineDetails(wine.wine_id).call()
      .then(result => {
        console.log('Wine details:', result);
        console.log(result[7]);

        if (result[7] === false) {
          setConfirmationText("Transaction failed due to wine being unavailable.");
          setConfirmationTitle("Error Purchasing Wine");
          setIsError(true);
        } else {
          checkStockEnough();
        }

      })
      .catch(error => {
        console.error('An error occurred:', error);
        setShowConfirmation(false);
      });
    }
    catch (err) {
      const endIndex = err.message.search('{')
    
      if (endIndex >= 0) {
        throw err.message.substring(0, endIndex);
        
      }
      setShowConfirmation(false);

    } 
  }

  const handlePurchaseWine = async () => {

    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const accounts = await web3.eth.getAccounts();


    const tokenAddress = "0xb22cB2F9B620ede24CB06C8f0C8892e464A9439b";
    const tokenABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
    const contractAddress = '0x61De0402cEFb675C6738D33cEd517Be23392b326'; // Replace with your contract address

    const tokenContract = new web3.eth.Contract(tokenABI, tokenAddress);
    await tokenContract.methods.approve(wineTradingAddress, wine.price * quantity).send({ from: accounts[0] });
    
    try {

      const tx = await wineTradingContract.methods.purchaseWine(wine.wine_id, quantity).send({ from: accounts[0] })
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
              console.log("Confirmed Purchase wine");
              setShowConfirmation(true);

              setConfirmationText("You've successfully purchased " + quantity + " " + wine.wine_name);
              setConfirmationTitle("Purchased Wine Success");
              setIsError(true);
              
              handleBuyWineBackend();
          }
      })
      .on('error', console.error);  // 如果交易失败，则触发
     
      console.log('Transaction: ', tx);
    } catch (error) {
      console.error("Transaction failed:", error.message);

    }
  }

  const showConfirmationModal = () => {
    setIsError(false); //reset

    setShowConfirmation(true);
    setConfirmationText("Are you sure you want to buy " + quantity + " bottles of " + wine.wine_name + " with a total price of " + (quantity * wine.price) + "WUT?");
    setConfirmationTitle("Purchase Wine?");
    // alert("Are you sure you want to buy " + quantity + " bottles of " + wine.wine_name + "?");
  }

  // const testDeactivateWine = async () => {
  //   try {
  //     await wineTradingContract.methods.deactivateWine(wine.wine_id).call();
  //     alert("Wine deactivated")
  //   }
  //   catch (err) {
  //     const endIndex = err.message.search('{')
    
  //     if (endIndex >= 0) {
  //       throw err.message.substring(0, endIndex);
        
  //     }
  //     setShowConfirmation(false);

  //   } 
  // }

  const handleUserConfirmPurchase = () => {
    // testDeactivateWine();
    checkWineIsActive();
  }

  const handleBuyWine = async (wine) => {
    console.log("HANDLE BUY WINE")
    console.log(wine);
    console.log(quantity);

    showConfirmationModal();
  }

  return (
    <>
      {showConfirmation && (
        <ConfirmationModal 
          confirmationText={confirmationText} 
          confirmationTitle={confirmationTitle} 
          closeModal={setShowConfirmation}
          confirmPurchase={handleUserConfirmPurchase} 
          isError={isError}
        />
          
        // <div></div>
      )}
      <motion.div
        className={styles.frameWrapper5}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className={styles.stockContainer}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className={styles.stockNum}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Stock: {wine.current_num}
          </motion.div>
        </motion.div>
        <div className={styles.taskCardParent}>
          <div className={styles.taskCard}>
            <img
              className={styles.cardImageIcon}
              alt=""
              src={wine.pic_name}
            />
            <div className={styles.cardContent}>
              <div className={styles.titleHolder}>
                <div className={styles.highfidelityDesign}>
                  {wine.wine_name}
                </div>
                <div className={styles.makeClearDesign}>
                  Vintage: {wine.vintage}
                </div>
                <div className={styles.makeClearDesign}>
                  Current Price: {wine.price} WUT
                </div>
              </div>
             
            </div>
            <div className={styles.quantityControl}>
              <button onClick={handleDecrement}>-</button>
              <span className={styles.quantity}>{quantity}</span>
              <button onClick={handleIncrement}>+</button>
            </div>
          </div>
          <button className={styles.ctaAddTask} onClick={() => handleBuyWine(wine)}>
            <img className={styles.search11Icon} alt="" src="/plus1.svg" />
            <div className={styles.addTask4}>Buy</div>
          </button>
        </div>
      </motion.div>
    </>
  );
}

export default WineCard