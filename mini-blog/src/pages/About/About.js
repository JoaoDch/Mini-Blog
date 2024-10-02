import React from 'react'
import styles from './About.module.css'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
        <h2>learn more about the Mini <span>Blog</span></h2>
        <p>this blog is a test project created in react on the front-end, using modern technologies like Firebase on the back-end</p>
        <Link to='/posts/create' className='btn'>create your first post!</Link>
    </div>
  )
}

export default About