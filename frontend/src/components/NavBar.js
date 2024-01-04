import React from 'react'
import styles from './NavBar.module.css'
import { useNavigate } from 'react-router-dom';

import { useEffect, useState } from "react";
import axios from "axios";

import Loading from "../components/Loading"

const NavBar = ({setShowModal, setLoadingText, setIsLoading, clickedButton}) => {

  const navigation = useNavigate();
  const directDashboard = () => {
    navigation('/dashboard');
  }

  const directExchange = () => {
    navigation('/exchange');
  }
  
  const directMarketplace = () => {
    navigation('/marketplace');
  }

  const directSeller = () => {
    navigation('/seller');
  }

  const handleLogout = () => {
    console.log("logging out");
    setShowModal(true);
    setLoadingText("Logging out...");
    setIsLoading(true);

    axios.post("http://localhost:3500/users/logout", {
      
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
    )
    .then((response) => {
      console.log(response.data);
      // 3000 ms delay
      setLoadingText('Logged out successfully! Redirecting to login page')
      setTimeout(() => {
        // setVerifyText(
        //   `${response.data} Proceeding to next step`
        // );
        setShowModal(false); // Hide modal
        setIsLoading(false); // Hide loading animation
        navigation('/signin');
      }, 3000);
      
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }



  const handleClick = (button) => {
    console.log("NAV BAR BUTTON CLICKED: ", button)

    if (button === 'dashboard') {
      directDashboard();
    }
    else if (button === 'exchange') {
      directExchange();
    }
    else if (button === 'marketplace') {
      directMarketplace();
    }
    else if (button === 'seller') {
      directSeller();
    }
    
  };

  
  
  return (
    <div className={styles.navbar}>
      
        <div className={styles.sidebar}>
          <div className={styles.main}>
            <div className={styles.option}>
              <button
                className={clickedButton === 'dashboard' ? styles.bar : styles.bar1}
                onClick={() => handleClick('dashboard')}
              >
                <img
                  className={clickedButton === 'dashboard' ? styles.dashboardIcon : styles.transactionsIcon} 
                  alt=""
                  src="/home.png"
                />
                <div className={clickedButton === 'dashboard' ? styles.dashboard1 : styles.transactions}>Dashboard</div>
              </button>
              <button
                className={clickedButton === 'exchange' ? styles.bar : styles.bar1}
                onClick={() => handleClick('exchange')}
              >
                <img
                  className={clickedButton === 'exchange' ? styles.dashboardIcon : styles.transactionsIcon} 
                  alt=""
                  src="/transactions.svg"
                />
                <div className={clickedButton === 'exchange' ? styles.dashboard1 : styles.transactions}>Exchange</div>

              </button>
              <button
                className={clickedButton === 'marketplace' ? styles.bar : styles.bar1}
                onClick={() => handleClick('marketplace')}
              >
                <img
                  className={clickedButton === 'marketplace' ? styles.dashboardIcon : styles.transactionsIcon} 
                  alt=""
                  src="/invoices.svg"
                />
                <div className={clickedButton === 'marketplace' ? styles.dashboard1 : styles.transactions}>Marketplace</div>

              </button>
              <button 
                className={clickedButton === 'seller' ? styles.bar : styles.bar1} 
                onClick={() => handleClick('seller')}
>
                <img
                  className={styles.transactionsIcon}
                  alt=""
                  src="/my-wallets.svg"
                />
                <div className={clickedButton === 'seller' ? styles.dashboard1 : styles.transactions}>Manage Wines</div>
              </button>
              {/* <button className={styles.bar1}>
                <img
                  className={styles.transactionsIcon}
                  alt=""
                  src="/my-wallets.svg"
                />
                <div className={styles.transactions}>My Wallets</div>
              </button> */}
              <div className={styles.bar4}>
                <img
                  className={styles.transactionsIcon}
                  alt=""
                  src="/settings.svg"
                />
                <div className={styles.settings}>Settings</div>
              </div>
            </div>
            <div className={styles.option}>
              <div className={styles.bar4}>
                <img
                  className={styles.transactionsIcon}
                  alt=""
                  src="/help.svg"
                />
                <div className={styles.settings}>Help</div>
              </div>
              <button className={styles.bar1}>
                <img
                  className={styles.transactionsIcon}
                  alt=""
                  src="/logout.svg"
                />
                <div className={styles.transactions} onClick={handleLogout}>Logout</div>
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}

export default NavBar