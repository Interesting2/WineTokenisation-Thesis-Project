import { useEffect } from "react";
import styles from "./SignUp4.module.css";
const SignUp4 = () => {
  
  return (
    <main className={styles.signIn4}>
      <div className={styles.leftSide}>
        <div className={styles.welcomeAboardMyFriendJustWrapper}>
          <div className={styles.welcomeAboardMyContainer}>
            <p className={styles.welcomeAboardMy}>Welcome aboard my friend</p>
            <p className={styles.justACouple}>
              just a couple of clicks and we start
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
          <div className={styles.progressStep1Bar}>
            <button className={styles.ellipseParent}>
              <div className={styles.frameChild} />
              <div className={styles.div1}>2</div>
            </button>
            <div className={styles.rectangleParent}>
              <div className={styles.frameItem} />
              <div className={styles.frameInner} />
            </div>
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
          data-animate-on-scroll
        >
          <div className={styles.signIn}>
            <div className={styles.title}>
              <div className={styles.sendVerificationCode}>
                Send Verification Code
              </div>
              <div className={styles.wellSendYou}>
                We’ll send you a 4 digit code to your email
              </div>
            </div>
            <input
              className={styles.signInChild}
              type="email"
              placeholder="Enter your email"
              required
            />
            <div className={styles.bottom}>
              <button className={styles.signinbuttons}>
                <div className={styles.button}>
                  <div className={styles.send}>Send</div>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp4;
