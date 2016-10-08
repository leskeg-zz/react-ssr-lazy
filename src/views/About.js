import React from 'react';
import store from '../store';
import { observer } from 'mobx-react';

@observer
export default class About extends React.Component {
	render() {
		return (
			<div>
				About
			</div>
		)
	}
}
