function cart_controller() {
     let access_token = localStorage.getItem('access_token');
     check_cart(access_token);
}

//Función que comprueba si el usuario tiene un carrito activo
function check_cart(access_token) {
     let data = {
          "access_token": access_token,
          op: "check_cart"
     }
     ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
          .then(function (data) {
               if (data == 'User has an active cart') {
                    let house_id = localStorage.getItem('cart_house_id') || null;
                    if (house_id !== null) {
                         swal("Notice", "You already have an active cart, you will be redirected to it", "info");
                         localStorage.removeItem('cart_house_id');
                    }
                    console.log('User has an active cart');
                    charge_cart(access_token);
               } else if (data == 'User has no active cart') {
                    console.log('User has no active cart');
                    let house_id = localStorage.getItem('cart_house_id') || null;
                    if (house_id !== null) {
                         console.log('House_id in local storage');
                         create_new_order(access_token, house_id);
                         localStorage.removeItem('cart_house_id');
                         charge_cart(access_token);
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

//Función que crea un nuevo pedido con la casa seleccionada
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

//Función que carga el carrito con los productos y la casa seleccionada
function charge_cart(access_token) {
     let data = {
          "access_token": access_token,
          op: "load_cart"
     }
     ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
          .then(function (data) {
               $order_id = Number(data[2]);
               if (data[0] === 'Error getting house or products') {
                    console.log('Error getting house or products');
               } else if (data[0] === 'Cart loaded successfully') {


                    let product1 = data[1][0];
                    let product2 = data[1][1];
                    let product3 = data[1][2];
                    let house = data[1][3];

                    let quantities = {
                         product1: product1.quantity,
                         product2: product2.quantity,
                         product3: product3.quantity,
                         house: house.quantity
                    };

                    let table = '<table id="cart_table">';
                    table += '<thead><tr><th>IMAGEN</th><th>PRODUCTO</th><th>CANTIDAD</th><th>PRECIO UNITARIO</th></tr></thead>'
                    table += '<tr><td><img src="' + house.image + '" width="200px"></td><td>' + house.description + '</td><td><input type="text" value="1" readonly></td><td>' + house.price + ' €</td></tr>';
                    table += '<tr id="' + product1.product_id + '"><td><img src="' + product1.image + '" width="200px"></td><td>' + product1.description + '</td><td><button class="minus-button" data-product="product1" data-product-id="' + product1.product_id + '">-</button><input type="text" value="' + quantities.product1 + '" readonly data-product="product1"><button class="plus-button" data-product="product1" data-product-id="' + product1.product_id + '">+</button></td><td>' + product1.price + ' €</td></tr>';
                    table += '<tr id="' + product2.product_id + '"><td><img src="' + product2.image + '" width="200px"></td><td>' + product2.description + '</td><td><button class="minus-button" data-product="product2" data-product-id="' + product2.product_id + '">-</button><input type="text" value="' + quantities.product2 + '" readonly data-product="product2"><button class="plus-button" data-product="product2" data-product-id="' + product2.product_id + '">+</button></td><td>' + product2.price + ' €</td></tr>';
                    table += '<tr id="' + product3.product_id + '"><td><img src="' + product3.image + '" width="200px"></td><td>' + product3.description + '</td><td><button class="minus-button" data-product="product3" data-product-id="' + product3.product_id + '">-</button><input type="text" value="' + quantities.product3 + '" readonly data-product="product3"><button class="plus-button" data-product="product3" data-product-id="' + product3.product_id + '">+</button></td><td>' + product3.price + ' €</td></tr>';
                    table += '<tr><td></td><td></td><td>TOTAL</td><td id="total">' + calculateTotal() + ' €</td></tr>'
                    table += '</table>';
                    table += '</br></br><div class="button-container"><button id="purchase-button" class="unique-button">PURCHASE</button><button id="delete-button" class="unique-button">DELETE ORDER</button></div>';
                    $('#cart_view').append(table);

                    // update inicial para cargar bien los botones de + y -
                    updateQuantity('product1');
                    updateQuantity('product2');
                    updateQuantity('product3');

                    check_stock_first_load();

                    //función que comprueba el stock de los productos al cargar la página
                    //de manera que si la cantidad de algún producto supera o iguala al 
                    //stock disponible, se deshabilita el botón de incrementar y se adapta
                    //la cantidad al stock disponible
                    function check_stock_first_load() {
                         $('.plus-button').each(function () {
                              let product = $(this).data('product');
                              let product_id = $(this).data('product-id');
                              let data = {
                                   "access_token": access_token,
                                   "product_id": product_id,
                                   op: "check_stock"
                              }
                              ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
                                   .then(function (stock) {
                                        let numero_stock = Number(stock[0].stock);
                                        let incrementButton = $('.plus-button[data-product="' + product + '"]');
                                        if (numero_stock == quantities[product]) {
                                             incrementButton.attr('disabled', 'disabled');
                                             incrementButton.css('background-color', 'gray');
                                        } else if (numero_stock < quantities[product]) {
                                             quantities[product] = numero_stock;
                                             updateQuantity(product);
                                             updateTotal();
                                             incrementButton.attr('disabled', 'disabled');
                                             incrementButton.css('background-color', 'gray');
                                             let quantity = quantities[product];
                                             update_cart(access_token, product_id, quantity, $order_id);
                                        }
                                   })
                                   .catch(function (error) {
                                        console.log(error);
                                   });
                         });
                    }

                    check_house_in_other_order($order_id);

                    //Función que comprueba si la misma casa se encuentra en otro pedido 
                    //pendiente que no sea el nuestro para avisarnos de que hay alguien 
                    //más interesado en la casa
                    function check_house_in_other_order(order_id) {
                         let data = {
                              "order_id": order_id,
                              op: "check_house_in_other_order"
                         }
                         ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
                              .then(function (orders) {
                                   let otherOrders = orders.filter(order => order.order_id !== my_order_id);
                                   if (otherOrders.length > 0) {
                                        swal("Attention!", "This house is in another order. Hurry up!", "warning");
                                   }
                              })
                              .catch(function (error) {
                                   console.log(error);
                              });
                    }

                    //Función que actualiza la cantidad de un producto en el carrito
                    //cada vez que clickamos en los botones de + o -
                    //para tener un control dinámico de la cantidad de productos y del stock
                    function update_cart(access_token, product_id, quantity, order_id) {
                         let data = {
                              "access_token": access_token,
                              "product_id": product_id,
                              "quantity": quantity,
                              "order_id": order_id,
                              op: "update_product_quantity"
                         }
                         ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
                              .then(function (response) {
                                   // console.log(response);
                              })
                              .catch(function (error) {
                                   console.log(error);
                              });
                    }

                    //funcionalidad de los botones de + y - para incrementar o decrementar la cantidad
                    //1º comprobamos el stock antes de incrementar la cantidad
                    //2º si hay stock disponible, incrementamos la cantidad
                    //3º actualizamos la cantidad en el input
                    //4º actualizamos el total
                    //5º actualizamos el carrito
                    //6º si la cantidad iguala al stock, deshabilitamos el botón de incrementar
                    //7º si la cantidad es mayor que 0, habilitamos el botón de decrementar
                    //8º si la cantidad es 0, deshabilitamos el botón de decrementar
                    $('.plus-button').click(function (event) {
                         event.preventDefault();
                         let product = $(this).data('product');
                         let product_id = $(this).data('product-id');

                         let data = {
                              "access_token": access_token,
                              "product_id": product_id,
                              op: "check_stock"
                         }
                         ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
                              .then(function (stock) {
                                   let numero_stock = Number(stock[0].stock);
                                   let incrementButton = $('.plus-button[data-product="' + product + '"]');
                                   if (numero_stock > quantities[product]) {
                                        quantities[product]++;
                                        updateQuantity(product);
                                        updateTotal();
                                        if (numero_stock == quantities[product]) {
                                             incrementButton.attr('disabled', 'disabled');
                                             incrementButton.css('background-color', 'gray');
                                             setTimeout(function () {
                                                  swal("Stock warning!", "No more stock available for this product", "warning");
                                             }, 200);
                                        } else {
                                             incrementButton.removeAttr('disabled');
                                             incrementButton.css('background-color', '#4CAF50');
                                        }
                                        let quantity = quantities[product];
                                        update_cart(access_token, product_id, quantity, $order_id);
                                   } else {
                                        incrementButton.attr('disabled', 'disabled');
                                        incrementButton.css('background-color', 'gray');
                                   }
                              })
                              .catch(function (error) {
                                   console.log(error);
                              });
                    });
                    $('.minus-button').click(function (event) {
                         event.preventDefault();
                         let product = $(this).data('product');
                         let product_id = $(this).data('product-id');
                         if (quantities[product] > 0) {
                              let incrementButton = $('.plus-button[data-product="' + product + '"]');
                              incrementButton.removeAttr('disabled');
                              incrementButton.css('background-color', '#4CAF50');
                              quantities[product]--;
                              updateQuantity(product);
                              updateTotal();
                              let quantity = quantities[product];
                              update_cart(access_token, product_id, quantity, $order_id);
                         }
                    });


                    //función que calcula el total de la compra sumando el precio de la casa y los productos 
                    function calculateTotal() {
                         return (Number(house.price) + Number(product1.price) * quantities.product1 + Number(product2.price) * quantities.product2 + Number(product3.price) * quantities.product3).toFixed(2);
                    }

                    //función que actualiza la cantidad de un producto en el input
                    function updateQuantity(product) {
                         $('input[data-product="' + product + '"]').val(quantities[product]);
                         let decrementButton = $('.minus-button[data-product="' + product + '"]');
                         if (quantities[product] > 0) {
                              decrementButton.removeAttr('disabled');
                              decrementButton.css('background-color', '#4CAF50');
                         } else {
                              decrementButton.attr('disabled', 'disabled');
                              decrementButton.css('background-color', 'gray');
                         }
                    }

                    //función que actualiza el total de la compra en el input
                    function updateTotal() {
                         $('#total').text(calculateTotal() + ' €');
                    }

                    //evento click del botón de compra
                    document.getElementById('purchase-button').addEventListener('click', function (event) {
                         event.preventDefault();
                         console.log('Purchase button clicked ' + $order_id);
                         $total_price = calculateTotal();
                         purchase($order_id, $total_price);
                    });

                    //evento click del botón de eliminar pedido
                    document.getElementById('delete-button').addEventListener('click', function (event) {
                         event.preventDefault();
                         console.log('Delete button clicked ' + $order_id);
                         swal({
                              title: "Are you sure?",
                              text: "Once deleted, you will not be able to recover this order!",
                              icon: "warning",
                              buttons: {
                                   cancel: {
                                        text: "Cancel",
                                        value: null,
                                        visible: true,
                                        className: "",
                                        closeModal: true,
                                   },
                                   confirm: {
                                        text: "Yes, delete it!",
                                        value: true,
                                        visible: true,
                                        className: "",
                                        closeModal: true
                                   }
                              },
                              dangerMode: true,
                         })
                              .then((willDelete) => {
                                   if (willDelete) {
                                        delete_order($order_id);
                                   }
                              });
                    });
               }
          })
          .catch(function (error) {
               console.log(error);
               return false;
          });
}

//Función que elimina un pedido con confirmación
function delete_order(order_id) {
     // console.log('Deleting order ' + order_id);
     let data = {
          "order_id": order_id,
          op: "delete_order"
     }
     ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
          .then(function (data) {
               if (data[0] === 'Order deleted successfully') {
                    console.log('Order deleted successfully');
                    $('#cart_view').empty();
                    location.reload();
               } else if (data[0] === 'Error deleting order') {
                    console.log('Error deleting order');
               }
          })
          .catch(function (error) {
               console.log(error);
          });
}

//Función que realiza la compra de un pedido introduciendo información de pago
function purchase($order_id, $total_price) {
     // console.log('Purchasing order ' + $order_id);
     // console.log('Total price ' + $total_price); 
     $('#cart_view').empty();
     window.scrollTo(0, 0);
     let paymentForm = `
          <div id="payment_form">
               <h2>Payment Details</h2>
               <p>Order ID: ${$order_id}</p>
               <p>Total Price: ${$total_price} €</p>
               <p></p>
               <form>
                    <label for="card_name">Card Holder's Name</label>
                    <input type="text" id="card_name" name="card_name" required>
                    <label for="card_number">Credit Card Number</label>
                    <input type="text" id="card_number" name="card_number" required>
                    <label for="exp_month">Expiry Month</label>
                    <input type="text" id="exp_month" name="exp_month" required>
                    <label for="exp_year">Expiry Year</label>
                    <input type="text" id="exp_year" name="exp_year" required>
                    <label for="cvv">CVV</label>
                    <input type="text" id="cvv" name="cvv" required>
                    <input type="submit" value="Submit Payment">
               </form>
          </div>
     `;

     // Add payment form to view
     $('#cart_view').append(paymentForm);

     // Add form validation
     $("form").on("submit", function (event) {
          event.preventDefault();
          // Add your form validation logic here
     });

     // let data = {
     //      "order_id": $order_id,
     //      "total_price": $total_price,
     //      op: "purchase"
     // }
     // ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
     //      .then(function (data) {
     //           if (data[0] === 'Order purchased successfully') {
     //                console.log('Order purchased successfully');
     //           } else if (data[0] === 'Error purchasing order') {
     //                console.log('Error purchasing order');
     //           }
     //      })
}


$(document).ready(function () {
     cart_controller();
});




