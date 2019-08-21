import chalk from "chalk";
import * as commander from "commander";
// @ts-ignore
import envinfo from "envinfo";
import inquirer from "inquirer";
import {checkAppName, checkNodeVersion, checkNpmVersion} from "./validator";
import {questions} from "./questions";

let projectName: string = '';

const program = new commander.Command("create-io-app")
    .version("0.0.1")
    .arguments('<project-directory>')
    .usage(`${chalk.green('<project-directory>')} [options]`)
    .action(name => {
        projectName = name;
    })
    .option('--verbose', 'print additional logs')
    .option('--info', 'print environment debug info')
    .option('--typescript')
    .allowUnknownOption()
    .parse(process.argv);

if (program.info) {
    console.log(chalk.bold('\nEnvironment Info:'));
    envinfo
        .run(
            {
                System: ['OS', 'CPU'],
                Binaries: ['Node', 'npm'],
                Browsers: ['Chrome', 'Edge', 'Internet Explorer', 'Firefox', 'Safari']
            },
            {
                duplicates: true,
                showNotFound: true,
            }
        )
        .then(console.log);
}

if (projectName === '') {
    console.error('Please specify the project directory:');
    console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`
    );
    console.log();
    console.log('For example:');
    console.log(`  ${chalk.cyan(program.name())} ${chalk.green('my-app')}`);
    console.log();
    console.log(
        `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`
    );
    process.exit(1);
}

const {hasMinNpm, npmVersion} = checkNpmVersion();

if (!hasMinNpm) {
    console.error(
        `npm version higher as 5.0.0 is required. current version ${chalk.red(
            `"${npmVersion}"`
        )}`
    );
    process.exit(1);
}

checkNodeVersion();
checkAppName(projectName);

let timespan = 0;

if(program.info){
    timespan = 2200;
}

setTimeout(()=>{
    console.log('Hi, welcome to sipgate create app');

    inquirer.prompt(questions).then(answers => {
        console.log('\nProject:');
        answers.modules = answers.modules.split(" ");
        console.log(JSON.stringify(answers, null, '  '));
    });
}, timespan);