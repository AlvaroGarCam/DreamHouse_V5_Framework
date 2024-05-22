// // ------------------- LOGIN ------------------------ //
// function click_login(){
//     $("#login_form").keypress(function(e) {
//         var code = (e.keyCode ? e.keyCode : e.which);
//         if(code == 13){
//             e.preventDefault();
//             login();
//         }
//     });

//     $('#button_login').on('click', function(e) {
//         e.preventDefault();
//         login();
//     }); 

//     $('#forget_pass').on('click', function(e) {
//         e.preventDefault();
//         load_form_recover_password();
//     }); 

//     $('#google').on('click', function(e) {
//         social_login('google');
//     }); 

//     $('#github').on('click', function(e) {
//         social_login('github');
//     }); 
// }

// function validate_login(){
//     var error = false;

// 	if(document.getElementById('username').value.length === 0){
// 		document.getElementById('error_username').innerHTML = "Tienes que escribir el usuario";
// 		error = true;
// 	}else{
//         document.getElementById('error_username').innerHTML = "";
//     }

// 	if(document.getElementById('pass').value.length === 0){
// 		document.getElementById('error_password').innerHTML = "Tienes que escribir la contraseña";
// 		error = true;
// 	}else{
//         document.getElementById('error_password').innerHTML = "";
//     }

//     if(error == true){
//         return 0;
//     }
// }

// function login(){
//     if(validate_login() != 0){
//         var data = $('#login_form').serialize();
//         $.ajax({
//             url: friendlyURL("?module=login&op=login"),
//             dataType: "JSON",
//             type: "POST",
//             data: data,
//         }).done(function(result) {
//             if(result == "user error"){		
//                 $("#error_username").html("The email or username does't exist");
//             } else if (result == "error"){
//                 $("#error_password").html('Wrong password');
//             } else if (result == "activate error"){
//                 toastr.options.timeOut = 3000;
//                 toastr.error("Verify the email");            
//             } else {
//                 localStorage.setItem("token", result);
//                 toastr.options.timeOut = 3000;
//                 toastr.success("Inicio de sesión realizado");
//                 if(localStorage.getItem('likes') == null) {
//                     setTimeout('window.location.href = friendlyURL("?module=home&op=view")', 1000);
//                 } else {
//                     console.log(localStorage.getItem('product'));
//                     setTimeout('window.location.href = friendlyURL("?module=shop&op=view")', 1000);
//                 }
//             }	
//         }).fail(function() {
//             console.log('Error: Login error');
//         });     
//     }
// }

// function social_login(param){
//     authService = firebase_config();
//     authService.signInWithPopup(provider_config(param))
//     .then(function(result) {
//         console.log('Hemos autenticado al usuario ', result.user);
//         email_name = result.user.email;
//         let username = email_name.split('@');
//         console.log(username[0]);

//         social_user = {id: result.user.uid, username: username[0], email: result.user.email, avatar: result.user.photoURL};
//         if (result) {
//             ajaxPromise(friendlyURL("?module=login&op=social_login"), 'POST', 'JSON', social_user)
//             .then(function(data) {
//                 localStorage.setItem("token", data);
//                 toastr.options.timeOut = 3000;
//                 toastr.success("Inicio de sesión realizado");
//                 if(localStorage.getItem('likes') == null) {
//                     setTimeout('window.location.href = friendlyURL("?module=home&op=view")', 1000);
//                 } else {
//                     setTimeout('window.location.href = friendlyURL("?module=shop&op=view")', 1000);
//                 }
//             })
//             .catch(function() {
//                 console.log('Error: Social login error');
//             });
//         }
//     })
//     .catch(function(error) {
//         var errorCode = error.code;
//         console.log(errorCode);
//         var errorMessage = error.message;
//         console.log(errorMessage);
//         var email = error.email;
//         console.log(email);
//         var credential = error.credential;
//         console.log(credential);
//     });
// }

// function firebase_config(){
//     var config = {
//         apiKey: "AIzaSyBOo5emMZXMi0T411OPKgoDGcvDl_IKSno",
//         authDomain: "test-php-js-7fc12.firebaseapp.com",
//         projectId: "test-php-js-7fc12",
//         storageBucket: "test-php-js-7fc12.appspot.com",
//         messagingSenderId: "495514694215",
//         appId: "1:495514694215:web:b183cd7f513ce8b0d6f762",
//         measurementId: "G-JXEGLTGLTC"
//     };
//     if(!firebase.apps.length){
//         firebase.initializeApp(config);
//     }else{
//         firebase.app();
//     }
//     return authService = firebase.auth();
// }

