import React from 'react';
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../components/contextoCarrito';

function DetalleProducto() {
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state.product;
    const { cart, addToCart } = useCart();


    return (
        <div className="container mt-4">
            <button className="btn btn-primary mb-4" onClick={() => navigate(`/`)}>Home</button>
            <div className="d-flex align-items-start">
                <div className="me-4">
                    <img src={product.thumbnail} alt={product.title} className="img-fluid" style={{ width: '500px' }} />
                </div>
                <div>
                    <h1>{product.title}</h1>
                    <h3>Precio AR${product.price}</h3>
                    <button className="btn btn-primary mt-2" onClick={() => addToCart(product)}>Agregar al carrito</button>
                </div>
            </div>
        </div>
    )
}

export default DetalleProducto
