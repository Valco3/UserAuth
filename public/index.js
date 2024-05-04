
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

// fetch('http://localhost:3001/register', {
//     method: `POST`,
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         username: 'Tosho',
//         email: 'tosho2@gmail.com',
//         password: 'toshoPass',
//     })
// }).then(res => {
//     if(res.ok){
//         return res.json()
//     }else{
//         return res.json().then(data => {
//             console.log(data.error)
//         })
//     }
// }).then(data => {
//     if(data.success){
//         window.location.href = data.redirect;
//     }
// })