// function provider_config(param){
//     if(param === 'google'){
//         var provider = new firebase.auth.GoogleAuthProvider();
//         provider.addScope('email');
//         return provider;
//     }else if(param === 'github'){
//         return provider = new firebase.auth.GithubAuthProvider();
//     }
// }



// // ------------------- RECOVER PASSWORD ------------------------ //
// function load_form_recover_password(){
//     $(".login-wrap").hide();
//     $(".forget_html").show();
//     $('html, body').animate({scrollTop: $(".forget_html")});
//     click_recover_password();
// }

// function click_recover_password(){
//     $(".forget_html").keypress(function(e) {
//         var code = (e.keyCode ? e.keyCode : e.which);
//         if(code==13){
//         	e.preventDefault();
//             send_recover_password();
//         }
//     });

//     $('#button_recover').on('click', function(e) {
//         e.preventDefault();
//         send_recover_password();
//     }); 
// }

// function validate_recover_password(){
//     var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
//     var error = false;

//     if(document.getElementById('email_forg').value.length === 0){
// 		document.getElementById('error_email_forg').innerHTML = "Tienes que escribir un correo";
// 		error = true;
// 	}else{
//         if(!mail_exp.test(document.getElementById('email_forg').value)){
//             document.getElementById('error_email_forg').innerHTML = "El formato del mail es invalido"; 
//             error = true;
//         }else{
//             document.getElementById('error_email_forg').innerHTML = "";
//         }
//     }

//     if(error == true){
//         return 0;
//     }
// }

// function send_recover_password(){
//     if(validate_recover_password() != 0){
//         var data = $('#recover_email_form').serialize();
//         $.ajax({
//             url: friendlyURL('?module=login&op=send_recover_email'),
//             dataType: 'json',
//             type: "POST",
//             data: data,
//         }).done(function(data) {
//             if(data == "error"){		
//                 $("#error_email_forg").html("The email doesn't exist");
//             } else{
//                 toastr.options.timeOut = 3000;
//                 toastr.success("Email sended");
//                 setTimeout('window.location.href = friendlyURL("?module=login&op=view")', 1000);
//             }
//         }).fail(function( textStatus ) {
//             console.log('Error: Recover password error');
//         });    
//     }
// }

function load_form_new_password() {
    // console.log('Hola load_form_new_password');
    token_email = localStorage.getItem('token_email');
    // console.log(token_email);
    // return false;
    localStorage.removeItem('token_email');
    var formData = {
        token_email: token_email,
        op: 'verify_token'
    };
    var data = $.param(formData);
    // console.log("Datos enviados:", data);
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        url: friendlyURL('?module=login'),
        data: data
    }).done(function (data) {
        // console.log('Respuesta del servidor=' + data);
        // return false;
        if (data == "verify") {
            click_new_password(token_email);
        } else {
            console.log("error");
        }
    }).fail(function (textStatus) {
        console.log("Error: Verify token error");
    });
}

function click_new_password(token_email) {
    $(".recover_html").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            send_new_password(token_email);
        }
    });

    $('#button_set_pass').on('click', function (e) {
        e.preventDefault();
        send_new_password(token_email);
    });
}

