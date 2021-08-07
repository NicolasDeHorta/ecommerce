//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    var usersList = [
    {
        mail: "dehorta.n@gmail.com",
        pass: "hola1234"
    },
    {
        mail: "nicodh1103@gmail.com",
        pass: "chau4321"
    }
]

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
    var registeredUser = usersList.filter(user => (user.mail === tryUser.mail && user.pass === tryUser.pass))   

    registeredUser.length === 1 ? window.location.href = "./index.html" : alert("parece que no estas registrado o el usuario es Incorrecto")
}


$("#login-button").click(login)

});