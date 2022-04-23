import 
  * as vscode
  from 'vscode';
import
  * as path
  from 'path';
import
  * as jest
  from 'jest'

export async function run(): Promise<void> {
  process.vscode = vscode;
  return new Promise((resolve, reject) => {
    const projectRootPath = path.join(__dirname, '../../../');
    console.log(projectRootPath);
    const config = path.join(projectRootPath, 'package.json');
    console.log(config);

    process.vscode.window.showInformationMessage(
      'Run tests'
    );
    setTimeout(() => {
      jest.runCLI({ config: `${config}` } as any, [projectRootPath]).then((success) => { console.log(success) })});
    /*
    runCLI({ config: config } as any, [projectRootPath])
      .then(jestCliCallResult => {
        console.log(jestCliCallResult);
        jestCliCallResult.results.testResults
          .forEach(testResult => {
            testResult.testResults
              .filter(assertionResult => assertionResult.status === 'passed')
              .forEach(({ ancestorTitles, title, status }) => {
                console.info(`  ● ${ancestorTitles} › ${title} (${status})`);
              });
          });

        jestCliCallResult.results.testResults
          .forEach(testResult => {
            if (testResult.failureMessage) {
              console.error(testResult.failureMessage);
            }
          });
      })
      .catch(errorCaughtByJestRunner => {
        console.error('Error in test runner', errorCaughtByJestRunner);
        reject(errorCaughtByJestRunner);
      });
      */
  });
}