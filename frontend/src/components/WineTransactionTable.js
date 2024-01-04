import React, {useEffect, useState} from 'react'
import styles from './WineTransactionTable.module.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const WineTransactionTable = () => {
    
    const [wineTransactions, setWineTransactions] = useState([]);
    const navigation = useNavigate();

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
    const getAllWineTransaction = async () => {
        axios.get('http://localhost:3500/wineTransaction/getWineTransactionByBuyerId', {
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

    useEffect(() => {
        getAllWineTransaction();
    }, [])

    const viewWineDetails = (wine_id) => {
        navigation(`/wine-details/${wine_id}`);
    };

  return (
    <div className={styles.wineTransactionTable}>
        <div className={styles.wineTransactions}>
                
            <div className={styles.recentlyAddedWrapper}>
                <b className={styles.recentlyAdded}>Recently Bought</b>
            </div>
            
        </div>
        <div className={styles.frameParent6}>
            {wineTransactions.map((wineTransaction) => (
                <div className={styles.mediumLocation1} key={wineTransaction.wine_transaction_id}>
                    <div className={styles.card}>
                        <img
                        className={styles.frameIcon}
                        alt=""
                        src={wineTransaction.wineInfo.pic_name}
                        />
                    </div>
                    <div className={styles.text2}>
                        <b className={styles.contentTitle}>{wineTransaction.wineInfo.wine_name} {wineTransaction.wineInfo.vintage}</b>
                        <div className={styles.tag}>Current Price: {wineTransaction.unit_price}eth</div>
                    </div>
                    
                    <b className={styles.bid}>Quantity Bought: {wineTransaction.num}</b>
                    <div className={styles.mediumButton} onClick={() => { viewWineDetails(wineTransaction.wine_id) }}>
                        <div className={styles.mediumButton1}>View</div>
                    </div>
                    
                </div>
            ))}
        </div> 
        
        <div className={styles.wineTransactions}>
                    
            <div className={styles.recentlyAddedWrapper}>
                <b className={styles.recentlyAdded}>Your Buy Wine Transactions</b>
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
                    <tr>
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
  )
}

export default WineTransactionTable