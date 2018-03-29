import test from 'ava';
import wait from '.';

test('should resolve', async t => {
	let value = false;

	const predicate = () => Boolean(value);

	setTimeout(() => {
		value = true;
	});

	await wait(predicate).then(() => t.pass());
});

test('should timeout', async t => {
	let value = false;

	const predicate = () => Boolean(value);

	setTimeout(() => {
		value = true;
	}, 5100);

	const error = await t.throws(wait(predicate, {timeout: 500}));

	t.is(error.message, 'function timed out after 500 milliseconds');
});

test('should not timeout', async t => {
	let value = false;

	const predicate = () => Boolean(value);

	setTimeout(() => {
		value = true;
	}, 200);

	await wait(predicate, {timeout: 500}).then(() => t.pass());
});

test('should timeout by default after 5000 milliseconds', async t => {
	let value = false;

	const predicate = () => Boolean(value);

	setTimeout(() => {
		value = true;
	}, 5100);

	const error = await t.throws(wait(predicate));

	t.is(error.message, 'function timed out after 5000 milliseconds');
});

test('should not timeout if timeout value is lower than zero', async t => {
	let value = false;

	const predicate = () => Boolean(value);

	setTimeout(() => {
		value = true;
	}, 5100);

	await wait(predicate, {timeout: -1}).then(() => t.pass());
});
