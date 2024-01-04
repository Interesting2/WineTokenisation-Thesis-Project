import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import styles from "./SignUp.module.css";

import SignUp2 from "../components/SignUp2";
import SignUp3 from "../components/SignUp3";
import SignUp4 from "../components/SignUp4";
import SignUp5 from "../components/SignUp5";
import SignUp6 from "../components/SignUp6";
import Loading from "../components/Loading"

const SignUp = () => {

  const [showModal, setShowModal] = useState(false);
  const [loadingText, setLoadingText] = useState("Processing your details");
  const [isLoading, setIsLoading] = useState(false);

  const [step, setStep] = useState(1); // steps for sign up form
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
  });

  const closeModal = () => {
    setShowModal(false); // Hide modal
    setIsLoading(false); // Hide loading animation
    setLoadingText("");
  }

  const checkUserVerified = () => {
    axios.get('http://localhost:3500/users/is-email-verified', {
      withCredentials: true,
    })
      .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            // User is verified, you can perform actions accordingly
            console.log('User is verified');
            setShowModal(true);
            setLoadingText('Your email has been verified! Redirecting to login')
            setTimeout(() => {
              // Move to the next step in the form
              // Code to move to the next step goes here
              closeModal();
              navigation('/signin')
            }, 3000); // Hide after 3 seconds
          } 
 
 
      })
      .catch(function (error) {

          console.log(error);
          console.log(error.response.status)
          console.error('Error message:', error.response.data.message); // Log the error message from the response
          // goes to next step for email verification
          if (error.response.status === 400) {
            console.log('User is not verified');
            const {email} = error.response.data;
            // Update the 'data' object with the new email value
            const updatedData = {
              ...formData, // Copy the existing 'data' object
              email: email, // Update the 'email' property with the new value
            };  
            console.log(updatedData)

            setFormData(updatedData); // Set the updated data object
            
            setStep(2);
          } else if (error.response.status === 401) {
            
          }
          // else if 401, it means user haven't registered yet
      });
  }

  useEffect(() => {
    checkUserVerified();
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

  

  const callSignUpAPI = (data) => {
    
    try {
        // call backend api to signup /users/register using axios
        axios.post('http://localhost:3500/users/register', data, {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('Success:', response);
          // see what is in the response
          console.log(response.data);
          setLoadingText('Signed up successfully! Redirecting to next steps')
          setTimeout(() => {

            // Move to the next step in the form
            // Code to move to the next step goes here
            closeModal();
            nextStep();
          }, 3000); // Hide after 3 seconds

        })
        .catch((error) => {
          console.error('Error:', error);
          setLoadingText('Account Already Registered!')

          // setShowModal(false); // Hide modal
          // setIsLoading(false); // Hide loading animation
        });
        
    } catch (error) {
      console.error('An error occurred:', error);
      setIsLoading(false); // Hide loading animation
    }
  }
  const handleSubmit = (e) => {
      setShowModal(true); // Show modal
      setIsLoading(true); // Show loading animation

      const form = e.target;
      const formDataObject = new FormData(form);
      // console.log(data);

      const data = {
        firstName: formDataObject.get("firstName"),
        lastName: formDataObject.get("lastName"),
        email: formDataObject.get("email"),
        phoneNumber: formDataObject.get("phoneNumber"),
        password: formDataObject.get("password")
      };
      console.log(data)

      setFormData(data);

      // console.log(formData.email);

      callSignUpAPI(data);
      e.preventDefault();
  };

  

  const directLogin = () => {
      console.log("direct to login page");
      navigation("/signin");    
  };
  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setStep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setStep(step - 1);
  };


  return (
   
    <>
      {step === 1 && (
         <main className={styles.signIn2}>
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
                  <div className={styles.ellipseDiv} />
                  <div className={styles.div1}>2</div>
                </button>
                <div className={styles.rectangleWrapper}>
                  <div className={styles.rectangleDiv} />
                </div>
              </div>
              <div className={styles.progressStep1Bar}>
                <div className={styles.ellipseContainer}>
                  <div className={styles.frameChild1} />
                  <div className={styles.div2}>3</div>
                </div>
                <div className={styles.rectangleWrapper}>
                  <div className={styles.rectangleDiv} />
                </div>
              </div>
              <button className={styles.ellipseParent}>
                <div className={styles.ellipseDiv} />
                <div className={styles.div3}>4</div>
              </button>
            </div>
            <form
              className={styles.signinform}
              method=""
              data-animate-on-scroll
              onSubmit={handleSubmit}
            >
              <div className={styles.signIn}>
                <div className={styles.title}>
                  <div className={styles.welcome}>{`Welcome `}</div>
                  <div className={styles.toJoinOur}>
                    To Join our Platform, Please enter your details
                  </div>
                </div>
                <div className={styles.main}>
                  <div className={styles.inputsform}>
                    <div className={styles.inputContainer}>
                      <div className={styles.input}>
                        <div className={styles.firstNameWrapper}>
                          <div className={styles.firstName}>First Name</div>
                        </div>
                        <input
                          className={styles.inputChild}
                          name="firstName"
                          type="text"
                          placeholder="Enter your first name"
                          required
                        />
                      </div>
                  
                      <div className={styles.input1}>
                        <div className={styles.firstNameWrapper}>
                          <div className={styles.firstName}>Last Name</div>
                        </div>
                        <input
                          className={styles.inputItem}
                          name="lastName"
                          type="text"
                          placeholder="Enter your last name"
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.input2}>
                      <div className={styles.emailWrapper}>
                        <div className={styles.firstName}>Email</div>
                      </div>
                      <input
                        className={styles.inputInner}
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        required
                      />
                    </div>
                    <div className={styles.input3}>
                      <div className={styles.firstNameWrapper}>
                        <div className={styles.firstName}>Phone Number</div>
                      </div>
                      <input
                        className={styles.inputChild}
                        name="phoneNumber"
                        type="tel"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div className={styles.input3}>
                      <div className={styles.firstNameWrapper}>
                        <div className={styles.firstName}>Password</div>
                      </div>
                      <input
                        className={styles.inputChild1}
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        maxLength={50}
                        minLength={10}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <button className={styles.signinbuttons}>
                    <div className={styles.button}>
                      <div className={styles.signUp}>Sign up</div>
                    </div>
                  </button>
                  <div className={styles.termsAndConditions}>
                      <span
                        className={styles.termsAndConditionsChild}
                      >{`By signing up, you agree to our terms and conditions`}</span>
                    </div>
                  <div className={styles.signup}>
                    <div className={styles.alreadyHaveAnContainer}>
                      <span
                        className={styles.alreadyHaveAn}
                      >{`Already have an account? `}</span>
                      <span className={styles.login} onClick={directLogin}>Login</span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      )}
      {/* verification */}
      {step === 2 && <SignUp5 nextStep={nextStep} email={formData.email} />} 
      {/* 18 years old */}
      {step === 3 && <SignUp3 nextStep={nextStep}/>}
      {step === 4 && <SignUp2 nextStep={nextStep}/>}
      {step === 5 && <SignUp6 nextStep={nextStep}/>}
    </>


  );
};

export default SignUp;
