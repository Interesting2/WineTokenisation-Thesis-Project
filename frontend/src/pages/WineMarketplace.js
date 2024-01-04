import styles from "./WineMarketplace.module.css";
import NavBar from '../components/NavBar';

import WineCard from '../components/WineCard';
import Loading from '../components/Loading';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3'

const WineMarketplace = ({ }) => {

  const navigation = useNavigate();
  const [wines, setWines] = useState([]);
  
  const wineTradingABI = [{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"}],"name":"activateWine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"stock","type":"uint256"},{"internalType":"string","name":"intro","type":"string"},{"internalType":"uint16","name":"vintage","type":"uint16"}],"name":"addWine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"}],"name":"deactivateWine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract WineToken","name":"_wineToken","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"purchaseWine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"},{"internalType":"string","name":"newName","type":"string"},{"internalType":"uint256","name":"newStock","type":"uint256"},{"internalType":"uint256","name":"newPrice","type":"uint256"},{"internalType":"string","name":"newIntro","type":"string"}],"name":"updateWineDetails","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"},{"internalType":"string","name":"newIntro","type":"string"}],"name":"updateWineIntro","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"},{"internalType":"string","name":"newName","type":"string"}],"name":"updateWineName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"},{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updateWinePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"},{"internalType":"uint256","name":"newStock","type":"uint256"}],"name":"updateWineStock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"wineId","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"stock","type":"uint256"},{"indexed":false,"internalType":"string","name":"intro","type":"string"},{"indexed":false,"internalType":"uint16","name":"vintage","type":"uint16"},{"indexed":true,"internalType":"address","name":"seller","type":"address"}],"name":"WineAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"wineId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newIntro","type":"string"}],"name":"WineIntroUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"wineId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newName","type":"string"}],"name":"WineNameUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"wineId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"WinePriceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"wineId","type":"uint256"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WinePurchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"wineId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newStock","type":"uint256"}],"name":"WineStockUpdated","type":"event"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"}],"name":"getWineDetails","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"address","name":"","type":"address"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"}],"name":"getWinePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWinesCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"}],"name":"getWineStock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextWineId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wines","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"stock","type":"uint256"},{"internalType":"string","name":"intro","type":"string"},{"internalType":"uint16","name":"vintage","type":"uint16"},{"internalType":"address","name":"seller","type":"address"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wineToken","outputs":[{"internalType":"contract WineToken","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
  const wineTradingAddress = '0x854370ED908CD42c48763707B3d0626Ed461A7E9';
  const web3 = new Web3(window.ethereum);
  const wineTradingContract = new web3.eth.Contract(wineTradingABI, wineTradingAddress);

  const navigateSeeHistory = () => {
    navigation('/wine-history');
  }

  const navigateSeller = () => {
    navigation('/seller');
  }


  const handlePriceAsc = () => {
    axios.get('http://localhost:3500/wine/getAllWineByPrice')
      .then(function (response) {
          console.log(response);
 
          const {wines} = response.data;
          setWines(wines); // Update the state with wine data
          console.log(wines)
          
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  const handlePriceDesc = () => {
    axios.get('http://localhost:3500/wine/getAllWineByPrice?order_by=1')
      .then(function (response) {
          console.log(response);
 
          const {wines} = response.data;
          setWines(wines); // Update the state with wine data
          console.log(wines)
          
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  const handleVintageAsc = () => {
    axios.get('http://localhost:3500/wine/getAllWineByVintage')
      .then(function (response) {
          console.log(response);
 
          const {wines} = response.data;
          setWines(wines); // Update the state with wine data
          console.log(wines)
          
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  const handleVintageDesc = () => {
    axios.get('http://localhost:3500/wine/getAllWineByVintage?order_by=1')
      .then(function (response) {
          console.log(response);
 
          const {wines} = response.data;
          setWines(wines); // Update the state with wine data
          console.log(wines)
          
      })
      .catch(function (error) {
          console.log(error);
      });
  }

  const getAllWine = () => {
    axios.get('http://localhost:3500/wine/getAllWine')
      .then(function (response) {
          console.log(response);
 
          const {wines} = response.data;
          setWines(wines); // Update the state with wine data
          console.log(wines)
          
      })
      .catch(function (error) {
          console.log(error);
      });
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
  
        getAllWine();
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
        <NavBar setShowModal={setShowModal} setIsLoading={setIsLoading} setLoadingText={setLoadingText} clickedButton={"marketplace"}/>
        <div className={styles.dashboardcontent}>
          <div className={styles.topBar}>
            <h2 className={styles.title}>
              <div>
                <span>Wine Marketplace</span>
              </div>
            </h2>
            {/* <div className={styles.wineMarketplace}>Wine Marketplace</div> */}
            <div className={styles.topBar1}>
              
            </div>
          </div>
          <div className={styles.bannerWrapper}>
            <div className={styles.banner}>
              <div className={styles.discoverCreateAndSellYourParent}>
                <b className={styles.discoverCreateAnd}>
                  Discover, Create and Sell Your Own Wine.
                </b>
                <div className={styles.frameParent}>
                  <button className={styles.discoverWrapper} onClick={navigateSeeHistory}>
                    <b className={styles.discover}>History</b>
                  </button>
                  <button className={styles.createWrapper}>
                    <b className={styles.create} onClick={navigateSeller}>Create</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.dashboardcontentInner}>
            <div className={styles.menuParent}>
              <button className={styles.menu} onClick={handlePriceAsc}>
                <img className={styles.icon} alt="" src="/sort-descending.png" />
                <div className={styles.addTask}>Price</div>
              </button>
              <button className={styles.menu} onClick={handlePriceDesc}>
                <img className={styles.icon} alt="" src="/sort.png" />
                <div className={styles.addTask}>Price </div>
              </button>
              <button className={styles.menu} onClick={handleVintageAsc}>
                <img className={styles.icon} alt="" src="/sort-descending.png" />
                <div className={styles.addTask}>Vintage</div>
              </button>
              <button className={styles.menu} onClick={handleVintageDesc}>
                <img className={styles.icon} alt="" src="/sort.png" />
                <div className={styles.addTask}>Vintage </div>
              </button>
            </div>
          </div>
          
          <div className={styles.frameParent6}>
            
          {wines.map((wine) => (
              <WineCard 
                key={wine.id}
                wine={wine} 
                wineTradingContract={wineTradingContract} 
                wineTradingAddress={wineTradingAddress} 
                getAllWine={getAllWine}
              />
            ))}
          </div>
          
        </div>
        </>
      ) : (
        <div className={styles.notVerifiedContent}>
            {/* Content to display when the user is not verified */}
            {/* <p>Please verify your account.</p> */}
          </div>
          
      )}
    </div>
  );
};

export default WineMarketplace;
