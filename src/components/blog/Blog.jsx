import React from 'react'
import './Blog.scss'
import way from './assets/way.jpg'
import wedding from './assets/wedding.jpg'
import recent from './assets/recent.jpg'

const Blog = () => {
  return (
    <div className='blog'>
      <div className="blog__header">
        <div className="blog__title">LATEST FROM BLOG</div>
        <div className="blog__all">SEE ALL</div>
      </div>     

      <div className="posts-container">
        <article className="post">
            <img className="post__photo" src={way} alt="way" />
            <div className="post__content">
              <div className="post__title">The Easiest Way to Break</div>
              <p className="post__text">
                But I must explain to you how all this mistaken idea of denouncing pleas and praising pain was bor
              </p>
          </div>      
        </article>
        <article className="post">
          <img src={wedding} alt="way" className="post__photo" />
          <div className="post__content">
            <div className="post__title">Wedding Season</div>
            <p className="post__text">
              But I must explain to you how all this mistaken idea of denouncing pleas and praising pain was bor
            </p>
          </div>
        </article>
        <article className="post">
          <img src={recent} alt="way" className="post__photo" />
          <div className="post__content">
            <div className="post__title">Recent Favorites On Repeat</div>
            <p className="post__text">
              But I must explain to you how all this mistaken idea of denouncing pleas and praising pain was bor
            </p>
          </div>
        </article> 
      </div>    
      
    </div>
  )
}

export default Blog