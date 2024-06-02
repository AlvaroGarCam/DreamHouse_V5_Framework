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
                    } else {
                         // console.log('No house_id in local storage');
                         // document.getElementById('cart_view').innerHTML = '<p class="message-text">You don´t have any order active at the moment, please go to Shop.</p><button class="shop-button"><a href="' + friendlyURL('?module=shop') + '"><h4>SHOP</h4></a></button>';
                         swal({
                              title: "Notification!",
                              text: "You don´t have any order active at the moment, redirecting to Shop.",
                              icon: "info",
                              buttons: false,
                              timer: 3000
                         });
                         $('#cart_view').empty();
                         setTimeout(function () {
                              window.location.href = friendlyURL('?module=shop');
                         }, 3000);
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
                    localStorage.removeItem('cart_house_id');
                    // charge_cart(access_token);
                    location.reload();
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
                    table += '<trid="' + house.house_id + '"><td><img src="' + house.image + '" width="200px"></td><td>' + house.description + '</td><td><input type="text" value="1" readonly></td><td>' + house.price.toString().replace(".", "'").replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' €</td></trid=>';
                    table += '<tr id="' + product1.product_id + '"><td><img src="' + product1.image + '" width="200px"></td><td>' + product1.description + '</td><td><button class="minus-button" data-product="product1" data-product-id="' + product1.product_id + '">-</button><input type="text" value="' + quantities.product1 + '" readonly data-product="product1"><button class="plus-button" data-product="product1" data-product-id="' + product1.product_id + '">+</button></td><td>' + product1.price.toString().replace(".", "'").replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' €</td></tr>';
                    table += '<tr id="' + product2.product_id + '"><td><img src="' + product2.image + '" width="200px"></td><td>' + product2.description + '</td><td><button class="minus-button" data-product="product2" data-product-id="' + product2.product_id + '">-</button><input type="text" value="' + quantities.product2 + '" readonly data-product="product2"><button class="plus-button" data-product="product2" data-product-id="' + product2.product_id + '">+</button></td><td>' + product2.price.toString().replace(".", "'").replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' €</td></tr>';
                    table += '<tr id="' + product3.product_id + '"><td><img src="' + product3.image + '" width="200px"></td><td>' + product3.description + '</td><td><button class="minus-button" data-product="product3" data-product-id="' + product3.product_id + '">-</button><input type="text" value="' + quantities.product3 + '" readonly data-product="product3"><button class="plus-button" data-product="product3" data-product-id="' + product3.product_id + '">+</button></td><td>' + product3.price.toString().replace(".", "'").replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' €</td></tr>';
                    table += '<tr><td></td><td></td><td>TOTAL</td><td id="total">' + calculateTotal().toString().replace(".", "'").replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' €</td></tr>'
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

                    // check_house_in_other_order($order_id);

                    // //Función que comprueba si la misma casa se encuentra en otro pedido 
                    // //pendiente que no sea el nuestro para avisarnos de que hay alguien 
                    // //más interesado en la casa
                    // function check_house_in_other_order(order_id) {
                    //      let data = {
                    //           "order_id": order_id,
                    //           op: "check_house_in_other_order"
                    //      }
                    //      ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
                    //           .then(function (orders) {
                    //                let otherOrders = orders.filter(order => order.order_id !== my_order_id);
                    //                if (otherOrders.length > 0) {
                    //                     swal("Attention!", "This house is in another order. Hurry up!", "warning");
                    //                }
                    //           })
                    //           .catch(function (error) {
                    //                console.log(error);
                    //           });
                    // }

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
                         let total = (Number(house.price) + Number(product1.price) * quantities.product1 + Number(product2.price) * quantities.product2 + Number(product3.price) * quantities.product3).toFixed(2);
                         return total;
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
                         $('#total').text(calculateTotal().toString().replace(".", "'").replace(/\B(?=(\d{3})+(?!\d))/g, ".") + ' €');
                    }

                    //evento click del botón de compra
                    document.getElementById('purchase-button').addEventListener('click', function (event) {
                         event.preventDefault();
                         console.log('Purchase button clicked ' + $order_id);
                         $total_price = calculateTotal();
                         $house_id = house.house_id;
                         purchase($order_id, $total_price, $house_id);
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
function purchase($order_id, $total_price, $house_id) {
     // console.log('Purchasing order ' + $order_id);
     // console.log('Total price ' + $total_price); 
     data = {
          "order_id": $order_id,
          "house_id": $house_id,
          op: "details_order"
     }
     ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
          .then(function (data) {
               // console.log(data);
               if (data[0] === 'Order details loaded successfully') {
                    console.log('Order details loaded successfully');
                    window.scrollTo(0, 0);
                    let orderDetails = data[1];
                    let totalPrice = $total_price;
                    let orderId = $order_id;
                    generate_payment_form(orderDetails, totalPrice, orderId);
               } else if (data[0] === 'Error loading order details') {
                    console.log('Error loading order details');
               }
          })
          .catch(function (error) {
               console.log(error);
          });

     $("form").on("submit", function (event) {
          event.preventDefault();
          console.log('Payment form submitted');
          if (validate_payment_form()) {
               data = {
                    "access_token": localStorage.getItem('access_token'),
                    "order_id": $order_id,
                    "house_id": $house_id,
                    "total_price": $total_price,
                    op: "purchase"
               }
               ajaxPromise('POST', 'JSON', friendlyURL("?module=cart"), data)
                    .then(function (data) {
                         if (data[0] === 'Purchase completed successfully') {
                              console.log('Order purchased successfully');
                              swal({
                                   title: "Congratulations!",
                                   text: "Your order has been successfully processed",
                                   icon: "success",
                                   buttons: false
                              });
                              $('#cart_view').empty();
                              setTimeout(function () {
                                   location.reload();
                              }, 5000);
                         } else if (data[0] === 'Error completing purchase') {
                              console.log('Error completing purchase');
                         }
                    })
                    .catch(function (error) {
                         console.log(error);
                    });
          }
     });
}

function validate_payment_form() {
     let valid = true;

     // Validate card name
     let cardName = document.getElementById('card_name').value;
     if (cardName === '') {
          document.getElementById('error_card_name').style.display = 'block';
          valid = false;
     } else {
          document.getElementById('error_card_name').style.display = 'none';
     }

     // Validate card number
     let cardNumber = document.getElementById('card_number').value;
     if (!/^\d{16}$/.test(cardNumber)) {
          document.getElementById('error_card_number').style.display = 'block';
          valid = false;
     } else {
          document.getElementById('error_card_number').style.display = 'none';
     }

     // Validate expiry month
     let expMonth = document.getElementById('exp_month').value;
     if (!/^(0?[1-9]|1[0-2])$/.test(expMonth)) {
          document.getElementById('error_exp_month').style.display = 'block';
          valid = false;
     } else {
          document.getElementById('error_exp_month').style.display = 'none';
     }

     // Validate expiry year
     let expYear = document.getElementById('exp_year').value;
     if (!/^\d{4}$/.test(expYear)) {
          document.getElementById('error_exp_year').style.display = 'block';
          valid = false;
     } else {
          document.getElementById('error_exp_year').style.display = 'none';
     }

     // Validate CVV
     let cvv = document.getElementById('cvv').value;
     if (!/^\d{3}$/.test(cvv)) {
          document.getElementById('error_cvv').style.display = 'block';
          valid = false;
     } else {
          document.getElementById('error_cvv').style.display = 'none';
     }

     return valid;
}

function generate_payment_form(orderDetails, totalPrice, orderId) {
     let total_price = totalPrice.toString().replace(".", "'").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
     let invoiceAndPaymentForm = `
          <div id="payment_form">
               <h2>ORDER DETAILS</h2>
               <table>
                    <tr>
                         <th colspan="4">Order Details</th>
                    </tr>
                    <tr>
                         <th>Description</th>
                         <th>Unit Price</th>
                         <th>Quantity</th>
                         <th>Subtotal</th>
                    </tr>`;

     orderDetails.forEach(item => {
          let subtotal = (parseFloat(item.price) * parseInt(item.quantity)).toFixed(2);
          invoiceAndPaymentForm += `
                    <tr>
                         <td>${item.description}</td>
                         <td>${item.price.toString().replace(".", "'").replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €</td>
                         <td>${item.quantity}</td>
                         <td>${subtotal.toString().replace(".", "'").replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €</td>
                    </tr>`;
     });

     invoiceAndPaymentForm += `
                    <tr>
                         <td colspan="3">Total Price</td>
                         <td>${total_price} €</td>
                    </tr>
               </table>
               <h2>PAYMENT DETAILS</h2>
               <table>
                    <tr>
                         <td colspan="2"><strong>Order ID</strong></td>
                         <td colspan="2"><strong>${orderId}</strong></td>
                    </tr>
                    <tr>
                         <td colspan="2"><strong>Total Price</strong></td>
                         <td colspan="2"><strong>${total_price} €</strong></td>
                    </tr>
                    <tr>
                         <td colspan="2"><label for="card_name">Card Holder's Name</label></td>
                         <td colspan="2">
                              <input type="text" id="card_name" name="card_name">
                              <div id="error_card_name" style="color: red; display: none;">*Invalid name</div>
                         </td>
                    </tr>
                    <tr>
                         <td colspan="2"><label for="card_number">Credit Card Number</label></td>
                         <td colspan="2">
                              <input type="text" id="card_number" name="card_number">
                              <div id="error_card_number" style="color: red; display: none;">*Invalid card number</div>
                         </td>
                    </tr>
                    <tr>
                         <td colspan="2"><label for="exp_month">Expiry Month</label></td>
                         <td colspan="2">
                              <input type="text" id="exp_month" name="exp_month">
                              <div id="error_exp_month" style="color: red; display: none;">*Invalid month</div>
                         </td>
                    </tr>
                    <tr>
                         <td colspan="2"><label for="exp_year">Expiry Year</label></td>
                         <td colspan="2">
                              <input type="text" id="exp_year" name="exp_year">
                              <div id="error_exp_year" style="color: red; display: none;">*Invalid year</div>
                         </td>
                    </tr>
                    <tr>
                         <td colspan="2"><label for="cvv">CVV</label></td>
                         <td colspan="2">
                              <input type="text" id="cvv" name="cvv">
                              <div id="error_cvv" style="color: red; display: none;">*Invalid CVV</div>
                         </td>
                    </tr>
                    <tr>
                         <td colspan="4"><input type="submit" value="Submit Payment"></td>
                    </tr>
</table>
</div>`;

     $('#cart_view').empty();
     $('#cart_view').append(invoiceAndPaymentForm);
}


$(document).ready(function () {
     cart_controller();
});




