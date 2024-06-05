function loadHouses() {

    let filters_home = localStorage.getItem('filters_home') || false;

    let filters_shop = localStorage.getItem('filters_shop') || false;

    let details_visited_houses = localStorage.getItem('details_visited_houses') || false;

    let filters_search = localStorage.getItem('filters_search') || false;

    let redirect_like = localStorage.getItem('redirect_like') || false;

    let redirect_profile_likes = localStorage.getItem('redirect_profile_likes') || false;

    $('#details-shop').hide();
    $('#content_shop_houses').hide();
    if (filters_home !== false && filters_shop === false) {
        localStorage.setItem('filters_shop', localStorage.getItem('filters_home'));
        localStorage.removeItem('filters_home');
        print_filters_shop();
    }
    if (details_visited_houses !== false) {
        setTimeout(function () {
            var id = localStorage.getItem('details_visited_houses')
            localStorage.removeItem('details_visited_houses');
            loadDetails(id);
        }, 1000);
    }
    if (redirect_like !== false) {
        setTimeout(function () {
            $(document).ready(function () {
                loadDetails(redirect_like);
            });
            localStorage.removeItem("redirect_like");
        }, 1500);
        // $(document).ready(function () {
        //     List();
        //     loadDetails(redirect_like);
        // });

        // $('#' + redirect_like + '.details').trigger('click');

        // localStorage.removeItem("redirect_like");
    }
    if (filters_search !== false) {
        localStorage.removeItem('filters_shop');
        localStorage.setItem('filters_shop', localStorage.getItem('filters_search'));
        localStorage.removeItem('filters_search');
        print_filters_shop();
    }
    if (filters_shop !== false) {
        print_filters_shop();
    }
    if (redirect_profile_likes !== false) {
        setTimeout(function () {
            $(document).ready(function () {
                loadDetails(redirect_profile_likes);
            });
            localStorage.removeItem("redirect_profile_likes");
        }, 1500);
        // $(document).ready(function () {
        //     List();
        //     loadDetails(redirect_profile_likes);
        // });
        // setTimeout(function () {
        //     $(document).ready(function () {
        //         $('#' + redirect_profile_likes + '.details').trigger('click');
        //     });
        // }, 2000);
        // loadDetails(redirect_profile_likes);
        // localStorage.removeItem("redirect_profile_likes");
    }
    if (details_visited_houses == false && filters_home == false && filters_search == false && filters_shop == false && redirect_like == false && redirect_profile_likes == false) {
        List();
    }
}

//list del shop
function List() {
    var pagina = JSON.parse(localStorage.getItem('pagina'));
    ajaxPromise('POST', 'JSON', friendlyURL('?module=shop'), { 'pagina': pagina, op: 'list' })
        .then(function (data) {
            // console.log(data);
            // return false;
            $('#content_shop_houses').empty();
            $('.date_house, .date_img').empty();
            $('#details_shop').empty().hide();
            $('#details-shop').hide();
            $('#content_shop_houses').show();
            $('#filter_order').show();
            if (data === "error") {
                $('<div></div>').appendTo('#content_shop_houses')
                    .html('<h3>¡No se encuentran resultados con los filtros aplicados!</h3>');
            } else {
                for (let i = 0; i < data.length; i++) {
                    const house = data[i];
                    var house_id = house.house_id;
                    var access_token = localStorage.getItem('access_token') || false;
                    var ruta = "";
                    if (access_token === false) {
                        ruta = "view/img/dislike.png";
                        appendHouseToPage(house, ruta);
                    } else {
                        like_reactive(house_id, access_token)
                            .then(function (ruta_response) {
                                ruta = ruta_response;
                                appendHouseToPage(house, ruta);
                            })
                            .catch(function (error) {
                                console.error(error);
                            });
                    }
                }
            }
            mapBox_all(data);
        }).catch(function () {
            console.log('Error al cargar las casas');
        });
}

