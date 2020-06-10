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

// After the user has input all employees desired, call the `render` function (required above) and pass in an array containing all employee objects; the `render` function will generate and return a block of HTML including templated divs for each employee!

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
    let data = render(teamMbrs);

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    try {
    await fsPromises.writeFile(outputPath, data);
        // await fs.writeFile("team.html", data); 
    } catch(error) {
        console.log(error);
    }

}
 init(); 

// After you have your html, you're now ready to create an HTML file using the HTML returned from the `render` function. Now write it to a file named `team.html` in the `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different information; write your code to ask different questions via inquirer depending on employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,and Intern classes should all extend from a class named Employee; see the directions for further information. Be sure to test out each class and verify it generates an object with the correct structure and methods. This structure will be crucial in order for the provided `render` function to work! ```
