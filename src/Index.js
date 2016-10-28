import React from 'react';
import Nav from './components/Nav';

export default class Index extends React.Component {
	render() {
		return (
			<div>
				<Nav />
				{this.props.children}
			</div>
		)
	}
}
