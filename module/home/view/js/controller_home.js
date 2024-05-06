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
function pets() {
     console.log("Hola pets");
     ajaxPromise('GET', 'JSON', '?module=home&op=pets')
          .then(function (data) {
               // console.log(data);
               // return false;
               var htmlContent = '';
               for (var row in data) {
                    htmlContent += `
                    <div class='card'> 
                        <div class='card_image'>
                            <div id='${data[row].pet_id}' class='filter_pet'>
                                <img src='${data[row].pet_image}' alt='${data[row].pet_name}'/>
                                <div class='overlay'>
                                <p>${data[row].pet_name}</p> 
                                </div>
                            </div>
                        </div> 
                    </div>`;
               }
               $('#pet_house').html(htmlContent);
               new Glider(document.querySelector('#pet_house'), {
                    slidesToShow: 4,
                    loop: true,
                    dots: '.carousel__indicator',
                    draggable: true,
                    arrows: {
                         prev: '.carousel__prev',
                         next: '.carousel__next'
                    }
               });
          })
          .catch(function () {
          });
}

function loadCategories() {
     ajaxPromise('GET', 'JSON', 'module/home/ctrl/ctrl_home.php?op=homePageCategory')
          .then(function (data) {
               var htmlContent = '';
               for (var row in data) {
                    htmlContent += `
                    <div class='card'> 
                        <div class='card_image'>
                            <div id='${data[row].category_id}' class='filter_category'>
                                <img src='${data[row].category_image}' alt='${data[row].category_name}'/>
                                <div class='overlay'>
                                <p>${data[row].category_name}</p> 
                                </div>
                            </div>
                        </div> 
                    </div>`;
               }
               $('#category_house').html(htmlContent);
               new Glider(document.querySelector('#category_house'), {
                    slidesToShow: 5,
                    dots: '.carousel__indicator',
                    draggable: true,
                    arrows: {
                         prev: '.carousel__prev',
                         next: '.carousel__next'
                    }
               });
          })
          .catch(function () {
          });
}

function loadOperations() {
     ajaxPromise('GET', 'JSON', 'module/home/ctrl/ctrl_home.php?op=homePageOperation')
          .then(function (data) {
               var htmlContent = '';
               for (var row in data) {
                    htmlContent += `
                    <div class='card'> 
                        <div class='card_image'>
                                <div id='${data[row].operation_id}' class='filter_operation'>
                                    <img src='${data[row].operation_image}' alt='${data[row].operation_name}'/>
                                <div class='overlay'>
                                    <p>${data[row].operation_name}</p> 
                                </div>
                            </div>
                        </div> 
                    </div>`;
               }
               $('#operation_house').html(htmlContent);
          })
          .catch(function () {
          });
}

function loadCities() {
     ajaxPromise('GET', 'JSON', 'module/home/ctrl/ctrl_home.php?op=homePageCity')
          .then(function (data) {
               var htmlContent = '';
               for (var row in data) {
                    htmlContent += `
                    <div> 
                        <div class='card_image'>
                            <div id='${data[row].city_id}' class='filter_city'>
                                <img src='${data[row].city_image}'  width=100% alt='${data[row].city_name}'/>
                                <div class='overlay'>
                                    <p>${data[row].city_name}</p> 
                                </div>
                            </div>
                        </div> 
                    </div>`;
               }
               $('#city_house').html(htmlContent);
               new Glider(document.querySelector('#city_house'), {
                    slidesToShow: 3,
                    dots: '.carousel__indicator',
                    draggable: true,
                    arrows: {
                         prev: '.carousel__prev',
                         next: '.carousel__next'
                    }
               });
          })
          .catch(function () {
          });
}

function loadServices() {
     ajaxPromise('GET', 'JSON', 'module/home/ctrl/ctrl_home.php?op=homePageService')
          .then(function (data) {
               var htmlContent = '';
               for (var row in data) {
                    htmlContent += `
                    <div class='card'> 
                        <div class='card_image'>
                            <div id='${data[row].service_id}' class='filter_service'>
                                <img src='${data[row].service_image}' alt='${data[row].service_name}'/>
                                <div class='overlay'>
                                    <p>${data[row].service_name}</p> 
                                </div>
                            </div>
                        </div> 
                    </div>`;
               }
               $('#service_house').html(htmlContent);
               new Glider(document.querySelector('#service_house'), {
                    slidesToShow: 5,
                    dots: '.carousel__indicator',
                    draggable: true,
                    arrows: {
                         prev: '.carousel__prev',
                         next: '.carousel__next'
                    }
               });
          })
          .catch(function () {
          });
}

