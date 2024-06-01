function cart_controller() {
     let access_token = localStorage.getItem('access_token');
     check_cart(access_token);
}

function check_cart(access_token) {
     let data = {
          "access_token": access_token,
          op: "check_cart"
     }
     ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
          .then(function (data) {
               if (data == 'User has an active cart') {
                    console.log('User has an active cart');
                    charge_cart(access_token);
               } else if (data == 'User has no active cart') {
                    console.log('User has no active cart');
                    let house_id = localStorage.getItem('cart_house_id') || null;
                    if (house_id !== null) {
                         if (create_new_order(access_token, house_id)) {
                              localStorage.removeItem('cart_house_id');
                              charge_cart(access_token);
                         }
                    } else {
                         // console.log('No house_id in local storage');
                         document.getElementById('cart_view').innerHTML = '<p class="message-text">You don´t have any order active at the moment, please go to Shop.</p><button class="shop-button"><a href="' + friendlyURL('?module=shop') + '"><h4>SHOP</h4></a></button>';
                    }
               }
          })
          .catch(function (error) {
               console.log(error);
          });
}

function create_new_order(access_token, house_id) {
     let data = {
          "access_token": access_token,
          "house_id": house_id,
          op: "create_order"
     }
     ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
          .then(function (data) {
               if (data[0] === 'Order created successfully') {
                    console.log('Order created successfully');
                    return true;
               } else if (data[0] === 'Error creating new order') {
                    console.log('Error creating new order');
                    return false;
               }

          })
          .catch(function (error) {
               console.log(error);
          });
}


function charge_cart(access_token) {
     let data = {
          "access_token": access_token,
          op: "load_cart"
     }
     ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
          .then(function (data) {
               if (data[0] === 'Error getting house or products') {
                    console.log('Error getting house or products');
                    // Handle error in getting house or products here
               } else if (data[0] === 'Cart loaded successfully') {
                    let quantities = {
                         product1: 0,
                         product2: 0,
                         product3: 0,
                         house: 1
                    };

                    let product1 = data[1][0];
                    let product2 = data[1][1];
                    let product3 = data[1][2];
                    let house = data[1][3];

                    let table = '<table id="cart_table">';
                    table += '<thead><tr><th>IMAGEN</th><th>PRODUCTO</th><th>CANTIDAD</th><th>PRECIO UNITARIO</th></tr></thead>'
                    table += '<tr><td><img src="' + house.image + '" width="200px"></td><td>' + house.description + '</td><td><input type="text" value="1" readonly></td><td>' + house.price + ' €</td></tr>';
                    table += '<tr><td><img src="' + product1.image + '" width="200px"></td><td>' + product1.description + '</td><td><button class="minus-button" data-product="product1">-</button><input type="text" value="' + quantities.product1 + '" readonly data-product="product1"><button class="plus-button" data-product="product1">+</button></td><td>' + product1.price + ' €</td></tr>';
                    table += '<tr><td><img src="' + product2.image + '" width="200px"></td><td>' + product2.description + '</td><td><button class="minus-button" data-product="product2">-</button><input type="text" value="' + quantities.product2 + '" readonly data-product="product2"><button class="plus-button" data-product="product2">+</button></td><td>' + product2.price + ' €</td></tr>';
                    table += '<tr><td><img src="' + product3.image + '" width="200px"></td><td>' + product3.description + '</td><td><button class="minus-button" data-product="product3">-</button><input type="text" value="' + quantities.product3 + '" readonly data-product="product3"><button class="plus-button" data-product="product3">+</button></td><td>' + product3.price + ' €</td></tr>';
                    table += '<tr><td></td><td></td><td>TOTAL</td><td id="total">' + calculateTotal() + ' €</td></tr>'
                    table += '</table>';

                    $('#cart_view').append(table);

                    $('.minus-button').click(function () {
                         let product = $(this).data('product');
                         if (quantities[product] > 0) {
                              quantities[product]--;
                              updateQuantity(product);
                              updateTotal();
                         }
                    });

                    $('.minus-button, .plus-button').click(function (event) {
                         event.preventDefault();
                         let product = $(this).data('product');
                         if ($(this).hasClass('minus-button')) {
                              if (quantities[product] > 0) {
                                   quantities[product]--;
                              }
                         } else {
                              quantities[product]++;
                         }
                         updateQuantity(product);
                         updateTotal();
                    });

                    function calculateTotal() {
                         return (Number(house.price) + Number(product1.price) * quantities.product1 + Number(product2.price) * quantities.product2 + Number(product3.price) * quantities.product3).toFixed(2);
                    }

                    function updateQuantity(product) {
                         $('input[data-product="' + product + '"]').val(quantities[product]);
                    }

                    function updateTotal() {
                         $('#total').text(calculateTotal() + ' €');
                    }
               }
          })
          .catch(function (error) {
               console.log(error);
               return false;
          });
}

