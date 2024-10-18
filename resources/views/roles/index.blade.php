@extends('layouts/layoutMaster')

@section('title', 'Roles - Apps')

<!-- Vendor Styles -->
@section('vendor-style')
@vite([
'resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss',
'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss',
'resources/assets/vendor/libs/datatables-checkboxes-jquery/datatables.checkboxes.scss',
'resources/assets/vendor/libs/@form-validation/form-validation.scss',
])
@endsection

<!-- Vendor Scripts -->
@section('vendor-script')
@vite([
'resources/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js',
'resources/assets/vendor/libs/@form-validation/popular.js',
'resources/assets/vendor/libs/@form-validation/bootstrap5.js',
'resources/assets/vendor/libs/@form-validation/auto-focus.js',
])
@endsection

<!-- Page Scripts -->
@section('page-script')
@vite([
'resources/assets/js/permission-page.js',
'resources/assets/js/modal-add-role.js',
'resources/assets/js/modal-add-permission.js',
'resources/assets/js/modal-edit-permission.js',
])
@endsection

@section('content')
<h4 class="mb-1">Roles List</h4>
<p class="mb-6">A role provided access to predefined menus and features so that depending on assigned role an administrator can have access to what user needs.</p>
<!-- Role cards -->
<div class="row g-6">
    @foreach ($roles as $r)
    <div class="col-xl-4 col-lg-6 col-md-6">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-4">
                    <p class="mb-0">Total {{ $r->users->count() }} users</p>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="role-heading">
                        <h5 class="mb-1">{!! $r->name !!}</h5>
                        <a href="javascript:;" data-bs-toggle="modal" data-bs-target="#addRoleModal" class="role-edit-modal">
                            <p class="mb-0">Edit Role</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    @endforeach

    <div class="col-xl-4 col-lg-6 col-md-6">
        <div class="card h-100">
            <div class="row h-100">
                <div class="col-5">
                </div>
                <div class="col-7">
                    <div class="card-body text-sm-end text-center ps-sm-0">
                        <button data-bs-target="#addRoleModal" data-bs-toggle="modal" class="btn btn-sm btn-primary mb-4 text-nowrap add-new-role">Add Role</button>
                        <p class="mb-0">Add new role,<br> if it doesn't exist</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-12">
        <h4 class="mt-6 mb-1">Total permissions with their roles</h4>
        <p class="mb-0">Find all of your permissions and their associate roles.</p>
    </div>
    <div class="col-12">
        <!-- Permission Table -->
        <div class="card">
            <div class="card-datatable table-responsive">
                <table class="datatables-permissions table">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>Assigned To</th>
                            <th>Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <!--/ Permission Table -->
    </div>

</div>
<!--/ Role cards -->

<!-- Modal -->
@include('_partials/_modals/modal-add-role')
@include('_partials/_modals/modal-add-permission')
@include('_partials/_modals/modal-edit-permission')
<!-- /Modal -->
@endsection
