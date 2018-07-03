import React, { Component } from 'react';
import { fromJS } from 'immutable';
import './App.css';
import { tests } from './tests';
import {
	statusToColor,
	groupByStatus,
	getByStatus,
	NOT_STARTED,
	RUNNING,
	PASSED,
	FAILED
} from './testUtils';

const renderTest = ({ description, status }) => (
	<div className="testContainer" key={description}>
		<p>{description}</p>
		<p style={{ color: statusToColor(status) }}>{status}</p>
	</div>
);

const FinishedOverlay = ({ onClick }) => (
	<div className="finishedOverlay">
		<p>FINISHED!</p>
		<button onClick={onClick} className="appButton">
			Close
		</button>
	</div>
);

class App extends Component {
	// Component state must be a regular JS object, that's why I'm not converting it to ImmutableJS collection.
	state = {
		finished: false,
		tests: fromJS(tests.map(test => ({ ...test, status: NOT_STARTED })))
	};

	startTests = () => {
		this.setState(({ tests }) => ({
			tests: tests.map(test => test.set('status', RUNNING))
		}));

		this.state.tests.forEach((test, index) => {
			test.get('run')(this.updateTestStatus(index));
		});
	};

	updateTestStatus = testIndex => passed => {
		const newStatus = passed ? PASSED : FAILED;

		this.setState(({ tests }) => {
			const newTests = tests.update(testIndex, test =>
				test.set('status', newStatus)
			);

			return {
				tests: newTests,
				finished: getByStatus(newTests, RUNNING).size === 0
			};
		});
	};

	closeOverlay = () => {
		this.setState({ finished: false });
	};

	render() {
		const testsByStatus = groupByStatus(this.state.tests);

		const testsNotStarted = testsByStatus.get(NOT_STARTED);
		const testsPassed = testsByStatus.get(PASSED);
		const testsFailed = testsByStatus.get(FAILED);
		const testsRunning = testsByStatus.get(RUNNING);

		const sortedTests = testsNotStarted.concat(
			testsRunning,
			testsPassed,
			testsFailed
		);

		return (
			<div className="app">
				<header className="header">
					<h1 className="title">Welcome to the NoRedInk online test-runner</h1>
				</header>
				<div className="main">
					<div className="testsInfo">
						<p>Tests passed: {testsPassed.size}</p>
						<p>Tests failed: {testsFailed.size}</p>
						<p>Tests running: {testsRunning.size}</p>
					</div>
					<div className="tests">{sortedTests.toJS().map(renderTest)}</div>
				</div>
				<button className="appButton" onClick={this.startTests}>
					Start Tests
				</button>
				{this.state.finished && <FinishedOverlay onClick={this.closeOverlay} />}
			</div>
		);
	}
}

export default App;
