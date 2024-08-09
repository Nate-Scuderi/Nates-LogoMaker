const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Circle, Square } = require('./lib/shapes');

function generateSVG({ text, textColor, shape, shapeColor }) {
    let shapeInstance;

    switch(shape) {
        case 'circle':
            shapeInstance = new Circle(shapeColor);
            break;
        case 'square':
            shapeInstance = new Square(shapeColor);
            break;
        case 'triangle':
            shapeInstance = new Triangle(shapeColor);
            break;
    }

    const svgContent = `
<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
    ${shapeInstance.render()}
    <text x="150" y="120" font-size="40" text-anchor="middle" fill="${textColor}">${text}</text>
</svg>`;

    fs.writeFileSync('./examples/logo.svg', svgContent);
    console.log('Generated logo.svg');
}

inquirer.prompt([
    {
        type: 'input',
        name: 'text',
        message: 'Enter text (up to 3 characters):',
        validate: input => input.length <= 3 || 'Text must be 3 characters or less.',
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter text color (keyword or hex):',
        validate: input => /^#[0-9A-F]{6}$/i.test(input) || /^[a-z]+$/i.test(input) || 'Please enter a valid color keyword or hexadecimal.',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square'],
    },
    {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter shape color (keyword or hex):',
        validate: input => /^#[0-9A-F]{6}$/i.test(input) || /^[a-z]+$/i.test(input) || 'Please enter a valid color keyword or hexadecimal.',
    }
]).then(generateSVG);
