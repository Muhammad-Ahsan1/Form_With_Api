const loginPassword = document.querySelector('#login-password')
const loginButton = document.querySelector('#login-button')
const loginEmailInput = document.querySelector('#login-email')
const loginPasswordInput = document.querySelector('#login-password')
let loginToken;

const BASE_URL = 'https://usmanlive.com/wp-json/api/auth/'

const showLoginPassword = () => {
    if(loginPassword.type === 'password'){
        loginPassword.type = 'text'
    }else if (loginPassword.type === 'text'){
        loginPassword.type = 'password'
    }
}

const loginUser = async ({email:email, password:password}) => {
    const res = await fetch('https://usmanlive.com/wp-json/api/auth/login',{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    const data = await res.json()
    console.log(data)
    console.log(data.token)
    loginToken = data.token
}

loginButton.addEventListener('click', async() => {
    if(loginEmailInput.value !== '' && loginPasswordInput.value !== ''){
        await loginUser({email:loginEmailInput.value, password: loginPasswordInput.value})
        loginEmailInput.value = ''
        loginPasswordInput.value = ''
        if(loginToken){
            alert("Login Successful!!!!!")
        }
        else{
            alert('Login Failed')
        }
    }
})