function validate_new_password() {
    var error = false;

    if (document.getElementById('pass_rec').value.length === 0) {
        document.getElementById('error_password_rec').innerHTML = "You have to write a password";
        error = true;
    } else {
        if (document.getElementById('pass_rec').value.length < 8) {
            document.getElementById('error_password_rec').innerHTML = "The password must be longer than 8 characters";
            error = true;
        } else {
            document.getElementById('error_password_rec').innerHTML = "";
        }
    }
    if (document.getElementById('pass_rec_2').value != document.getElementById('pass_rec').value) {
        document.getElementById('error_password_rec_2').innerHTML = "Passwords don't match";
        error = true;
    } else {
        document.getElementById('error_password_rec_2').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}

function send_new_password(token_email) {
    if (validate_new_password() != 0) {
        var formData = { token_email: token_email, password: $('#pass_rec').val(), op: 'new_password' };
        var data = $.param(formData);
        // console.log("Datos enviados:", data);
        // return false;
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: friendlyURL('?module=login'),
            data: data
        }).done(function (data) {
            console.log(data);
            // return false;
            if (data == "done") {
                toastr.options = {
                    closeButton: true, // Puedes configurar otras opciones según tus necesidades
                    positionClass: "toast-center" // Esto centra el toastr en la parte superior del centro
                };
                toastr.options.timeOut = 3000;
                toastr.success('New password changed');
                setTimeout('window.location.href = friendlyURL("?module=login&op=view")', 1000);
            } else {
                toastr.options.timeOut = 3000;
                toastr.error('Error seting new password');
            }
        }).fail(function (textStatus) {
            console.log("Error: New password error");
        });
    }
}
//-------------------LOGIN
function login() {
    if (validate_login() != 0) {
        var username = document.getElementById('username_log').value;
        var password = document.getElementById('passwd_log').value;
        var data = {
            username_log: username,
            passwd_log: password,
            op: 'login'
        };
        ajaxPromise('POST', 'JSON', friendlyURL("?module=login"), data)
            .then(function (result) {
                // console.log(result);
                // return false;
                var errorType = result[0];
                if (errorType == "error_user") {
                    document.getElementById('error_username_log').innerHTML = "El usario no existe, asegurase de que lo a escrito correctamente"
                } else if (errorType == "error_passwd") {
                    document.getElementById('error_passwd_log').innerHTML = "La contraseña es incorrecta"
                } else if (errorType == "error_attempts") {
                    document.getElementById('error_username_log').innerHTML = "No puedes iniciar sesión por haber fallado la autentificación 3 veces.";
                    setTimeout(load_otp_form, 2000);
                } else if (errorType == "okkey_login") {
                    console.log("Contraseña correcta!");
                    var access_token = result[2];
                    var refresh_token = result[3];
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                    if (localStorage.getItem('access_token') !== undefined) {
                        toastr.options = {
                            closeButton: true,
                            positionClass: 'toast-center'
                        };
                        toastr.success("Loged succesfully");
                        setTimeout(' window.location.href = friendlyURL("?module=home"); ', 2000);
                    }
                } else {
                    console.log("Error desconocido");
                }
            }).catch(function (textStatus) {
                if (console && console.log) {
                    console.log("La solicitud ha fallado: " + textStatus);
                }
            });
    }
}

function key_login() {
    $("#login").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            // console.log("Hola login enter");
            // return false;
            e.preventDefault();
            login();
        }
    });
}

function button_login() {
    $('#login').on('click', function (e) {
        // console.log("Hola login click");
        // return false;
        e.preventDefault();
        login();
    });
}

function validate_login() {
    var error = false;

    if (document.getElementById('username_log').value.length === 0) {
        document.getElementById('error_username_log').innerHTML = "*Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username_log').value.length < 5) {
            document.getElementById('error_username_log').innerHTML = "*El usuario tiene que tener 5 caracteres como minimo";
            error = true;
        } else {
            document.getElementById('error_username_log').innerHTML = "";
        }
    }

    if (document.getElementById('passwd_log').value.length === 0) {
        document.getElementById('error_passwd_log').innerHTML = "*Tienes que escribir la contraseña";
        error = true;
    } else {
        document.getElementById('error_passwd_log').innerHTML = "";
    }

    if (error == true) {
        return 0;
    }
}
function validate_otp() {
    var error = false;
    if ($("#username_input").val().length === 0) {
        $("#error_username_input").html("Debes ingresar un nombre de usuario");
        error = true;
    } else {
        $("#error_username_input").html("");
    }
    if ($("#otp_input").val().length === 0) {
        $("#error_otp_input").html("Debes ingresar un código OTP");
        error = true;
    } else {
        $("#error_otp_input").html("");
    }
    if (error == true) {
        return 0;
    }
}

function send_otp() {
    if (validate_otp() != 0) {
        var username = $("#username_input").val();
        var otp_code = $("#otp_input").val();
        // console.log(username, otp);
        // return false;
        var data = {
            username: username,
            otp: otp_code,
            op: 'send_otp'
        };
        ajaxPromise('POST', 'JSON', friendlyURL("?module=login"), data)
            .then(function (result) {
                // console.log('Respuesta del servidor: ' + result);
                // return false;
                if (result === 'okkey') {
                    toastr.options = {
                        closeButton: true,
                        positionClass: 'toast-center'
                    };
                    toastr.success("Account restored successfully, now try to login or recover password.");
                    setTimeout(' window.location.href = friendlyURL("?module=login"); ', 2000);
                } else if (result[0] === 'error_otp') {
                    $("#error_otp_input").html("Código OTP incorrecto. Por favor, inténtalo de nuevo.");
                } else if (result[0] === 'error_username') {
                    $("#error_username_input").html("Nombre de usuario incorrecto. Por favor, inténtalo de nuevo.");
                }
            }).catch(function (textStatus) {
                console.log('AJAX request failed: ' + textStatus);
            });
    }
}

