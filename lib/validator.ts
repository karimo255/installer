import chalk from "chalk";
import {execSync} from "child_process";
import semver from "semver";

const validateProjectName = (name?: string): boolean => {
    return !!name;
};

export const checkAppName = (appName: string) => {
    const isNameValid = validateProjectName(appName);
    if (!isNameValid) {
        console.error(
            `Could not create a project called ${chalk.red(
                `"${appName}"`
            )}`
        );
        process.exit(1);
    }

    const dependencies = ['@io/sms', '@io/sms'].sort();
    if (dependencies.indexOf(appName) >= 0) {
        console.error(
            chalk.red(
                `We cannot create a project called ${chalk.green(
                    appName
                )} because a dependency with the same name exists.\n` +
                `Due to the way npm works, the following names are not allowed:\n\n`
            ) +
            chalk.cyan(dependencies.map(depName => `  ${depName}`).join('\n')) +
            chalk.red('\n\nPlease choose a different project name.')
        );
        process.exit(1);
    }
};

export const checkNpmVersion = () => {
    let hasMinNpm = false;
    let npmVersion = null;
    try {
        npmVersion = execSync('npm --version')
            .toString()
            .trim();
        hasMinNpm = semver.gte(npmVersion, '5.0.0');
    } catch (err) {
        // ignore
    }
    return {
        hasMinNpm: hasMinNpm,
        npmVersion: npmVersion,
    };
};

export const checkNodeVersion = () => {

    if (!semver.satisfies(process.version, "8")) {
        console.error(
            chalk.red(
                'You are running Node %s.\n' +
                'create sipgate app requires Node %s or higher. \n' +
                'Please update your version of Node.'
            ),
            process.version,
            "8"
        );
        process.exit(1);
    }
};