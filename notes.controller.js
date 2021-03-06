const fs = require('fs/promises')
const path = require('path')
const chalk = require('chalk')

const notesPath = path.join(__dirname, 'ds.json')

async function addNote(title) {
	const notes = await getNotes()
	const note = {
		title,
		id: Date.now().toString()
	}
	notes.push(note)

	await fs.writeFile(notesPath, JSON.stringify(notes))
	console.log(chalk.bgGreen('Note was added!'))
}

async function getNotes() {
	const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
	return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
	const notes = await getNotes()

	console.log(chalk.bgBlue('Here is the list of notes:'))
	notes.forEach(note => {
		console.log(chalk.blue('Id:', note.id, 'Title:', note.title))
	})

}

async function changeNotes(answer){
	const notes = await getNotes()
	console.log(notes);
	console.log(answer);
	notes.forEach((val, key)=> {
		
	})
	// await fs.writeFile(notesPath, JSON.stringify(notes))

}

async function removeNotes(id) {
	const notes = await getNotes(id)
	notes.forEach((val, key)=> {
		if(val.id == id) {
			delete notes[key]
			const newNotes = notes.filter(el => el !== null)
			fs.writeFile(notesPath, JSON.stringify(newNotes))
		}
	})
	console.log(chalk.red('We remove notes by id:', id))
}

module.exports = {
	addNote, getNotes, removeNotes, changeNotes
}