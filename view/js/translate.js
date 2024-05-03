function changeLang(lang) {
    lang = lang || localStorage.getItem('app-lang') || 'eng';
    localStorage.setItem('app-lang', lang);
    var elmnts = document.querySelectorAll('[data-tr]');

    $.ajax({
        url: 'http://localhost/Ejercicios/Framework_PHP_OO_MVC/view/lang/' + lang + '.json',
            type: 'GET',  /// GET
            dataType: 'JSON',
            success: function (data) {
                for (var i = 0; i < elmnts.length; i++) {
                    elmnts[i].innerHTML = data.hasOwnProperty(lang) ? data[lang][elmnts[i].dataset.tr] : elmnts[i].dataset.tr;
                }
            }
    })
}

$(document).ready(function() {

    changeLang();
    $("#btn-eng").on("click", function() {
        changeLang('eng')
        });
    $("#btn-esp").on("click", function() {
        changeLang('esp')
        });
    $("#btn-val").on("click", function() {
        changeLang('val')
    });
});
