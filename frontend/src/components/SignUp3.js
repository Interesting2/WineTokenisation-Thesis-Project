import { useEffect } from "react";
import styles from "./SignUp3.module.css";
import ConnectWallet from "./ConnectWallet"
import Web3 from 'web3';

const SignUp3 = ({ nextStep }) => {
  
  async function addTokenToMetaMask(tokenAddress, tokenSymbol, tokenDecimals, tokenImage) {
    try {
      if (window.ethereum && window.ethereum.isMetaMask) {
        // Import token for user
        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: tokenSymbol,
              decimals: tokenDecimals,
            },
          },
        });
  
        if (wasAdded) {
          console.log('Token was added!');
        } else {
          console.log('Token was not added.');
        }
      } else {
        console.log('Please install MetaMask!');
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  
  const checkMetaMaskAvailability = () => {
    return typeof window.ethereum !== 'undefined';
  };

  const handleConnectWallet = async () => {
    try {
      // if user already login to metamask, then notify the user they are already logged in
      if (window.ethereum.selectedAddress) {
        window.ethereum.on('accountsChanged', (accounts) => {
          console.log("HERE")
          if (accounts.length === 0) {
            // The user has logged out

          } else {
            nextStep();
          }
        });

      }
      if (!checkMetaMaskAvailability()) {
        alert('MetaMask is not available, Please Install!!!');
        return;
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const web3 = new Web3(window.ethereum);

      const utilityAddress = '0xDc7D898CDd0540bA3bc62c4cb6305d01683e2b0B';
      const managementAddress = '0xFB77CE6709828bdc1A07400BfF1761f37c367616';
      addTokenToMetaMask(managementAddress, 'WMT', 18);

      console.log('Connected to MetaMask with web3:', web3);

      nextStep();
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
    }

  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <main className={styles.signIn4}>
      <div className={styles.leftSide}>
        <div className={styles.welcomeAboardMyFriendJustWrapper}>
          <div className={styles.welcomeAboardMyContainer}>
            <p className={styles.welcomeAboardMy}>Connect to your wallet</p>
            <p className={styles.justACouple}>
              It helps to provide full features to your dashboard
            </p>
          </div>
        </div>
      </div>
      <div className={styles.signincontainer}>
        <div className={styles.progressStep1BarParent}>
          <div className={styles.progressStep1Bar}>
            <button className={styles.ellipseParent}>
              <div className={styles.frameChild} />
              <div className={styles.div}>1</div>
            </button>
            <div className={styles.rectangleParent}>
              <div className={styles.frameItem} />
              <div className={styles.frameInner} />
            </div>
          </div>
          <div className={styles.frameWrapper}>
            <button className={styles.ellipseParent}>
              <div className={styles.frameChild} />
              <div className={styles.div1}>2</div>
            </button>
          </div>
          <div className={styles.rectangleParent}>
            <div className={styles.frameItem} />
            <div className={styles.frameInner} />
          </div>
          <div className={styles.frameWrapper}>
            <div className={styles.ellipseContainer}>
              <div className={styles.frameChild2} />
              <div className={styles.div2}>3</div>
            </div>
          </div>
          <div className={styles.rectangleParent}>
            <div className={styles.frameItem} />
            <div className={styles.frameChild4} />
          </div>
          <button className={styles.ellipseParent}>
            <div className={styles.frameChild5} />
            <div className={styles.div3}>4</div>
          </button>
        </div>
        <form
          className={styles.signinform}
          method="post"
          onSubmit={handleSubmit}
        >
         <ConnectWallet handleConnectWallet={handleConnectWallet}/>
        </form>
      </div>
    </main>
  );
};

export default SignUp3;
