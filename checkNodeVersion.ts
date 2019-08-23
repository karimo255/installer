import {execSync} from "child_process";
import * as semver from "semver";
import chalk from "chalk";


export const checkNpmVersion = () => {
    let hasMinNpm = false;
    let npmVersion = null;
    try {
        npmVersion = execSync('npm --version')
            .toString()
            .trim();
        hasMinNpm = semver.gte(npmVersion, '5.0.0');

        if (!hasMinNpm) {
            console.error(
                `npm version higher as 5.0.0 is required. current version ${chalk.red(
                    `"${npmVersion}"`
                )}`
            );
            process.exit(1);
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
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
console.log("Check nodejs version ...");
checkNodeVersion();
console.log("nodejs version", chalk.green("OK"));

console.log("Check npm version ...");
checkNpmVersion();
console.log("npm version", chalk.green("OK"));

console.log("Build binary...");