function appendHouseToPage(house, ruta) {
    $('<div></div>').attr({ 'id': house.house_id, 'class': 'list_content_shop' }).appendTo('#content_shop_houses')
        .html(
            "<div class='list_product'>" +
            "<div class='img-container'>" +
            "<img src='" + house.image_path + "' alt='House Image'>" +
            "</div>" +
            "<div class='product-info'>" +
            "<div class='product-content'>" +
            "<table><tr><td rowspan='3'><img src='" + house.pet_image + "' width='100px'></td><td><h1><b>" + house.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " €</b></h1></td></tr><tr></tr><tr></tr></table>" +
            "<br>" +
            "<table><tr><td><img src='view/img/icon/type_icon.png' width=30px></td><td><strong>" + house.type_names + "</strong></td><td><img src='view/img/icon/location.png' width=30px></td><td><strong>" + house.city_name + "</strong></td><td><img src='view/img/icon/operation.png' width=30px></td><td><strong>" + house.operation_names + "</strong></td></tr><tr><td><img src='view/img/icon/surface.png' width=40px></td><td><strong>" + house.surface + "</strong></td><td><img src='view/img/icon/rooms.png' width=30px></td><td><strong>" + house.num_rooms + "</strong></td><td><img src='view/img/icon/wcs.png' width=30px></td><td><strong>" + house.num_wcs + "</strong></td></tr></table>" +
            "<br>" +
            "<div class='buttons'>" +
            "<button id='" + house.house_id + "' class='details'>Details</button>" +
            "<a id='" + house.house_id + "' class='like'><img src=" + ruta + " width='40px'> <span style='font-size: larger;'><strong>" + house.likes + "</strong></span></a>" +
            "<a id='" + house.house_id + "' class='cart_button'><img src='view/img/cart_shop.png' width='60px'></a>" +
            "<div/>" +
            "</div>" +
            "</div>"
        );
}

function like_reactive(house_id, access_token) {
    return new Promise((resolve, reject) => {
        ajaxPromise('POST', 'JSON', friendlyURL('?module=shop'), { 'access_token': access_token, 'house_id': house_id, op: 'like_reactive' })
            .then(function (respuesta) {
                if (respuesta == "like") {
                    resolve("view/img/like.jpg");
                } else if (respuesta == "dislike") {
                    resolve("view/img/dislike.png");
                } else {
                    reject("Respuesta inesperada del servidor");
                }
            })
            .catch(function () {
                reject("Problema en el Ajax");
            });
    });
}

function clicks() {
    $(document).on("click", ".details", function () {
        var id_house = this.getAttribute('id');
        $('html, body').scrollTop(0);
        localStorage.removeItem('details_offset');
        localStorage.setItem('details_offset', 0);
        loadDetails(id_house);
    });
    //click en el icono de like
    $(document).on("click", ".like", function () {
        var house_id = this.getAttribute('id');
        var access_token = localStorage.getItem('access_token') || false;
        if (access_token == false) {
            localStorage.removeItem('redirect_like');
            localStorage.setItem('redirect_like', house_id);
            toastr.options = {
                closeButton: true,
                positionClass: "toast-center"
            };
            toastr.options.timeOut = 3000;
            toastr.success("You have to be logged in to 'like' or 'dislike'");
            setTimeout(function () {
                window.location.href = friendlyURL('?module=login');
            }, 1000);
        } else {
            ajaxPromise('POST', 'JSON', friendlyURL('?module=shop'), { 'access_token': access_token, 'house_id': house_id, op: 'click_like' })
                .then(function (data) {
                    console.log(data);
                    location.reload();
                }).catch(function () {
                    console.log('Error click_like');
                });
        }
    });
    //click al icono del carrito en el shop (list-filters_shop) o en el details
    $(document).on("click", ".cart_button", function () {
        var house_id = this.getAttribute('id');
        var access_token = localStorage.getItem('access_token') || false;
        if (access_token == false) {
            localStorage.removeItem('redirect_like');
            localStorage.setItem('redirect_like', house_id);
            toastr.options = {
                closeButton: true,
                positionClass: "toast-center"
            };
            toastr.options.timeOut = 2000;
            toastr.success("You have to be logged in to add this house to your cart.");
            setTimeout(function () {
                window.location.href = friendlyURL('?module=login');
            }, 1000);
        } else {
            localStorage.removeItem('cart_house_id');
            localStorage.setItem('cart_house_id', house_id);
            if (window.location.href !== friendlyURL('?module=cart')) {
                setTimeout(function () {
                    window.location.href = friendlyURL('?module=cart');
                }, 1000);
            }
        }
    });
}

function getLikeCount(house_id) {
    return ajaxPromise('POST', 'JSON', friendlyURL('?module=shop'), { 'house_id': house_id, op: 'get_like_count' })
        .then(function (data) {
            return data[0];
        })
        .catch(function () {
            console.error('Error al obtener el número de likes.');
        });
}

