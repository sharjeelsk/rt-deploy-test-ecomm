import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import './Home.css'


interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  }).format(value)

const truncate = (value: string, limit = 120) =>
  value.length > limit ? `${value.slice(0, limit)}…` : value

export default function Home() {
  const [products, setProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    axios
      .get<Product[]>('https://fakestoreapi.com/products')
      .then((response) => {
        setProducts(response.data)
        setError(null)
      })
      .catch(() => {
        setError('Unable to load products right now. Please try again later.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className='home'>
      <section className='hero'>
        <p className='eyebrow'>Holiday edit</p>
        <h1>Find pieces that feel like you</h1>
        <p className='subcopy'>
          Curated looks, sustainable fabrics, and everyday essentials that keep you comfy without
          compromising on style.
        </p>
        <div className='hero-cta'>
          <a className='btn primary' href='#catalog'>
            Shop new arrivals
          </a>
          <a className='btn ghost' href='#catalog'>
            Browse categories
          </a>
        </div>
      </section>

      <section id='catalog' className='catalog'>
        <div className='section-heading'>
          <div>
            <p className='eyebrow'>Featured</p>
            <h2>Trending now</h2>
          </div>
          <span className='badge'>{products.length} products</span>
        </div>

        {loading && <p className='status'>Loading dreamy fits…</p>}
        {error && <p className='status error'>{error}</p>}

        {!loading && !error && (
          <div className='product-grid'>
            {products.map((product) => (
              <Link className='product-card' to={`/product/${product.id}`} key={product.id}>
                <div className='media'>
                  <img src={product.image} alt={product.title} loading='lazy' />
                  <span className='pill'>{product.category}</span>
                </div>
                <div className='copy'>
                  <h3>{product.title}</h3>
                  <p>{truncate(product.description)}</p>
                </div>
                <div className='meta'>
                  <strong>{formatPrice(product.price)}</strong>
                  <span>View details →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