function carouselTypes() {
     ajaxPromise('GET', 'JSON', 'module/home/ctrl/ctrl_home.php?op=Carrousel_Type')
          .then(function (data) {
               var typeHouseHtml = '';
               for (var row in data) {
                    typeHouseHtml += `
                                                
                        <div class='card_image'>
                            <div class='filter_type' id='${data[row].type_id}' >
                                    <img src='${data[row].type_image}' alt='${data[row].type_name}' >
                                <div class='overlay'>
                                    <p>${data[row].type_name}</p>
                                </div>
                            </div>
                        
                        </div>`;
               }
               $("#type_house").html(typeHouseHtml);
               new Glider(document.querySelector('#type_house'), {
                    slidesToShow: 3,
                    dots: '.carousel__indicator',
                    draggable: true,
                    arrows: {
                         prev: '.carousel__prev',
                         next: '.carousel__next'
                    }
               });
          })
          .catch(function () {
          });
}


function loadVisited_houses() {
     var visited_houses = localStorage.getItem('visited_houses');
     // console.log(visited_houses);
     if (visited_houses) {
          ajaxPromise('POST', 'JSON', 'module/home/ctrl/ctrl_home.php?op=visited_houses', { visited_houses })
               .then(function (data) {
                    // console.log(data);
                    var htmlContent = '';
                    for (var row in data) {
                         htmlContent += `
                            <div class='card'> 
                                <div class='card_image'>
                                    <div id='${data[row].house_id}' class='visited_houses'>
                                        <img src='${data[row].image_path}' alt='${data[row].house_id}' width='500'/>
                                        <div class='overlay'>
                                            <p>${data[row].house_id}</p> 
                                        </div>
                                    </div>
                                </div> 
                            </div>`;
                    }
                    $('#visited_houses').html(htmlContent);
               })
               .catch(function () {
                    console.error('Error al cargar las casas visitadas.');
               });
     } else {
          console.log("No hay casas visitadas en el registro");
     }
}



function clicks_home() {
     function createFilterArray(key, value) {
          var filters_home = [];
          if (value) {
               filters_home.push([key, value]);
          }
          localStorage.removeItem('filters_home');
          localStorage.setItem('filters_home', JSON.stringify(filters_home));
          setTimeout(function () {
               window.location.href = 'index.php?page=shop';
          }, 1000);
     }

     $(document).on("click", 'div.filter_pet', function () {
          var petId = this.getAttribute('id');
          createFilterArray("pet", petId);
     });

     $(document).on("click", 'div.filter_type', function () {
          var typeId = this.getAttribute('id');
          createFilterArray("type", typeId);
     });

     $(document).on("click", 'div.filter_operation', function () {
          var operationId = this.getAttribute('id');
          createFilterArray("operation", operationId);
     });

     $(document).on("click", 'div.filter_category', function () {
          var categoryId = this.getAttribute('id');
          createFilterArray("category", categoryId);
     });

     $(document).on("click", 'div.filter_city', function () {
          var cityId = this.getAttribute('id');
          createFilterArray("city", cityId);
     });

     $(document).on("click", 'div.filter_service', function () {
          var serviceId = this.getAttribute('id');
          createFilterArray("service", serviceId);
     });

     $(document).on("click", 'div.visited_houses', function () {
          var id = this.getAttribute('id');
          localStorage.removeItem('details_visited_houses');
          localStorage.setItem('details_visited_houses', JSON.stringify(id));
          setTimeout(function () {
               window.location.href = 'index.php?page=shop';
          }, 1000);
     });
}



$(document).ready(function () {
     // carouselTypes();
     pets();
     // loadOperations();
     // loadCategories();
     // loadCities();
     // loadServices();
     // loadVisited_houses();
     // clicks_home();

     // // Función para borrar 'pagina''
     // function Borrar_pagina() {
     //      localStorage.removeItem('pagina');
     // }

     // // Asigna el evento click al logo y al enlace "home"
     // $('#logo_link, #home_link').click(Borrar_pagina);
});




