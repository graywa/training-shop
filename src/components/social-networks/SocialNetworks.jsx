import React from 'react'
import facebook from './assets/facebook.svg'
import instagram from './assets/instagram.svg'
import pinterest from './assets/pinterest.svg'
import twitter from './assets/twitter.svg'
import './SocialNetworks.scss'

const SocialNetworks = ({size}) => {
  return (
    <div className='social-networks'>
      <a href="!!!">
        <img width={size} src={facebook} alt="facebook" />
      </a>
      <a href="!!!">
        <img width={size} src={instagram} alt="instagram" />
      </a>
      <a href="!!!">
        <img width={size} src={pinterest} alt="pinterest" />
      </a>
      <a href="!!!">
        <img width={size} src={twitter} alt="twitter" />
      </a>
    </div>
  )
}

export default SocialNetworks