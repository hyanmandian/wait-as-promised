import test from 'ava';
import wait from '.';

test('wait resolve', async t => {
	let value = false;

	const predicate = () => Boolean(value);

	setTimeout(() => {
		value = true;
	});

	await wait(predicate).then(() => t.pass());
});
