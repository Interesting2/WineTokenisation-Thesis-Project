import styles from "./Dashboard.module.css";
import axios from "axios";
import Web3 from 'web3';
import { useEffect, useState } from "react";
import Loading from '../components/Loading';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';


const Dashboard = ({ }) => {
  
  const [utilityToken, setUtilityToken] = useState(140);
  const [managementToken, setManagementToken] = useState(90.5);

  const [isConnected, setIsConnected] = useState(false);
  const [walletAmount, setWalletAmount] = useState(0);

  const web3 = new Web3(window.ethereum)

  const getWMT = async (userAddress) => {
    const managementTokenABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getHolder","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"holderCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
    const managementTokenAddress = "0xEdFcC3B0c67E8b048beA38a19709C71da188c603";
    const managementTokenContract = new web3.eth.Contract(managementTokenABI, managementTokenAddress);
    const managementTokenBalance = await managementTokenContract.methods.balanceOf(userAddress).call();

    const myWineToken = web3.utils.fromWei(managementTokenBalance, 'ether');
    console.log("Management Token: " + myWineToken);
    setManagementToken(myWineToken);
  }

  const getWUT = async (userAddress) => {
    const wineTokenABI = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint8","name":"version","type":"uint8"}],"name":"Initialized","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"initialSupply","type":"uint256"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
    const wineTokenAddress = "0xb22cB2F9B620ede24CB06C8f0C8892e464A9439b";

    const wineTokenContract = new web3.eth.Contract(wineTokenABI, wineTokenAddress);
    const wineTokenBalance = await wineTokenContract.methods.balanceOf(userAddress).call();
    
    const myWineToken = web3.utils.fromWei(wineTokenBalance, 'ether');
    console.log("Utility Token: " + myWineToken);

    setUtilityToken(myWineToken);
  }

  const getUserToken = async () => {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0];  // Assuming user has selected the first account in MetaMask.

    getWMT(userAddress);
    getWUT(userAddress);
  }

  // Define the fetchUserWalletBalance function
const fetchUserWalletBalance = async (userAddress) => {
  try {
    const web3 = new Web3(window.ethereum);

    const balanceInWei = await web3.eth.getBalance(userAddress);
    const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');

    console.log('User wallet balance:', balanceInEther, 'ETH');
    setWalletAmount(balanceInEther);

  } catch (error) {
    console.error('Error fetching user wallet balance:', error);
  }
};

// Define the getUserWallet function
const getUserWallet = () => {
  // get user Metamask wallet info and wallet amount
  if (window.ethereum.selectedAddress) {
    setIsConnected(true);
    const userAddress = window.ethereum.selectedAddress;
    fetchUserWalletBalance(userAddress);
    
    window.ethereum.on('accountsChanged', (accounts) => {
      console.log("HERE")
      if (accounts.length === 0) {
        // The user has logged out
        setIsConnected(false);
        console.log("USER HAS LOGGED OUT")
      } else {
        setIsConnected(true);
        const userAddress = window.ethereum.selectedAddress;
        fetchUserWalletBalance(userAddress);
        
        console.log("USER HAS LOGGED IN")
      }
    });

  } else {
    console.log('User is not connected to Metamask wallet');
    // alert('Please connect to Metamask wallet for full features of the dashboard');
  }
};

const checkMetaMaskAvailability = () => {
  return typeof window.ethereum !== 'undefined';
};

const handleConnectWallet = async () => {
  try {
    
    if (!checkMetaMaskAvailability()) {
      alert('MetaMask is not available, Please Install!!!');
      return;
    }
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    
    const web3 = new Web3(window.ethereum);

    setIsConnected(true);
    console.log('Connected to MetaMask with web3:', web3);
    alert('MetaMask is connected!!!');

  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
  }

}




const [showModal, setShowModal] = useState(false);
const [loadingText, setLoadingText] = useState("Processing your details");
const [isLoading, setIsLoading] = useState(false);
const handleToggleModal = () => {
    setShowModal(true); // Show modal
    setIsLoading(true); // Show loading animation

    setLoadingText('Customising your dashboard...Redirecting')
    setTimeout(() => {
      console.log("HELLO");
      // setVerifyText(
      //   `${response.data} Proceeding to next step`
      // );
      setShowModal(false); // Hide modal
      setIsLoading(false); // Hide loading animation
    }, 3000);
};


const navigation = useNavigate();
const directToExchange = () => {
  navigation('/exchange');
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

      getUserToken();
      getUserWallet();
    })
    .catch(function (error) {
      console.log(error);
      console.log("NOT LOGGED IN");
      navigation('/')
    });
};

