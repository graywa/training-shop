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

  const categoryType = [
    'men',
    'women',
    'beauty',
    'accessories'
  ]

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
          {categoryType.map(el => {
            return <Route key={el} path={`/${el}`} element={<CategoryPage category={el} />} />
          })} 
          {categoryType.map(el => {
            return <Route key={el} path={`/${el}/:id`} element={<ProductPage category={el} />} />
          })}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
      
      <Footer />
    </div>
  )
}

export default App
