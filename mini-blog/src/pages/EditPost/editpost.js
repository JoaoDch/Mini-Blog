import styles from './editpost.module.css'

import { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import { useDocument } from '../../hooks/useDocument'


const EditPost = () => {
    const {id} = useParams();
    const {document: post} = useDocument('posts', id);


  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')
  

  useEffect(() => {

    if(post) {
        setTitle(post.title)
        setBody(post.body)
        setImage(post.image)
    
        const textTags = post.tagsArray.join(', ')
        setTags(textTags);
    }

  }, [post])

  const {updateDocument, response} = useUpdateDocument('posts')

  const navigate = useNavigate()

  const {user} = useAuthValue()


  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError('');

    // validate url image
    try {
      new URL(image);

    } catch (error) {
      setFormError('the image needs to be a URL')
    }
    //tag array
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase())

    //check all values
    if(!title || !image || !tags || !body) {
      setFormError('please enter all fields')
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy:  user.displayName
    }

    updateDocument(id, data)

    // redirect home page
    navigate('/dashboard')

  };

  return (
    <div className={styles.edit_post}>
        
        {post && (
        <>
            <h2>Edit a post: {post.title}</h2>
            <p>edit your post!</p>
            <form onSubmit={handleSubmit}>
            <label>
                <span>Title:</span>
                <input type='text'name='title' required placeholder='think about a nice title!'
                onChange={(e) => setTitle(e.target.value)} value={title}/>
            </label>
            <label>
                <span>Image URL:</span>
                <input type='text'name='image' required placeholder='copy the image url that you want share with us!'
                onChange={(e) => setImage(e.target.value)} value={image}/>
            </label>
            <p className={styles.previewTitle}>Image preview:</p>
            <img className={styles.imagePreview} src={post.image} alt={post.title}></img>

            <label>
                <span>Content:</span>
                <textarea name='body' required placeholder='write the content about the post' onChange={(e) => setBody(e.target.value)} value={body}></textarea>
            </label>
            <label>
                <span>Tags:</span>
                <input type='text'name='tags' required placeholder='enter your post tags, separated by commas'
                onChange={(e) => setTags(e.target.value)} value={tags}/>
            </label>
            {!response.loading && <button className='btn'>Enter</button>}
            {response.loading &&( <button className='btn' disabled>please wait...</button> )}
            {response.error && <p className='error'>{response.error}</p>}
            {formError && <p className='error'>{formError}</p>}
            </form>
        </>
        )}
    </div>
  )
}

export default EditPost