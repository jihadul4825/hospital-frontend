const handleRegistration = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const info = {
        username, 
        first_name, 
        last_name, 
        email, 
        password, 
        confirm_password,
    };

    if (password === confirm_password){
        document.getElementById("error").innerText = "";
        if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){
            
        }else{
            document.getElementById("error").innerText = "pass must contain Minimum eight characters, at least one letter, one number and one special character";
        }
    }else{
        document.getElementById("error").innerText = 
            "password and confirm password do not match";
        alert("password and confirm password do not match")
    }
};


const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
}