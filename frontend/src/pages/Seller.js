import style from "./Seller.module.css";
import styles from "./WineMarketplace.module.css";
import NavBar from '../components/NavBar';
import CreateWine from '../components/CreateWine';
import EditWine from '../components/EditWine';
import SellerBanner from '../components/SellerBanner';
import WineItem from '../components/WineItem';
import Loading from '../components/Loading';
import ConfirmationModal from '../components/ConfirmationModal';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Web3 from 'web3'

const Seller = () => {

  const navigation = useNavigate();
  const [wines, setWines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(0);
  const [editWine, setEditWine] = useState(null);
  
  const wineTradingABI = [{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"}],"name":"activateWine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"stock","type":"uint256"},{"internalType":"string","name":"intro","type":"string"},{"internalType":"uint16","name":"vintage","type":"uint16"}],"name":"addWine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"}],"name":"deactivateWine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"contract WineToken","name":"_wineToken","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"purchaseWine","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"},{"internalType":"string","name":"newName","type":"string"},{"internalType":"uint256","name":"newStock","type":"uint256"},{"internalType":"uint256","name":"newPrice","type":"uint256"},{"internalType":"string","name":"newIntro","type":"string"}],"name":"updateWineDetails","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"},{"internalType":"string","name":"newIntro","type":"string"}],"name":"updateWineIntro","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"},{"internalType":"string","name":"newName","type":"string"}],"name":"updateWineName","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"},{"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"updateWinePrice","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"},{"internalType":"uint256","name":"newStock","type":"uint256"}],"name":"updateWineStock","outputs":[],"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"wineId","type":"uint256"},{"indexed":false,"internalType":"string","name":"name","type":"string"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"stock","type":"uint256"},{"indexed":false,"internalType":"string","name":"intro","type":"string"},{"indexed":false,"internalType":"uint16","name":"vintage","type":"uint16"},{"indexed":true,"internalType":"address","name":"seller","type":"address"}],"name":"WineAdded","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"wineId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newIntro","type":"string"}],"name":"WineIntroUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"wineId","type":"uint256"},{"indexed":false,"internalType":"string","name":"newName","type":"string"}],"name":"WineNameUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"wineId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newPrice","type":"uint256"}],"name":"WinePriceUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"wineId","type":"uint256"},{"indexed":true,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"WinePurchased","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"wineId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newStock","type":"uint256"}],"name":"WineStockUpdated","type":"event"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"}],"name":"getWineDetails","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint16","name":"","type":"uint16"},{"internalType":"address","name":"","type":"address"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"}],"name":"getWinePrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWinesCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"wineId","type":"uint256"}],"name":"getWineStock","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"nextWineId","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"wines","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"uint256","name":"stock","type":"uint256"},{"internalType":"string","name":"intro","type":"string"},{"internalType":"uint16","name":"vintage","type":"uint16"},{"internalType":"address","name":"seller","type":"address"},{"internalType":"bool","name":"isActive","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"wineToken","outputs":[{"internalType":"contract WineToken","name":"","type":"address"}],"stateMutability":"view","type":"function"}];
  const wineTradingAddress = '0x854370ED908CD42c48763707B3d0626Ed461A7E9';
  const web3 = new Web3(window.ethereum);
  const wineTradingContract = new web3.eth.Contract(wineTradingABI, wineTradingAddress);

  const openModal = (mode, wine) => {
    setIsModalOpen(true);
    setModalMode(mode);

    if (mode === 1) setEditWine(wine)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePriceAsc = () => {
    axios.get('http://localhost:3500/wine/getWineBySellerIdOrderByPrice', {
        withCredentials: true
    })
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
    axios.get('http://localhost:3500/wine/getWineBySellerIdOrderByPrice?order_by=1', {
        withCredentials: true
    })
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
    axios.get('http://localhost:3500/wine/getWineBySellerIdOrderByVintage', {
        withCredentials: true
    })
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
    axios.get('http://localhost:3500/wine/getWineBySellerIdOrderByVintage?order_by=1', {
        withCredentials: true
    })
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


  const [wineTransactions, setWineTransactions] = useState([]);

  const fetchWineInfo = async (wineId) => {
      console.log(wineId)
      try {
          const wineInfoResponse = await axios.post(`http://localhost:3500/wine/getWineByWineId?wine_id=${wineId}`);
          const {wines} = wineInfoResponse.data;
          console.log(wines);
          return wines;
      } catch (error) {
        console.error('Error fetching wine info:', error);
        return null;
      }
  };
  const getAllWineSellerTransaction = async () => {
      axios.get('http://localhost:3500/wineTransaction/getWineTransactionBySellerId', {
          withCredentials: true,
        })
      .then(async function (response) {
          console.log(response);
  
          const {wineTransactions} = response.data;
          console.log(wineTransactions)

          // Fetch wine info for each transaction
          const wineTransactionPromises = wineTransactions.map(async (transaction) => {
              const wineId = transaction.wine_id;
              const wineInfo = await fetchWineInfo(wineId);
              return {
              ...transaction,
              wineInfo,
              };
              
          });

          // Wait for all wine info requests to complete
          const wineTransactionsWithInfo = await Promise.all(wineTransactionPromises);
          console.log(wineTransactionsWithInfo)
          // Update state with aggregated data
          setWineTransactions(wineTransactionsWithInfo);
          
          
      })
      .catch(function (error) {
          console.log(error);
      });
  }


  const getAllWinesBySeller = () => {
    axios.post('http://localhost:3500/wine/getWineBySellerId', {
      status_list:[0] 
    }, {
        withCredentials: true,
      })
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

  useEffect(() => {
    getAllWinesBySeller();
    getAllWineSellerTransaction();
  }, [])

  const openConfirmationModal = () => {
    setShowConfirmation(true);
  }

  const [showModal, setShowModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Processing your details");
  const [isLoading, setIsLoading] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [confirmationTitle, setConfirmationTitle] = useState("");
  const [isError, setIsError] = useState(true);
  
  return (
    <div className={styles.dashboard}>
      <NavBar setShowModal={setShowModal} setIsLoading={setIsLoading} setLoadingText={setLoadingText} clickedButton={"seller"}/>
      {showConfirmation && (
          <ConfirmationModal 
            confirmationText={confirmationText} 
            confirmationTitle={confirmationTitle} 
            closeModal={setShowConfirmation}
            isError={isError}
          />
      )}
      {isModalOpen && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span className={style.close} onClick={closeModal}>
              &times;
            </span>

            {modalMode === 0 ? (
                // Render CreateWine component when modalMode is 0
                <CreateWine
                getAllWine={getAllWinesBySeller}
                closeModal={closeModal}
                wineTradingContract={wineTradingContract}
                setConfirmationText={setConfirmationText} 
                setConfirmationTitle={setConfirmationTitle} 
                openModal={openConfirmationModal}
                />
            ) : (
                // Render EditWine component when modalMode is not 0
                <EditWine
                getAllWine={getAllWinesBySeller}
                closeModal={closeModal}
                wineTradingContract={wineTradingContract}
                wine={editWine}
                setConfirmationText={setConfirmationText} 
                setConfirmationTitle={setConfirmationTitle} 
                openModal={openConfirmationModal}
                />
            )}
          </div>
        </div>
      )}

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
              <span>Manage Wines</span>
            </div>
          </h2>
          
        </div>
        <div className={style.sellerBanner}>
            <SellerBanner title={"Create Wine"} bannerAction={openModal} bannerMode={0} bannerDescription={"Discover and Manage your own Wines"}/>
            
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
                <WineItem wine={wine} openModal={openModal} wineTradingContract={wineTradingContract} getAllWinesBySeller={getAllWinesBySeller} key={wine.wine_id}/>
             ))}
        </div>

        <div className={style.wineTransactions}>
                    
            <div className={style.recentlyAddedWrapper}>
                <b className={style.recentlyAdded}>Your Sell Wine Transactions</b>
            </div>
            
        </div>

        <table>
            
            <thead>
                <tr>
                <th className={styles.invoice}>Name</th>
                <th className={styles.company}>Vintage</th>
                <th className={styles.dueDate}>Transaction Time</th>
                <th className={styles.status}>Price(eth)</th>
                <th className={styles.amount}>Quantity</th>
                </tr>
            </thead>
            <tbody>
                
                {wineTransactions.map((wineTransaction) => (
                    <tr key={wineTransaction.wine_transaction_id}>
                        <td><a href="#">{wineTransaction.id}</a>{wineTransaction.wineInfo.wine_name}</td>
                        <td className={styles.company}>{wineTransaction.wineInfo.vintage}</td>
                        <td className={styles.dueDate}>
                          {new Date(wineTransaction.transaction_time).toLocaleString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                          })}
                        </td>
                        <td>
                            <p className={styles.statusUnpaid}>{wineTransaction.unit_price}</p>
                        </td>
                        <td className={styles.amount}>{wineTransaction.num}</td>
                    </tr>
                ))}
                
               
                
            </tbody>
        </table>
        
        
      </div>
    </div>
  );
};

export default Seller;
