import React from 'react';
import { BrowserRouter as Router, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../components/contextoCarrito';


function Carrito() {
    const { cart, removeFromCart, clearCart, updateQuantity } = useCart();

    const navigate = useNavigate();

    const location = useLocation();

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity);
        }
    };

    const calcularTotal = () => {
        return cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
    };

    const comprar = () => {
        alert("compraste chango")
        clearCart()
        navigate("/")
    }


    return (
        <div className="container mt-4">
        <button className="btn btn-primary mb-4" onClick={() => navigate(`/`)}>
          Home
        </button>
        <div className="row">
          <div className="col-md-8">
            {cart.map(product => (
              <li key={product.id} className="list-group-item d-flex align-items-center mb-3">
                <img src={product.thumbnail} alt={product.title} className="img-thumbnail me-4" style={{ width: '100px' }} />
                <div className="flex-grow-1">
                  <h2>{product.title}</h2>
                  <p>${product.price}</p>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-outline-secondary me-2" onClick={() => handleQuantityChange(product.id, product.quantity - 1)}>
                      -
                    </button>
                    <input
                      type="text"
                      value={product.quantity}
                      onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value) || 1)}
                      className="form-control text-center me-2"
                      style={{ width: '50px' }}
                    />
                    <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(product.id, product.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button className="btn btn-danger mt-2" onClick={() => removeFromCart(product.id)}>
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </div>
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-end">
              <h2 className="mt-4">Total: ${calcularTotal()}</h2>
              <div className="mt-3">
                <button className="btn btn-warning me-2" onClick={() => clearCart()}>
                  Limpiar Carrito
                </button>
                <button className="btn btn-success" onClick={() => comprar()}>
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Carrito