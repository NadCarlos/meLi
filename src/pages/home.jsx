import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { useCart } from '../components/contextoCarrito';


function Home() {
  const [busqueda, setTexto] = useState("")
  const [productos, setProductos] = useState([])
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();


  const getProducts = async (query) => {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`
    const response = await fetch(url)
    const data = await response.json()
    const productos = data.results
    return productos
  }

  const cambiar = (evento) => {
    const busqueda = evento.target.value
    setTexto(busqueda)
  }

  const onSubmit = async (evento) => {
    evento.preventDefault()
    const productos = await getProducts(busqueda)
    setProductos(productos)
  }

  return (
    <div>
      <div className="container mt-4 bg-warning">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <img src='public/meli.png' alt="Logo" className="img-fluid" style={{ width: '200px' }} />
          <form className="d-flex w-75" onSubmit={onSubmit}>
            <input
              className="form-control me-2"
              value={busqueda}
              onChange={cambiar}
              placeholder="Buscar productos, marcas y más..."
            />
            <button className="btn btn-light me-2" type="submit">
              🔎
            </button>
            <button
              className="btn btn-light"
              type="button"
              onClick={() => navigate(`/carrito`)}
            >
              🛒
            </button>
          </form>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          {productos.map(p => (
            <div key={p.id} className="col-md-12 mb-4">
              <div className="card h-100">
                <div className="row g-0">
                  <div className="col-md-1">
                    <img src={p.thumbnail} alt={p.title} className="img-fluid" style={{ width: '100px' }} />
                  </div>
                  <div className="col-md-11">
                    <div className="card-body">
                      <h5 className="card-title">{p.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">${p.price}</h6>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => addToCart(p)}
                      >
                        Agregar al carrito
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => navigate(`/detalle`, { state: { product: p } })}
                      >
                        Detalle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home