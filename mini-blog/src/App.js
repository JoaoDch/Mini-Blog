import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';

//Hooks
import { useState, useEffect} from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// Contexts
import { AuthProvider } from './context/AuthContext';

//pages
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import Search from './pages/Search/Search';
import Post from './pages/Post/Post';
import EditPost from './pages/EditPost/editpost';

function App() {

  const [user, setUser] = useState(undefined)
  const {auth} = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{user}}>
      <BrowserRouter>
      <Navbar />
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/search' element={<Search />} />
            <Route path='/posts/:id' element={<Post />} />
            <Route path='/register' element={!user ? <Register /> : <Navigate to={'/'} />} />
            <Route path='/login' element={!user ? <Login /> : <Navigate to={'/'} />} />
            <Route path='/posts/edit/:id' element={user ? <EditPost /> : <Navigate to={'/login'} />} />
            <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to={'/login'} />} />
            <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to={'/login'} />} />
            
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
