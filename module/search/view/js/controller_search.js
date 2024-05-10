function load_types() {
    ajaxPromise('POST', 'JSON', friendlyURL('?module=search'), { op: 'load_types' })
        .then(function (data) {
            // console.log(data);
            // return false;
            $('<option value="0" selected hidden>SELECT TYPE</option>').attr('selected', true).attr('disabled', true).appendTo('.search_type')
            for (row in data) {
                $('<option value="' + data[row].type_id + '">' + data[row].type_name + '</option>').appendTo('.search_type')
            }
        }).catch(function () {
            console.log("Error al cargar los tipos!");
        });
}

function load_pets() {
    $('.search_pet').empty();
    var type_id = JSON.parse(localStorage.getItem('type_id'));
    // console.log(type_id);
    // return false;
    ajaxPromise('POST', 'JSON', friendlyURL('?module=search'), { 'type_id': type_id, op: 'search_pet' })
        .then(function (data) {
            // console.log(data);
            // return false;
            $('<option value="0" selected hidden>SELECT PET</option>').attr('selected', true).attr('disabled', true).appendTo('.search_pet')
            for (row in data) {
                $('<option value="' + data[row].pet_id + '">' + data[row].pet_name + '</option>').appendTo('.search_pet')
            }
        })
        .catch(function () {
            console.log("Error al cargas las mascotas.");
        });
    localStorage.removeItem('type_id');
}


function launch_search() {
    localStorage.removeItem('search_type');
    localStorage.removeItem('search_city');
    localStorage.removeItem('search_pet');
    load_types();
    load_pets();
    $(document).on('change', '.search_type', function () {
        localStorage.removeItem('type_id');
        localStorage.setItem('type_id', $(this).val());
        load_pets();
        $('#autocom').val('');
    });

    $(document).on('change', '.search_pet', function () {
        $('#autocom').val('');
    });
}


function autocomplete() {
    $("#autocom").on("keyup", function () {
        var sdata = [];
        sdata.push({ "city": $(this).val() });
        if (($('.search_type').val() != null)) {
            sdata.push({ "type": $('.search_type').val() });
        }
        if (($('.search_pet').val() != null)) {
            sdata.push({ "pet": $('.search_pet').val() });
        }
        $('#search_auto').empty();
        // console.log(sdata);
        // return false;
        ajaxPromise('POST', 'JSON', friendlyURL('?module=search'), { 'sdata': sdata, op: 'autocomplete' })

            .then(function (data) {
                // console.log(data);
                // return false;
                $('#searchAuto').show();
                $('#searchAuto').empty();
                $('#searchAuto').fadeIn(10000000);
                if (data === "error") {
                    $('#searchAuto').empty();
                    $('#searchAuto').hide();
                    console.log("Error al cargar ciudades");
                } else {
                    $('#searchAuto').show();
                    for (row in data) {
                        $('<div></div>').appendTo('#search_auto').html(data[row].city_name).attr({
                            'class': 'searchElement',
                            'name': data[row].city_name,
                            'value': data[row].city_id
                        });
                    }
                }
            }).catch(function () {
                $('#searchAuto').empty();
                $('#searchAuto').hide();
                console.log("Error al cargar ciudades");
            });
    });
    $(document).on('click', function (event) {
        if (event.target.id !== 'autocom') {
            $('#search_auto').empty();
        }
    });

    $(document).on('click', '.searchElement', function () {
        $('#autocom').val(this.getAttribute('name'));
        localStorage.removeItem('search_city');
        localStorage.setItem('search_city', $(this).attr('value'));
        $('#search_auto').empty();
    });
}


function button_search() {

    $(document).on('change', '.search_type', function () {
        localStorage.setItem('search_type', this.value);
    });

    $(document).on('change', '.search_pet', function () {
        localStorage.setItem('search_pet', this.value);
    });

    $('#search-btn').on('click', function () {
        localStorage.removeItem('filters_search');
        var search = [];

        var filterTypeValue = localStorage.getItem('search_type');
        if (filterTypeValue) {
            search.push(["type", filterTypeValue]);
        }
        var filterCityValue = localStorage.getItem('search_city');
        if (filterCityValue) {
            search.push(["city", filterCityValue]);
        }
        var filterPetValue = localStorage.getItem('search_pet');
        if (filterPetValue) {
            search.push(["pet", filterPetValue]);
        }

        if (search.length != 0) {
            localStorage.setItem('filters_search', JSON.stringify(search));
            localStorage.removeItem('search_type');
            localStorage.removeItem('search_city');
            localStorage.removeItem('search_pet');
        }
        setTimeout(function () {
            window.location.href = friendlyURL('?module=shop');
        }, 1000);
        // console.log(search);
        // return false;
    });
}


$(document).ready(function () {
    launch_search();
    autocomplete();
    button_search();
});