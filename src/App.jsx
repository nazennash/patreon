import './App.css'
import { NavBar } from './components/NavBar';
import CartPage from './pages/CartPage';
import { CategoryPage } from './pages/CategoryPage';
import { Home } from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='category/:name' element={<CategoryPage />} />
        <Route path='cart' element={<CartPage />} />
      </Routes>
    </Router>
  )
}

export default App
