const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

document.getElementById('loginForm').addEventListener('submit', loginMethod);
document.getElementById('signUpForm').addEventListener('submit', signUpMethod);

let users = [];

function getAllUsers(){
    const usersString = sessionStorage.getItem('users');

    if (usersString) {
        users = JSON.parse(usersString);
    }
}

function saveUsersTosessionStorage() {
    sessionStorage.setItem('users', JSON.stringify(users));
}

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
})

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
})

function signUpMethod(event) {
    event.preventDefault();

    let name = document.getElementById('nameSignUp').value;
    let email = document.getElementById('emailSignUp').value;
    let password = document.getElementById('passwordSignUp').value;

    let newUser = {
        'name': name,
        'email': email,
        'password': password
    };

    if (!Array.isArray(users)) {
        users = []; // Inicializa como um array se ainda não for
    }

    users.push(newUser); // Adiciona o novo usuário ao array
    saveUsersTosessionStorage(); // Salva o array atualizado no sessionStorage

    container.classList.remove("active");
}

function loginMethod(event) {
    event.preventDefault();
    let email = document.getElementById('emailLogin').value;
    let password = document.getElementById('passwordLogin').value;

    if (loginAuth(email, password)) {
        window.location.href = '../main-page/main-page.html';
    } else {
        container.classList.add("active");
    }
}

function loginAuth(email, password) {
    for (let i = 0; i < users.length; i++) {
        console.log(users[i]);
        if (users[i].email === email && users[i].password === password) {
            return true;
        }
    }

    return false;
}

window.onload = function () {
    getAllUsers();
}
