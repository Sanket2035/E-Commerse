import React from 'react'
import './CartItems.css'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import cart_remove_icon from '../Assets/cart-remove-icon.jpg'
const CartItems = () => {
    const { getTotalCartAmount, all_products, cartItems, removeFromCart } = useContext(ShopContext);
    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Toatal</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_products.map((product) => {
                if (cartItems[product.id] > 0) {
                    return (

                        <div>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={product.image} alt="" className='carticon-product-icon' />
                                <p>{product.name}</p>
                                <p>${product.new_price}</p>
                                <button className='cartitems-quantity'>{cartItems[product.id]}</button>
                                <p>${product.new_price * cartItems[product.id]}</p>
                                <img src={cart_remove_icon} onClick={() => { removeFromCart(product.id) }} alt='remove-btn' className='remove-product-icon' />
                            </div>
                        </div>
                    );
                }
                return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Cart Total</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promocode enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder='Promocode' />
                        <button>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems
