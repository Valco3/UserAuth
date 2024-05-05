

fetch('http://localhost:3001/api/notes', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(
        {
            url: '/notes'
        }
    )
}).then(res => res.json()).then(data => {
    if(data){
        data.forEach(note => console.log(note))
    }
})
