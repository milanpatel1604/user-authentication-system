// switching from login to signup form and vice versa
let loginbox=document.getElementById("login-box1");
let signupbox=document.getElementById("signup-box1");

let tosignupform=document.getElementById("to-signup-form");
let tologinform=document.getElementById("to-login-form");

tosignupform.addEventListener("click", function(){
    loginbox.style.display="none";
    signupbox.style.display="block"
})

tologinform.addEventListener("click", function(){
    loginbox.style.display="block";
    signupbox.style.display="none"
})

let loginLandingPage=document.getElementById("loginLandingPage");
let signupLandingPage=document.getElementById("signupLandingPage");




let signupform=document.getElementById("signup-form");
signupform.addEventListener("submit", submitSignupForm);

async function submitSignupForm(event){
    event.preventDefault();
    let newUsername=document.getElementById("newusername");
    let username=newUsername.value;
    let newEmail=document.getElementById("email");
    let email=newEmail.value
    let newUserPassword=document.getElementById("newuserpassword");
    let password=newUserPassword.value;
    
    const result = await fetch('/api/signup',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
    }).then((res) => res.json())

    if(result.status ==='ok'){
        newUsername.value="";
        newEmail.value="";
        newUserPassword.value="";
        signupbox.style.display="none"
        signupLandingPage.style.display="block"

    }
    else{
        if (result.error === 'invalid Username') {
            newUsername.style.borderBottom='.1rem solid red';
            newUsername.value="";
            newUsername.setAttribute('placeholder','atleast 5 characters');
            setTimeout(() => {
                newUsername.setAttribute('placeholder','username');
                newUsername.style.borderBottom='.1rem solid var(--green)';
            }, 4000);
        }
        if (result.error === 'invalid Email') {
            newEmail.style.borderBottom='.1rem solid red';
            newEmail.value="";
            newEmail.setAttribute('placeholder',"sholud end with '@gmail.com'");
            setTimeout(() => {
                newEmail.setAttribute('placeholder','Email');
                newEmail.style.borderBottom='.1rem solid var(--green)';
            }, 4000);
        }
        if (result.error === 'Invalid password (atleast 5 characters)') {
            newUserPassword.style.borderBottom='.1rem solid red';
            newUserPassword.value="";
            newUserPassword.setAttribute('placeholder',"atleast 5 characters");
            setTimeout(() => {
                newUserPassword.setAttribute('placeholder','Password');
                newUserPassword.style.borderBottom='.1rem solid var(--green)';
            }, 4000);
        }
    }

};


let loginform=document.getElementById("login-form");
loginform.addEventListener("submit", submitLoginForm);

async function submitLoginForm(event){
    event.preventDefault();
    let existingUsername=document.getElementById("existingUsername");
    let username=existingUsername.value;
    let existingPassword=document.getElementById("existingPassword");
    let password=existingPassword.value;
    
    const result = await fetch('/api/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password
        })
    }).then((res) => res.json())

    if(result.status ==='ok'){
        existingUsername.value="";
        existingPassword.value="";
        loginbox.style.display="none";
        loginLandingPage.style.display="block"
    }
    else{
        if (result.error === 'User not exixt plese Signup') {
            existingUsername.style.borderBottom='.1rem solid red';
            existingUsername.value="";
            existingUsername.setAttribute('placeholder',"No user with this username");
            setTimeout(() => {
                existingUsername.setAttribute('placeholder','Username');
                existingUsername.style.borderBottom='.1rem solid var(--green)';
            }, 4000);
        }
        if (result.error === 'invalid Password') {
            existingPassword.style.borderBottom='.1rem solid red';
            existingPassword.value="";
            existingPassword.setAttribute('placeholder',"invalid Password");
            setTimeout(() => {
                existingPassword.setAttribute('placeholder','Password');
                existingPassword.style.borderBottom='.1rem solid var(--green)';
            }, 4000);
        }
    }

};




