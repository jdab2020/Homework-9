const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

const questions = [
    {
        type: "input",
        message: "Enter project title",
        name: "project_title"
    },
    {
        type: "input",
        message: "Enter project description",
        name: "project_description"
    },
    {
        type: "input",
        message: "Enter Table of Contents",
        name: "table_of_contents"
    },
    {
        type: "input",
        message: "Provide installation guidelines",
        name: "installation"
    },
    {
        type: "input",
        message: "Enter project/respository usage",
        name: "usage"
    },
    {
        type: "checkbox",
        message: "Pick a license for your project",
        name: "stack",
        choices: [
            "MIT",
            "Apache 2.0",
            "BSD 3",
            "None"
        ]
    },
    {
        type: "input",
        message: "Enter how users can contribute to the repository",
        name: "user_contributions"
    },
    {
        type: "input",
        message: "Enter a command to run tests",
        name: "tests"
    },
    {
        type: "input",
        message: "Enter your GitHub username for contact",
        name: "username"
    }
]

function init() {
    inquirer
        .prompt(questions)
        .then(function (input) {
            const pojectTitle = input.project_title;
            const projectDescription = input.project_description;
            const tableOfContents = input.table_of_contents;
            const installationGuide = input.installation;
            const repoUsage = input.usage;
            const license = input.stack;
            const contributions = input.user_contributions;
            const testing = input.tests;
            const userName = input.username;
            const queryUrl = `https://api.github.com/users/${userName}/repos?per_page=100`;
        })
        .then(function (queryUrl) {
            axios
                .get(queryUrl)
                .then(function (response) {
                    const contact = response.data[0].owner.url;
                    const image = response.data[0].owner.avatar_url;
                })
                .catch(function (error) { console.log(error); return; });
        })
}

function writeToFile(fileName, data) {
}

init();