const notes = require('./notes.js')
const chalk = require('chalk')
const yargs = require('yargs')
const log = console.log

//customise yargs version
yargs.version('1.1.0')

//create add command
yargs.command({
    command: 'add',
    describe: 'add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.addNote(argv.title,argv.body)
    }
})

//create remove command
yargs.command({
    command: 'remove',
    describe: 'removing an existing note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler (argv) {
        notes.removeNote(argv.title)
    }
})

//adding a forced edit

//create list command
yargs.command({
    command: 'list',
    describe: 'listing a note',
    handler () {
        notes.listNotes()
    }
})

//create read command
yargs.command({
    command: 'read',
    describe: 'reading a note',
    builder: {
        title: {
            describe: 'Note to be found title',
            type: 'string',
            demandOption: true
        }
    },
    handler (argv) {
        notes.readNote(argv.title)
    }
})
//add, remove, read, list

yargs.parse()