function loadDetails(id_house) {
    var house_id = id_house;

    $('#related_houses_container').empty();
    $('#related_houses_container').hide();
    $('#pagination').hide();
    $('#related_houses_button').show();
    $('#map').hide();
    $('.map_details').show();
    $('#map_details').show();

    var button = $('<button>Show More Related Houses</button>');
    var visited_houses = localStorage.getItem('visited_houses');
    if (visited_houses !== null) {
        try {
            visited_houses = JSON.parse(visited_houses);
        } catch (error) {
            visited_houses = [];
        }
    } else {
        visited_houses = [];
    }
    if (!visited_houses.includes(id_house)) {
        visited_houses.push(id_house);
    }
    localStorage.setItem('visited_houses', JSON.stringify(visited_houses));
    var initialLikeButton = $('#' + house_id + '.like').clone();
    ajaxPromise('POST', 'JSON', friendlyURL('?module=shop'), { 'house_id': house_id, op: 'details' })
        .then(function (data) {
            var imagePaths = data[0].image_paths;
            var imagePathsArray = imagePaths.split(',');
            house_id = data[0].house_id;
            pet_id = data[0].pet_id;
            $('#content_shop_houses').empty();
            $('.date_img').empty();
            $('.date_house').empty();
            $('.filters-shop').empty();
            $('#details-shop').show();
            $('#content_shop_houses').hide();
            $('#filter_order').hide();

            $('#related_houses_button').empty();
            $('#related_houses_button').append(button);

            for (let i = 0; i < imagePathsArray.length; i++) {
                $('<div></div>').attr({ 'id': 'image_' + i, class: 'date_img' }).appendTo('#house_images')
                    .html(
                        "<div class='content-img-details'>" +
                        "<img src='" + imagePathsArray[i] + "' alt='House Image'>" +
                        "</div>"
                    );
            }

            new Glider(document.querySelector('#house_images'), {
                slidesToShow: 1,
                dots: '.carousel__indicator',
                draggable: true,
                arrows: {
                    prev: '.carousel__prev',
                    next: '.carousel__next'
                }
            });
            $('<div></div>').attr({ 'id': data[0].house_id, class: 'date_house' }).appendTo('#house_data')
                .html(
                    "<div class='list_product_details'>" +
                    "<div class='product-info_details'>" +
                    "<div class='product-content_details'>" +
                    "<table style='margin: auto;'><tr><td rowspan='3'><img src='" + data[0].pet_image + "' width='100px'></td><td><h1><b>" + data[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " €</b></h1></td></tr><tr><td><h1> <b>" + data[0].ref_cat + "</b></h1></td></tr></table>" +
                    "<table class='details_table' text-align:center><tr><td rowspan='2'><img src='view/img/icon/type_icon.png' width=50px></td><td>Type of property</td><td rowspan='2'><img src='view/img/icon/location.png' width=50px></td><td>Location</td><td rowspan='2'><img src='view/img/icon/operation.png' width=50px></td><td>Operation</td></tr><tr><td><strong>" + data[0].type_names + "</strong></td><td><strong>" + data[0].city_name + "</strong></td><td><strong>" + data[0].operation_names + "</strong></td></tr><tr><td rowspan='2'><img src='view/img/icon/surface.png' width=50px></td><td>Surface</td><td rowspan='2'><img src='view/img/icon/rooms.png' width=50px></td><td>Nº rooms</td><td rowspan='2'><img src='view/img/icon/wcs.png' width=50px></td><td>Nº WCs</td></tr><tr><td><strong>" + data[0].surface + "</strong></td><td><strong>" + data[0].num_rooms + "</strong></td><td><strong>" + data[0].num_wcs + "</strong></td></tr></table>" +
                    "<div class='buttons'>" +
                    "<button id='backButton' onclick='location.reload(); window.scrollTo(0, 0); '>Back</button>" +
                    "<a id='" + data[0].house_id + "' class='cart_button'><img src='view/img/cart_shop.png' width='80px'></a>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>"
                );

            var likeButtonContainer = $('.buttons');
            initialLikeButton.appendTo(likeButtonContainer);

            var likeButton = $('#' + data[0].house_id + '.like');
            var access_token = localStorage.getItem('access_token') || false;
            if (access_token === false) {
                likeButton.find('img').attr('src', 'view/img/dislike.png');
            } else {
                like_reactive(data[0].house_id, access_token)
                    .then(function (ruta_response) {
                        likeButton.find('img').attr('src', ruta_response);
                        var likeCountElement = $('.like-count');
                        getLikeCount(data[0].house_id)
                            .then(function (likeCount) {
                                likeCountElement.text(likeCount);
                            })
                            .catch(function (error) {
                                console.error(error);
                            });
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            }
            mapBox_details(data);

        }).catch(function () {
            console.error('Error al cargar los detalles de la casa.');
        });

    $('#backButton').click(function () {
        $('#pagination').show();
        $('#related_houses_button').hide();
        $('#map').show();
        $('.map_details').hide();
        $('#map_details').hide();
    });
    button.click(function () {
        more_related_houses(house_id, pet_id);
    });
}

//función que imprime las casas filtradas según "filters_shop"
function print_filters_shop() {
    var pagina = JSON.parse(localStorage.getItem('pagina'));
    var filters_shop = JSON.parse(localStorage.getItem('filters_shop'));
    ajaxPromise('POST', 'JSON', friendlyURL('?module=shop'), { 'filters_shop': filters_shop, 'pagina': pagina, op: 'filters_shop' })
        .then(function (shop) {
            if (localStorage.getItem('filters_shop')) {
                highlight_filters_shop();
            }
            $('#content_shop_houses').empty();
            $('.date_house, .date_img').empty();
            $('#details_shop').empty();
            $('#details-shop').hide();
            $('#content_shop_houses').show();
            $('#filter_order').show();
            if ($.isEmptyObject(shop)) {
                $('<div></div>').appendTo('#content_shop_houses')
                    .css('text-align', 'center')
                    .html('<h3>¡No se encuentran resultados con los filtros aplicados!</h3>');
            } else {
                for (let i = 0; i < shop.length; i++) {
                    const house = shop[i];
                    var house_id = house.house_id;
                    var access_token = localStorage.getItem('access_token') || false;
                    var ruta = "";
                    if (access_token === false) {
                        ruta = "view/img/dislike.png";
                        appendHouseToPage(house, ruta);
                    } else {
                        like_reactive(house_id, access_token)
                            .then(function (ruta_response) {
                                ruta = ruta_response;
                                appendHouseToPage(house, ruta);
                            })
                            .catch(function (error) {
                                console.error(error);
                            });
                    }
                }
                mapBox_all(shop);
            }
        }).catch(function () {
            console.error('Error al cargar las casas.');
        });
}

function print_filters() {
    //console.log("hola print_filters");
    ajaxPromise('GET', 'JSON', friendlyURL('?module=shop'), { op: 'get_filters' })
        .then(function (data) {
            // console.log(data);
            // return false;
            if (data === "error") {
                $('<div></div>').appendTo('.filters-shop')
                    .html('<h3>¡No se pudieron mostrar los filtros!</h3>');
            } else {
                var html = "";
                var tags = {};

                for (let i = 0; i < data.length; i++) {
                    if (!tags[data[i].tag]) {
                        // Solo haremos 1 vez el encabezado de la etiqueta     
                        html += `<select class="filter_${data[i].tag}" id="filter_${data[i].tag}"><option hidden disabled selected value="">- SELECT ${data[i].tag.toUpperCase()} -</option> `;
                        tags[data[i].tag] = true;
                    }
                    html += `<option value=${data[i].id}>${data[i].name}</option>`;
                    if (i < data.length - 1 && data[i].tag !== data[i + 1].tag) {
                        html += '</select>';  // Cerramos el select si cambia la etiqueta
                    }
                }
                // Cerramos el último select después del for
                for (const tag in tags) {
                    html += `</select>`;
                }
                html += '<div class="container">' +
                    '<!-- Trigger the modal with a button -->' +
                    '<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">SELECT PET</button>' +
                    '' +
                    '<!-- Modal -->' +
                    '<div class="modal fade" id="myModal" role="dialog">' +
                    '<div class="modal-dialog">' +
                    '' +
                    '<!-- Modal content-->' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                    '<h1 class="modal-title"><b>Choose your pet!</b></h1>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<form>' +
                    '<input type="radio" name="filter_pet" id="myRadioNone" />' +
                    '<label for="myRadioNone" class="custom-radio">None</label>' +
                    '<br>' +
                    '<input type="radio" name="filter_pet" id="myRadio1" value="1"/>' +
                    '<label for="myRadio1"><img src="view/img/pet_img/cats.jpg" width=\'100px\'></label>' +
                    '<br>' +
                    '<input type="radio" name="filter_pet" id="myRadio2" value="2" />' +
                    '<label for="myRadio2"><img src="view/img/pet_img/dogs.jpg" width=\'100px\'></label>' +
                    '<br>' +
                    '<input type="radio" name="filter_pet" id="myRadio3" value="3" />' +
                    '<label for="myRadio3"><img src="view/img/pet_img/lizzards.jpg" width=\'100px\'></label>' +
                    '<br>' +
                    '<input type="radio" name="filter_pet" id="myRadio4" value="4"/>' +
                    '<label for="myRadio4"><img src="view/img/pet_img/parrots.jpg" width=\'100px\'></label>' +
                    '<br>' +
                    '<input type="radio" name="filter_pet" id="myRadio5" value="5"/>' +
                    '<label for="myRadio5"><img src="view/img/pet_img/fishes.jpg" width=\'100px\'></label>' +
                    '<br>' +
                    '</form>' +
                    '</div>' +
                    '<div class="modal-footer">' +
                    '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<br>' +
                    '<br>' +
                    '<select class="filter_order" id="filter_order">' +
                    '<option selected value="">--ORDER BY--</option>' +
                    '<option value="1">Price ASC</option>' +
                    '<option value="2">Price DESC</option>' +
                    '<option value="3">Rooms number ASC</option>' +
                    '<option value="4">Rooms number DESC</option>' +
                    '</select>' +
                    '<button class="filter_button button_spinner" id="Button_filter">Apply filters</button>' +
                    '<button class="filter_remove" id="Remove_filter">Remove filters</button>';

                $('<div></div>').appendTo('.filters-shop')
                    .html(html);
            }
            //llamo aquí al highlight porque arriba no me iba, solo cuando detecte que tiene algo en localstorage con el nombre 'filters_shop'
            if (localStorage.getItem('filters_shop')) {
                highlight_filters_shop();
            }
        }).catch(function () {
        });
    $(document).on('click', '.filter_remove', function () {
        remove_filters();
    });
}

function remove_filters() {
    localStorage.removeItem('filters_home');
    localStorage.removeItem('filters_shop');
    localStorage.removeItem('filters_search');
    localStorage.removeItem('filter_type');
    localStorage.removeItem('filter_operation');
    localStorage.removeItem('filter_category');
    localStorage.removeItem('filter_service');
    localStorage.removeItem('filter_city');
    localStorage.removeItem('filter_pet');
    localStorage.removeItem('filter_order');
    location.reload();
}

function filter_button() {
    // Variable para rastrear si algún filtro ha sido cambiado
    var filter_change = false;
    var filters_shop = [];

    // Definir el orden deseado de los filtros
    var filterOrder = ['type', 'operation', 'category', 'city', 'service', 'pet', 'filter_order'];

    // Iterar sobre el orden deseado y agregar los filtros a filters_shop
    filterOrder.forEach(function (filterType) {
        var filterValue = localStorage.getItem('filter_' + filterType);
        if (filterValue !== null && filterValue !== undefined) {
            $('.filter_' + filterType).val(filterValue);
            filters_shop.push([filterType, filterValue]);
        }
    });
    // Filtro type
    $(document).on('change', '.filter_type', function () {
        localStorage.setItem('filter_type', this.value);
        filter_change = true;
    });

    var filterTypeValue = localStorage.getItem('filter_type');
    if (filterTypeValue !== null && filterTypeValue !== undefined) {
        $('.filter_type').val(filterTypeValue);
        filters_shop.push(['type', filterTypeValue]);
    }

    // Filtro de operation
    $(document).on('change', '.filter_operation', function () {
        localStorage.setItem('filter_operation', this.value);
        filter_change = true;
    });

    var filterOperationValue = localStorage.getItem('filter_operation');
    if (filterOperationValue !== null && filterOperationValue !== undefined) {
        $('.filter_operation').val(filterOperationValue);
        filters_shop.push(['operation', filterOperationValue]);
    }

    // Filtro de category
    $(document).on('change', '.filter_category', function () {
        localStorage.setItem('filter_category', this.value);
        filter_change = true;
    });

    var filterCategoryValue = localStorage.getItem('filter_category');
    if (filterCategoryValue !== null && filterCategoryValue !== undefined) {
        $('.filter_category').val(filterCategoryValue);
        filters_shop.push(['category', filterCategoryValue]);
    }

    // Filtro de city
    $(document).on('change', '.filter_city', function () {
        localStorage.setItem('filter_city', this.value);
        filter_change = true;
    });

    var filterCityValue = localStorage.getItem('filter_city');
    if (filterCityValue !== null && filterCityValue !== undefined) {
        $('.filter_city').val(filterCityValue);
        filters_shop.push(['city', filterCityValue]);
    }

    // Filtro de services
    $(document).on('change', '.filter_service', function () {
        localStorage.setItem('filter_service', this.value);
        filter_change = true;
    });

    var filterServiceValue = localStorage.getItem('filter_service');
    if (filterServiceValue !== null && filterServiceValue !== undefined) {
        $('.filter_service').val(filterServiceValue);
        filters_shop.push(['service', filterServiceValue]);
    }

    // Filtro pet
    $(document).on('click', 'input[name="filter_pet"]', function () {
        var selectedValue = $('input[name="filter_pet"]:checked').val();
        if (selectedValue !== undefined) {
            localStorage.setItem('filter_pet', selectedValue);
            filter_change = true;
        }
    });

    var filterPetValue = localStorage.getItem('filter_pet');
    if (filterPetValue !== null && filterPetValue !== undefined) {
        $('input[name="filter_pet"][value="' + filterPetValue + '"]').prop('checked', true);
        filters_shop.push(['pet', filterPetValue]);
    }
    $(document).on('change', '.filter_order', function () {
        localStorage.setItem('filter_order', this.value);
        filter_change = true;
    });

    var filterOrderValue = localStorage.getItem('filter_order');
    if (filterOrderValue !== null && filterOrderValue !== undefined) {
        $('.filter_order').val(filterOrderValue);
        filters_shop.push(['filter_order', filterOrderValue]);
    }
    // console.log(filters_shop);
    // return false;

    // Verificar si hay algún filtro ya aplicado por highlight
    if (localStorage.getItem('filters_shop')) {
        var highlightedFilters = JSON.parse(localStorage.getItem('filters_shop'));
        filters_shop = filters_shop.concat(highlightedFilters);
        filter_change = true; // Añadir esta línea para indicar un cambio en los filtros
    }


    $(document).on('click', '.filter_button', function () {
        if (!filter_change) {
            console.log("No he cambiado ningún filtro");
            remove_filters();
        } else {
            if (filters_shop === undefined) {
                filters_shop = [];
            }
            console.log("He aplicado al menos 1 filtro");
            if (localStorage.getItem('filter_type')) {
                removeFilterOfType('type', filters_shop);
                filters_shop.push(['type', localStorage.getItem('filter_type')])
            }
            if (localStorage.getItem('filter_operation')) {
                removeFilterOfType('operation', filters_shop);
                filters_shop.push(['operation', localStorage.getItem('filter_operation')])
            }
            if (localStorage.getItem('filter_category')) {
                removeFilterOfType('category', filters_shop);
                filters_shop.push(['category', localStorage.getItem('filter_category')])
            }
            if (localStorage.getItem('filter_city')) {
                removeFilterOfType('city', filters_shop);
                filters_shop.push(['city', localStorage.getItem('filter_city')])
            }
            if (localStorage.getItem('filter_service')) {
                removeFilterOfType('service', filters_shop);
                filters_shop.push(['service', localStorage.getItem('filter_service')])
            }
            if (localStorage.getItem('filter_pet')) {
                removeFilterOfType('pet', filters_shop);
                filters_shop.push(['pet', localStorage.getItem('filter_pet')])
            }
            if (localStorage.getItem('filter_order')) {
                removeFilterOfType('filter_order', filters_shop);
                filters_shop.push(['filter_order', localStorage.getItem('filter_order')])
            }
            //Aqui borrar todos los filtros individuales
            // localStorage.removeItem('filters_home');
            localStorage.removeItem('filter_type');
            localStorage.removeItem('filter_operation');
            localStorage.removeItem('filter_category');
            localStorage.removeItem('filter_service');
            localStorage.removeItem('filter_city');
            localStorage.removeItem('filter_order');


            localStorage.setItem('filters_shop', JSON.stringify(filters_shop));

            //mejora para resetear la pagina a 1 cuando filtre para evitar errores
            localStorage.removeItem('pagina');
            localStorage.setItem('pagina', 1);

            location.reload();
        }
    });
}

function removeFilterOfType(filterType, filtersArray) {
    for (var i = filtersArray.length - 1; i >= 0; i--) {
        if (filtersArray[i][0] === filterType) {
            filtersArray.splice(i, 1);
        }
    }
}


function highlight_filters_shop() {
    // console.log("hola highlight");
    var filters_shop = JSON.parse(localStorage.getItem('filters_shop'));
    // console.log(filters_shop);

    for (let i = 0; i < filters_shop.length; i++) {
        if (filters_shop[i][0] === "type" && filters_shop[i][1] >= 1 && filters_shop[i][1] <= 5) {
            $('.filter_type').val(filters_shop[i][1].toString());
        }
        if (filters_shop[i][0] === "operation" && filters_shop[i][1] >= 1 && filters_shop[i][1] <= 5) {
            $('.filter_operation').val(filters_shop[i][1].toString());
        }
        if (filters_shop[i][0] === "category" && filters_shop[i][1] >= 1 && filters_shop[i][1] <= 7) {
            $('.filter_category').val(filters_shop[i][1].toString());
        }
        if (filters_shop[i][0] === "city" && filters_shop[i][1] >= 1 && filters_shop[i][1] <= 7) {
            $('.filter_city').val(filters_shop[i][1].toString());
        }
        if (filters_shop[i][0] === "service" && filters_shop[i][1] >= 1 && filters_shop[i][1] <= 7) {
            $('.filter_service').val(filters_shop[i][1].toString());
        }
        if (filters_shop[i][0] === "pet" && filters_shop[i][1] >= 1 && filters_shop[i][1] <= 5) {
            $('input[name="filter_pet"][value="' + filters_shop[i][1] + '"]').prop('checked', true);
        }
        if (filters_shop[i][0] === "filter_order" && filters_shop[i][1] >= 1 && filters_shop[i][1] <= 5) {
            var value = filters_shop[i][1].toString();
            $('.filter_order option').filter(function () {
                return $(this).val() === value;
            }).prop('selected', true);
        }
    }
}


function mapBox_all(data) {
    // console.log(data);
    // return false;
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-3.70275, 40.41831],
        zoom: 5
    });

    for (row in data) {
        const marker = new mapboxgl.Marker()
        const minPopup = new mapboxgl.Popup()
        minPopup.setHTML('<div class="popup">' +
            '</b>' +
            '</b>' +
            '<p style="text-align:center;">Ref Cat: <b>' + data[row].ref_cat + '</b></p>' +
            '<p style="text-align:center;">Price: <b>' + data[row].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' €</b></p>' +
            '<img src=" ' + data[row].image_path + '" width=100px height=auto/>' +
            "<div class='buttons'>" +
            "<button id='" + data[row].house_id + "' class='details'>Details</button>" +
            "<div/>" +
            '</div>')
        //pasamos tantos "lng" como "lat" a float, porque en la base de datos las hemos introducido como varchar
        const lng = parseFloat(data[row].lng);
        const lat = parseFloat(data[row].lat);
        marker.setPopup(minPopup)
            .setLngLat([lng, lat])
            .addTo(map);
    }
}

