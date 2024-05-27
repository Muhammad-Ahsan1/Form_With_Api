const registerPassword = document.querySelector('#register-password')
const registerButton = document.querySelector('#register-button')
const registerNameInput = document.querySelector('#register-name')
const registerEmailInput = document.querySelector('#register-email')
const registerPasswordInput = document.querySelector('#register-password')
let registerDataStatus;


const BASE_URL = 'https://usmanlive.com/wp-json/api/auth/'

const showRegisterPassword = () => {
    if(registerPassword.type === 'password'){
        registerPassword.type = 'text'
    }else if(registerPassword.type === 'text'){
        registerPassword.type = 'password'
    }
}

const registerUser = async ({name:name, email:email, password:password}) => {
    const res = await fetch(`${BASE_URL}register`, {
        method:'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
        })
    })
    const data = await res.json()
    console.log(data)
    registerDataStatus = data?.data?.status
    return data
    // console.log(data.data.status)
}

registerButton.addEventListener('click', async () => {
    if(registerNameInput.value === ''){
        alert('Add Name')
    }else if(registerEmailInput.value === ''){
        alert('Add Email')
    }else if(registerPasswordInput.value === ''){
        alert('Add Password')
    }else if(registerNameInput.value !== '' && registerEmailInput.value !== '' && registerPasswordInput.value !== ''){
        await registerUser({name:registerNameInput.value, email: registerEmailInput.value, password: registerPasswordInput.value})
        registerNameInput.value = ''
        registerEmailInput.value = ''
        registerPasswordInput.value = ''
        if(registerDataStatus === 400){
            alert('User already exists')
        }else if(registerDataStatus !== 400){
            alert("Registered Successfully!!!!!!!")
        }
    }
})
