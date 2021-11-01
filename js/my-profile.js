let currentProfileImg = null

const renderNormalPage = ()  => {

    //desestructuracion del objeto
    const {name, lastname, birth, age, email, phone, profileImg} = JSON.parse(localStorage.getItem('profileData'))

    $('.mainProfilePage').html(`
    <div class="container profile-form">
    <p class="lead">Estos son los datos de tu perfil guardados</p>
      <div class="profile-form d-flex container">
      <div class="form-element">
      <img src="${profileImg}" id="profile-img">
    </div>
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
  if  ($("input[name='name']").val() && $("input[name='lastname']").val()) {

    let object = {
      "name":     $("input[name='name']").val(),
      "lastname": $("input[name='lastname']").val(),
      "birth":    $("input[name='birth']").val(),
      "email":    $("input[name='email']").val(),
      "age":      $("input[name='age']").val(),
      "phone":    $("input[name='phone']").val(),
      "profileImg": currentProfileImg
  }

  localStorage.setItem('profileData', JSON.stringify(object))


  swal("¡ Cambios guardados !", {
    icon: "success",
    }
  )
  .then(function() {
    window.location.href = "my-profile.html";

  });
  }

    
}

$('input[name="profileImg"]').change((e) => {
  const reader = new FileReader()
  reader.readAsDataURL(e.target.files[0])  

  reader.addEventListener('load', () => {
      currentProfileImg = reader.result
  })
})


$('#saveProfile').click(() => saveProfileData())