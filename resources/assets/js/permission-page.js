/**
 * App user list (jquery)
 */

'use strict';

$(function () {
    var dataTable = $('.datatables-permissions'),
    dt_permission,
    dataList = baseUrl + 'permissions';

    // Datatable
    if (dataTable.length) {
        dt_permission = dataTable.DataTable({
            ajax: {
                url: baseUrl + 'permissions'
            },
            columns: [
                { data: '' },
                { data: 'id' },
                { data: 'name' },
                { data: 'guard_name' },
                { data: 'updated_at' },
                { data: '' },
            ],
            columnDefs: [],
        });
    }
});