function mapBox_details(data) {
    // console.log(data);
    // return false;
    mapboxgl.accessToken = 'pk.eyJ1IjoiMjBqdWFuMTUiLCJhIjoiY2t6eWhubW90MDBnYTNlbzdhdTRtb3BkbyJ9.uR4BNyaxVosPVFt8ePxW1g';
    const map = new mapboxgl.Map({
        container: 'map_details',
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [-3.70275, 40.41831],
        zoom: 5
    });

    for (row in data) {
        const marker = new mapboxgl.Marker()
        const minPopup = new mapboxgl.Popup()
        minPopup.setHTML('</br><strong>Hola =)</strong>')
        const lng = parseFloat(data[row].lng);
        const lat = parseFloat(data[row].lat);
        marker.setPopup(minPopup)
            .setLngLat([lng, lat])
            .addTo(map);
    }
}

function pagination() {

    var filters_shop = JSON.parse(localStorage.getItem('filters_shop')) || false;
    var currentPage = localStorage.getItem('pagina');

    if (!currentPage) {
        currentPage = 1;
        localStorage.setItem('pagina', currentPage); // Establecer página 1 en localStorage si no está definida
    }

    // console.log("Hola pagination");
    // console.log(filters_shop);

    // Enviar un objeto con la clave filters_shop
    ajaxPromise('POST', 'JSON', friendlyURL('?module=shop'), { 'filters_shop': filters_shop, op: 'pagination' })
        .then(function (data) {
            // console.log(data);
            // return false;
            var total_prod = data[0].contador;
            var total_pages = Math.ceil(total_prod / 3);

            // Si el contador es menor o igual a 3, dejar el div pagination vacío
            if (total_pages <= 1) {
                $('#pagination').empty();
                return; // Terminar la función aquí si no hay necesidad de mostrar la paginación
            }

            // Crear elementos de paginación con un bucle for
            var paginationHtml = '';

            // Botón "Primera página" (visible solo si no estamos en la primera página)
            if (currentPage > 2) {
                paginationHtml += '<li id="first-page"><a href="#">&laquo; &laquo; Primera</a></li>';
            }

            // Botón "Anterior" (visible solo si no estamos en la primera página)
            if (currentPage > 1) {
                paginationHtml += '<li id="prev-page"><a href="#">&laquo; Anterior</a></li>';
            }

            for (var i = 1; i <= total_pages; i++) {
                paginationHtml += '<li data-page="' + i + '"><a href="#">' + i + '</a></li>';
            }

            // Botón "Siguiente" (visible solo si no estamos en la última página)
            if (currentPage < total_pages) {
                paginationHtml += '<li id="next-page"><a href="#">Siguiente &raquo;</a></li>';
            }

            // Botón "Última página" (visible solo si no estamos en la última página)
            if (currentPage < total_pages - 1) {
                paginationHtml += '<li id="last-page"><a href="#">Última &raquo; &raquo;</a></li>';
            }

            $('#pagination').html(paginationHtml);

            // Activar página 1 por defecto
            $('#pagination li[data-page="' + currentPage + '"]').addClass('active');

            // Evento de cambio de página al hacer clic en un número de página
            $('#pagination li[data-page]').click(function () {
                var num = $(this).data('page');
                goToPage(num);
            });

            // Evento de cambio de página al hacer clic en "Anterior"
            $('#prev-page').click(function () {
                var prevPage = parseInt(currentPage) - 1;
                goToPage(prevPage);
            });

            // Evento de cambio de página al hacer clic en "Siguiente"
            $('#next-page').click(function () {
                var nextPage = parseInt(currentPage) + 1;
                goToPage(nextPage);
            });

            // Evento de cambio de página al hacer clic en "Primera página"
            $('#first-page').click(function () {
                goToPage(1);
            });

            // Evento de cambio de página al hacer clic en "Última página"
            $('#last-page').click(function () {
                goToPage(total_pages);
            });
        });
}

