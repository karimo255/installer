import chalk from "chalk";

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

    const dependencies = ['@io/sms', '@io/fax'].sort();
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

