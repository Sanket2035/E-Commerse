import React, { useState, useEffect } from 'react'
import './ListProduct.css'
import remove_icon from '../../assets/cart-remove-icon.jpg'
const ListProduct = () => {

    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        await fetch('http://localhost:4000/allproducts')
            .then((resp) => resp.json())
            .then((data) => { setAllProducts(data); });
    }

    useEffect(() => {
        fetchInfo();
    }, [])

    const remove_Product = async (id) => {

        await fetch('http://localhost:4000/removeproduct', {
            method: "POST",
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: id }),
        })
        await fetchInfo();
    }
    return (
        <div className='list-product'>
            <h1>All Product List</h1>
            <div className="listproduct-formate-main">
                <p>Product</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product) => {
                    return <React.Fragment key={product.id}>
                        <div className="listproduct-formate-main listproduct-formate">
                            <img src={product.image} alt="" className="listproduct-icon" />
                            <p>{product.name}</p>
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img onClick={() => { remove_Product(product.id) }} src={remove_icon} alt="" className="listproduct-remove-icon" />
                        </div>
                        <hr />
                    </React.Fragment>
                })}
            </div>
        </div>
    )
}
export default ListProduct
