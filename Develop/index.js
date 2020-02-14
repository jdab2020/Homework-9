const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

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
    var data = "";
    
    inquirer
        .prompt(questions)
        .then(function (input) {
            data += `# ${input.project_title}\n\n`;
            data += `# Project Description:\n\n\t${input.project_description}\n\n`;
            data += `# Table of Contents:\n\n\t${input.table_of_contents}\n\n`;
            data += `# Installation:\n\n\t${input.installation}\n\n`;
            data += `# Usage:\n\n\t${input.usage}\n\n`;
            data += `# License:\n\n\t${input.stack}\n\n`;
            data += `# Contributing:\n\n\t${input.user_contributions}\n\n`;
            data += `# Testing:\n\n\t${input.tests}\n\n`;
            
            const userName = input.username;
            const queryUrl = `https://api.github.com/users/${userName}/repos?per_page=100`;
            
            axios
                .get(queryUrl)
                .then(function (response) {
                    data += `<img width="250px" src="${response.data[0].owner.avatar_url}"><img>\n\n`
                    data += `# Questions\n\n\tIf you have any questions please contact me at <a href="${response.data[0].owner.url}">${response.data[0].owner.url}\n\n`
                    console.log(data);
                    writeFileAsync("README.md",data).then(function(){
                        console.log("Success");
                    });

                })

                .catch(function (error) { console.log(error); return; });
        })
}

init();