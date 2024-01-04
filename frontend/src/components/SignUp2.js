import { useEffect } from "react";
import styles from "./SignUp2.module.css";
const SignUp2 = ({ nextStep }) => {

  const warning = () => {
    alert("You must be 18 or older to use this site.");
  };

  return (
    <main className={styles.signIn3}>
      <div className={styles.leftSide}>
        <div className={styles.welcomeAboardMyFriendJustWrapper}>
          <div className={styles.welcomeAboardMyContainer}>
            <p className={styles.welcomeAboardMy}>Age Verification</p>
            <p className={styles.justACouple}>
              Make sure you are at least 18 before continuing.
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
              <div className={styles.frameItem} />
              <div className={styles.rectangleDiv} />
            </div>
          </div>
          <div className={styles.frameWrapper}>
            <button className={styles.ellipseParent}>
              <div className={styles.frameChild} />
              <div className={styles.div1}>2</div>
            </button>
          </div>
          <div className={styles.rectangleGroup}>
            <div className={styles.frameChild1} />
            <img
              className={styles.rectangleIcon}
              alt=""
              src="/rectangle-4360.svg"
            />
          </div>
          <div className={styles.progressStep1Bar}>
            <div className={styles.ellipseContainer}>
              <div className={styles.frameChild2} />
              <div className={styles.div2}>3</div>
            </div>
            <div className={styles.rectangleWrapper}>
              <div className={styles.frameChild3} />
            </div>
          </div>
          <button className={styles.ellipseParent}>
            <div className={styles.frameChild4} />
            <div className={styles.div3}>4</div>
          </button>
        </div>
        <form
          className={styles.signinform}
          method="post"
          onSubmit={(e) => {e.preventDefault();}}
        >
          <div className={styles.frameGroup}>
            <div className={styles.areYou18OrOlderWrapper}>
              <div className={styles.areYou18}>ARE YOU 18 OR OLDER?</div>
            </div>
            <div className={styles.inputContainer}>
              <button className={styles.input}>
                <div className={styles.yesWrapper} onClick={nextStep}>
                  <div className={styles.yes}>YES</div>
                </div>
              </button>
              <button className={styles.input1}>
                <div className={styles.noWrapper} onClick={warning}>
                  <div className={styles.yes}>NO</div>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp2;
