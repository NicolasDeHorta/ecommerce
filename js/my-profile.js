const renderNormalPage = ()  => {

    //desestructuracion del objeto
    const {name, lastname, birth, age, email, phone} = JSON.parse(localStorage.getItem('profileData'))

    console.log(JSON.parse(localStorage.getItem('profileData')))
    $('.mainProfilePage').html(`
    <div class="container profile-form">
    <p class="lead">Estos son los datos de tu perfil guardados</p>
      <div class="profile-form d-flex container">
      <div class="form-element">
        <p >Nombre</p>
        <h4 id="name"> ${name}</h4>
      </div>
      <div class="form-element">
        <p >Apellido</p>
        <h4 id="name"> ${lastname}</h4>
      </div>
      <div class="form-element">
        <p >Fecha De Nacimiento</p>
        <h4 id="name"> ${birth}</h4>
      </div>
      <div class="form-element">
      <p >Edad</p>
      <h4 id="name"> ${age}</h4>
    </div>
      <div class="form-element">
        <p >E-mail</p>
        <h4 id="name"> ${email}</h4>
      </div>

      <div class="form-element">
        <p >Teléfono</p>
        <h4 id="name"> ${phone}</h4>
      </div>
    </div>
    <button id="editButton" class="btn btn-primary">Editar datos</button>
    </div>
    `)
    
    $("#editButton").click(() => renderEditPage())
}

const renderEditPage = () => {
    localStorage.removeItem('profileData')
    window.location.href = "my-profile.html" 
    console.log("asd")
}


if (localStorage.getItem('profileData')) {
    renderNormalPage()
}


const saveProfileData = () => {
    let object = {
        "name": $("input[name='name']").val(),
        "lastname": $("input[name='lastname']").val(),
        "birth": $("input[name='birth']").val(),
        "email": $("input[name='email']").val(),
        "age": $("input[name='age']").val(),
        "phone": $("input[name='phone']").val()
    }

    localStorage.setItem('profileData', JSON.stringify(object))
    console.log("datos guardados")
    window.location.href = "my-profile.html" 
}

$('#saveProfile').click(() => saveProfileData())