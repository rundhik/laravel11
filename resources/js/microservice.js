/**
 * Halaman Services
 */

"use strict";

$(function () {
    // ajax setup
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    // Select2
    var select2 = $('.select2');
    if (select2.length) {
        select2.each(function () {
            var $this = $(this);
            select2Focus($this);
            $this.wrap('<div class="position-relative"></div>').select2({
                placeholder: "Pilih",
                dropdownParent: $this.parent(),
            });
        });
    }

    // -- Datatable --
    // Mendefinisikan variabel untuk datatable
    var dt_data = $(".datatables-data"),
        dataName = "Microservice";

    // Datatable
    if (dt_data.length) {
        var dt_source = dt_data.DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url: baseUrl + "microservices",
            },
            columns: [
                // jumlah kolom berdasarkan JSON
                { data: "" },
                { data: "id" },
                { data: "name" },
                { data: "slug" },
                { data: "url" },
                { data: "token" },
                { data: "methods" },
                { data: "action" },
            ],
            columnDefs: [
                {
                    // For Responsive
                    className: "control",
                    searchable: false,
                    orderable: false,
                    responsivePriority: 2,
                    targets: 0,
                    render: function (data, type, full, meta) {
                        return "";
                    },
                },
                {
                    searchable: false,
                    orderable: false,
                    targets: 1,
                    render: function (data, type, full, meta) {
                        return `<span>${full.fake_id}</span>`;
                    },
                },
                {
                    // Column name
                    targets: 2,
                    responsivePriority: 4,
                    render: function (data, type, full, meta) {
                        var $name = full["name"];

                        // For Avatar badge
                        var stateNum = Math.floor(Math.random() * 6);
                        var states = [
                            "success",
                            "danger",
                            "warning",
                            "info",
                            "dark",
                            "primary",
                            "secondary",
                        ];
                        var $state = states[stateNum],
                            $name = full["name"],
                            $initials = $name.match(/\b\w/g) || [],
                            $output;
                        $initials = (
                            ($initials.shift() || "") + ($initials.pop() || "")
                        ).toUpperCase();
                        $output =
                            '<span class="avatar-initial rounded-circle bg-label-' +
                            $state +
                            '">' +
                            $initials +
                            "</span>";

                        // Creates full output for row
                        var $row_output =
                            '<div class="d-flex justify-content-start align-items-center name">' +
                            '<div class="avatar-wrapper">' +
                            '<div class="avatar avatar-sm me-3">' +
                            $output +
                            "</div>" +
                            "</div>" +
                            '<div class="d-flex flex-column">' +
                            '<span class="fw-medium">' +
                            $name +
                            "</span>" +
                            "</div>" +
                            "</div>";
                        return $row_output;
                    },
                },
                {
                    //Column slug
                    targets: 3,
                    render: function (data, type, full, meta) {
                        var $slug = full["slug"];
                        return "<span >" + $slug + "</span>";
                    },
                },
                {
                    //Column url
                    targets: 4,
                    render: function (data, type, full, meta) {
                        var $url = full["url"];
                        return "<span >" + $url + "</span>";
                    },
                },
                {
                    //Column url
                    targets: 5,
                    render: function (data, type, full, meta) {
                        var $token = full["token"];
                        return `<span class="small">` + $token + `</span>`;
                    },
                },
                {
                    // Column methods
                    targets: 6,
                    render: function (data, type, full, meta) {
                        var methods = full["methods"]; // Methods is an array
                        var methodBadgeObj = {
                            GET: { title: "GET", class: "bg-label-primary" },
                            POST: { title: "POST", class: "bg-label-success" },
                            PUT: { title: "PUT", class: "bg-label-warning" },
                            DELETE: { title: "DELETE", class: "bg-label-danger" },
                        };

                        // Check if methods is an array and create badges
                        if (Array.isArray(methods)) {
                            return methods.map(function(method) {
                                if (methodBadgeObj[method]) {
                                    return '<span class="badge rounded-pill ' +
                                    methodBadgeObj[method].class +
                                    '" text-capitalized>' + methodBadgeObj[method].title +
                                    '</span>';
                                } else {
                                    return ''; // Return empty if no match
                                }
                            }).join(' '); // Join badges with space
                        }

                        return ''; // If methods is not an array, return empty
                    },
                },
                {
                    // Column actions
                    targets: -1,
                    title: "Actions",
                    searchable: false,
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return (
                            '<div class="d-flex align-items-center gap-50">' +
                            `<button class="btn btn-sm btn-icon edit-record btn-text-secondary rounded-pill waves-effect" data-id="${full["id"]}" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddData"><i class="ri-edit-box-line ri-20px"></i></button>` +
                            `<button class="btn btn-sm btn-icon delete-record btn-text-secondary rounded-pill waves-effect" data-id="${full["id"]}"><i class="ri-delete-bin-7-line ri-20px"></i></button>` +
                            "</div>"
                        );
                    },
                },
            ],
            order: [[2, "desc"]],
            dom:
                '<"card-header d-flex rounded-0 flex-wrap pb-md-0 pt-0"' +
                '<"me-5 ms-n2"f>' +
                '<"d-flex justify-content-start justify-content-md-end align-items-baseline"<"dt-action-buttons d-flex align-items-start align-items-md-center justify-content-sm-center gap-4"lB>>' +
                ">t" +
                '<"row mx-1"' +
                '<"col-sm-12 col-md-6"i>' +
                '<"col-sm-12 col-md-6"p>' +
                ">",
            lengthMenu: [10, 20, 50, 70, 100], //for length of menu
            language: {
                sLengthMenu: "_MENU_",
                search: "",
                searchPlaceholder: "Cari",
                info: "Displaying _START_ to _END_ of _TOTAL_ entries",
                paginate: {
                    next: '<i class="ri-arrow-right-s-line"></i>',
                    previous: '<i class="ri-arrow-left-s-line"></i>',
                },
            },
            // Buttons with Dropdown
            buttons: [
                {
                    extend: "collection",
                    className:
                        "btn btn-outline-secondary dropdown-toggle me-4 waves-effect waves-light",
                    text: '<i class="ri-upload-2-line ri-16px me-2"></i><span class="d-none d-sm-inline-block">Ekspor </span>',
                    buttons: [
                        {
                            extend: "print",
                            title: dataName,
                            text: '<i class="ri-printer-line me-1" ></i>Print',
                            className: "dropdown-item",
                            exportOptions: {
                                // jumlah kolom yang diekspor
                                columns: [1, 2],
                                // prevent avatar to be print
                                format: {
                                    body: function (inner, coldex, rowdex) {
                                        if (inner.length <= 0) return inner;
                                        var el = $.parseHTML(inner);
                                        var result = "";
                                        $.each(el, function (index, item) {
                                            if (
                                                item.classList !== undefined &&
                                                item.classList.contains("name")
                                            ) {
                                                result =
                                                    result +
                                                    item.lastChild.firstChild
                                                        .textContent;
                                            } else if (
                                                item.innerText === undefined
                                            ) {
                                                result =
                                                    result + item.textContent;
                                            } else
                                                result =
                                                    result + item.innerText;
                                        });
                                        return result;
                                    },
                                },
                            },
                            customize: function (win) {
                                //customize print view for dark
                                $(win.document.body)
                                    .css("color", config.colors.headingColor)
                                    .css(
                                        "border-color",
                                        config.colors.borderColor,
                                    )
                                    .css(
                                        "background-color",
                                        config.colors.body,
                                    );
                                $(win.document.body)
                                    .find("table")
                                    .addClass("compact")
                                    .css("color", "inherit")
                                    .css("border-color", "inherit")
                                    .css("background-color", "inherit");
                            },
                        },
                        {
                            extend: "csv",
                            title: dataName,
                            text: '<i class="ri-file-text-line me-1" ></i>Csv',
                            className: "dropdown-item",
                            exportOptions: {
                                // jumlah kolom yang diekspor
                                columns: [1, 2],
                                // prevent avatar to be print
                                format: {
                                    body: function (inner, coldex, rowdex) {
                                        if (inner.length <= 0) return inner;
                                        var el = $.parseHTML(inner);
                                        var result = "";
                                        $.each(el, function (index, item) {
                                            if (
                                                item.classList !== undefined &&
                                                item.classList.contains("name")
                                            ) {
                                                result =
                                                    result +
                                                    item.lastChild.firstChild
                                                        .textContent;
                                            } else if (
                                                item.innerText === undefined
                                            ) {
                                                result =
                                                    result + item.textContent;
                                            } else
                                                result =
                                                    result + item.innerText;
                                        });
                                        return result;
                                    },
                                },
                            },
                        },
                        {
                            extend: "excel",
                            title: dataName,
                            text: '<i class="ri-file-excel-line me-1"></i>Excel',
                            className: "dropdown-item",
                            exportOptions: {
                                // jumlah kolom yang diekspor
                                columns: [1, 2],
                                // prevent avatar to be display
                                format: {
                                    body: function (inner, coldex, rowdex) {
                                        if (inner.length <= 0) return inner;
                                        var el = $.parseHTML(inner);
                                        var result = "";
                                        $.each(el, function (index, item) {
                                            if (
                                                item.classList !== undefined &&
                                                item.classList.contains("name")
                                            ) {
                                                result =
                                                    result +
                                                    item.lastChild.firstChild
                                                        .textContent;
                                            } else if (
                                                item.innerText === undefined
                                            ) {
                                                result =
                                                    result + item.textContent;
                                            } else
                                                result =
                                                    result + item.innerText;
                                        });
                                        return result;
                                    },
                                },
                            },
                        },
                        {
                            extend: "pdf",
                            title: dataName,
                            text: '<i class="ri-file-pdf-line me-1"></i>Pdf',
                            className: "dropdown-item",
                            exportOptions: {
                                // jumlah kolom yang diekspor
                                columns: [1, 2],
                                // prevent avatar to be display
                                format: {
                                    body: function (inner, coldex, rowdex) {
                                        if (inner.length <= 0) return inner;
                                        var el = $.parseHTML(inner);
                                        var result = "";
                                        $.each(el, function (index, item) {
                                            if (
                                                item.classList !== undefined &&
                                                item.classList.contains("name")
                                            ) {
                                                result =
                                                    result +
                                                    item.lastChild.firstChild
                                                        .textContent;
                                            } else if (
                                                item.innerText === undefined
                                            ) {
                                                result =
                                                    result + item.textContent;
                                            } else
                                                result =
                                                    result + item.innerText;
                                        });
                                        return result;
                                    },
                                },
                            },
                        },
                        {
                            extend: "copy",
                            title: dataName,
                            text: '<i class="ri-file-copy-line me-1"></i>Copy',
                            className: "dropdown-item",
                            exportOptions: {
                                // jumlah kolom yang diekspor
                                columns: [1, 2],
                                // prevent avatar to be copy
                                format: {
                                    body: function (inner, coldex, rowdex) {
                                        if (inner.length <= 0) return inner;
                                        var el = $.parseHTML(inner);
                                        var result = "";
                                        $.each(el, function (index, item) {
                                            if (
                                                item.classList !== undefined &&
                                                item.classList.contains("name")
                                            ) {
                                                result =
                                                    result +
                                                    item.lastChild.firstChild
                                                        .textContent;
                                            } else if (
                                                item.innerText === undefined
                                            ) {
                                                result =
                                                    result + item.textContent;
                                            } else
                                                result =
                                                    result + item.innerText;
                                        });
                                        return result;
                                    },
                                },
                            },
                        },
                    ],
                },
                {
                    text: '<i class="ri-add-line ri-16px me-0 me-sm-2 align-baseline"></i><span class="d-none d-sm-inline-block">Tambah</span>',
                    className:
                        "add-new btn btn-primary waves-effect waves-light",
                    attr: {
                        "data-bs-toggle": "offcanvas",
                        "data-bs-target": "#offcanvasAddData",
                    },
                },
            ],

            // For responsive popup
            responsive: {
                details: {
                    display: $.fn.dataTable.Responsive.display.modal({
                        header: function (row) {
                            var data = row.data();
                            return "Details of " + data["name"];
                        },
                    }),
                    type: "column",
                    renderer: function (api, rowIdx, columns) {
                        var data = $.map(columns, function (col, i) {
                            return col.title !== "" // ? Do not show row in modal popup if title is blank (for check box)
                                ? '<tr data-dt-row="' +
                                      col.rowIndex +
                                      '" data-dt-column="' +
                                      col.columnIndex +
                                      '">' +
                                      "<td>" +
                                      col.title +
                                      ":" +
                                      "</td> " +
                                      "<td>" +
                                      col.data +
                                      "</td>" +
                                      "</tr>"
                                : "";
                        }).join("");

                        return data
                            ? $('<table class="table"/><tbody />').append(data)
                            : false;
                    },
                },
            },
        });
    }

    // -- Form data offcanvas --
    // Mendefinisikan variabel untuk Form
    var offCanvasForm = $("#offcanvasAddData");

    // Mengubah judul canvas
    $(".add-new").on("click", function () {
        $("#data_id").val(""); //reseting input field
        $("#offcanvasAddDataLabel").html("Tambah Data");
    });

    // Edit data
    $(document).on("click", ".edit-record", function () {
        var data_id = $(this).data("id"),
            dtrModal = $(".dtr-bs-modal.show");

        // sembunyikan modal ketika uk layar kecil
        if (dtrModal.length) {
            dtrModal.modal("hide");
        }

        // Mengubah judul canvas
        $("#offcanvasAddDataLabel").html("Edit Data");

        // Ambil data
        $.get(`${baseUrl}microservice\/${data_id}\/edit`, function (data) {
            $("#data_id").val(data.id);
            $("#add-data-name").val(data.name);
            $("#add-data-url").val(data.base_url);
            $("#add-data-token").val(data.token);
            $("#add-data-methods").val(data.methods).trigger('change');
        });
    });

    // Hapus data
    $(document).on("click", ".delete-record", function () {
        var data_id = $(this).data("id"),
            dtrModal = $(".dtr-bs-modal.show");

        // hide responsive modal in small screen
        if (dtrModal.length) {
            dtrModal.modal("hide");
        }

        // Sweetalert konfirmasi hapus data
        Swal.fire({
            title: "Anda yakin?",
            text: "Tindakan ini tidak dapat diulang!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya, hapus!",
            customClass: {
                confirmButton: "btn btn-primary me-3",
                cancelButton: "btn btn-label-secondary",
            },
            buttonsStyling: false,
        }).then(function (result) {
            if (result.value) {
                // hapus data
                $.ajax({
                    type: "DELETE",
                    url: `${baseUrl}microservice/${data_id}`,
                    success: function () {
                        dt_source.draw();

                        // Sweetalert
                        Swal.fire({
                            title: "Terhapus!",
                            text: "Data terhapus!",
                            icon: "success",
                            customClass: {
                                confirmButton: "btn btn-success",
                            },
                        });
                    },
                    error: function (error) {
                        // Ambil pesan error dari responseJSON
                        let errorTitle =
                            error["status"] + " " + error["statusText"];
                        let errorMessage =
                            error["responseJSON"] &&
                            error["responseJSON"]["message"]
                                ? error["responseJSON"]["message"]
                                : "Terjadi kesalahan yang tidak terduga"; // Default message jika responseJSON tidak ada atau message kosong
                        // Pisahkan pesan berdasarkan string tertentu
                        let relevantMessage = errorMessage.split("(")[0]; // Ambil bagian pesan yang relevan
                        // Sweetalert
                        Swal.fire({
                            title: errorTitle,
                            text: relevantMessage, // Tampilkan hanya bagian pesan yang relevan
                            icon: "error",
                            customClass: {
                                confirmButton: "btn btn-success",
                            },
                        });
                    },
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Sweetalert
                Swal.fire({
                    title: "Dibatalkan",
                    text: "Data batal terhapus!",
                    icon: "error",
                    customClass: {
                        confirmButton: "btn btn-success",
                    },
                });
            }
        });
    });

    // Update data dan validasi form
    const addNewDataForm = document.getElementById("addNewDataForm");

    // Form validation
    const fv = FormValidation.formValidation(addNewDataForm, {
        fields: {
            name: {
                validators: {
                    notEmpty: {
                        message: "Masukkan nama layanan",
                    },
                },
            },
            url: {
                validators: {
                    notEmpty: {
                        message: "Masukkan nama layanan",
                    },
                    uri: {
                        message: "URL Tidak Valid",
                    },
                },
            },
            methods: {
                validators: {
                    notEmpty: {
                        message: "Pilih method",
                    },
                },
            },
        },
        plugins: {
            trigger: new FormValidation.plugins.Trigger(),
            bootstrap5: new FormValidation.plugins.Bootstrap5({
                // Use this for enabling/changing valid/invalid class
                eleValidClass: "",
                rowSelector: function (field, ele) {
                    // field is the field name & ele is the field element
                    return ".mb-5";
                },
            }),
            submitButton: new FormValidation.plugins.SubmitButton(),
            // Submit the form when all fields are valid
            // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
            autoFocus: new FormValidation.plugins.AutoFocus(),
        },
    }).on("core.form.valid", function () {
        // adding or updating user when form successfully validate
        $.ajax({
            data: $("#addNewDataForm").serialize(),
            url: `${baseUrl}microservice`,
            type: "POST",
            success: function (status) {
                dt_source.draw();
                offCanvasForm.offcanvas("hide");

                // Sweetalert
                Swal.fire({
                    title: `${status} sukses!`,
                    text: `${status} data berhasil.`,
                    icon: "success",
                    customClass: {
                        confirmButton: "btn btn-success",
                    },
                });
            },
            error: function (err) {
                // Ambil pesan error dari responseJSON
                let errorTitle =
                err["status"] + " " + err["statusText"];
                let errorMessage =
                    err["responseJSON"] && err["responseJSON"]["message"]
                        ? err["responseJSON"]["message"]
                        : "Terjadi kesalahan yang tidak terduga"; // Default message jika responseJSON tidak ada atau message kosong
                // Pisahkan pesan berdasarkan string tertentu
                let relevantMessage = errorMessage.split("(")[0]; // Ambil bagian pesan yang relevan
                offCanvasForm.offcanvas("hide");

                // Sweetalert
                Swal.fire({
                    title: errorTitle,
                    text: relevantMessage,
                    icon: "error",
                    customClass: {
                        confirmButton: "btn btn-success",
                    },
                });
            },
        });
    });

    // Reset form ketika canvas disembunyikan
    offCanvasForm.on("hidden.bs.offcanvas", function () {
        fv.resetForm(true);
    });
});
