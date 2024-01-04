import { useEffect, useState } from "react";
import styles from "./SignUp5.module.css";
import axios from 'axios';
import Loading from "./Loading"

const SignUp5 = ({ nextStep, email }) => {

  const [digits, setDigits] = useState(['', '', '', '']);
  const [verifyText, setVerifyText] = useState(['Click on send code to receive a 4 digit pin on your email']);
  const [sendCodeText, setSendCodeText] = useState(['Send Code']);


  const [showModal, setShowModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Processing your details");
  const [isLoading, setIsLoading] = useState(false);

  const closeModal = () => {
    setShowModal(false); // Hide modal
    setIsLoading(false); // Hide loading animation
    setLoadingText("");
  }

  const verifyCode = (e) => {
    // call backend api to verify code
    e.preventDefault();
    console.log("VERIFYING CODE");
    
    axios.post('http://localhost:3500/users/verify', {
        email: email,
        code: digits.join('')
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        console.log('Success:', response.data);
        // 3000 ms delay
        setShowModal(true);
        setLoadingText('Email verified successfully! Proceeding to next step')
        setIsLoading(true)

        setTimeout(() => {
          setVerifyText(`${response.data} Proceeding to next step`);
          closeModal();
          nextStep();
        }, 3000);

    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }

  const handleSendCode = () => {
    setVerifyText(`A 4 digit code has been sent to ${email}`);
    setSendCodeText(`Code Sent! Resend Code`);

    // call backend api to send email
    axios.post('http://localhost:3500/users/sendCode', {
        email: email
    }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        console.log('Success:', response.data);
        // setVerifyText(`Enter the code in the following inputs`);
    })
    .catch((error) => {
        console.error('Error:', error);
    });


  };

  const handleDigitChange = (index, event) => {
    const input = event.target.value;

    // Validate input to allow only one digit
    if (/^\d{0,1}$/.test(input)) {
      const newDigits = [...digits];
      newDigits[index] = input;
      setDigits(newDigits);
    }
  };

  return (
    <main className={styles.signIn3}>
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            {isLoading && (
              <div className={styles.modalContentText}>
                {/* <div className={styles.loadingIcon}></div> */}
                <Loading />
                <p className={styles.loadingText}>{loadingText}</p>
                <button className={styles.loadingButton} onClick={closeModal}>Got it</button>
              </div>
            )}
          </div>
        </div>
      )}
      <div className={styles.leftSide}>
        <div className={styles.welcomeAboardMyFriendJustWrapper}>
          <div className={styles.welcomeAboardMyContainer}>
            <p className={styles.welcomeAboardMy}>Email Verification</p>
            <p className={styles.justACouple}>
              Enter the code from email to verify your account
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
          onSubmit={verifyCode}
        >
          <div className={styles.signIn}>
            <div className={styles.title}>
              <div className={styles.enterVerificationCode}>
                Enter Verification Code
              </div>
              <div className={styles.enterCodeThat}>
                {verifyText}
              </div>
            </div>
            <div className={styles.frameGroup}>
              {digits.map((digit, index) => (
                <input
                  key={index}
                  className={styles.frameInput}
                  type="number"
                  value={digit}
                  onChange={(event) => handleDigitChange(index, event)}
                  min="0"
                  max="9"
                  required
                />
              ))}
            </div>
            <div className={styles.bottom}>
              <button className={styles.signinbuttons}>
                <div className={styles.button}>
                  <div className={styles.submit}>Submit</div>
                </div>
              </button>
            </div>
            <button className={styles.labelWrapper}>
              <div className={styles.label} onClick={handleSendCode}>{sendCodeText}</div>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUp5;
