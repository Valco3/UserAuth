

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

function logout(){
    fetch('http://localhost:3001/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json()).then(data => {
        if(data.success){
            window.location.href = data.redirect
        }
    })
}