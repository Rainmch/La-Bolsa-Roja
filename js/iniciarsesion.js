let user=[];
let usuarioActivo=[];
const email = document.getElementById("mail");
const email2 = document.getElementById("mail2");
const password= document.getElementById("txtPassword");
const btn1 = document.getElementById("button1");
const btn2 = document.getElementById("button2");
const btn3 = document.getElementById("button3");
const parrafo = document.getElementById("warnings");
const parrafo2=document.getElementById("warningsRecuperar");



if (localStorage.getItem("Users") == null ) {
    localStorage.setItem("Users",JSON.stringify(user));
  } 
  user=JSON.parse(localStorage.getItem("Users"));

  if(localStorage.getItem("UsuarioActivo") != null ){

    window.location.replace("../perfil.html");

  }


btn3.addEventListener("click", e => {
    e.preventDefault();
    let warnings2 = "";
    let regexEmail2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    parrafo2.innerHTML = "";
    //Se crean variables para aplicarles trim()
    let trimEmail2 = email2.value.trim();
    
    let enviar2=false;

    if (!regexEmail2.test(trimEmail2)) {
        warnings2 += `- El Email no es válido <br>`;
        enviar2 = true;
        redBorder(email2);
    } else {
        greenBorder(email2);
    }

    if (enviar2) {
        parrafo2.innerHTML = warnings2;
    } else {
        
   
        user.forEach(element =>{
            let correo=element.mail;
            let name=element.name;
            let id=element.id;
            let telefon=element.telefon;
            let Mensaje=`
            <br>
            <p>Instrucciones de recuperacion de contraseña</p>
            <br>
            `

            if(correo==trimEmail2 ){
                console.log("Hola");
                parrafo2.innerHTML =
                `<div  class="alert alert-success d-flex align-items-center" role="alert">
                <svg  height="2rem"width="2rem" class="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                    Recuperación de contraseña enviada.
                </div>
             </div>`;
             
             
        let ebody = `
        <h1>Correo: </h1>${correo}
        <br>
        <h1>Nombre: </h1>${name}
        <br>
        <h1>Id Usuario: </h1>${id}
        <br>
        <h1>Telefono: </h1>${telefon}
        <br>
        <h1>Mensaje: </h1>${Mensaje}
        `;
            Email.send({
                SecureToken: "2beb6908-098a-4ce9-8217-645950d7272e",
                To: correo,
                From: "javadabbado@gmail.com",
                Subject: "Recuperar contraseña",
                Body: ebody
            });
            parrafo2.innerHTML =
                `<div  class="alert alert-success d-flex align-items-center" role="alert">
                <svg  height="2rem"width="2rem" class="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                    Mensaje enviado correctamente.
                </div>
             </div>`;
            
            
            }else{
                warnings2 += `- El Email no existe<br>`;
                parrafo2.innerHTML=warnings2;
               
            }
            
            });
        

    }
    borderTimeout2();

    

});

  btn1.addEventListener("click", e => {
    e.preventDefault();
    console.log("Se ingresa a la función");
    let warnings = "";
    let enviar = false;
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regexPassword = /^.*(?=.{6,})(?=.*[a-zA-Z])(?=.*\d).*$/;

    parrafo.innerHTML = "";
    //Se crean variables para aplicarles trim()
    let trimEmail = email.value.trim();
    let trimPassword = password.value.trim();
    

    if (!regexEmail.test(trimEmail)) {
        warnings += `- El Email no es válido <br>`;
        enviar = true;
        redBorder(email);
    } else {
        greenBorder(email);
    }
  
        
    if (!regexPassword.test (trimPassword) ) { //Comparación de contraseñas con expresión regular.
        warnings += `- Contraseña no válida.<br>`;
        enviar = true;
        redBorder(password);
    } else {
        greenBorder(password);
    }
    
    if (enviar) {
        parrafo.innerHTML = warnings;
    } else {
        
        //user.push({id:idGlobal,name:trimName, mail: trimEmail, telefon:trimTelef, pass: trimPassword2});
        //localStorage.setItem("Users",JSON.stringify(user));
        user.forEach(element =>{
            let correo=element.mail;
            let contrasena=element.pass;
            if(correo==trimEmail && contrasena==trimPassword){
            
                if(localStorage.getItem("UsuarioActivo") != null){
                localStorage.removeItem("UsuarioActivo");        
            }
        

            setTimeout( () => {
      
                parrafo.innerHTML =
                `<div  class="alert alert-success d-flex align-items-center" role="alert">
                <svg  height="2rem"width="2rem" class="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                <div>
                    Inicio de sesion exitoso. Redirigiendo (...)
                </div>
             </div>`;
                if (localStorage.getItem("UsuarioActivo") == null ) {
                    localStorage.setItem("UsuarioActivo",JSON.stringify(element));
                    usuarioActivo=JSON.parse(localStorage.getItem("UsuarioActivo"));
                    window.location.replace("../perfil.html");
                      }
            },2000);


            if (localStorage.getItem("UsuarioActivo") == null ) {
            localStorage.setItem("UsuarioActivo",JSON.stringify(element));
            usuarioActivo=JSON.parse(localStorage.getItem("UsuarioActivo"));
            window.location.replace("../perfil.html");
              } 
            
            
            }
            
            });
        

    }
    borderTimeout();
});

function borderTimeout(){
    setTimeout( () => {
        nombre.style.border = "";
        email.style.border ="";
        tel.style.border ="";
        password.style.border ="";
        password2.style.border = "";
        parrafo.innerHTML = "";
    },2000);
}

function borderTimeout2(){
    setTimeout( () => {
        
        email2.style.border ="";
            
        parrafo2.innerHTML = "";
    },2000);
}

function greenBorder(input){
    input.style.border = "solid 0.2rem green";
}

function redBorder(input){
    input.style.border = "solid 0.2rem red";
}
/* function go(){

if (document.form.password.value=='EÑACONTRAS' && document.form.login.value=='USUARIO'){ 
    document.form.submit(); 
} 
else{ 
     alert("Porfavor ingrese, nombre de usuario y contraseña correctos."); 
}  }; */