useEffect(() => {
  // before dashboard loads, fetch all the info such as
  // wallet balance, token info, etc
  verifyUser();
  console.log("LOADING DASHBOARD"); 
  // check if user connected to metamask 
  // if so, call the addTokenToMetaMask function
  if (checkMetaMaskAvailability) {
    const utilityAddress = '0xDc7D898CDd0540bA3bc62c4cb6305d01683e2b0B';
    const managementAddress = '0xFB77CE6709828bdc1A07400BfF1761f37c367616';
    // addTokenToMetaMask(managementAddress, 'WMT', 18);
  } 
}, []);
  
  

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
        <NavBar setShowModal={setShowModal} setIsLoading={setIsLoading} setLoadingText={setLoadingText} clickedButton={"dashboard"}/>
        <div className={styles.dashboardcontent}>
          <div className={styles.topBar}>
            <div className={styles.dashboard2}>Dashboard</div>
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
          
          <div className={styles.dashboarddataParent}>
            <div className={styles.dashboarddata}>
            <div className={styles.totalBalance}>
            <div className={styles.leftSide}>
                <div className={styles.totalBallance}>
                    <h2 className={styles.title}>
                      <div>
                        <p>{`Welcome to your `}</p>
                        <span className={styles.s}> P</span>
                        <span className={styles.u}>e</span>
                        <span className={styles.m}>r</span>
                        <span className={styles.m1}>s</span>
                        <span className={styles.a}>o</span>
                        <span className={styles.r}>n</span>
                        <span className={styles.y}>a</span>
                        <span className={styles.m1}>l</span>
                        <span className={styles.a}>i</span>
                        <span className={styles.r}>s</span>
                        <span className={styles.a}>e</span>
                        <span className={styles.u}>d </span>
                        <p>{`\tDashboard`}</p>
                      </div>
                    </h2>
                   
                    {/* <img
                        className={styles.moneyImageIcon}
                        alt=""
                        src="/money.png"
                    /> */}
                  </div>
                  <div className={styles.latestTransaction}>
                    
                  
                    {/* <div className={styles.div}>+ $28,55</div> */}
                    {/* <b className={styles.lastTransaction}>Last Transaction</b> */}
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.buttonprimary} onClick={directToExchange}>
                      <div className={styles.topUp}>Trade</div>
                    </button>
                    {/* <button className={styles.buttonstroke}>
                      <div className={styles.withdraw}>WITHDRAW</div>
                    </button> */}
                  </div>
                </div>
              
                
                {isConnected ? (
                  <div className={styles.walletAmount}>
                    <div className={styles.div1}>
                      <span>
                        <span className={styles.span}>$</span>
                        <span className={styles.span1}>{` `}</span>
                        <span>{parseFloat(walletAmount)}</span>
                      </span>
                      <span className={styles.span2}> ETH</span>
                    </div>
                    <div className={styles.walletsAmount}>WALLETS AMOUNT</div>
                  </div>
                ) : (
                  <div className={styles.walletAmount}>
                    <div className={styles.frameParentWallet}>
                      <div className={styles.pleaseConnectYourWalletWrapper}>
                          <div className={styles.pleaseConnectYour}>
                          Please Connect your Wallet
                          </div>
                      </div>
                      <button className={styles.buttonGlowtrueWrapper} onClick={handleConnectWallet}>
                          <div className={styles.buttonGlowtrue}>
                          <div className={styles.buttonGlow}>
                              <div className={styles.buttonGlowvariant2}>
                              <div className={styles.buttonGlowvariant2Child} />
                              <div className={styles.buttonGlowvariant2Item} />
                              <div className={styles.buttonGlowvariant2Inner} />
                              <img
                                  className={styles.image1Icon}
                                  alt=""
                                  src="/image-11@2x.png"
                              />
                              <div className={styles.connectWith}>Connect With</div>
                              <b className={styles.metamask}>Metamask</b>
                              </div>
                          </div>
                          </div>
                      </button>
                    </div>
                  </div>
                )}
                
              </div>

              <div className={styles.cardsGraphTransaction}>
                <div className={styles.cards}>
                  <div className={styles.totalBalance1}>
                    <img className={styles.icon} alt="" src="/icon.svg" />
                    <div className={styles.totalBalance2}>
                      <div className={styles.wut}>WUT</div>
                      <b className={styles.b}>${utilityToken}</b>
                    </div>
                  </div>
                  <div className={styles.totalSpending}>
                    <img className={styles.icon} alt="" src="/icon1.svg" />
                    <div className={styles.main1}>
                      <div className={styles.wut}>WMT</div>
                      <b className={styles.b}>${managementToken}</b>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            
          </div>
          {/* <div className={styles.recentTransaction}>
            
          </div>  */}
        </div>
        </> 
        ) : (
          <div className={styles.notVerifiedContent}>
            {/* Content to display when the user is not verified */}
            <p>Please verify your account.</p>
          </div>
          
      )}
    </div>
  );
};

export default Dashboard;
