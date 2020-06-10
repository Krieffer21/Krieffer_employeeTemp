const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fsPromises = require("fs").promises;
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Array of questions
const manager = [
    {
        type: "input",
        message: "Please enter your manager's name.",
        name: "name"
      },
      {
        type: "input",
        message: "Please enter your manager's ID number.",
        name: "num"
      },
      {
        type: "input",
        message: "Please enter your manager's email.",
        name: "email"
      },   
      {
        type: "input",
        message: "Please enter your manager's office number.",
        name: "off"
      },
    {
        type: "list",
        message: "Please enter the next type of team member you would like to add.",
        name: "position",
        choices: [
            "Engineer",
            "Intern",
            "I am done creating my team."
        ]
    }
];

const engineer = [
    {
        type: "input",
        message: "Please enter your engineer's name.",
        name: "name"
      },
      {
        type: "input",
        message: "Please enter your engineer's ID number.",
        name: "num"
      },
      {
        type: "input",
        message: "Please enter your engineer's email.",
        name: "email"
      },   
    {
        type: "input",
        message: "Please enter your engineer's GitHub username.",
        name: "git"
      }, 
      {
      type: "list",
      message: "Please enter the next type of team member you would like to add.",
      name: "position",
      choices: [
          "Engineer",
          "Intern",
          "I am done creating my team."
      ]
    }
];

const intern = [
    {
        type: "input",
        message: "Please enter your intern's name.",
        name: "name"
      },
      {
        type: "input",
        message: "Please enter your intern's ID number.",
        name: "num"
      },
      {
        type: "input",
        message: "Please enter your intern's email.",
        name: "email"
      },   
    {
        type: "input",
        message: "Please enter your intern's school name.",
        name: "school"
      },
      {
        type: "list",
        message: "Please enter the next type of team member you would like to add.",
        name: "position",
        choices: [
            "Engineer",
            "Intern",
            "I am done creating my team."
        ]
    }
];

// init function prompts the user the questions and adds them to an array.
async function init() {
    const manData = await inquirer.prompt(manager);
    let mgr = new Manager(manData.name, manData.num, manData.email, manData.off);
    let addEmply = manData.position;
    console.log(addEmply);
    
    let teamMbrs =[mgr];

    while (addEmply === "Engineer" || addEmply === "Intern") {
       
        if(addEmply === "Engineer") {
        const engData = await inquirer.prompt(engineer);
        let eng = new Engineer(engData.name, engData.num, engData.email, engData.git);
        teamMbrs.push(eng);
        addEmply = engData.position;
       } 

       if (addEmply ==="Intern") {
        const intData = await inquirer.prompt(intern);
        let int = new Intern(intData.name, intData.num, intData.email, intData.school);
        teamMbrs.push(int);
        addEmply = intData.position;
       }
    } 
    // render function turns the array of data into an html file
    let data = render(teamMbrs);

    // Creates the directory if it doesnt already exist and writes the html file to it.
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    try {
        await fsPromises.writeFile(outputPath, data);

  } catch(error) {
        console.log(error);
    }

}
 init(); 