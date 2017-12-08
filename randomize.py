#!/usr/bin/env python

from math import floor
from json import dump, load
from random import shuffle

data = []

with open('./config/class.json') as class_config:
    parsed = load(class_config)

    students = parsed['students']
    instructors = parsed['instructors']
    split_point = floor((len(students) - 1) / len(instructors))

def assign(homework, title):

    current = {
        'homework': int(homework),
        'title': title,
        'assignments': {}
    }

    shuffle(students)

    divided = [students[i:i + split_point] for i in range(0, len(students), split_point)]

    for count, instructor in enumerate(instructors):
       current['assignments'][instructor] = divided[count]

    data.append(current)

with open('./config/homeworks.json') as homeworks:
    for homework in load(homeworks):
        assign(homework['homework'], homework['title'])

with open('./assets/data.json', 'w') as outfile:
   dump(data, outfile)
