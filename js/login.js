var getLoginInfo = () => {
    let mail = $("[name='email-address']").val();
    let pass = $("[name='password']").val();

    return {
        mail: mail,
        pass: pass
    }
}


var login = () => {
    let tryUser = getLoginInfo()

    sessionStorage.setItem('user', tryUser.mail);
    (tryUser.mail && tryUser.pass) ? window.location.href = "./home.html" : $(".warning-text")[0].style.color = "red"
}   


$("#login-button").click(login)
