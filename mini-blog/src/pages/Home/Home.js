import React from 'react'
import styles from './Home.module.css'

//hooks
import {useNavigate, Link} from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

//components
import PostDetails from '../../components/PostDetails'


const Home = () => {
  const [query, setQuery] = useState('')
  const {documents: posts, loading} = useFetchDocuments('posts')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
        <h1>see the latest posts</h1>
        <form onSubmit={handleSubmit} className={styles.search_form}>
          <input type='text' placeholder='or search for tags...' onChange={(e) => setQuery(e.target.value)}/>
          <button className='btn btn-dark'>search</button>
        </form>
        <div>
          {loading && <p>loading...</p>}
          {posts && posts.map((post) => <PostDetails key={post.id} post={post}/>)}
          {posts && posts.length === 0 && (
            <div className={styles.noposts}>
              <p>posts not found</p>
              <Link to={'/posts/create'} className='btn'>create first post</Link>  
            </div>
          )}
        </div>
    </div>
  )
}

export default Home