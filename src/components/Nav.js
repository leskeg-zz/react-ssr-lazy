import React from 'react';
import {Link} from 'react-router';

export default class Nav extends React.Component {
	render() {
		const {location} = this.props;

		return (
			<ul>
				<li>
					<Link to='/'>Index</Link>
				</li>
				<li>
					<Link to='/services'>Service</Link>
				</li>
			</ul>
		)
	}
}
