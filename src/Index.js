import React from 'react'
import Nav from './components/Nav'
import './index.css'

class Index extends React.Component {
	render() {
		return <div>
			<Nav />
			{this.props.children}
		</div>
	}
}

export default Index
