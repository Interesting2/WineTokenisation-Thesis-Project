import React, {useEffect, useState} from 'react';
import style from './WineDetails.module.css';
import styles from "./WineMarketplace.module.css";
import 'boxicons/css/boxicons.min.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import NavBar from '../components/NavBar';
import SellerBanner from '../components/SellerBanner';

import { motion, AnimatePresence } from 'framer-motion';


const WineDetails = ({}) => {

    const params = useParams();
    const wineId = params.wine_id;
    console.log(wineId)

    const [wine, setWine] = useState({});
    const [wineTransactions, setWineTransactions] = useState([]);
    const [showTable, setShowTable] = useState(false);

    const navigation = useNavigate(); 
    const bannerAction = () => {
        navigation(-1);
    }

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

    const showTransactionDetails = () => {
        if (showTable) {
          setShowTable(false);
          return;
        }
        axios.get(`http://localhost:3500/wineTransaction/getWineTransactionByWineId?wine_id=${wineId}`, {
        withCredentials: true
        })
        .then(async function (response) {
            // console.log(response);
    
            const {wineTransactions} = response.data;
            console.log(wineTransactions)

            
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
          setShowTable(true);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    const getWineInfo = () => {
        axios.post(`http://localhost:3500/wine/getWineByWineId?wine_id=${wineId}`, {}, {
        withCredentials: true,
        })
        .then(function (response) {
            console.log(response);
    
            const {wines} = response.data;
            setWine(wines); // Update the state with wine data
            console.log(wines)
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        getWineInfo();
    }, [])

    const [activeLink, setActiveLink] = useState('dot5');
    const [containerBoxShadow, setContainerBoxShadow] = useState('');

    const handleLinkClick = (linkId, boxShadowColor) => {
      console.log(linkId, boxShadowColor);
      setActiveLink(linkId);
      setContainerBoxShadow(boxShadowColor);
    };

    const getContainerClass = () => {
      switch (activeLink) {
        case 'dot1':
          return `${style.container} ${style.boxShadow1}`;
        case 'dot2':
          return `${style.container} ${style.boxShadow2}`;
        case 'dot3':
          return `${style.container} ${style.boxShadow3}`;
        case 'dot4':
          return `${style.container} ${style.boxShadow4}`;
        case 'dot5':
          return `${style.container} ${style.boxShadow5}`;
        default:
          return style.container; // Default class if no link is active
      }
    };

    return (
      
      <div className={styles.dashboard}>
        <NavBar />

            <div className={style.dashboardcontent}>
                <div className={styles.topBar}>
                <div className={styles.wineMarketplace}>Wine Details Page</div>
                <div className={styles.topBar1}>
                    <div className={styles.icons}>
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
                    </div>
                </div>
            </div>
            <div className={style.sellerBanner}>
                <SellerBanner title={"Manage"} bannerAction={bannerAction} bannerDescription={"See Detailed Infomation of the wine"}/>
                
            </div>


        <div className={getContainerClass()}>
          <div className={style.productImage}>
            <img src={`/${wine.pic_name}`} alt="" className={style.productPic} />
          </div>
    
          <div className={style.productDetails}>
            <header>
              <h1 className={style.title}>{wine.wine_name}</h1>
              <span className={style.colorCat}>Vintage: {wine.vintage}</span>
              <div className={style.price}>
                <span className={style.before}>Current Price: </span>
                <span className={style.current}>{wine.price} eth</span>
              </div>

            </header>
            <article>
              <h5>Description</h5>
              <p>
                {wine.intro}
              </p>
            </article>
            <div className={style.controls}>
              <div className={style.color}>
                <h5>color</h5>
                <ul>
                  <li><a 
                      className={`${style.colors} ${style.colorBdot1} ${activeLink === 'dot1' ? style.active : ''}`}
                      onClick={() => handleLinkClick('dot1', 'style.boxShadow1')}
                      >
                      </a>
                  </li>
                  <li><a 
                      className={`${style.colors} ${style.colorBdot2} ${activeLink === 'dot2' ? style.active : ''}`}
                      onClick={() => handleLinkClick('dot2', 'style.boxShadow2')}
                      >
                      </a>
                  </li>
                  <li><a 
                      className={`${style.colors} ${style.colorBdot3} ${activeLink === 'dot3' ? style.active : ''}`}
                      onClick={() => handleLinkClick('dot3', 'style.boxShadow3')}
                      >
                      </a>
                  </li>
                  <li><a 
                      className={`${style.colors} ${style.colorBdot4} ${activeLink === 'dot4' ? style.active : ''}`}
                      onClick={() => handleLinkClick('dot4', 'style.boxShadow4')}
                      >
                      </a>
                  </li>
                  <li><a 
                      className={`${style.colors} ${style.colorBdot5} ${activeLink === 'dot5' ? style.active : ''}`}
                      onClick={() => handleLinkClick('dot5', 'style.boxShadow5')}
                      >
                      </a>
                  </li>
                </ul>
              </div>
              <div className={style.size}>
                <h5>Seller Id</h5>
                <a className={style.option}>{wine.seller_id}</a>
              </div>
              <div className={style.qty}>
                <h5>Stock</h5>
                <a>{wine.current_num}</a>
              </div>
            </div>
            <div className={style.footer}>
              <button type="button" onClick={showTransactionDetails}>
                <img src="http://co0kie.github.io/codepen/nike-product-page/cart.png" alt="" />
                <span>{showTable ? 'Hide Transaction Details' : 'Show Transaction Details & Scroll Down'}</span>

              </button>
              {/* <a href="#!"><img src="http://co0kie.github.io/codepen/nike-product-page/share.png" alt="" /></a> */}
            </div>
          </div>
        </div>
        
        <AnimatePresence>
          {showTable && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: 200 }} // Move it down 200 pixels initially (adjust as needed)
              animate={{ opacity: 1, height: 'auto', y: 0, margin: '20px' }} // Reset y to 0 for animation
              exit={{ opacity: 0, height: 0, y: 200 }} // Move it down 200 pixels when exiting
              transition={{ duration: 0.5 }}
            >
               <div className={style.wineTransactions}>
                    
                    <div className={style.recentlyAddedWrapper}>
                        <b className={style.recentlyAdded}>Wine Transaction Details</b>
                    </div>
                    
                </div>
              <table> 
                  <thead>
                      <tr>
                      <th className={style.invoice}>Name</th>
                      <th className={style.company}>Vintage</th>
                      <th className={style.dueDate}>Transaction Time</th>
                      <th className={style.status}>Price(eth)</th>
                      <th className={style.amount}>Quantity</th>
                      </tr>
                  </thead>
                  <tbody>
                      
                      {wineTransactions.map((wineTransaction) => (
                          <tr key={wineTransaction.wine_transaction_id}>
                              <td><a href="#">{wineTransaction.id}</a>{wineTransaction.wineInfo.wine_name}</td>
                              <td className={style.company}>{wineTransaction.wineInfo.vintage}</td>
                              <td className={style.dueDate}>
                                  {new Date(wineTransaction.transaction_time).toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                              </td>
                              <td>
                                  <p className={style.statusUnpaid}>{wineTransaction.unit_price}</p>
                              </td>
                              <td className={style.amount}>{wineTransaction.num}</td>
                          </tr>
                      ))}
                      
                    
                      
                  </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    );
}

export default WineDetails;
