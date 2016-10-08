import React from 'react';
import store from '../store';

export default class Index extends React.Component {
	render() {
		store.changeTest('bye world')

		return (
			<div>
				Index: {store.test}
			</div>
		)
	}
}
