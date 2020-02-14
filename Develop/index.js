const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

// const generateMarkdown = require("generateMarkdown");
// const api = require("api");

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
            const userName = input.username;
            const queryUrl = `https://api.github.com/users/${userName}/repos?per_page=100`;

            axios
                .get(queryUrl)
                .then(function (response) {
                    data = {
                        pojectTitle: input.project_title,
                        projectDescription: input.project_description,
                        tableOfContents: input.table_of_contents,
                        installationGuide: input.installation,
                        repoUsage: input.usage,
                        license: input.stack,
                        contributions: input.user_contributions,
                        testing: input.tests,
                        image: response.data[0].owner.avatar_url,
                        contact: response.data[0].owner.url
                    }
                    console.log(data);
                    // writeToFile("README.md",data);

                })

                .catch(function (error) { console.log(error); return; });
        })
}

// function writeToFile(fileName, data) {

// }

init();