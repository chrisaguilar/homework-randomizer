#!/usr/bin/env python

from json import dump
from random import shuffle

students = [
    'Adam Peery', 'Adam Troy', 'Akshay Choudhary', 'Anish Nair',
    'Anisha Sachar', 'Benjamin Opurum', 'Brandon Matthews', 'Charronda King',
    'Courtney Williams', 'Daniel Pimentel', 'Daniela Jaros', 'Darreck Bender',
    'Daryl Bilderback', 'David Shreve', 'Dean Dyer', 'Denise Gallardo',
    'Derek Johnson', 'Desmon Stanford', 'Dexter Berassa', 'Erica Nichols',
    'Gene Cannella', 'Hollye Hamilton', 'James Henley', 'James Lemons',
    'Jordan Scott', 'Joshua Franklin', 'Judi Perez', 'Kavin Davenport',
    'Limbert Bontigao', 'Matt Gohr', 'Matt Jones', 'Nic Branker',
    'Phillip Hampton', 'Rosita Cabrera', 'Shirley Mae Samonte', 'Taylor Bennett',
    'Taylor Rodrigs', 'Teresa Jackson', 'Thomas Gentle', 'Tyler Maran',
    'Yvonne Reichenbach'
]

assigned = {}

shuffle(students)

divided = [students[i:i + 10] for i in range(0, len(students), 10)]

def assign(name, section):
    assigned[name] = section

assign('Chris', divided[0])
assign('Danielle', divided[1])
assign('Jack', divided[2])
assign('Jieun', divided[3])
assign('Andy', divided[4])

with open('assigned.json', 'w') as outfile:
    dump(assigned, outfile)
