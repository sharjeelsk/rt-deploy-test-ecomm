import { useParams } from 'react-router'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router'
import './ProductDetail.css'

interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

const formatPrice = (value: number | undefined) =>
  typeof value === 'number'
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
      }).format(value)
    : '—'

export default function ProductDetail() {
  const [product, setProduct] = React.useState<Product | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const { id } = useParams()

  React.useEffect(() => {
    setLoading(true)
    axios
      .get<Product>(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data)
        setError(null)
      })
      .catch(() => {
        setError('Could not load this product. Please try again later.')
      })
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className='product-detail-page'>
      <Link to='/' className='back-link'>
        ← back to catalog
      </Link>

      <div className='detail-card'>
        {loading && <p className='status'>Curating your look…</p>}
        {error && <p className='status error'>{error}</p>}

        {!loading && !error && product && (
          <>
            <div className='gallery'>
              <div className='main-frame'>
                <img src={product.image} alt={product.title} loading='lazy' />
              </div>
              <div className='thumbs'>
                {[1, 2, 3].map((item) => (
                  <span key={item} className='thumb-swatch' />
                ))}
              </div>
            </div>

            <div className='info'>
              <p className='eyebrow'>{product.category}</p>
              <h1>{product.title}</h1>
              <p className='price'>{formatPrice(product.price)}</p>
              <p className='description'>{product.description}</p>

              <div className='actions'>
                <button className='btn primary'>Add to bag</button>
                <button className='btn ghost'>Add to wishlist</button>
              </div>

              <ul className='meta-list'>
                <li>
                  <span>Shipping</span>
                  <strong>Free worldwide</strong>
                </li>
                <li>
                  <span>Returns</span>
                  <strong>30-day easy returns</strong>
                </li>
                <li>
                  <span>Material</span>
                  <strong>Premium blend</strong>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
