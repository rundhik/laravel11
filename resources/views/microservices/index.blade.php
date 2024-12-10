@extends('layouts/layoutMaster')

@section('title', __('Services') )

<!-- Vendor Styles -->
@section('vendor-style')
@vite([
'resources/assets/vendor/libs/datatables-bs5/datatables.bootstrap5.scss',
'resources/assets/vendor/libs/datatables-responsive-bs5/responsive.bootstrap5.scss',
'resources/assets/vendor/libs/datatables-buttons-bs5/buttons.bootstrap5.scss',
'resources/assets/vendor/libs/@form-validation/form-validation.scss',
'resources/assets/vendor/libs/select2/select2.scss',
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
'resources/assets/vendor/libs/select2/select2.js',
'resources/assets/vendor/libs/sweetalert2/sweetalert2.js'
])
@endsection

<!-- Page Scripts -->
@section('page-script')
@vite([
'resources/js/microservice.js',
])
@endsection

@section('content')

<div class="row g-6 mb-6">
</div>
<!-- Datatable -->
<div class="card">
    <div class="card-header pb-0">
        <h5 class="card-title mb-0">{{ __('Services') }}</h5>
    </div>
    <div class="card-datatable table-responsive">
        <table class="table datatables-data">
            <thead>
                <tr>
                    <th></th>
                    <th>Id</th>
                    <th>{{ __('Name') }}</th>
                    <th>{{ __('Slug') }}</th>
                    <th>{{ __('URL') }}</th>
                    <th>{{ __('Token') }}</th>
                    <th>{{ __('Methods') }}</th>
                    <th>{{ __('Actions') }}</th>
                </tr>
            </thead>
        </table>
    </div>

    <!-- Offcanvas form data -->
    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasAddData" aria-labelledby="offcanvasAddDataLabel">
        <div class="offcanvas-header border-bottom">
            <h5 id="offcanvasAddDataLabel" class="offcanvas-title">{{ __('Add Data') }}</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body mx-0 flex-grow-0 h-100">
            <form class="add-new-data pt-0" id="addNewDataForm">
                <input type="hidden" name="id" id="data_id">
                <div class="form-floating form-floating-outline mb-5">
                    <input type="text" class="form-control" id="add-data-name" name="name" placeholder="{{ __('Service Name') }}" aria-label="{{ __('Service Name') }}" />
                    <label for="add-data-name">{{ __('Service Name') }}</label>
                </div>
                <div class="form-floating form-floating-outline mb-5">
                    <input type="text" class="form-control" id="add-data-url" name="url" placeholder="{{ __('URL') }}" aria-label="{{ __('URL') }}" />
                    <label for="add-data-url">{{ __('URL') }}</label>
                </div>
                <div class="form-floating form-floating-outline mb-5">
                    <input type="text" class="form-control" id="add-data-token" name="token" placeholder="{{ __('Token') }}" aria-label="{{ __('Token') }}" />
                    <label for="add-data-token">{{ __('Token') }}</label>
                </div>
                <div class="form-floating form-floating-outline mb-5">
                    <div class="select2-primary">
                        <select class="select2 form-select" id="add-data-methods" name="methods[]" multiple>
                            <option value="GET">GET</option>
                            <option value="POST">POST</option>
                            <option value="PUT">PUT</option>
                            <option value="DELETE">DELETE</option>
                        </select>
                    </div>
                    <label for="add-data-methods">Method</label>
                </div>
                <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">{{ __('Submit') }}</button>
                <button type="reset" class="btn btn-outline-secondary" data-bs-dismiss="offcanvas">{{ __('Cancel') }}</button>
            </form>
        </div>
    </div>
    <!--/ Offcanvas form data -->
</div>
<!--/ Datatable -->
@endsection
