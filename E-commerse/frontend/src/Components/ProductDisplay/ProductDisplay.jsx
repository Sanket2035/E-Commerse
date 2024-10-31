import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star-icon.jpg'
import star_dull_icon from '../Assets/star-dull-icon.jpg'
import { ShopContext } from '../../Context/ShopContext'
const ProductDisplay = (props) => {
    const { product } = props;
    const { addToCart } = useContext(ShopContext);
    return (
        <div className='productdisplay'>
            <div className="productdisplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className='productdisplay-main-img' src={product.image} alt="product" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(127)</p>
                </div>
                <div className="productdisplay-rght-prices">
                    <div className="productdisplay-rght-prices-old">${product.old_price}</div>
                    <div className="productdisplay-rght-prices-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    This T-shirt features a bold and vibrant design that celebrates pride and
                    cultural heritage. The centerpiece showcases a fierce tiger face with a
                    striking orange flag above it, symbolizing strength and unity. Made from
                    soft, high-quality cotton, this T-shirt offers comfort and durability, perfect
                    for casual wear.
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
                <p className="productdisplay-right-category"><span>Category :</span> Women, T-shirt, Crop Top</p>
                <p className="productdisplay-right-category"><span>Tag :</span> Modern, Latest</p>
            </div>
        </div>
    )
}

export default ProductDisplay
