import react, {useEffect} from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import CategoryPage from './pages/CategoryPage'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductPage from './pages/product-page/ProductPage'
import './App.scss'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'


const App = () => {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  return (
    <div className='app' data-test-id='app'>
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<MainPage />} />      
          <Route path='about' element={<h1 style={{padding: '30px 90px'}} >About Us</h1>} />   
          <Route path='blog' element={<h1 style={{padding: '30px 90px'}} >Blog</h1>} />   
          <Route path='contact' element={<h1 style={{padding: '30px 90px'}} >Contact</h1>} />   
          <Route path='goods/:category' element={<CategoryPage />} />
          <Route path='goods/:category/:id' element={<ProductPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  )
}

export default App
