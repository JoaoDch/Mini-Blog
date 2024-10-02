import { NavLink } from "react-router-dom"
import styles from './Navbar.module.css'

import { useAuthentication } from "../hooks/useAuthentication"
import { useAuthValue } from "../context/AuthContext"


const Navbar = () => {

    const {user} = useAuthValue();
    const {logout} = useAuthentication();


  return (
    <nav className={styles.navbar}>
        <NavLink to='/' className={styles.brand}>
            Mini <span>Blog</span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to='/' className={({isActive}) => (isActive ? styles.active : '')}>Home</NavLink>
            </li>
            {!user && (
                <>
                <li>
                <NavLink to='/login' className={({isActive}) => (isActive ? styles.active : '')}>Log in!</NavLink>
            </li>
            <li>
                <NavLink to='/register' className={({isActive}) => (isActive ? styles.active : '')}>Don't have a account? Register now!</NavLink>
                    </li>
                </>
            )}
            {user && (
                <>
                <li>
                <NavLink to='/posts/create' className={({isActive}) => (isActive ? styles.active : '')}>share a photo with your friends!</NavLink>
            </li>
            <li>
                <NavLink to='/dashboard' className={({isActive}) => (isActive ? styles.active : '')}>your posts</NavLink>
                    </li>
                </>
            )}
            <li>
                <NavLink to='/about' className={({isActive}) => (isActive ? styles.active : '')}>About</NavLink>
            </li>
            {user && (<li> 
                <button onClick={logout}>Exit</button>
            </li>)}
        </ul>
    </nav>
  )
}

export default Navbar