import react, {useEffect} from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import CategoryPage from './pages/CategoryPage'
import MainPage from './pages/MainPage'
import NotFoundPage from './pages/NotFoundPage'
import ProductPage from './pages/product-page/ProductPage'
import './App.scss'
import Header from './components/header/Header'


const App = () => {
  const {pathname} = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  return (
    <div className='app' data-test-id='app'>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/:category' element={<CategoryPage />} />
        <Route path='/:category/:id' element={<ProductPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
