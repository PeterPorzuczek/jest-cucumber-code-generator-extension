import 
	* as path
	from 'path';
import
	{ runTests }
	from 'vscode-test';

async function runExtensionTests() {
	try {
		const extensionDevelopmentPath = path.resolve(__dirname, '../../../');
		const extensionTestsPath = path.resolve(__dirname, './configuration');

		await runTests({
			extensionDevelopmentPath,
			extensionTestsPath,
			launchArgs: ['--disable-extensions']
		});
	} catch (err) {
		console.error('Failed to run tests', err);
		process.exit(1);
	}
}

runExtensionTests();