// import React, {useEffect, useState} from 'react'
// import NavBar from '../components/NavBar'; 
// import './HomePage.css';
// import { useSelector, useDispatch } from 'react-redux';
// // import { increment, decrement, reset, incrementByAmount } from '../redux/reducers/searchTermSlice';
// import BestSellers from '../components/BestSellers';
// import SoldOutSoon from '../components/SoldOutSoon';
// import SearchResults from '../components/SearchResults';
// import axios from 'axios';
// import ItemDetails from '../components/ItemDetails';

// import { setSelectedItem } from '../redux/reducers/selectedItemSlice';
// import { setSearchTerm } from '../redux/reducers/searchTermSlice';


// const HomePage = () => {
//   const searchTerm = useSelector((state) => state.searchTerm.searchTerm);
//   const selectedItem = useSelector((state) => state.selectedItem.selectedItem);
//   const renderedComponents = useSelector((state) => state.components.renderedComponents);
  
//   const [component, setComponent] = useState("home");
//   const [isSignedin, setIsSignedin] = useState(false);
//   const token = localStorage.getItem('token');
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       axios.post('http://localhost:3500/api/user/verifyToken', { token })
//         .then(response => {
//           // Token is valid, user is authenticated
//           console.log(response);
//           if (response.status === 200) {
//             console.log("VALID")
//             setIsSignedin(true);
//           } else {
//             setIsSignedin(false);
//           }
//         })
//         .catch(error => {
//           // Token is invalid or expired, user is not authenticated
//           setIsSignedin(false);
//       });
//     } else {
//       setIsSignedin(false);
//     }
//   }, []);

//   useEffect(() => {
//     const componentTemp = renderedComponents[renderedComponents.length - 1];
//     console.log("Rendered component list CHANGED");
//     console.log(renderedComponents)
//     setComponent(componentTemp);
//   }, [renderedComponents]);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     console.log("selected Item changed:", selectedItem);
//   }, [selectedItem]);

//   const [bestSellers, setBestSellers] = useState([]);
//   const [soldOutSoon, setSoldOutSoon] = useState([]);

//   useEffect(() => {
//     const fetchPhoneListings = async () => {
//       try {
//         console.log("fetching phone listings");
//         axios.get('http://localhost:3500/api/best-sellers').then((response) => {
//           console.log(response.data);
//           setBestSellers(response.data);
//         });
//         axios.get('http://localhost:3500/api/sold-out-soon').then((response) => {
//           console.log(response.data);
//           setSoldOutSoon(response.data);
//         });
        

//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchPhoneListings();
//   }, []);

  
//   return (
//     <div className="home-container">
//         <NavBar searchTerm={searchTerm} isSignedin={isSignedin} />
//         <div className="home-content">
//         {component === "home" && (
//           <>
//             <SoldOutSoon soldOutSoon={soldOutSoon}/>
//             <BestSellers bestSellers={bestSellers}/>
//           </>
//         )}
//         {component === "search" && <SearchResults searchTerm={searchTerm} />}
//         {component === "selected" && <ItemDetails selectedItem={selectedItem} />}
         
//         </div>
//         {/* <div>HomePage</div> */}

//     </div>
//   )
// }

// export default HomePage