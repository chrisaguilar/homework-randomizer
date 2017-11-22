#!/usr/bin/env node

const fs = require('fs');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const assigned = require('./assigned.json');

function makeRow(name, students) {
    const studentRows = students.slice(1).map(student => `<tr><td>${student}</td></tr>`).join('');
    return `
        <tr>
            <th scope="row" rowspan=${students.length} style="vertical-align: middle;">${name}</th>
            <td>${students[0]}</td>
        </tr>
        ${studentRows}
    `;
}

function makeTable() {
    const data = Object.entries(assigned).map(([name, students]) => makeRow(name, students)).join('');
    const today = new Date(Date.now()).toLocaleString().split(',')[0];
    return `
    <table class="table table-bordered table-sm">
        <thead>
            <tr>
                <th scope="col" colspan=2>Homewwork Randomizations for the week of ${today}</th>
            </tr>
            <tr>
                <th scope="col">Instructor</th>
                <th scope="col">Student</th>
            </tr>
        </thead>
        <tbody>
            ${data}
        </tbody>
    </table>
    `
}

function makeHTML() {
    return `
        <!doctype html>
        <html lang="en">
            <head>
                <title>Homework Randomizer</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" />
                <style type="text/css">th, td {text-align: center;}</style>
            </head>
            <body>
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-6">${makeTable()}</div>
                    </div>
                </div>
            </body>
        </html>
    `;
}

async function main() {
    const file = makeHTML().replace(/>\s*</g, '><').replace(/^\s*/, '');
    await writeFile('./index.html', file, 'utf8');
}

main();
