var myApp = {
    $button: null,
    init: function () {
        this.$button = jQuery('#btn');
        this.addEventListeners();
    },
    addEventListeners: function () {
        this.$button.on('click', function () {
            var data = "";
            var url = "aboutUsers";
            jQuery.get(url, data, function (result) {
                console.log(result);
                if (!result) {
                    jQuery('#users').text("За вашим критерієм нічого не знайдено!");
                } else {
                    jQuery('#users').text(result[0].surname + ' ' + result[0].name + ' ' + result[0].patronymic);
                }
            });
        });
    }
};

jQuery(document).ready(function () {
    myApp.init();
});