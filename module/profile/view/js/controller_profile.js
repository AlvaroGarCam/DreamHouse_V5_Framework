//MENÚ DEL PROFILE
function charge_profile_menu() {
    let access_token = localStorage.getItem('access_token') || null;
    if (access_token != null) {
        let data = {
            access_token: access_token,
            op: 'account_details'
        };
        ajaxPromise('POST', 'JSON', friendlyURL("?module=profile"), data)
            .then(function (result) {
                // console.log(result[1][0]);
                if (result[0] == 'error_getting_account_details') {
                    swal({
                        title: "Error",
                        text: "An error has occurred. Please try again later.",
                        icon: "error",
                    }).then(() => {
                        setTimeout(function () {
                            logout();
                        }, 2000);
                    });
                } else if (result[0] == 'got_account_details_succesfully') {
                    let account = result[1][0];
                    $('#profile_menu').html(`
                        <div class="row">
                            <div class="col-xs-12">
                                <img class="img-responsive center-block" src="${account.avatar}" alt="Profile Image">
                                <h1 class="text-center" style="font-family: 'Nunito', sans-serif; color: white; margin-bottom: 20px;">${account.username.charAt(0).toUpperCase() + account.username.slice(1).toLowerCase()}</h1>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <ul class="list-unstyled">
                                </br>
                                    <li><a id="account_view">Account details</a></li>
                                    </br>
                                    <li><a id="purchases_view">Purchase details</a></li>
                                    </br>
                                    <li><a id="likes_view">Likes</a></li>
                                    </br>
                                    <li><a id="logout">Logout</a></li>
                                </ul>
                                </br></br></br></br></br></br></br></br></br></br></br></br></br></br></br></br>
                            </div>
                        </div>
                    `);
                    clicks_profile();
                    account_details();
                } else {
                    swal({
                        title: "Error",
                        text: "An error has occurred. Please try again later.",
                        icon: "error",
                    }).then(() => {
                        setTimeout(function () {
                            logout();
                        }, 2000);
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
    } else {
        swal({
            title: "Error",
            text: "You have to be signed in to access to your profile. You will be redirected to the login page.",
            icon: "error",
        }).then(() => {
            setTimeout(function () {
                window.location.href = friendlyURL("?module=login");
            }, 2000);
        });
    }
}

function clicks_profile() {
    $('#account_view').click(function () {
        $('#profile_content').empty();
        account_details();
    });

    $('#purchases_view').click(function () {
        $('#profile_content').empty();
        purchases_details();
    });

    $('#likes_view').click(function () {
        $('#profile_content').empty();
        likes_details();
    });
}

//SECCIÓN DEL PROFILE DEL USUARIO
function account_details() {
    let access_token = localStorage.getItem('access_token');
    let data = {
        access_token: access_token,
        op: 'account_details'
    };
    ajaxPromise('POST', 'JSON', friendlyURL("?module=profile"), data)
        .then(function (result) {
            // console.log(result[1][0]);
            if (result[0] == 'error_getting_account_details') {
                swal({
                    title: "Error",
                    text: "An error has occurred. Please try again later.",
                    icon: "error",
                }).then(() => {
                    setTimeout(function () {
                        logout();
                    }, 2000);
                });
            } else if (result[0] == 'got_account_details_succesfully') {
                let account = result[1][0];
                $('#profile_content').html(`
                    <form>
                        <legend>ACCOUNT DETAILS</legend>
                            <div class="form-group flex-container">
                                <label for="username">Username: </label>
                                <div class="centered-items">
                                    <input type="text" class="form-control" id="username" value="${account.username}" readonly>
                                    <img id="change_username" src="view/img/icon_edit.png" width="25" height="auto" title='Edit username'>
                                </div>
                            </div>
                            <div class="form-group flex-container">
                                <label for="email">Email: </label>
                                <div class="centered-items">
                                    <input type="email" class="form-control" id="email" value="${account.email}" readonly >
                                    <img id="change_email" src="view/img/icon_edit.png" width="25" height="auto" title='Edit email'>
                                </div>
                            </div>
                            <div class="form-group flex-container">
                                <label for="phone_number">Phone Number: </label>
                                <div class="centered-items">
                                    <input type="text" class="form-control" id="phone_number" value="${account.phone_number}" readonly>
                                    <img id="change_phone_number" src="view/img/icon_edit.png" width="25" height="auto" title='Edit phone number'>
                                </div>
                            </div>
                            <div class="form-group flex-container">
                                <label for="avatar">Avatar: </label>
                                <div class="centered-items">
                                    <img src="${account.avatar}" class="img-responsive center-block" alt="Avatar">
                                    <img id="change_avatar" src="view/img/icon_edit.png" width="25" height="auto" title='Edit avatar'>
                                </div>
                            </div>
                            </br>
                            <div class="form-group flex-container" style="display: flex; justify-content: center; align-items: center;">
                                <button id="change_password" class="btn btn-primary">Change Password</button>
                            </div>
                    </form>
                `);
                clicks_edit_profile();
            } else {
                swal({
                    title: "Error",
                    text: "An error has occurred. Please try again later.",
                    icon: "error",
                }).then(() => {
                    setTimeout(function () {
                        logout();
                    }, 2000);
                });
            }
        }).catch(function (error) {
            console.log(error);
        });
}

function clicks_edit_profile() {
    //Change username
    document.getElementById('change_username').addEventListener('click', function () {
        // console.log('Clicked edit username');
        $('#usernameModal').modal('show');
    });
    document.getElementById('change_username_modal').addEventListener('click', function () {
        change_username();
    });

    //Change email
    document.getElementById('change_email').addEventListener('click', function () {
        $('#emailModal').modal('show');
    });
    document.getElementById('change_email_modal').addEventListener('click', function () {
        change_email();
    });

    //Change phone number
    document.getElementById('change_phone_number').addEventListener('click', function () {
        $('#phoneModal').modal('show');
    });
    document.getElementById('change_phone_modal').addEventListener('click', function () {
        change_phone_number();
    });

    //Change avatar
    document.getElementById('change_avatar').addEventListener('click', function () {
        // console.log('Clicked edit avatar');
    });

    //Change password
    document.getElementById('change_password').addEventListener('click', function (event) {
        event.preventDefault();
        $('#passwordModal').modal('show');
    });
    document.getElementById('change_password_modal').addEventListener('click', function () {
        change_password();
    });
}

//EDIT USERNAME
function validate_change_username() {
    var newUsername = document.getElementById('new-username').value;
    var password = document.getElementById('password').value;

    $return = true;
    document.getElementById('error_message_modal').innerHTML = "";

    if (newUsername === '') {
        document.getElementById('username-error').innerHTML = "*You must enter a new username."
        $return = false;
    } else {
        document.getElementById('username-error').innerHTML = "";
    }

    if (password === '') {
        document.getElementById('password-error').innerHTML = "*You must enter your password."
        $return = false;
    } else {
        document.getElementById('password-error').innerHTML = "";
    }

    return $return;
}

function change_username() {
    if (validate_change_username()) {
        // console.log('Hola - Change_username');
        // return false;
        let access_token = localStorage.getItem('access_token') || null;
        let new_username = document.getElementById('new-username').value;
        let password = document.getElementById('password').value;
        if (access_token != null) {
            let data = {
                access_token: access_token,
                new_username: new_username,
                password: password,
                op: 'edit_username'
            };
            ajaxPromise('POST', 'JSON', friendlyURL("?module=profile"), data)
                .then(function (result) {
                    // console.log(result);
                    // return false;
                    switch (result[0]) {
                        case 'Username updated successfully':
                            swal({
                                title: "Success",
                                text: "Username updated successfully. Now you need to login again with your new credentials.",
                                icon: "success",
                            }).then(() => {
                                logout();
                            }
                            );
                            break;
                        case 'error_updating_username':
                            document.getElementById('error_message_modal').innerHTML = "*An error has occurred. Please try again later."
                            console.log(result[0] + ': ' + result[1]);
                            break;
                        case 'wrong_password':
                            document.getElementById('password-error').innerHTML = "*Wrong password."
                            break;
                        case 'username_already_exists':
                            document.getElementById('username-error').innerHTML = "*This username already exists."
                            break;
                        case 'error_getting_account_details':
                            document.getElementById('error_message_modal').innerHTML = "*An error has occurred. Please try again later."
                            break;
                        default:
                            document.getElementById('error_message_modal').innerHTML = "*An error has occurred. Please try again later."
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        } else {
            swal({
                title: "Error",
                text: "Sesion has expired. You will be redirected to the login page.",
                icon: "error",
            }).then(() => {
                setTimeout(function () {
                    window.location.href = friendlyURL("?module=login");
                }, 2000);
            });
        }
    }
}

//EDIT EMAIL
function validate_change_email() {
    var newEmail = document.getElementById('new-email').value;
    var password = document.getElementById('password-email').value;
    var mail_exp = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;

    $return = true;
    document.getElementById('error_message_modal_email').innerHTML = "";

    if (newEmail === '') {
        document.getElementById('email-error').innerHTML = "*You must enter a new email."
        $return = false;
    } else {
        if (!mail_exp.test(newEmail)) {
            document.getElementById('email-error').innerHTML = "You must enter a valid new email.";
            $return = false;
        } else {
            document.getElementById('email-error').innerHTML = "";
        }
    }

    if (password === '') {
        document.getElementById('password-error-email').innerHTML = "*You must enter your password."
        $return = false;
    } else {
        document.getElementById('password-error-email').innerHTML = "";
    }

    return $return;
}

function change_email() {
    if (validate_change_email()) {
        // console.log('Clicked edit email');
        // return false;
        let access_token = localStorage.getItem('access_token') || null;
        let new_email = document.getElementById('new-email').value;
        let password = document.getElementById('password-email').value;
        data = {
            access_token: access_token,
            new_email: new_email,
            password: password,
            op: 'edit_email'
        };
        // console.log(data);
        // return false;
        ajaxPromise('POST', 'JSON', friendlyURL("?module=profile"), data)
            .then(function (result) {
                switch (result[0]) {
                    case 'Email updated successfully':
                        $('#emailModal').modal('hide');
                        swal({
                            title: "Success",
                            text: "Email updated successfully.",
                            icon: "success",
                        }).then(() => {
                            location.reload();
                        }
                        );
                        break;
                    case 'error_updating_email':
                        document.getElementById('error_message_modal_email').innerHTML = "*An error has occurred. Please try again later."
                        console.error('Error updating email: ' + result[1]);
                        break;
                    case 'wrong_password':
                        document.getElementById('password-error-email').innerHTML = "*Wrong password."
                        break;
                    case 'email_already_exists':
                        document.getElementById('email-error').innerHTML = "*This email already exists."
                        break;
                    case 'error_getting_account_details':
                        document.getElementById('error_message_modal').innerHTML = "*An error has occurred. Please try again later."
                        break;
                    default:
                        document.getElementById('error_message_modal').innerHTML = "*An error has occurred. Please try again later."
                }
            }).catch(function (error) {
                console.log(error);
            });
    }
}

//EDIT PHONE NUMBER
function validate_change_phone_number() {
    var newPhoneNumber = document.getElementById('new-phone').value;
    var password = document.getElementById('password-phone').value;
    var phone_exp = /^[0-9]{9}$/;

    $return = true;
    document.getElementById('error_message_modal_phone').innerHTML = "";

    if (newPhoneNumber === '') {
        document.getElementById('phone-error').innerHTML = "*You must enter a new phone number."
        $return = false;
    } else {
        if (!phone_exp.test(newPhoneNumber)) {
            document.getElementById('phone-error').innerHTML = "You must enter a valid new phone number.";
            $return = false;
        } else {
            document.getElementById('phone-error').innerHTML = "";
        }
    }

    if (password === '') {
        document.getElementById('password-error-phone').innerHTML = "*You must enter your password."
        $return = false;
    } else {
        document.getElementById('password-error-phone').innerHTML = "";
    }

    return $return;
}

function change_phone_number() {
    if (validate_change_phone_number()) {
        let access_token = localStorage.getItem('access_token') || null;
        let new_phone_number = document.getElementById('new-phone').value;
        let password = document.getElementById('password-phone').value;
        data = {
            access_token: access_token,
            new_phone_number: new_phone_number,
            password: password,
            op: 'edit_phone_number'
        };
        // console.log(data);
        // return false;
        ajaxPromise('POST', 'JSON', friendlyURL("?module=profile"), data)
            .then(function (result) {
                if (result[0] === 'wrong_password') {
                    document.getElementById('password-error-phone').innerHTML = "*Wrong password."
                } else if (result[0] === 'error_getting_account_details') {
                    document.getElementById('error_message_modal_phone').innerHTML = "*An error has occurred. Please try again later."
                } else if (result[0] === 'error_updating_phone_number') {
                    document.getElementById('error_message_modal_phone').innerHTML = "*An error has occurred. Please try again later."
                    console.error('Error al actualizar el número de teléfono: ' + result[1]);
                } else if (result[0] === 'Phone number updated successfully') {
                    $('#phoneModal').modal('hide');
                    swal({
                        title: "Success",
                        text: "Phone number updated successfully.",
                        icon: "success",
                    }).then(() => {
                        location.reload();
                    }
                    );
                }
            }).catch(function (error) {
                console.log(error);
            });
    }
}

//EDIT PASSWORD
function validate_change_password() {
    var newPassword = document.getElementById('new-password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    var password = document.getElementById('current-password').value;
    var password_exp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    $return = true;
    document.getElementById('error_message_modal_password').innerHTML = "";

    if (newPassword === '') {
        document.getElementById('new-password-error').innerHTML = "*You must enter a new password."
        $return = false;
    } else {
        if (!password_exp.test(newPassword)) {
            document.getElementById('new-password-error').innerHTML = "Password must contain at least one number, one uppercase and lowercase letter, and between 6 and 20 characters.";
            $return = false;
        } else {
            if (newPassword === password) {
                document.getElementById('new-password-error').innerHTML = "New password must be different from the current password.";
                $return = false;
            } else {
                document.getElementById('new-password-error').innerHTML = "";
            }
        }
    }

    if (confirmPassword === '') {
        document.getElementById('confirm-password-error').innerHTML = "*You must confirm your new password."
        $return = false;
    } else {
        if (newPassword !== confirmPassword) {
            document.getElementById('confirm-password-error').innerHTML = "Passwords do not match.";
            $return = false;
        } else {
            document.getElementById('confirm-password-error').innerHTML = "";
        }
    }

    if (password === '') {
        document.getElementById('current-password-error').innerHTML = "*You must enter your current password."
        $return = false;
    } else {
        document.getElementById('current-password-error').innerHTML = "";
    }

    return $return;
}

function change_password() {
    if (validate_change_password()) {
        let access_token = localStorage.getItem('access_token') || null;
        let new_password = document.getElementById('new-password').value;
        let current_password = document.getElementById('current-password').value;
        data = {
            access_token: access_token,
            new_password: new_password,
            current_password: current_password,
            op: 'edit_password'
        };
        // console.log(data);
        // return false;
        ajaxPromise('POST', 'JSON', friendlyURL("?module=profile"), data)
            .then(function (result) {
                // console.log(result);
                // return false;
                if (result[0] === 'wrong_password') {
                    document.getElementById('current-password-error').innerHTML = "*Wrong password."
                } else if (result[0] === 'error_getting_account_details') {
                    document.getElementById('error_message_modal_password').innerHTML = "*An error has occurred. Please try again later."
                } else if (result[0] === 'error_updating_password') {
                    document.getElementById('error_message_modal_password').innerHTML = "*An error has occurred. Please try again later."
                    console.error('Error updating password: ' + result[1]);
                } else if (result[0] === 'Password updated successfully') {
                    $('#passwordModal').modal('hide');
                    swal({
                        title: "Success",
                        text: "Password updated successfully. Now you need to login again with your new credentials.",
                        icon: "success",
                    }).then(() => {
                        logout();
                    }
                    );
                }
            }).catch(function (error) {
                console.log(error);
            });
    }
}

//SECCIÓN PURCHASES DEL PROFILE
function purchases_details() {
    let access_token = localStorage.getItem('access_token') || null;
    if (access_token != null) {
        let data = {
            access_token: access_token,
            op: 'purchases_details'
        };
        ajaxPromise('POST', 'JSON', friendlyURL("?module=profile"), data)
            .then(function (result) {
                console.log(result);
                if (result[0] == 'no_purchases_found') {
                    $('#profile_content').html(`
                        <div class="row">
                            <div class="col-xs-12">
                                <h1 class="text-center" style="font-family: 'Nunito', sans-serif; color: white;">You haven't made any purchases yet.</h1>
                            </div>
                        </div>
                    `);
                } else if (result[0] == 'got_purchases_details_succesfully') {
                    let purchases = result[1];
                    // console.log(purchases);
                    // return false;
                    $('#profile_content').html(`
                        <table class="table table-hover custom-table">
                            <thead>
                                <tr>
                                    <th scope="col">Purchase ID</th>
                                    <th scope="col">Order ID</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody id="table_body">
                            </tbody>
                        </table>
                    `);
                    purchases.forEach(purchase => {
                        $('#table_body').append(`
                        <tr>
                            <td>${purchase.purchase_id}</td>
                            <td>${purchase.order_id}</td>
                            <td>${purchase.total_price.toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €</td>
                            <td>${purchase.date}</td>
                            <td><a id="${purchase.purchase_id}" class="check_purchase"><img src="view/img/lupa_profile.jpg" width="20" title='Check Invoice'></a></td>
                        </tr>
                    `);
                    });
                    check_purchase_details()
                } else {
                    swal({
                        title: "Error",
                        text: "An error has occurred. Please try again later.",
                        icon: "error",
                    }).then(() => {
                        setTimeout(function () {
                            logout();
                        }, 2000);
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
    } else {
        swal({
            title: "Error",
            text: "Sesion has expired. You will be redirected to the login page.",
            icon: "error",
        }).then(() => {
            setTimeout(function () {
                window.location.href = friendlyURL("?module=login");
            }, 2000);
        });
    }
}

function check_purchase_details() {
    $('body').on('click', '.check_purchase', function () {
        let purchaseId = this.id;
        // Aquí va tu código para manejar el clic
        // Aquí irá lo del PDF y el QR
        console.log('Clicked on purchase ID: ' + purchaseId);
    });
}

//SECCIÓN LIKES DEL PROFILE
function likes_details() {
    let access_token = localStorage.getItem('access_token') || null;
    if (access_token != null) {
        let data = {
            access_token: access_token,
            op: 'likes_details'
        };
        ajaxPromise('POST', 'JSON', friendlyURL("?module=profile"), data)
            .then(function (result) {
                // console.log(result);
                // return false;
                if (result[0] == 'no_likes_found') {
                    $('#profile_content').html(`
                        <div class="row">
                            <div class="col-xs-12">
                                <h1 class="text-center" style="font-family: 'Nunito', sans-serif; color: white;">You haven't liked any product yet.</h1>
                            </div>
                        </div>
                    `);
                } else if (result[0] == 'got_likes_details_succesfully') {
                    let likes = result[1];
                    // console.log(likes);
                    // return false;    
                    $('#profile_content').html(`
                        <table class="table table-hover custom-table centered-table">  
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">View</th>
                                </tr>
                            </thead>
                            <tbody id="table_body">
                            </tbody>
                        </table>
                    `);
                    likes.forEach(like => {
                        $('#table_body').append(`
                        <tr>
                            <td><img src="${like.image}" width="200"/></td>
                            <td>${like.description}</td>
                            <td>${like.price.toString().replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".")} €</td>
                            <td><a id="${like.house_id}" class="check_like"><img src="view/img/lupa_profile.jpg" width="30" title='Check Product'></a></td>
                        </tr>
                    `);
                    });
                    check_like_details();
                } else if (result[0] == 'no_houses_found') {
                    swal({
                        title: "Error",
                        text: "An error has occurred. Please try again later.",
                        icon: "error",
                    }).then(() => {
                        setTimeout(function () {
                            location.reload();
                        }, 2000);
                    });
                } else {
                    swal({
                        title: "Error",
                        text: "An error has occurred. Please try again later.",
                        icon: "error",
                    }).then(() => {
                        setTimeout(function () {
                            logout();
                        }, 2000);
                    });
                }
            }).catch(function (error) {
                console.log(error);
            });
    } else {
        swal({
            title: "Error",
            text: "Sesion has expired. You will be redirected to the login page.",
            icon: "error",
        }).then(() => {
            setTimeout(function () {
                window.location.href = friendlyURL("?module=login");
            }, 2000);
        });
    }
}

function check_like_details() {
    $('body').on('click', '.check_like', function () {
        let house_id = this.id;
        console.log('Clicked on house ID: ' + house_id);
        localStorage.removeItem('redirect_profile_likes');
        localStorage.setItem('redirect_profile_likes', house_id);
        swal({
            title: "Redirecting",
            text: "You will be redirected to the house details page.",
            icon: "success",
        });
        setTimeout(function () {
            window.location.href = friendlyURL("?module=shop");
        }, 2000);
    }
    );
}


$(document).ready(function () {
    charge_profile_menu();
});