// class Engineer inherits from Employee.

const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, git) {
        super(name, id, email);
        this.github = git;
    }
    getRole() {
        return "Engineer";
    }
    getGithub() {
        return this.github;
    }
}

module.exports = Engineer;
