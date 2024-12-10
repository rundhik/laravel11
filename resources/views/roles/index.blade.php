@extends('layouts/layoutMaster')

@section('title', 'Roles - Apps')

<!-- Vendor Styles -->
@section('vendor-style')
@vite([
'resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss',
'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss',
'resources/assets/vendor/libs/datatables-checkboxes-jquery/datatables.checkboxes.scss',
'resources/assets/vendor/libs/@form-validation/form-validation.scss',
'resources/assets/vendor/libs/animate-css/animate.scss',
'resources/assets/vendor/libs/sweetalert2/sweetalert2.scss'
])
@endsection

<!-- Vendor Scripts -->
@section('vendor-script')
@vite([
'resources/assets/vendor/libs/datatables-bs5/datatables-bootstrap5.js',
'resources/assets/vendor/libs/@form-validation/popular.js',
'resources/assets/vendor/libs/@form-validation/bootstrap5.js',
'resources/assets/vendor/libs/@form-validation/auto-focus.js',
'resources/assets/vendor/libs/sweetalert2/sweetalert2.js'
])
@endsection

<!-- Page Scripts -->
@section('page-script')
@vite([
'resources/js/role.js'
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
        <h4 class="mt-6 mb-1">Total users with their roles</h4>
        <p class="mb-0">Find all of your users and their associate roles.</p>
    </div>
    <div class="col-12">
        <!-- User Role Table -->
        <div class="card">
            <div class="card-datatable table-responsive">
                <table class="datatables-data table">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th>User</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
        <!--/ User Role Table -->
    </div>

    <!-- Offcanvas form data -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddData" aria-labelledby="offcanvasAddDataLabel">
        <div class="offcanvas-header border-bottom">
            <h5 id="offcanvasAddDataLabel" class="offcanvas-title">{{ __('Add Data') }}</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body mx-0 flex-grow-0 h-100">
            <form class="add-new-user pt-0" id="addNewDataForm">
                <input type="hidden" name="id" id="data_id">
                <div class="form-floating form-floating-outline mb-5">
                    <input type="text" class="form-control" id="add-data-name" name="name" placeholder="{{ __('Name') }}" aria-label="{{ __('Name') }}" disabled />
                    <label for="add-data-name">{{ __('Name') }}</label>
                </div>
                <div class="form-floating form-floating-outline mb-5">
                    <select id="data-role" class="form-select" name="role">
                        <option value="">{{ __('Select Role') }}</option>
                        @foreach ($roles as $r)
                        <option value="{{ $r->id }}">{{ $r->name }}</option>
                        @endforeach
                    </select>
                    <label for="data-role">{{ __('User Role') }}</label>
                </div>
                <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">{{ __('Submit') }}</button>
                <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="offcanvas">{{ __('Cancel') }}</button>
            </form>
        </div>
    </div>
    <!--/ Offcanvas form data -->

</div>
<!--/ Role cards -->

@endsection
