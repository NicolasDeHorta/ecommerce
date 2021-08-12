//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

    var usersList = [
    {
        mail: "dummy@correo.com",
        pass: "hola1234"
    },
    {
        mail: "admin",
        pass: "admin"
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

    registeredUser.length > 0 ? window.location.href = "./home.html" : alert("Quizas quieras mirar la esquina inferior derecha en busca de alguna pista")
}


$("#login-button").click(login)

});