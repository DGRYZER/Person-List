import React from 'react'
import { Link } from 'react-router-dom'
import style from './home.module.css'

const Nav= ()=> {
  return (
    <div id={style.nav}>
        <Link to='/home'>HOME</Link>
        <Link to='/fav'>FAVOURITE</Link>
    </div>
  )
}
 export default Nav