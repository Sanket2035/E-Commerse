import React from 'react'
import './Breadcrum.css'
import arrow_image from '../Assets/arrow-icon.png'
const Breadcrum = (props) => {
    const { product } = props;
    return (
        <div className='breadcrum'>
            HOME <img src={arrow_image} alt="" /> SHOP <img src={arrow_image} alt="" /> {product.category} <img src={arrow_image} alt="" /> {product.name}
        </div>
    )
}

export default Breadcrum