function goToPage(num) {
    localStorage.setItem('pagina', num);

    $('#pagination li').removeClass('active');
    // Agregar clase "active" al elemento de la página actual
    $('#pagination li[data-page="' + num + '"]').addClass('active');

    location.reload();
    window.scrollTo(0, 0);
}


function more_related_houses(house_id, pet_id) {
    var house_id = house_id;
    var pet_id = pet_id;
    // console.log(house_id);

    $('#related_houses_container').show();

    var offset = localStorage.getItem('details_offset') || 0;
    // Incrementar offset en 2 porque lo inicializamos a -2 para que la primera vez sea 0 y luego ya pase a 2, 4, 6...

    ajaxPromise('POST', 'JSON', friendlyURL('?module=shop'), { 'house_id': house_id, 'pet_id': pet_id, op: 'count_related_houses' })
        .then(function (data) {
            // console.log(data[0].contador);
            // return false;
            var num_related_houses = data[0].contador;

            // Cargar las casas relacionadas solo si hay más disponibles
            ajaxPromise('POST', 'JSON', friendlyURL('?module=shop'), { 'house_id': house_id, 'pet_id': pet_id, 'offset': offset, op: 'related_houses' })
                .then(function (relatedData) {
                    //Incrementamos la variable offset para tenerla en cuenta para el siguiente click o para ocultar el botón directamente
                    offset = parseInt(offset) + 2;
                    localStorage.removeItem('details_offset');
                    // Guardar el nuevo valor de offset en el almacenamiento local
                    localStorage.setItem('details_offset', offset);
                    console.log(relatedData);

                    var html = '';

                    for (let i = 0; i < relatedData.length; i++) {
                        const house = relatedData[i];
                        html += "<div style='display: flex; justify-content: center;'>"
                            + "<div style='background-color: white; border-radius: 20px; padding: 10px; margin: 10px; width: 500px; display: flex; align-items: center;'>"
                            + "<img src='" + house.image_path + "' alt='House Image' style='width: 50%; border-radius: 20px 0 0 20px; object-fit: cover; height: 150px;'>"
                            + "<div style='width: 50%; padding-left: 10px;'>"
                            + "<h1 style='margin: 0; font-size: 18px;'><b>" + house.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " €</b></h1>"
                            + "<table style='margin-top: 10px;'><tr><td><img src='view/img/icon/surface.png' width='20px'></td><td><strong>" + house.surface + "</strong></td><td><img src='view/img/icon/rooms.png' width='20px'></td><td><strong>" + house.num_rooms + "</strong></td><td><img src='view/img/icon/wcs.png' width='20px'></td><td><strong>" + house.num_wcs + "</strong></td></tr></table>"
                            + "<button id='" + house.house_id + "' class='details' style='margin-top: 10px; padding: 5px 10px; border: none; background-color: #007bff; color: white; border-radius: 5px;'>Details</button>"
                            + "</div>"
                            + "</div>"
                            + "</div>";
                    }

                    $('#related_houses_container').append(html);

                    // Verificar si num_related_houses es menor que el offset actual
                    if (parseInt(num_related_houses) < parseInt(offset)) {
                        $('#related_houses_button').hide();
                    }
                }).catch(function () {
                    console.log('Error al cargar las casas relacionadas');
                });
        }).catch(function () {
            console.log('Error al obtener el número total de casas relacionadas');
        });
}



$(document).ready(function () {
    var pagina = localStorage.getItem('pagina') || false;
    if (pagina === false) {
        localStorage.setItem('pagina', 1);
    }
    print_filters();
    clicks();
    filter_button();
    loadHouses();
    pagination();
    $('.map_details').hide();
    $('#map_details').hide();
});
