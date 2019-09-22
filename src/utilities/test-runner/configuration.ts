import 
  * as vscode
  from 'vscode';
import
  * as path
  from 'path';
import
  { runCLI }
  from 'jest-cli';

export async function run(): Promise<void> {
  process.vscode = vscode;
  return new Promise((resolve, reject) => {
    const projectRootPath = path.join(__dirname, '../../../');
    const config = path.join(projectRootPath, 'package.json');

    process.vscode.window.showInformationMessage(
      'Run tests'
    );

    runCLI({ config } as any, [projectRootPath])
      .then(jestCliCallResult => {
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
  });
}