/**
 * Halaman Roles
 */

"use strict";

$(function () {
    // -- Datatable --
    // Mendefinisikan variabel untuk datatable
    var dt_data = $(".datatables-data"),
        dataName = "Role";

    // ajax setup
    $.ajaxSetup({
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        },
    });

    // Datatable
    if (dt_data.length) {
        var dt_source = dt_data.DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url: baseUrl + "users",
            },
            columns: [
                // jumlah kolom berdasarkan JSON
                { data: "" },
                { data: "id" },
                { data: "name" },
                { data: "email" },
                { data: "role" },
                { data: "status" },
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

                // Column user
                {
                    targets: 2,
                    responsivePriority: 4,
                    render: function (data, type, full, meta) {
                        var $name = full["name"],
                            $user = full["username"],
                            $image = full["avatar"];
                        if ($image) {
                            // For Avatar image
                            var $output =
                                '<img src="storage/' +
                                $image +
                                '" alt="' +
                                $name +
                                '" class="rounded-circle">';
                        } else {
                            // For Avatar badge
                            var stateNum = Math.floor(Math.random() * 6) + 1;
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
                                $initials = $name.match(/\b\w/g) || [];
                            $initials = (
                                ($initials.shift() || "") +
                                ($initials.pop() || "")
                            ).toUpperCase();
                            $output =
                                '<span class="avatar-initial rounded-circle bg-label-' +
                                $state +
                                '">' +
                                $initials +
                                "</span>";
                        }
                        // Creates full output for row
                        var $row_output =
                            '<div class="d-flex justify-content-left align-items-center">' +
                            '<div class="avatar-wrapper">' +
                            '<div class="avatar avatar-sm me-3">' +
                            $output +
                            "</div>" +
                            "</div>" +
                            '<div class="d-flex flex-column">' +
                            '<span class="fw-medium text-truncate">' +
                            $name +
                            "</span>" +
                            "<small>" +
                            $user +
                            "</small>" +
                            "</div>" +
                            "</div>";
                        return $row_output;
                    },
                },

                // User email
                {
                    targets: 3,
                    render: function (data, type, full, meta) {
                        var $email = full["email"];
                        return "<span >" + $email + "</span>";
                    },
                },

                // User Role
                {
                    targets: 4,
                    render: function (data, type, full, meta) {
                        var $role = full["role"];
                        var roleBadgeObj = {
                            "Super Admin":
                                '<i class="ri-vip-crown-line ri-22px text-warning me-2"></i>',
                            Admin: '<i class="ri-computer-line ri-22px text-danger me-2"></i>',
                            Agent: '<i class="ri-user-line ri-22px text-primary me-2"></i>',
                        };
                        return (
                            "<span class='text-truncate d-flex align-items-center text-heading'>" +
                            roleBadgeObj[$role] +
                            $role +
                            "</span>"
                        );
                    },
                },

                // User Status
                {
                    targets: 5,
                    render: function (data, type, full, meta) {
                        var $status = full["status"];
                        var statusObj = {
                            Verified: {
                                title: "Verified",
                                class: "bg-label-success",
                            },
                            Unverified: {
                                title: "Unverified",
                                class: "bg-label-secondary",
                            },
                        };
                        return (
                            '<span class="badge rounded-pill ' +
                            statusObj[$status].class +
                            '" text-capitalized>' +
                            statusObj[$status].title +
                            "</span>"
                        );
                    },
                },

                // Column actions
                {
                    targets: -1,
                    title: "Actions",
                    searchable: false,
                    orderable: false,
                    render: function (data, type, full, meta) {
                        return (
                            '<div class="d-flex align-items-center gap-50">' +
                            `<button class="btn btn-sm btn-icon edit-record btn-text-secondary rounded-pill waves-effect" data-id="${full["id"]}" data-bs-toggle="offcanvas" data-bs-target="#offcanvasAddData"><i class="ri-edit-box-line ri-20px"></i></button>` +
                            "</div>"
                        );
                    },
                },
            ],
            order: [[2, "desc"]],
            dom:
                '<"row mx-1"' +
                '<"col-sm-12 col-md-5 d-flex align-items-center justify-content-center justify-content-md-start gap-4 mt-5 mt-md-0"l<"dt-action-buttons text-xl-end text-lg-start text-md-end text-start"B>>' +
                '<"col-sm-12 col-md-7"<"dt-action-buttons d-flex align-items-center justify-content-md-end justify-content-center flex-column flex-sm-row flex-nowrap"<"me-sm-4"f><"user_role w-px-200 mb-5 mb-sm-0">>>' +
                ">t" +
                '<"row mx-1"' +
                '<"col-sm-12 col-md-6"i>' +
                '<"col-sm-12 col-md-6"p>' +
                ">",
            lengthMenu: [10, 20, 50, 70, 100], //for length of menu
            language: {
                sLengthMenu: "_MENU_",
                search: "",
                searchPlaceholder: "Cari user",
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

            // Adding role filter once table initialized
            initComplete: function () {
                this.api()
                    .columns(4) // Pastikan 4 adalah indeks kolom Role
                    .every(function () {
                        var column = this;
                        var select = $(
                            '<select id="UserRole" class="form-select text-capitalize form-select-sm"><option value=""> Select Role </option></select>'
                        )
                            .appendTo(".user_role")
                            .on("change", function () {
                                var val = $.fn.dataTable.util.escapeRegex($(this).val()); // Ambil nilai terpilih dari dropdown
                                // Gunakan kolom filter berdasarkan nilai dropdown
                                dt_source.search(val ? val : '', true, false).draw(); // alternatif : column.search(val ? '^' + val + '$' : '', true, false).draw();
                            });
                        // Mengisi dropdown dengan data role unik
                        column
                            .data()
                            .unique()
                            .sort()
                            .each(function (d, j) {
                                select.append(
                                    '<option value="' + d + '" class="text-capitalize">' + d + "</option>"
                                );
                            });
                    });
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
        $.get(`${baseUrl}user\/${data_id}\/edit`, function (data) {
            $("#data_id").val(data.id);
            $("#add-data-name").val(data.name);
            // Pastikan roles adalah array dan user memiliki role
            if (data.roles && data.roles.length > 0) {
                // Misalnya kita ambil role pertama yang dimiliki user
                var userRoleId = data.roles[0].id;  // Ambil ID role pertama
                // Pilih role di dropdown sesuai dengan ID role
                $("#data-role").val(userRoleId).trigger('change');
            }
            // // Alternatif untuk menangani role jika role lebih dari satu
            // if (data.roles && data.roles.length > 0) {
            //     var userRoleIds = data.roles.map(function(role) { return role.id; });
            //     $("#data-role").val(userRoleIds).trigger('change');
            // }
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
                    url: `${baseUrl}user/${data_id}`,
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
            role: {
                validators: {
                    notEmpty: {
                        message: "Pilih role",
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
            url: `${baseUrl}assignrole`,
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
