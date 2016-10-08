import React from 'react';

export default class Index extends React.Component {
    _handleClick() {
        alert();
    }

    render() {
        return (
            <div>
                <h1>Hello World</h1>
                <button onClick={this._handleClick}>Click Me</button>
            </div>
        );
    }
}
