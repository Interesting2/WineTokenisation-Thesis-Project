// import Metamask from './Test_Ethers';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import Exchange from './pages/Exchange';
import Marketplace from './pages/WineMarketplace';
import WineHistory from './pages/WineHistory';
import Seller from './pages/Seller';
import WineDetails from './pages/WineDetails';

import NavBar from './components/NavBar';

// import SignupPage from './pages/SignupPage';
// import SigninPage from './pages/SigninPage';
// import ResetpwdPage from './pages/ResetpwdPage';
// import CheckOut from './pages/CheckOut';
// import User from './pages/User';
// import HomePage from './pages/HomePage';
// import VerificationPage from './pages/VerificationPage';
// import ResetPasswordForm from './pages/ResetpwdForm';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import './App.css';

function App() {
  
  return (
    <div className="App">

      <Router>

        <Routes>  
          {/* <Route path="/" element={ <HomePage/> } /> */}
          <Route path="/signin" element={ <SignIn/> } />
          <Route path="/" element={ <SignUp/> } />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path="/exchange" element={ <Exchange /> } />
          <Route path="/marketplace" element={ <Marketplace /> } />
          <Route path="/wine-history" element={ <WineHistory /> } />
          <Route path="/seller" element={ <Seller/> } />
          <Route path="/wine-details/:wine_id" element={ <WineDetails /> } />

          {/* <Route path="/create-wine" element={ <CreateWine/> } /> */}
{/*           
          <Route path="/reset-password" element={ <ResetpwdPage/> } />
          <Route path="/reset/:token" element={ <ResetPasswordForm /> } />
          <Route path="/verify" element={ <VerificationPage/> } />
          <Route path="/CheckOut" element={<CheckOut/>} />
          <Route path="/User" element={<User/>} /> */}
        </Routes>
      </Router>

   
      </div>
  );
}
export default App;
