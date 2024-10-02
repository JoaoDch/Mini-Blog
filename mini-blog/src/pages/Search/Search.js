import React from 'react'

import styles from './Search.module.css'

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import { Link } from 'react-router-dom'

// components
import PostDetails from '../../components/PostDetails'


const Search = () => {

    const query = useQuery()
    const search = query.get('q');

    const {documents: posts} = useFetchDocuments('posts', search)

  return (
    <div className={styles.search_container}>
        <h2>Search</h2>
        <div>
            {posts && posts.length === 0 && (
                <div className={styles.nopost}>
                    <p>there are no posts related to your search</p>
                    <Link to='/' className='btn btn-dark'>back</Link>
                </div>
            )}
            {posts && posts.map((post) => (
                <PostDetails key={post.id} post={post}/>
            ))}
        </div>
    </div>
  )
}

export default Search