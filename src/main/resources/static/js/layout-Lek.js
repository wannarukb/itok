$(function () {
    function pageLoad() {

        $('.stop-propagate').click(function (e) {
            e.stopPropagation();
        });

        $('#pagination-demo').twbsPagination({
            totalPages: pages,
            startPage: currentPage,
            visiblePages: 7,
            href: true,
            pageVariable: 'page'
        });
    }

    pageLoad();
    SingApp.onPageLoad(pageLoad);
});
