import styles from './Post.module.css'

// hook
import {useParams} from 'react-router-dom'
import {useDocument} from '../../hooks/useDocument'
import { Link } from 'react-router-dom'

import React from 'react'

const Post = () => {

    const {id} = useParams()
    const {document: post} = useDocument('posts', id)

  return (
    <div className={styles.post_container}>
        {post && (
          <>
            <h1>{post.title}</h1>
            <img src={post.image} alt={post.title}/>
            <p>{post.body}</p>
            <h3>{post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}</p>
            ))}</h3>
          </>
        )}
        <Link to={'/'} className='btn btn-dark'>back to home</Link>
    </div>
  )

  
}

export default Post