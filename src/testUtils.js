import { List } from 'immutable';

export const NOT_STARTED = 'Not Started Yet';
export const RUNNING = 'Running';
export const PASSED = 'Passed';
export const FAILED = 'Failed';

export const groupByStatus = tests =>
	tests
		.groupBy(t => t.get('status'))
		.update(NOT_STARTED, (x = List()) => x)
		.update(RUNNING, (x = List()) => x)
		.update(PASSED, (x = List()) => x)
		.update(FAILED, (x = List()) => x);

export const getByStatus = (tests, status) =>
	tests.filter(test => test.get('status') === status);

export const statusToColor = status => {
	switch (status) {
		case NOT_STARTED:
			return '#eee';
		case RUNNING:
			return '#4D6A6D';
		case PASSED:
			return 'green';
		case FAILED:
			return 'red';
		default:
			return 'black';
	}
};
