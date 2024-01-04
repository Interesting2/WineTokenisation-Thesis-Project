import React, { useEffect, useState } from "react";
import axios from 'axios';
import { BsStarFill } from 'react-icons/bs';
import { BsStarHalf } from 'react-icons/bs';
import { BsStar } from 'react-icons/bs';
import { useDispatch, useSelector} from 'react-redux';
import { setSelectedItem } from '../redux/reducers/selectedItemSlice';
import { renderComponent, unrenderComponent } from '../redux/reducers/componentsSlice';

const SearchResults = ({ searchTerm }) => {
  // use the searchTerm prop here
  const dispatch = useDispatch();
  const filteredBrand = useSelector((state) => state.filter.brand);
  const filteredMaxPrice = useSelector((state) => state.filter.maxPrice);

  const [searchedItems, setSearchedItems] = useState([]);
 

  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Filter the items whenever filteredBrand or filteredMaxPrice changes
    console.log("FKKKk")
    console.log(filteredBrand);
    console.log(filteredMaxPrice);
    console.log(filteredItems)

    // loop over saerchedItems 
    // if searchedItems.brand === filteredBrand
    // if searchedItems.price <= filteredMaxPrice
    // add to filteredItems

    // setFilteredItems(filteredItems);
    const filtered = searchedItems.filter((item) => {
      console.log("Item:", item);
      console.log("Filtered Brand:", filteredBrand);
      console.log("Filtered Max Price:", filteredMaxPrice);
      console.log("Item Brand:", item.brand);
      console.log("Item Price:", item.price);

      if (filteredBrand === 'Any' || item.brand === filteredBrand) {
        console.log("Brand matches the filter");
        if (item.price > filteredMaxPrice) {
          console.log("Price is higher than max price");
          return false; // Skip if price is higher than max price
        }
        console.log("Item matches the filter");
        return true; // Include if the item matches the filter
      }
      console.log("Item doesn't match the filter");
      return false; // Skip if item doesn't match the filter
    });
    console.log("Filtered Items:");
    console.log(filtered);
    setFilteredItems(filtered);

    
    
    // console.log(filteredItems);
    // setFilteredItems(filteredItems);
  }, [searchedItems, filteredBrand, filteredMaxPrice]);

  useEffect(() => {
    const getItemMatchSearchTerm = async () => {
      axios.get(`http://localhost:3500/api/search?searchTerm=${searchTerm}`)
      .then(response => {
        console.log(response.data); // log the response data to the console
        setSearchedItems(response.data);
        setFilteredItems(response.data);
      })
      .catch(error => {
        console.log(error); // log any errors to the console
      });       
    }
    getItemMatchSearchTerm();
  }, [searchTerm]);


  const handleBackClickSearchTerm = () => {
    dispatch(unrenderComponent());
  };

  const handleItemClick = (item) => {
    dispatch(setSelectedItem(item));
    dispatch(renderComponent('selected'));
  };
  
  return (
    <div>
      <div className="best-sellers-container">
          <div className="back-btn-container">
              <button className="back-btn" onClick={handleBackClickSearchTerm}>Back</button>
          </div>
          <div className="seller-header">
              <h2>Search Results for "{searchTerm}"</h2>
          </div>
          <div className="items-container">
              {filteredItems.map((item) => (

                  <div className="item" key={item._id} onClick={() => {handleItemClick(item)}}>
                      <div className="item-img">
                          <img src={`/phone_default_images/${item.brand}.jpeg`} alt={item.name} />
                      </div>
                      <div className="item-description">
                          <div className="item-brand">
                              <p>{item.brand}</p>
                          </div>
                          <div className="item-name">
                              <p>{item.title}</p>
                          </div>
                          <div className="item-price">
                              <p>${item.price}</p>
                          </div>
                      </div>
                      <div className="item-footer">
                      </div>
                  </div>
              ))}
            </div>
        </div>


    </div>
  );
};

export default SearchResults;