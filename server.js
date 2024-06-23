
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()

app.use(express.json())
app.use(cookieParser())

let notes = [
    {
        username: 'Tosho',
        title: 'Title1',
        text: 'This is my note'
    },
    {
        username: 'Misho',
        title: 'Title2',
        text: 'This is my note (Misho)'
    },
    {
        username: 'Tosho',
        title: 'Title 3',
        text: 'Here is another note'
    }
]

app.post('/notes', async (req, res) => {
    console.log('Reached main server though middleware')
    let cookiesSplit =  await handleCookies(String(req.headers.cookie))
    console.log(cookiesSplit)
    let validNotes = notes.filter(note => note.username === cookiesSplit.username)
    res.send(validNotes)
})

function handleCookies(cookiesString){


    const table = cookiesString.split("; ")
    .map(pair => pair.split("="));

    const result = Object.fromEntries(table);

   return result;
}








app.listen(3002);
