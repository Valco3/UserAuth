
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
    }
]

app.post('/notes', async (req, res) => {
    console.log('Reached main server though middleware')
    console.log(req.user)
    // console.log(String(req.headers.cookie))
    let cookiesSplit =  await handleCookies(String(req.headers.cookie))
    // console.log(splitCookies)
    let validNotes = notes.filter(note => note.username === cookiesSplit.username)
    // res.send('Getting Notes')
    res.send(validNotes)
})

function handleCookies(cookiesString){


    const table = cookiesString.split("; ") // split by semicolon and space
    .map(pair => pair.split("=")); // split each pair by equals sign

    const result = Object.fromEntries(table);

   return result;
}








app.listen(3002);
