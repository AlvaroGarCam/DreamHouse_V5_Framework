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

function load_menu() {
    var access_token = localStorage.getItem('access_token');
    if (access_token) {
        // console.log("hola, usuario logueado :D");
        // console.log(access_token);
        // return false;
        ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { 'access_token': access_token, op: 'data_user' })
            .then(function (data) {
                // console.log(data);
                // return false;
                // if (data[0].type_user == "client") {
                //      console.log("Client loged");
                //      $('.opc_CRUD').empty();
                //      $('.opc_exceptions').empty();
                // } else {
                //      console.log("Admin loged");
                //      $('.opc_CRUD').show();
                //      $('.opc_exceptions').show();
                // }
                if (data[1] == false) {
                    console.log("Usuario sin pedido pendiente");
                    orderStatus = '<span style="font-size:30px; color:white; font-weight:bold;">0</span>';
                } else if (data[1] == true) {
                    console.log("Usuario con pedido pendiente");
                    orderStatus = '<span style="font-size:30px; color:white; font-weight:bold;">!</span>';
                }
                var menu_login = $(
                    '<li><a href="http://localhost/DreamHouse_V5_Framework/home"><img src="view/img/LOGO1.png" width="90px"></a></li>' +
                    '<li><a href="' + friendlyURL('?module=home') + '" id="home_link"><h4>HOME</h4></a></li>' +
                    '<li><a href="' + friendlyURL('?module=shop') + '"><h4>SHOP</h4></a></li>' +
                    '<li><a href="' + friendlyURL('?module=cart') + '"><img src="view/img/cart_shop.png" width="100px">' + orderStatus + '</a></a></li>' +
                    '<li style="width: 100px;"></li><li><img src="' + data[0][0].avatar + '" width="60px"><a id="loged_username">' + data[0][0].username + '</a></li>' +
                    '<li><span class="register_login_buttons">' +
                    '<a id="logout"><button class="log">Logout</button></a>' +
                    '</span></li>');
                menu_login.appendTo('.nav.navbar-nav.navbar-right');
            }).catch(function () {
                console.log("Error al cargar los datos del user");
            });
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



//================CLICK-LOGIUT================
function click_logout() {
    $(document).on('click', '#logout', function () {
        if (confirm("¿Are you sure you want to logout?")) {
            logout();
        }
    });
}

//================LOG-OUT================
function logout() {
    // console.log('Hola logout :D ');
    // return false;
    ajaxPromise('POST', 'JSON', friendlyURL('?module=login'), { op: 'logout' })
        .then(function (data) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            toastr.options = {
                closeButton: true,
                positionClass: 'toast-center'
            };
            toastr.success("Loged out succesfully. See you soon!");
            localStorage.removeItem('filter_pet');
            localStorage.removeItem('filters_shop');
            localStorage.removeItem('pagina');
            setTimeout(' window.location.href = friendlyURL("?module=home"); ', 2000);
        }).catch(function () {
            console.log("Something has occured, couldn't logout");
        });
}


$(document).ready(function () {
    load_menu();
    click_logout();
    // loading_spinner();
});