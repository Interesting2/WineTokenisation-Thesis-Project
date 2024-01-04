import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './EditWine.module.css'; // Import your CSS module
import axios from 'axios';
import Web3 from 'web3';

const EditWine = ({ getAllWine, closeModal, wineTradingContract, wine, setConfirmationText, setConfirmationTitle, openModal}) => {

  const [formData, setFormData] = useState({
    wineName: wine.wine_name,
    wineIntro: wine.intro,
    winePrice: wine.price,
    wineQuantity: wine.current_num,
    wineImage: wine.pic_name,
  });

  const handleEditWineBackend = async (formData) => {
    const { wineName, wineVintage, wineIntro, winePrice, wineQuantity, wineImage } = formData;

    const wine_id = wine.wine_id;
    const wine_name = wineName;
    const price = winePrice;
    const intro = wineIntro;
    const current_num = wineQuantity;
    const pic_name = wineImage;
    const vintage = wineVintage;
    console.log("Changed to: ", pic_name)
    try {
      const response = await axios.post('http://localhost:3500/wine/updateWine', {
      wine_id,
      wine_name,
      price,
      intro,
      current_num,
      pic_name
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

  const handleEditWine = async () => {
    
    try {
      const { wineName, wineIntro, winePrice, wineQuantity, wineImage } = formData;
    console.log("Wine to be edit: ", wine);

    const web3 = new Web3(window.ethereum);
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    const accounts = await web3.eth.getAccounts();
    const tx = await wineTradingContract.methods.updateWineDetails(wine.wine_id, wineName, wineQuantity, winePrice, wineIntro).send({ from: accounts[0] })
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
            console.log("Transaction confirmed")

            openModal();
            setConfirmationText("You've edited " + wineName + " Successfully.")
            setConfirmationTitle("Wine edited")

            handleEditWineBackend(formData);
        }
    })
    .on('error', console.error);  // 如果交易失败，则触发
  
    console.log('Transaction: ', tx);
    console.log("Called Smart contract method\n\n\n")
    // Create a FormData object to send the image file
    // const formData = new FormData();
    // formData.append('wineName', wineName);
    // formData.append('wineVintage', wineVintage);
    // formData.append('wineIntro', wineIntro);
    // formData.append('winePrice', winePrice);
    // formData.append('wineQuantity', wineQuantity);
    // formData.append('wineImage', wineImage);
    } catch (error) {
      console.error('Error:', error);
    }
    
    
    
    
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
          
          <h2 className={styles.title}>Edit Wine</h2>
         
          <form onSubmit={handleSubmit}>
            <label htmlFor="wineName">Wine Name</label>
            <input
              type="text"
              name="wineName"
              placeholder="Wine Name"
              value={formData.wineName}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <label htmlFor="wineIntro">Wine Introduction</label>
            <textarea
              name="wineIntro"
              placeholder="Wine Introduction"
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
              placeholder="Wine Price"
              value={formData.winePrice}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <label htmlFor="wineQuantity">Quantity Available</label>
            <input
              type="text"
              name="wineQuantity"
              placeholder="Quantity Available"
              value={formData.wineQuantity}
              onChange={handleChange}
              required
              className={styles.input}
            />
            <button type="submit" className={styles.button} onClick={handleEditWine}>
              Submit
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditWine;
