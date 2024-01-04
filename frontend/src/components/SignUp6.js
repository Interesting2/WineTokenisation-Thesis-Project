import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import Loading from "../components/Loading"
import styles from "./SignUp6.module.css";
const SignUp6 = ( { nextStep }) => {
  const navigation = useNavigate();
  const connectToDashboard = (e) => {
    
    e.preventDefault();
    setShowModal(true); // Show modal
    setIsLoading(true); // Show loading animation

    setLoadingText('Customising your dashboard...Redirecting')
    setTimeout(() => {
      // setVerifyText(
      //   `${response.data} Proceeding to next step`
      // );
      setShowModal(false); // Hide modal
      setIsLoading(false); // Hide loading animation
      navigation('/dashboard');
    }, 3000);
  }

  const [showModal, setShowModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Processing your details");
  const [isLoading, setIsLoading] = useState(false);
  return (
    <main className={styles.signIn7}>
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
      <div className={styles.leftSide}>
        <div className={styles.welcomeAboardMyFriendJustWrapper}>
          <div className={styles.welcomeAboardMyContainer}>
            <p className={styles.welcomeAboardMy}>You've Completed all info!</p>
            <p className={styles.justACouple}>
              Click on Go To Dashboard to begin your journey
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
            <div className={styles.frameInner} />
          </div>
          <button className={styles.ellipseParent}>
            <div className={styles.frameChild} />
            <div className={styles.div3}>4</div>
          </button>
        </div>
        <form
          className={styles.signinform}
          method="post"
          data-animate-on-scroll
          onSubmit={connectToDashboard}
        >
          <div className={styles.frameParent}>
            <div className={styles.thankyouForYourTimeWrapper}>
              <div className={styles.thankyouForYour}>
                Thankyou for your time
              </div>
            </div>
            <div className={styles.pleaseReviewAllTheInformatWrapper}>
              <div
                className={styles.pleaseReviewAll}
              >{`Please review all the information you previously typed in the past steps, and if all is okay, you could `}</div>
            </div>
            <button className={styles.buttonGlowtrueWrapper}>
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
                    <div className={styles.connectWith}>Go to dashboard</div>
                    <b className={styles.metamask} />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp6;
