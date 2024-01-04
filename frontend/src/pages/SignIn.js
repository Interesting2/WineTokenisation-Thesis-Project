import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

import Loading from "../components/Loading"
import styles from "./SignIn.module.css";


const SignIn = () => {

  const navigation = useNavigate();

  const verifyUser = async () => {
    axios.post('http://localhost:3500/users/verify-user', {}, {
        withCredentials: true,
      })
      .then(function (response) {
        console.log("VERIFYING USER");
        console.log(response.status);
        console.log(response.data.user_id);
        
        console.log("LOGGED IN");
        navigation('/dashboard')
      })
      .catch(function (error) {
        console.log(error);
        console.log("NOT LOGGED IN");
        navigation('/signin')
      });
  };

  useEffect(() => {

    verifyUser();
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add(styles.animate);
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    for (let i = 0; i < scrollAnimElements.length; i++) {
      observer.observe(scrollAnimElements[i]);
    }

    return () => {
      for (let i = 0; i < scrollAnimElements.length; i++) {
        observer.unobserve(scrollAnimElements[i]);
      }
    };
  }, []);


  const directToLogin = (e) => {
    e.preventDefault();
    navigation('/');
  }

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const closeModal = () => {
    setShowModal(false); // Hide modal
    setIsLoading(false); // Hide loading animation
    setLoadingText("");
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setShowModal(true); // Show modal
    setIsLoading(true); // Show loading animation

    console.log(email, password, rememberMe);

    // call backend api to login
    axios.post("http://localhost:3500/users/login", {
        email: email,
        password: password,
        rememberMe: rememberMe
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
      setLoadingText('Logged in successfully! Redirecting to dashboard')
      setTimeout(() => {
        // setVerifyText(
        //   `${response.data} Proceeding to next step`
        // );
        closeModal();
        navigation('/dashboard');
      }, 3000);
    })
    .catch((error) => {
      setLoadingText('Incorrect Credentials! Please try again')
 
      console.error("Error:", error);
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Processing your details");
  const [isLoading, setIsLoading] = useState(false);
  


  return (
    <main className={styles.signIn}>
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
            <p className={styles.welcomeAboardMy}>Welcome aboard my friend</p>
            <p className={styles.justACouple}>
              just a couple of clicks and we start
            </p>
          </div>
        </div>
      </div>
      <div className={styles.signincontainer}>
        <form
          className={styles.signinform}
          method=""
          data-animate-on-scroll
          onSubmit={handleLogin}
        >
          <div className={styles.signIn1}>
            <div className={styles.title}>
              <div className={styles.welcomeBack}>Welcome back</div>
              <div className={styles.welcomeBackPlease}>
                Welcome back! Please enter your details
              </div>
            </div>
            <div className={styles.main}>
              <div className={styles.inputsform}>
                <div className={styles.input}>
                  <div className={styles.emailWrapper}>
                    <div className={styles.email}>Email</div>
                  </div>
                  <input
                    className={styles.inputChild}
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.input1}>
                  <div className={styles.emailWrapper}>
                    <div className={styles.email}>Password</div>
                  </div>
                  <input
                    className={styles.inputItem}
                    type="password"
                    placeholder="Enter your password"
                    maxLength={50}
                    minLength={10}
                    name="password"
                    id="password"
                    autoComplete="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className={styles.reminders}>
                <div className={styles.remember}>
                  <input 
                    className={styles.rememberChild} 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <div className={styles.rememberFor30}>
                    Remember for 30 Days
                  </div>
                </div>
                <div className={styles.forgotPassword}>Forgot password</div>
              </div>
            </div>
            <div className={styles.bottom}>
              <button className={styles.signinbuttons}>
                <div className={styles.button}>
                  <div className={styles.signIn2}>Sign in</div>
                </div>
              </button>
              <div className={styles.signup}>
                <button className={styles.dontHaveAnContainer}>
                  <span
                    className={styles.dontHaveAn}
                  >{`Don’t have an account? `}</span>
                  <span className={styles.signUpFor} onClick={directToLogin}>Sign up for free</span>
                </button>
                
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
