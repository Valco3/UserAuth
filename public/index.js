
function register(){
    let email = document.getElementById('registerEmail').value;
    let username = document.getElementById('registerUsername').value;
    let password = document.getElementById('registerPassword').value;


    fetch('http://localhost:3001/register', {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
        })
    }).then(res => {
        if(res.ok){
            return res.json()
        }else{
            return res.json().then(data => {
                console.log(data.error)
            })
        }
    }).then(data => {
        if(data.success){
            window.location.href = data.redirect;
        }
    })
}

function login(){
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;


    fetch('http://localhost:3001/login', {
        method: `POST`,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    }).then(res => {
        if(res.ok){
            return res.json()
        }else{
            return res.json().then(data => {
                console.log(data.error)
            })
        }
    }).then(data => {
        if(data.success){
            window.location.href = data.redirect;
        }
    })
}