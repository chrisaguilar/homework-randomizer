#!/usr/bin/env bash

# Update the Homework
./randomize.py
./update-index.js

# Add, Commit, and Push so that GitHub Pages updates
git add .
git commit -m 'Updates Homework Randomizations'
git push -u origin master
