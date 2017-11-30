#!/usr/bin/env node

const fs = require('fs');
const { promisify } = require('util');

const assigned = require('./assigned.json');

const writeFile = promisify(fs.writeFile);

function makeRow(name, students) {
    // For each student after index 0, create a table row.
    const studentRows = students.slice(1).map(student => `<tr><td>${student}</td></tr>`);

    // Return the table-formatted instructor:students relationship.
    // The first student must go in the same table row as the instructor's name.
    return `
        <tr>
            <th scope="row" rowspan=${students.length} style="vertical-align: middle;">${name}</th>
            <td>${students[0]}</td>
        </tr>
        ${studentRows.join('')}
    `;
}

function makeTable() {
    // Create the table-formatted data for each instructor:students relationship
    const data = Object.entries(assigned).map(([name, students]) => makeRow(name, students));

    // Get today's date in MM/DD/YYYY format
    const today = new Date().toLocaleString().split(',')[0];

    // Return the entire table structure, insert the date and the formatted data.
    return `
        <table class="table table-bordered table-sm">
            <thead>
                <tr>
                    <th scope="col" colspan=2>Homework Randomizations for the week of ${today}</th>
                </tr>
                <tr>
                    <th scope="col">Instructor</th>
                    <th scope="col">Student</th>
                </tr>
            </thead>
            <tbody>
                ${data.join('')}
            </tbody>
        </table>
    `;
}

function makeHTML() {
    // Create the entire HTML document, insert the generated table into the body.
    const html = `
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

    // Replace spacing between tags with whitespace
    // Remove whitespace from beginning
    // Return "minified" HTML
    return html.replace(/>\s*</g, '><').replace(/^\s*/, '')
}

async function main() {
    try {
        // Write the generated HTML to ./index.html
        await writeFile('./index.html', makeHTML(), 'utf8');
    } catch (e) {
        console.error(e);
    }
}

main();
