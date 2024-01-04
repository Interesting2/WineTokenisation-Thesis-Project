import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './CreateWine.module.css'; // Import your CSS module
import axios from 'axios';
import Web3 from 'web3';
import ConfirmationModal from './ConfirmationModal';

const CreateWine = ({ getAllWine, closeModal, wineTradingContract, setConfirmationText, setConfirmationTitle, openModal }) => {

  const [formData, setFormData] = useState({
    wineId: '',
    wineName: '',
    wineVintage: '',
    wineIntro: '',
    winePrice: '',
    wineQuantity: '',
    wineImage: null,
  });

  const handleCreateWineBackend = async (formData, result) => {
    const { wineName, wineVintage, wineIntro, winePrice, wineQuantity, wineImage } = formData;

    const wine_id = parseInt(result) - 1;
    const wine_name = wineName;
    const price = winePrice;
    const intro = wineIntro;
    const current_num = wineQuantity;
    const pic_name = wineImage;
    const vintage = wineVintage;
    try {
      const response = await axios.post('http://localhost:3500/wine/sellWine', {
      wine_id,
      wine_name,
      price,
      intro,
      current_num,
      pic_name,
      wineQuantity,
      vintage
    }, {
      withCredentials: true,
    });
  
      if (response.status === 200) {
        const result = response.data;
        // Handle the result from the backend, which may include sell_result
        console.log(result);

        getAllWine();
      } else {
        // Handle errors if the request was not successful
        console.error('Failed to sell wine.');
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error:', error);
    }
  }

  const handleCreateWine = async () => {

    const { wineName, wineVintage, wineIntro, winePrice, wineQuantity, wineImage } = formData;

    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const accounts = await web3.eth.getAccounts();
    const tx = await wineTradingContract.methods.addWine(wineName, winePrice, wineQuantity, wineIntro, wineVintage).send({ from: accounts[0] })
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
        if(Number(confirmationNumber.confirmations) == 1) { 
          wineTradingContract.methods.getWinesCount().call()
          .then(result => {
            console.log('Number of wines:', parseInt(result));
            console.log("Confirmed Created wine")
            
            openModal();
            setConfirmationText("You've created " + wineQuantity + " " + wineName + " Successfully.")

            setConfirmationTitle("Wine Created")

            handleCreateWineBackend(formData, result);
          })
          .catch(error => {
            console.error('An error occurred:', error);
          });
            
        }
    })
    .on('error', console.error);  // 如果交易失败，则触发
  
    console.log('Transaction: ', tx);
    console.log("Called Smart contract method\n\n\n")
  };

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const name = file.name;
    console.log(name)
    setFormData({ ...formData, wineImage: name });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and image upload logic here
    console.log('Form submitted with data:', formData);
    closeModal();
  };

  return (
    <AnimatePresence>
      <motion.div
        className={styles.modal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles['modal-content']}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          
          <h2 className={styles.title}>Create Wine</h2>
         
          <form onSubmit={handleSubmit}>
            <label htmlFor="wineName">Wine Name</label>
            <input
              type="text"
              name="wineName" 
              value={formData.wineName}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <label htmlFor="wineVintage">Wine Vintage</label>
            <input
              type="text"
              name="wineVintage"  
              value={formData.wineVintage}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <label htmlFor="wineIntro">Wine Intro</label>
            <textarea
              name="wineIntro"  
              value={formData.wineIntro}
              onChange={handleChange}
              rows="4"
              required
              className={styles.input}
            ></textarea>
            <label htmlFor="winePrice">Wine Price</label>
            <input
              type="text"
              name="winePrice"  
              value={formData.winePrice}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <label htmlFor="wineQuantity">Wine Quantity</label>
            <input
              type="text"
              name="wineQuantity" 
              value={formData.wineQuantity}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <input
              type="file"
              name="wineImage"
              accept="image/*"
              onChange={handleImageChange}
              className={styles.input}
            />
            <button type="submit" className={styles.button} onClick={handleCreateWine}>
              Submit
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CreateWine;
