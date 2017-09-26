$(function(){
    function pageLoad(){

        var table = $('table#sample').DataTable({
            'ajax': '/data/members',
            'serverSide': true,
            columns: [{
                data: 'id'
            }, {
                data: 'firstName'
            }, {
                data: 'lastName'
            }, {
                data: 'mobile'
            }, {
                data: 'email'
            }, {
                data: 'id',
                render: function (data, type, row) {
                    return "<a href='/member/" + data + "' class='btn btn-sm btn-primary' >แก้ไข</a>"
                }
            }]
        });
    }
    pageLoad();
    SingApp.onPageLoad(pageLoad);
});
