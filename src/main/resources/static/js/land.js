$(function () {
    var pageLoad = function () {

        Dropzone.options.myAwesomeDropzone = false;
        $('#my-awesome-dropzone').dropzone();
        var getAction = function () {
            $.ajax({
                url: '/land/' + id + '/action',
                success: function (data) {
                    $('#my-awesome-dropzone').attr('action', data)
                }
            })
        };
        getAction();
        setInterval(getAction, 5 * 60 * 1000)
    }
    pageLoad();
    SingApp.onPageLoad(pageLoad);
});
