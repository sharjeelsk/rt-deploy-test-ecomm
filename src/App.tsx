import { Routes, Route } from 'react-router'
import Home from './Pages/Home'
import ProductDetail from './Pages/ProductDetail'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes> 
    </>
  )
}
