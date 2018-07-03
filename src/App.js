import React, { Component } from 'react';
import './App.css';

import { tests } from './tests';

const renderTest = description => (
	<div className="testContainer">
		<p>{description}</p>
		<p>Completed</p>
	</div>
);

class App extends Component {
	state = { tests };

	render() {
		const descriptions = tests.map(test => test.description);
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p className="App-intro">
					<div>{descriptions.map(renderTest)}</div>
				</p>
			</div>
		);
	}
}

export default App;
