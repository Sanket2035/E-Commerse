import React, { createContext, useEffect } from "react";
import { useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let i = 1; i <= 300 + 1; i++) {
        cart[i] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {

    const [all_products, setAllProducts] = useState([]);

    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/allproducts')
            .then((response) => response.json())
            .then((data) => setAllProducts(data));

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/getcart', {
                method: "POST",
                headers: {
                    'Accept': 'application/form-data', // Expecting JSON response
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json', // Sending JSON data
                },
                body: "",
            }).then((response) => response.json())
                .then((data) => setCartItems(data));
        }
    }, [])

    const addToCart = (itemId) => {
        setCartItems((prev) => {
            return { ...prev, [itemId]: (prev[itemId] || 0) + 1 };
        });

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/addtocart', {
                method: "POST",
                headers: {
                    'Accept': 'application/form-data', // Expecting JSON response
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json', // Sending JSON data
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => console.log(data))
                .catch((error) => console.error("Error:", error));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => {
            return { ...prev, [itemId]: prev[itemId] - 1 }
        })
        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/removefromcart', {
                method: "POST",
                headers: {
                    'Accept': 'application/form-data', // Expecting JSON response
                    'auth-token': localStorage.getItem('auth-token'),
                    'Content-Type': 'application/json', // Sending JSON data
                },
                body: JSON.stringify({ "itemId": itemId }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => console.log(data))
                .catch((error) => console.error("Error:", error));
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_products.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }

    const contextvalue = { getTotalCartItems, getTotalCartAmount, all_products, cartItems, addToCart, removeFromCart };

    return (
        <ShopContext.Provider value={contextvalue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider