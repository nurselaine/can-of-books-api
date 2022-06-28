'use strict'

require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('./models/book.js');

mongoose.connect(process.env.DB_URL);

async function seed() {

    await Book.create({

        title: 'I love you forever',
        description: 'An extraordinarily different story by Robert Munsch is a gentle affirmation of the love a parent feels for their child -- forever. ',
        genre: 'Children literature'


    });

    await Book.create({

        title: 'When Breath Becomes Air',
        description: 'When Breath Becomes Air is a non-fiction autobiographical book written by American neurosurgeon Paul Kalanithi. It is a memoir about his life and illness, battling stage IV metastatic lung cancer.',
        genre: 'autobiography'  
        
    });

    await Book.create({

        title: 'The Maze Runner',
        description: 'When Thomas wakes up in the lift, the only thing he can remember is his name. He\'s surrounded by strangers—boys whose memories are also gone. Outside the towering stone walls that surround them is a limitless, ever-changing maze. It\'s the only way out—and no one\'s ever made it through alive.',
        genre: 'Science Fiction'

    });
    console.log('added books')
    mongoose.disconnect();
}

seed();