//----------------------REGISTER----------
function validate_register() {
    var username_exp = /^(?=.{5,}$)(?=.*[a-zA-Z0-9]).*$/;
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var pssswd_exp = /^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/;
    var error = false;

    if (document.getElementById('username_reg').value.length === 0) {
        document.getElementById('error_username_reg').innerHTML = "Tienes que escribir el usuario";
        error = true;
    } else {
        if (document.getElementById('username_reg').value.length < 5) {
            document.getElementById('error_username_reg').innerHTML = "El username tiene que tener 5 caracteres como minimo";
            error = true;
        } else {
            if (!username_exp.test(document.getElementById('username_reg').value)) {
                document.getElementById('error_username_reg').innerHTML = "No se pueden poner caracteres especiales";
                error = true;
            } else {
                document.getElementById('error_username_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('email_reg').value.length === 0) {
        document.getElementById('error_email_reg').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email_reg').value)) {
            document.getElementById('error_email_reg').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email_reg').innerHTML = "";
        }
    }

    if (document.getElementById('passwd1_reg').value.length === 0) {
        document.getElementById('error_passwd1_reg').innerHTML = "Tienes que escribir la contraseña";
        error = true;
    } else {
        if (document.getElementById('passwd1_reg').value.length < 8) {
            document.getElementById('error_passwd1_reg').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (!pssswd_exp.test(document.getElementById('passwd1_reg').value)) {
                document.getElementById('error_passwd1_reg').innerHTML = "Debe de contener minimo 8 caracteres, mayusculas, minusculas y simbolos especiales";
                error = true;
            } else {
                document.getElementById('error_passwd1_reg').innerHTML = "";
            }
        }
    }

    if (document.getElementById('passwd2_reg').value.length === 0) {
        document.getElementById('error_passwd2_reg').innerHTML = "Tienes que repetir la contraseña";
        error = true;
    } else {
        if (document.getElementById('passwd2_reg').value.length < 8) {
            document.getElementById('error_passwd2_reg').innerHTML = "La password tiene que tener 8 caracteres como minimo";
            error = true;
        } else {
            if (document.getElementById('passwd2_reg').value === document.getElementById('passwd1_reg').value) {
                document.getElementById('error_passwd2_reg').innerHTML = "";
            } else {
                document.getElementById('error_passwd2_reg').innerHTML = "La password's no coinciden";
                error = true;
            }
        }
    }

    if (!error) {
        return 1;
    } else {
        return 0;
    }
}
function register() {
    if (validate_register() != 0) {
        var formData = {
            username_reg: $('#username_reg').val(),
            passwd1_reg: $('#passwd1_reg').val(),
            passwd2_reg: $('#passwd2_reg').val(),
            email_reg: $('#email_reg').val(),
            op: 'register'
        };

        var data = $.param(formData);

        console.log("Datos enviados:", data);

        $.ajax({
            url: friendlyURL('?module=login'),
            type: 'POST',
            dataType: 'JSON',
            data: data
        }).then(function (response) {
            // console.log("Respuesta del servidor:", response);
            // return false;
            if (response === "error") {
                // console.log("Respuesta del servidor: usuario/email ya en uso");
                // return false;
                document.getElementById('error_email_reg').innerHTML = "El email o el nombre de usuario ya está en uso, asegúrate de no tener ya una cuenta."
            } else if (response === "error_email") {
                // console.log("Respuesta del servidor: error al mandar el email");
            } else {
                console.log("Registrado correctamente");
                // return false;
                toastr.options = {
                    closeButton: true, // Puedes configurar otras opciones según tus necesidades
                    positionClass: "toast-center" // Esto centra el toastr en la parte superior del centro
                };
                toastr.success("Succesfully register, now verify your email, please. Check out your email.");
                setTimeout(function () {
                    location.reload();
                }, 1000);
            }
        }).catch(function (error) {
            console.error("La solicitud ha fallado:", error);
        });
    } else {
        console.log("Algo ha fallado en la validación de JS");
    }
}
//----------------RECOVER---------------------
function validate_recover_password() {
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
    var error = false;

    if (document.getElementById('email_recover').value.length === 0) {
        document.getElementById('error_email_recover').innerHTML = "Tienes que escribir un correo";
        error = true;
    } else {
        if (!mail_exp.test(document.getElementById('email_recover').value)) {
            document.getElementById('error_email_recover').innerHTML = "El formato del mail es invalido";
            error = true;
        } else {
            document.getElementById('error_email_recover').innerHTML = "";
        }
    }
    if (error == true) {
        return 0;
    }
}

function send_recover_password() {
    if (validate_recover_password() != 0) {
        var formData = {
            email_recover: $('#email_recover').val(),
            op: 'send_recover_email'
        };
        var data = $.param(formData);
        console.log("Datos enviados:", data);
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            url: friendlyURL('?module=login'),
            data: data
        })
            .then(function (response) {
                console.log("Respuesta del servidor:", response);
                switch (response) {
                    case "user not found":
                        $("#error_email_recover").html("The email doesn't exist");
                        break;
                    case "update error":
                        $("#error_email_recover").html("There was an error updating the token. Please try again.");
                        break;
                    case "email error":
                        $("#error_email_recover").html("There was an error sending the email. Please try again.");
                        break;
                    case "okkey":
                        toastr.options = {
                            closeButton: true,
                            positionClass: "toast-top-center"
                        };
                        toastr.success("Check your email. We have sent you the recovery link.");
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                        break;
                    default:
                        $("#error_email_recover").html("An unexpected error occurred. Please try again.");
                }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error('Error: Recover password error', textStatus, errorThrown);
                $("#error_email_recover").html("An unexpected error occurred. Please try again.");
            });
    }
}


