import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const productList = [
    { id: '1', name: 'Xiaomi 12 pro', price: '25000', imageUrl: 'https://economictimes.indiatimes.com/thumb/msid-98897778,width-1200,height-1200,resizemode-4,imgsize-35708/6-latest-mobile-phones-with-12gb-ram-in-india.jpg?from=mdr' },
    { id: '2', name: 'Hp Laptop', price: '70000', imageUrl: 'https://s.yimg.com/uu/api/res/1.2/TPZuZZu5waGc5G0xeZwtWQ--~B/Zmk9c3RyaW07aD03MjA7dz0xMjgwO2FwcGlkPXl0YWNoeW9u/https://s.yimg.com/os/creatr-uploaded-images/2024-05/4189e020-0d59-11ef-b7ad-913df913fbd9' },
    { id: '3', name: 'Headphone', price: '1000', imageUrl: 'https://5.imimg.com/data5/SELLER/Default/2022/9/RJ/VD/FR/113915368/head-phone.jpg' },
    { id: '4', name: 'Alexa', price: '5000', imageUrl: 'https://media.wired.com/photos/592673f58d4ebc5ab806a4df/master/w_2560%2Cc_limit/EchoHP-4x3.jpg' },
    { id: '5', name: 'Bluetooth', price: '1000', imageUrl: 'https://images-cdn.ubuy.co.in/656a537991911a301a6fc2d6-wireless-earbuds-bluetooth-5-3.jpg' },
    { id: '6', name: 'Watch', price: '10000', imageUrl: 'https://m.media-amazon.com/images/I/718+WnOw9bL._AC_UF350,350_QL50_.jpg' },
    { id: '7', name: 'Speaker', price: '20000', imageUrl: 'https://m.media-amazon.com/images/I/81b1vgAABmL._AC_UF1000,1000_QL80_.jpg' },
    { id: '8', name: 'Charger', price: '200', imageUrl: 'https://m.media-amazon.com/images/I/61NfFCwsneL._AC_UF1000,1000_QL80_.jpg' },
    { id: '9', name: 'Ipad', price: '20000', imageUrl: 'https://sathya.in/media/89765/catalog/Apple%20iPad%20Air%20A%204th%20Gen%203GB%20RAM,64GB%20_Space_grey01.jpg' },
  ];

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (storedCart) {
      setCart(storedCart);
    }
  }, []);

  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
      alert("Product already exists in the cart");
    } else {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  const removeFromCart = (product) => {
    const Cart = cart.filter(item => item.id !== product.id);
    setCart(Cart);
    localStorage.setItem('cart', JSON.stringify(Cart));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, product) => total + Number(product.price), 0);
  };

  const cartClick = () => {
    setCartVisible(!cartVisible);
  };


  const handlePayment = (method) => {
    // Handle payment based on the method
    alert(`Payment method selected: {method}`);
    // Clear cart after payment
    setCart([]);
    localStorage.removeItem('cart');
  };

  return (
    <div>
      <Navbar cartCount={cart.length} onCartClick={cartClick} />
      <div className="container mt-3">
        {cartVisible && (
          <div className="container mt-3">
            <div className="card">
              <div className="card-body">
                <h3 className="text-center">Cart Items</h3>
                <ol className="list-group">
                  {cart.map((item, i) => (
                    <li key={i} className="list d-flex justify-content-between align-items-center">
                      <img src={item.imageUrl}  style={{ height: '50px', width: '50px', objectFit: 'cover' }} />
                      <span>{item.name}</span>
                      <span>{item.price}</span>
                      <button type="button" className="btn btn-danger btn-sm" onClick={() => removeFromCart(item)}>Remove</button>
                    </li>
                  ))}
                </ol>
                <div className="text-right mt-3">
                  <h4 className='Total-amount' style={{ marginLeft: '115vh' }}>Total Amount: {getTotalAmount()}</h4>
                </div>
                <div className="mt-4">
                  <h4>Payment Options:</h4>
                  <button type="button" className="btn btn-info mr-2" onClick={() => handlePayment('Phone Pay')}style={{ marginLeft:'10vh' }}> Phone Pay</button>
                  <button type="button" className="btn btn-info mr-2" onClick={() => handlePayment('Cash on Delivery')} style={{ marginLeft:'10vh' }}>Cash on Delivery</button>
                  <button type="button" className="btn btn-info" onClick={() => handlePayment('Credit Card')} style={{ marginLeft:'10vh' }}> Credit Card</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="container mt-3">
        <div className="row">
          {productList.map((product) => (
            <div className="col-md-4" key={product.id}>
              <div className="card mb-3">
                <img src={product.imageUrl} className="card-img-top"  style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price}</p>
                  <button type="button" className="btn btn-primary mr-2" onClick={() => addToCart(product)}>Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
