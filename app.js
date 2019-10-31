const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquire = require("inquirer");
const fs = require("fs");

var teamList = [];
const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter manager name:",
        validate: async (input) => {
            if (input == "" || /\s/.test(input)) {
                return "Please enter first or last name.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "Enter manager's email:",
        validate: async (input) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "Please enter a valid email address.";
        }
    },
    {
        type: "input",
        name: "officeNum",
        message: "Enter office number:",
        validate: async (input) => {
            if (isNaN(input)) {
                return "Please enter a number";
            }
            return true;
        }
    }
]

const employeeQuestions = [
    {
        type: "input",
        name: "name",
        message: "Enter employee name:",
        validate: async (input) => {
            if (input == "") {
                return "Please enter a name.";
            }
            return true;
        }
    },
    {
        type: "input",
        name: "email",
        message: "Enter their email:",
        validate: async (input) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
                return true;
            }
            return "Please enter a valid email address.";
        }
    },
    {
        type: "list",
        name: "role",
        message: "What is their role?",
        choices: ["engineer", "intern"]
    },
    {
        when: input => {
            return input.role == "engineer"
        },
        type: "input",
        name: "github",
        message: "Engineer, enter your github username:",
        validate: async (input) => {
            if (input == "" || /\s/.test(input)) {
                return "Please enter a valid GitHub username";
            }
            return true;
        }
    },
    {
        when: input => {
            return input.role == "intern"
        },
        type: "input",
        name: "school",
        message: "Intern, enter your school name:",
        validate: async (input) => {
            if (input == "") {
                return "Please enter a name.";
            }
            return true;
        }
    },
    {
        type: "list",
        name: "addAnother",
        message: "Add another team member?",
        choices: ["Yes", "No"]
    }
]

function buildTeamList() {
    inquire.prompt(employeeQuestions).then(employeeInfo => {
        if (employeeInfo.role == "engineer") {
            var newMember = new Engineer(employeeInfo.name, teamList.length + 1, employeeInfo.email, employeeInfo.github);
        } else {
            var newMember = new Intern(employeeInfo.name, teamList.length + 1, employeeInfo.email, employeeInfo.school);
        }
        teamList.push(newMember);
        if (employeeInfo.addAnother === "Yes") {
            console.log(" ");
            buildTeamList();
        } else {
            buildHtmlPage();
        }
    })
}

function buildHtmlPage() {
    fs.readFile("./templates/main.html", function (err, data) {
        fs.writeFileSync("./output/teamPage.html", data, function (err) {
            if (err) throw err;
            console.log("Base page generated!");
        })
        fs.appendFileSync("./output/teamPage.html", "</div></main></body></html>", function (err) {
            if (err) throw err;
            console.log("Page tags closed!");
        })
        for (member of teamList) {
            console.log(member.getRole());
            // if (member.getRole() == "Manager") {
            //     return;
            // }
        }
        if (err) throw err;
    }
    )
}

function init() {
    inquire.prompt(managerQuestions).then(managerInfo => {
        let teamManager = new Manager(managerInfo.name, 1, managerInfo.email, managerInfo.officeNum);
        teamList.push(teamManager);
        console.log(" ");
        buildTeamList();
    })
}

init();