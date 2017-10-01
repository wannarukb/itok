$(function () {
    var pageLoad = function () {

        // Dropzone.options.myAwesomeDropzone = false;
        // $('#my-awesome-dropzone').dropzone();
        Dropzone.options.myAwesomeDropzone = {
            init: function () {
                var dropzone = this.options;

                var aj = function () {
                    $.ajax({
                        url: '/land/' + id + '/action',
                        success: function (data) {
                            dropzone.url = data;
                        }
                    });
                }
                aj();
                this.on("processing", function (file) {
                    aj();
                });
            }
        };
        // var getAction = function () {
        //     $.ajax({
        //         url: '/land/' + id + '/action',
        //         success: function (data) {
        //             // $('#my-awesome-dropzone').attr('action', data)
        //
        //
        //         }
        //     })
        // };
        // getAction();
        // setInterval(getAction, 5 * 60 * 1000)
    }
    pageLoad();
    SingApp.onPageLoad(pageLoad);
});
