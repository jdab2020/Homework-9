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
    var data = "";
    
    inquirer
        .prompt(questions)
        .then(function (input) {
            data += `<h1>${input.project_title}</h1>\n\n`;
            data += `<h2>Project Description: </h2>\n\n<h3>${input.project_description}</h3>\n\n`;
            data += `<h2>Table of Contents: </h2>\n\n<h3>${input.table_of_contents}</h3>\n\n`;
            data += `<h2>Installation: </h2>\n\n<h3>${input.installation}</h3\n\n`;
            data += `<h2>Usage: </h2>\n\n<h3>${input.usage}</h3>\n\n`;
            data += `<h2>License: </h2>\n\n<h3>${input.stack}</h3>\n\n`;
            data += `<h2>Contributing: </h2>\n\n<h3>${input.user_contributions}</h3>\n\n`;
            data += `<h2>Testing: </h2>\n\n<h3>${input.tests}\n\n`;
            
            console.log(JSON.stringify(input));
            // console.log(data);
            const userName = input.username;
            const queryUrl = `https://api.github.com/users/${userName}/repos?per_page=100`;
            
            axios
                .get(queryUrl)
                .then(function (response) {
                    data += `<img width="30" src="${response.data[0].owner.avatar_url}"><img>\n\n`
                    data += `<h2>Questions</h2>\n\n<h3>If you have any questions please contact me at <a href="${response.data[0].owner.url}">${response.data[0].owner.url}</a></h3>\n\n`
                    console.log(data);
                    writeFileAsync("README.md",data).then(function(){
                        console.log("Success");
                    });

                })

                .catch(function (error) { console.log(error); return; });
        })
}

// function writeToFile(fileName, data) {

// }

init();