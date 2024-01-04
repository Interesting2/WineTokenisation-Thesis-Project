import React from 'react'
import styles from "./ConnectWallet.module.css";

const ConnectWallet = ( {handleConnectWallet})  => {
  return (
    <div className={styles.frameParent}>
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
  )
}

export default ConnectWallet;