import React from 'react'
import '../CSS/Hero.css'

const Hero = () => {
  return (
    <div className='heroBody'>
      <article className='heroWrap'>
        <section className='heroLeft'>
          <h1>FROM WITHIN <br />MY SOUL</h1>
          <p>Shop the most appealing products and <br/>services from our store</p>
          <button>All Products</button>
        </section>
        <section className='heroRight'></section>
      </article>
    </div>
  )
}

export default Hero
