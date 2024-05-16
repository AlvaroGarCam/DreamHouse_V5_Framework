/* AJAX PROMISE */
function ajaxPromise(sType, sTData, sUrl, sData = undefined) {
    // console.log('hola promises js');
    // return false;
    return new Promise((resolve, reject) => {
        $.ajax({
            url: sUrl,
            type: sType,
            dataType: sTData,
            data: sData
        }).done((data) => {
            resolve(data);
        }).fail((jqXHR, textStatus, errorThrow) => {
            reject(errorThrow);
        });
    });
};

/* FRIENDLY URL */
function friendlyURL(url) {
    var link = "";
    url = url.replace("?", "");
    url = url.split("&");
    cont = 0;
    for (var i = 0; i < url.length; i++) {
        cont++;
        var aux = url[i].split("=");
        if (cont == 2) {
            link += "/" + aux[1];
        } else {
            link += "/" + aux[1];
        }
    }
    link = "http://localhost/DreamHouse_V5_Framework" + link;
    // console.log(link);
    return link;
}


// /* Loading Spinner */
// function loading_spinner() {
//     window.onload = function () {
//         var contenedor = document.getElementById('contenedor_carga');

//         contenedor.style.visibility = "hidden";
//         contenedor.style.opacity = '0';
//     }
// }

// /* LOAD MENU */
// function load_menu() {
//     $('<li></li>').attr({ 'class': 'nav_item' }).html('<a href="' + "?module=home&op=view" + '" class="nav_link">Home</a>').appendTo('.nav_list');
//     $('<li></li>').attr({ 'class': 'nav_item' }).html('<a href="' + "?module=shop&op=view" + '" class="nav_link">Shop</a>').appendTo('.nav_list');

//     // ajaxPromise(friendlyURL('?module=login&op=data_user'), 'POST', 'JSON', { token: localStorage.getItem('token') })
//     //     .then(function (data) {
//     //         if (data[0].user_type === 'admin') {
//     //             menu_admin();
//     //         } else if (data[0].user_type === 'client') {
//     //             menu_client();
//     //         }
//     //         click_profile(data[0]);
//     //     }).catch(function () {
//     //         $('<li></li>').attr({ 'class': 'nav_item' }).html('<a href="' + friendlyURL("?module=login&op=view") + '" class="nav_link" data-tr="Log in">Log in</a>').appendTo('.nav_list');
//     //     });
// }


function load_menu() {
    var access_token = localStorage.getItem('access_token');
    // console.log(access_token);
    // return false;

    if (access_token) {
        // ajaxPromise('POST', 'JSON', 'module/login/ctrl/ctrl_login.php?op=data_user', { 'access_token': access_token })
        //     .then(function (data) {
        //         // console.log(data);
        //         // return false;
        //         // if (data.type_user == "client") {
        //         //      console.log("Client loged");
        //         //      $('.opc_CRUD').empty();
        //         //      $('.opc_exceptions').empty();
        //         // } else {
        //         //      console.log("Admin loged");
        //         //      $('.opc_CRUD').show();
        //         //      $('.opc_exceptions').show();
        //         // }
        //         var menu_login = $('<li style="width: 100px;"></li><li><img src="' + data.avatar + '" width="60px"><a id="loged_username">' + data.username + '</a></li>' +
        //             '<li><span class="register_login_buttons">' +
        //             '<a id="logout"><button class="log">Logout</button></a>' +
        //             '</span></li>');
        //         menu_login.appendTo('.nav.navbar-nav.navbar-right');
        //     }).catch(function () {
        //         console.log("Error al cargar los datos del user");
        //     });
    } else {
        console.log("No hay ningún usuario logueado");
        var menu_logout = $(
            '<li><a href="http://localhost/DreamHouse_V5_Framework/home"><img src="view/img/LOGO1.png" width="90px"></a></li>' +
            '<li><a href="' + friendlyURL('?module=home') + '" id="home_link"><h4>HOME</h4></a></li>' +
            '<li><a href="' + friendlyURL('?module=shop') + '"><h4>SHOP</h4></a></li>' +
            '<li>' +
            '<span class="register_login_buttons">' +
            '<a href="' + friendlyURL('?module=login') + '"><button class="log">Login</button></a>' +
            // '<a href="' + friendlyURL('?module=login') + '"><button class="reg">Register</button></a>' +
            '</span>' +
            '</li>'
        );
        menu_logout.appendTo('.nav.navbar-nav.navbar-right');

    }

}
// /* MENUS */
// function menu_admin() {
//     $('<li></li>').attr('class', 'profile').attr('id', 'profile').html('<a id="profile" class="nav_link" data-tr="Profile">Profile</a>').appendTo('.nav_list');
// }

// function menu_client() {
//     $('<li></li>').attr('class', 'profile').attr('id', 'profile').html('<a id="profile" class="nav_link" data-tr="Profile">Profile</a>').appendTo('.nav_list');
// }

// /* CLICK PROFILE */
// function click_profile(data) {
//     $(document).on('click', '#profile', function () {
//         $(".profile_options").remove();
//         $('<div></div>').attr('class', 'profile_options').attr('id', 'profile_options').appendTo('.nav_list_profile')
//             .html(
//                 "<ul class='profile_list' id='profile_list'>" +
//                 "<li><div class='user'>" +
//                 "<div class='user_img'><img class='avatar_img' src='" + data.avatar + "'></div>" +
//                 "<div class='user_name'>" + data.username + "</div></li>" +
//                 "<li><div id='logout' class='logout' data-tr='Log out'>Log out</div></li>" +
//                 "</ul>"
//             )
//     });
//     $(document).on('click scroll', function (event) {
//         if (event.target.id !== 'profile') {
//             $('.profile_options').fadeOut(500);
//         }
//     });
// }


// /* CLICK LOGOUT */
// function click_logout() {
//     $(document).on('click', '#logout', function () {
//         logout();
//         setTimeout(1000, window.location.href = friendlyURL("?module=home&op=view"));
//     });
// }

// /* LOGOUT */
// function logout() {
//     $.ajax({
//         url: friendlyURL("?module=login&op=logout"),
//         type: 'POST',
//         dataType: 'JSON'
//     }).done(function (data) {
//         localStorage.removeItem('token');
//         window.location.href = friendlyURL("?module=home&op=view");
//         console.log("Sesion cerrada");
//     }).fail(function () {
//         console.log("Error: Logout error");
//     });
// }

$(document).ready(function () {
    // console.log("Hola main js");
    load_menu();
    // click_logout();
    // loading_spinner();
});