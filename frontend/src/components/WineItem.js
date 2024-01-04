import React, {useState} from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import styles from './WineItem.module.css';
import 'boxicons/css/boxicons.min.css';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal';
import Web3 from 'web3';
import axios from 'axios';


const WineItem = ({ wine, openModal, wineTradingContract, getAllWinesBySeller }) => {
  const navigation = useNavigate();

  const handleEditWine = () => {
    openModal(1, wine);
  };

  const viewWineDetails = () => {
    navigation(`/wine-details/${wine.wine_id}`);
  };

  // Define animation variants
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };


  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [confirmationTitle, setConfirmationTitle] = useState("");
  const [isError, setIsError] = useState(false);

  const handleDeactivateWineBackend = () => {
    axios.post('http://localhost:3500/wine/deleteWine', {
      wine_id: wine.wine_id,
    }, {
        withCredentials: true,
      })
      .then(function (response) {
        const {wine} = response.data;
        console.log("Deleted: ", wine);
      })
      .catch(function (error) {
        console.log(error.response.status);
        console.log("Error: ", error.response.data);
      });
  }

  const handleUserConfirmDelete = async () => {
    setShowConfirmation(false);
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
      
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        wineTradingContract.methods.deactivateWine(wine.wine_id).send({
          from: accounts[0]
        })
        .then(result => {
          setShowConfirmation(true);
          
          setConfirmationText("You've successfully deactivated: " + wine.wine_name + " with wine id: " + wine.wine_id);
          setConfirmationTitle("Deactivate Wine");
          setIsError(true);

          handleDeactivateWineBackend();
        })
        .catch(error => {
          console.error('An error occurred:', error);
        });
      } catch(error) {
        console.log(error);
      }
    } else {
      setConfirmationText("Please Connect to your Metamask");
      setConfirmationTitle("Wallet not logged in");
      setIsError(true);
    }
    
  }

  const handleDeleteWine = () => {
    setIsError(false); // reset
    setShowConfirmation(true);
    
    setConfirmationText("Are you sure you want to deactivate this wine?");
    setConfirmationTitle("Wine Action Warning");
  }

  const handleCloseModal = () => {
    // when wine is deleted, user confirm to close modal and update the page with wines
    setShowConfirmation(false);
    getAllWinesBySeller();
  }

  return (

    <motion.div
      className={styles.productCard}
      key={wine.wine_id}
      variants={itemVariants} // Use the animation variants
      initial="initial"
      animate="animate"
    >
      {showConfirmation && (
        <ConfirmationModal 
          confirmationText={confirmationText} 
          confirmationTitle={confirmationTitle} 
          closeModal={handleCloseModal}
          confirmPurchase={handleUserConfirmDelete} 
          isError={isError}
        />
      )}
      <div className={styles.logoCart}>
        <div className={styles.editButton} onClick={handleEditWine}>
          <div className={styles.buttonLayer}></div>
          <button>Edit</button>
        </div>

        <div className={styles.editButton} onClick={handleDeleteWine}>
          <div className={styles.buttonLayer}></div>
          <button>Delete</button>
        </div>

        {/* <img
          className={styles.search11Icon}
          alt=""
          src="/threedot1.svg"
        /> */}
      </div>
      <div className={styles.mainImages}>
        <img id="blue" src={wine.pic_name} alt="blue" />
      </div>
      <div className={styles.shoeDetails}>
        <span className={styles.shoeName}>{wine.wine_name}</span>
        <p>{wine.intro}</p>
        
      </div>
      <div className={styles.colorPrice}>
        <div className={styles.colorOption}>
          <span className={styles.color}>Stock:</span>
          <div className={styles.circles}>
            <span className={`circle blue active ${styles.circle}`} id="blue"></span>
            <div>{wine.current_num}</div>
          </div>
        </div>
        <div className={styles.price}>
          <span className={styles.priceNum}>{wine.price} eth</span>
          <span className={styles.priceLetter}>Current Price</span>
        </div>
      </div>
      <div className={styles.button} onClick={viewWineDetails}>
        <div className={styles.buttonLayer}></div>
        <button>View</button>
      </div>
    </motion.div>
  );
};

export default WineItem;