// function create_new_order() {
//      // console.log("Hola load_cart");
//      let house_id = localStorage.getItem('cart_house_id') || null;
//      let access_token = localStorage.getItem('access_token');
//      let data = {
//           "access_token": access_token,
//           "house_id": house_id,
//           op: "load_cart"
//      }
//      // console.log(data);
//      ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
//           .then(function (data) {
//                console.log(data);
//                if (data[0] === 'Order created successfully') {
//                     console.log('Order created successfully');
//                     let firstImagePath = data[1][0].image_paths.split(',')[0];
//                     let quantity_house = 1;
//                     let quantity_product1 = 0;
//                     let quantity_product2 = 0;
//                     let quantity_product3 = 0;
//                     let price_house = data[1][0].price;
//                     let price_product1 = data[2][0].price;
//                     let price_product2 = data[2][1].price;
//                     let price_product3 = data[2][2].price;
//                     let table = '<table id=cart_table>';
//                     table += '<thead><tr><th>IMAGEN</th><th>PRODUCTO</th><th>CANTIDAD</th><th>PRECIO UNITARIO</th></tr></thead>'
//                     table += '<tr><td><img src=' + firstImagePath + ' width="200px"></td><td>' + data[1][0].ref_cat + '</td><td><input type="text" value="' + quantity_house + '" readonly></td><td>' + price_house + ' €</td></tr>';
//                     table += '<tr><td><img src=' + data[2][0].image + ' width="200px"></td><td>' + data[2][0].description + '</td><td><button class="minus-button" data-product="product1">-</button><input type="text" value="' + quantity_product1 + '" readonly data-product="product1"><button class="plus-button" data-product="product1">+</button></td><td>' + price_product1 + ' €</td></tr>';
//                     table += '<tr><td><img src=' + data[2][1].image + ' width="200px"></td><td>' + data[2][1].description + '</td><td><button class="minus-button" data-product="product2">-</button><input type="text" value="' + quantity_product2 + '" readonly data-product="product2"><button class="plus-button" data-product="product2">+</button></td><td>' + price_product2 + ' €</td></tr>';
//                     table += '<tr><td><img src=' + data[2][2].image + ' width="200px"></td><td>' + data[2][2].description + '</td><td><button class="minus-button" data-product="product3">-</button><input type="text" value="' + quantity_product3 + '" readonly data-product="product3"><button class="plus-button" data-product="product3">+</button></td><td>' + price_product3 + ' €</td></tr>'; table += '<tr><td></td><td></td><td>TOTAL</td><td>' + ((Number(price_house) * quantity_house + Number(price_product1) * quantity_product1 + Number(price_product2) * quantity_product2 + Number(price_product3) * quantity_product3).toFixed(2)) + ' €</td></tr>'
//                     table += '</table>';
//                     $('#cart_view').append(table);

//                } else if (data[0] === 'Error getting house or products') {
//                     console.log('Error getting house or products');
//                     // Handle error in getting house or products here
//                } else if (data[0] === 'Error creating new order') {
//                     console.log('Error creating new order');
//                     // Handle error in order creation here
//                }
//           })
//           .catch(function (error) {
//                console.log(error);
//                return false;
//           });
// }


$(document).ready(function () {
     cart_controller();
});




