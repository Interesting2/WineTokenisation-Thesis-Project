import styles from "./WineHistory.module.css";
import NavBar from '../components/NavBar';
import WineTransactionTable from '../components/WineTransactionTable';

import Loading from '../components/Loading';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const WineHistory = () => {

  const navigation = useNavigate();
  const [wines, setWines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const navigateSeeMarketplace = () => {
    navigation('/marketplace');
  }

  const directToSeller = () => {
    navigation('/seller')
  }

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
      })
      .catch(function (error) {
        console.log(error);
        console.log("NOT LOGGED IN");
        navigation('/signin')
      });
  };

  useEffect(() => {
    verifyUser();
  }, [])  

  const [showModal, setShowModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Processing your details");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.dashboard}>
      <NavBar setShowModal={setShowModal} setIsLoading={setIsLoading} setLoadingText={setLoadingText} />

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

      <div className={styles.dashboardcontent}>
        <div className={styles.topBar}>
          <h2 className={styles.title}>
            <div>
              <span>Wine History</span>
            </div>
          </h2>
          
        </div>

        <div className={styles.bannerWrapper}>
          <div className={styles.banner}>
            <div className={styles.discoverCreateAndSellYourParent}>
              <b className={styles.discoverCreateAnd}>
                Discover, Create and Sell Your Own Wine.
              </b>
              <div className={styles.frameParent}>
                <button className={styles.discoverWrapper} onClick={navigateSeeMarketplace}>
                  <b className={styles.discover}>Marketplace</b>
                </button>
                <button className={styles.createWrapper}>
                  <b className={styles.create} onClick={directToSeller}>Create</b>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <WineTransactionTable />  
       
        
      </div>
    </div>
  );
};

export default WineHistory;

