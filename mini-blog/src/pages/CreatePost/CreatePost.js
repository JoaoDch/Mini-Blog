import styles from './CreatePost.module.css'

import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {useAuthValue} from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState('')

  const {insertDocument, response} = useInsertDocument('posts')

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

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy:  user.displayName

    })

    // redirect home page
    navigate('/')

  };

  return (
    <div className={styles.create_post}>
        <h2>Create a post.</h2>
        <p>Write about what you want share!</p>
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
    </div>
  )
}

export default CreatePost