#!/usr/bin/env python

from math import floor
from json import dump, load
from random import shuffle

# Data is an arrload(homeworks)ay that will hold all of the homework assignments and be
# written as JSON to ./data.json
data = []

# Load the class configuration file
with open('./class.config.json') as class_config:
    # Parse the class configuration file as JSON
    parsed = load(class_config)

    # students is an array of strings that holds the name of every student
    students = parsed['students']

    # instructors is an array of strings that holds the name of each instructor
    # The TAs should be the first indices of the array so that they get the
    # majority of students
    instructors = parsed['instructors']

    # split_point is an integer that defines how many students each TA gets
    # However many students are left over get passed to the main teacher,
    # e.g. the last element in the instructors array
    split_point = floor((len(students) - 1) / len(instructors))

def assign(homework, title):

    # The current homework assignment, represented by an object
    current = {
        'homework': int(homework),
        'title': title,
        'assignments': {}
    }

    # Use random.shuffle to randomize the students array in-place
    shuffle(students)

    # Divide the students into equally-sized sub-arrays with overflow put into the last.
    divided = [students[i:i + split_point] for i in range(0, len(students), split_point)]

    # Assign instructors to students
    for count, instructor in enumerate(instructors):
       current['assignments'][instructor] = divided[count]

    # Append the current assignment to the data array
    data.append(current)

# Open the homeworks.json file, which defines the different homework assignments,
# and pass its data to the assign function.
with open('./homeworks.json') as homeworks:
    for homework in load(homeworks):
        assign(homework['homework'], homework['title'])

# Write the `data` object to ./data/current.json as a JSON-formatted structure.
with open('./data.json', 'w') as outfile:
   dump(data, outfile)
