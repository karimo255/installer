export const questions = [
    {
        type: 'list',
        name: 'language',
        message: 'Please select a language',
        choices: ['javascript', 'typescript'],
        filter: function (val: string) {
            return val.toLowerCase();
        }
    },
    {
        type: 'list',
        name: 'compiler',
        message: 'Choose a compiler!',
        choices: ['tsc', 'babel'],
        when: function (answers: any) {
            return answers.language === 'typescript';
        }
    },
    {
        type: 'confirm',
        name: 'linter',
        message: 'use linter?',
        default: false
    },
    {
        type: 'input',
        name: 'modules',
        message: 'Which modules do you want to install?',
        validate: function (value: any) {
            const valid = (value !== "" && value !== 'undefined' && value !== undefined);
            return valid || 'Please enter a module name';
        },
        filter: function (val: string) {
            return val.toLowerCase();
        }
    }
];