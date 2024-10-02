import styles from './Dashboard.module.css'
import {Link} from 'react-router-dom'


//hooks
import {useAuthValue} from '../../context/AuthContext'
import {useDocument} from '../../hooks/useDocument'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useDeleteDocument } from '../../hooks/useDeleteDocument'


const Dashboard = () => {
  const {user} = useAuthValue()
  const uid = user.uid

  //user posts

  const {documents: posts, loading} = useFetchDocuments('posts', null, uid)

  const {deleteDocument} = useDeleteDocument ('posts')

  if (loading) {
    return <p>loading...</p>
  }

  return (
    <div className={styles.dashboard}>
        <h2>Dashboard</h2>
        <p>manage your posts</p>
        {posts && posts.length === 0 ? (
          <div className={styles.noposts}>
            <p>you don't have any posts yet.</p>
            <Link to={'/posts/create'} className='btn'>create your first post now!</Link>
          </div>
        ) : (
          <>
          <div className={styles.post_header}>
            <span>title</span>
            <span>actions</span>
          </div>
          {posts && posts.map((post) => (
            <div className={styles.post_row} key={post.id}>
            <p key={post.title}>{post.title}</p>
            <div className={styles.actions}>
              <Link to={`/posts/${post.id}`} className='btn btn-outline'>see post</Link>
              <Link to={`/posts/edit/${post.id}`} className='btn btn-outline'>edit</Link>
              <button onClick={() => deleteDocument(post.id)} className='btn btn-outline btn-danger'>delete</button>
            </div>
            </div>))}
          </>
        )}
    </div>
  )
}

export default Dashboard