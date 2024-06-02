function control_user() {
     // console.log("Control de usuario");
     var access_token = localStorage.getItem('access_token') || null;
     if (access_token != null) {

          ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { 'access_token': access_token, op: 'control_user' })
               .then(function (result) {
                    // console.log(result);
                    // return false;
                    if (result == "Correct_User") {
                         console.log("CORRECTO-->El usario coincide con la session");
                    } else if (result == "Wrong_User") {
                         console.log("INCORRECTO--> Estan intentando acceder a una cuenta");
                         logout();
                    }
               })
               .catch(function () { console.log("Fallo al comprobar el usuario - control_user.js") });
     } else {
          console.log("No hay usuario logueado - control_user");
     }
}

function control_expires_access_token() {
     var access_token = localStorage.getItem('access_token');
     var refresh_token = localStorage.getItem('refresh_token');
     // console.log("Control de expiración de token");
     // console.log(access_token);
     // console.log(refresh_token);
     // return false;
     if (access_token) {
          ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { 'access_token': access_token, 'refresh_token': refresh_token, op: 'control_expires_token' })
               .then(function (data) {
                    // console.log(data);
                    // return false;
                    if (data == "Expired_session") {
                         console.log("Ha expirado la sesión - control_expires_access_token");
                         logout();
                    } else if (data === "okkey") {
                         console.log("El token de acceso sigue siendo válido");
                    } else {
                         localStorage.removeItem("access_token");
                         localStorage.setItem("access_token", data);
                         console.log("renovado access_token - control_expires_access_token");
                    }
               })
               .catch(function () { console.log("Ningún usuario logueado - control_expires") });
     }
}

function control_activity() {
     // console.log("Hola control_activity");
     // return false;
     var access_token = localStorage.getItem('access_token');
     if (access_token) {
          ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { op: 'control_activity' })
               .then(function (response) {
                    // console.log(response);
                    // return false;
                    if (response == "inactivo") {
                         console.log("usuario INACTIVO - control_activity");
                         logout();
                    } else {
                         console.log("usuario ACTIVO - control_activity")
                    }
               });
     } else {
          console.log("No hay usario logeado - control_activity");
     }
}

function refresh_cookie() {
     var access_token = localStorage.getItem('access_token');
     if (access_token) {
          ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { op: 'refresh_cookie' })
               .then(function (response) {
                    if (response == "Done") {
                         console.log("Refresh cookie correctly");
                    }
               });
     }
}

$(document).ready(function () {
     control_user(); //sin intervalo temporal porque controlará en cada carga de página si el usuario es el que toca
     setInterval(function () { control_expires_access_token() }, 60000); //60s mejora de separar el control_user del control_expires
     setInterval(function () { control_activity() }, 60000); //60s= 60000
     // setInterval(function () { refresh_cookie() }, 60000); //60s
});


