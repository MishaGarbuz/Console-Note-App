const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNote(notes)
        console.log(chalk.inverse.green.bold('New note added'))
    } else {
        console.log(chalk.inverse.red.bold('Note title taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.bold.inverse('Note Removed'))
        saveNote(notesToKeep)
    } else {
        console.log(chalk.red.bold.inverse('Note not found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.bold.inverse('Your notes'))
    notes.forEach((note) => {
        console.log(chalk.bold('Title: ') + note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

    if (noteToRead) {
        console.log(chalk.italic.blue.bold('Title: ') + (chalk.italic.blue(noteToRead.title)))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red.inverse.bold('No note found'))
    }

}

const saveNote = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (error) {
        return []
    }
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote

}