function key_register() {
    $("#register").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            // console.log("Hola register enter");
            // return false;
            e.preventDefault();
            register();
        }
    });
}

function button_register() {
    $('#register').on('click', function (e) {
        // console.log("Hola register click");
        // return false;
        e.preventDefault();
        register();
    });
}


function key_recover() {
    $("#recover").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            // console.log("Hola recover enter");
            // return false;
            e.preventDefault();
            send_recover_password();
        }
    });
}

function button_recover() {
    $('#recover').on('click', function (e) {
        // console.log("Hola recover click");
        // return false;
        e.preventDefault();
        send_recover_password();
    });
}

function key_otp() {
    $("#otp_form").on('submit', function (e) {
        e.preventDefault();
        // console.log("Hola otp enter");
        // return false;
        send_otp();
    });
}

function button_otp() {
    $("#otp_form").on("submit", function (e) {
        e.preventDefault();
        // console.log("Hola otp click");
        // return false;
        send_otp();
    });
}


function charge_views() {
    $("#register_view").on("click", function (e) {
        e.preventDefault();
        $("#login_form").hide();
        $("#register_form").show();
        $("#recover_form").hide();
        $("#otp_form").hide();
        window.scrollTo(0, 0);
    });

    $("#login_view").on("click", function (e) {
        e.preventDefault();
        $("#register_form").hide();
        $("#login_form").show();
        $("#recover_form").hide();
        $("#otp_form").hide();
        window.scrollTo(0, 0);
    });

    $("#recover_view").on("click", function (e) {
        e.preventDefault();
        $("#register_form").hide();
        $("#login_form").hide();
        $("#recover_form").show();
        $("#otp_form").hide();
        window.scrollTo(0, 0);
    });

}

function load_otp_form() {
    $("#register_form").hide();
    $("#login_form").hide();
    $("#recover_form").hide();
    $("#otp_form").show();
    window.scrollTo(0, 0);
}

// ------------------- LOAD CONTENT ------------------------ //
function load_content() {
    // console.log("hola load content");
    let path = window.location.pathname.split('/');
    // console.log([path[0], path[1], path[2], path[3], path[4]]);
    // return false;
    if (path[3] === 'recover') {
        window.location.href = friendlyURL("?module=login&op=recover_view");
        localStorage.setItem("token_email", path[4]);
    } else if (path[3] === 'verify') {
        ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { token_email: path[4], op: 'verify_email' })
            .then(function (verify) {
                // console.log(verify);
                // return false;
                if (verify = "verify") {
                    // console.log('hola verify :D');
                    toastr.options = {
                        closeButton: true, // Puedes configurar otras opciones según tus necesidades
                        positionClass: "toast-center" // Esto centra el toastr en la parte superior del centro
                    };
                    toastr.success("Email successfully verified, now you can log in! :)");
                    setTimeout('window.location.href = friendlyURL("?module=login")', 1000);
                } else if (verify = "Expired_session") {
                    console.log("Email caducao, pringao");

                } else {
                    console.log('Fail while email verification');
                }
            })
            .catch(function () {
                console.log('Error: verify email error');
            });
    }
    else if (path[3] === 'view') {
        $("#register_form").hide();
        $("#login_form").show();
        $("#recover_form").hide();
        window.scrollTo(0, 0);
    } else if (path[3] === 'recover_view') {
        load_form_new_password();
    }
}

$(document).ready(function () {
    $("#register_form").hide();
    $("#recover_form").hide();
    $("#otp_form").hide();
    load_content();
    charge_views();
    key_login();
    button_login();
    key_register();
    button_register();
    key_recover();
    button_recover();
    key_otp();
    button_otp();
});