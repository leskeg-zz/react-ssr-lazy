import React from 'react'
import {Link} from 'react-router'

const Nav = () => <ul style={style}>
	<li><Link to='/'>Home</Link></li>
	<li><Link to='/about'>About</Link></li>
</ul>

const style = {
	margin: 0
}

export default Nav
