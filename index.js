const express = require('express')
const chalk = require('chalk')
const path = require('path')
const {addNote, getNotes, removeNotes, changeNotes} = require('./notes.controller')
const {json} = require("express");

const port = 3000

const app = express()

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.json())

app.use(express.static(path.resolve(__dirname, 'public')))

app.use(express.urlencoded({
	extended: true
}))

app.get('/', async (req, res)=>{
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false
	})
})

app.post('/', async (req, res)=>{
	await addNote(req.body.title)
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: true
	})
})

app.put('/:answer', async (req, res) => {
	await changeNotes(req.params.answer)
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: true
	})
})

app.delete('/:id', async (req, res) => {
	await removeNotes(req.params.id)
	res.render('index', {
		title: 'Express App',
		notes: await getNotes(),
		created: false
	})
})

app.listen(port, () => {
	console.log(chalk.green(`Server has been started on port ${port}...`))
})