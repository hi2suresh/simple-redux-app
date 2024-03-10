import { useDispatch, useSelector } from 'react-redux';
import CartContainer from './components/Cartcontainer';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { calculateTotal, getCartItems } from './features/cart/cartSlice';
import Modal from './components/Modal';

function App() {
  const { isLoading, cartItems, isError } = useSelector((store) => store.cart);
  const { isOpen } = useSelector((store) => store.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [cartItems]);
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="error">
        <h1>Sorry something went wrong...</h1>
      </div>
    );
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
