<x-auth-layout>
    <!-- Nested Row within Card Body -->
    <div class="row">
        <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
        <div class="col-lg-6">
            <div class="p-5">
                <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">{{ config('app.name', 'Laravel') }} {{ __('Login') }}</h1>
                    @if(session()->has('error'))
                    <div class="alert alert-danger alert-dismissable">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>{!! session('error') !!}
                    </div>
                    @endif
                </div>
                <form class="user" method="POST" action="{{ route('login') }}">
                    @csrf
                    <div class="form-group">
                        <input type="email" name="email" class="form-control form-control-user" id="email" placeholder="{{ __('Username') }}" required autofocus autocomplete="username">
                        @error('email')<code>{{ $message }}</code>@enderror
                    </div>
                    <div class="form-group input-group mb-3">
                        <input type="password" name="password" class="form-control form-control-user" id="password" placeholder="{{ __('Password') }}">
                        <div class="input-group-append">
                            <button class="btn btn-primary" type="button" id="show-password">
                                <i class="fas fa-eye-slash fa-sm" id="eye"></i>
                            </button>
                        </div>
                        @error('password')<code>{{ $message }}</code>@enderror
                    </div>
                    <div class="form-group">
                        <div class="custom-control custom-checkbox small">
                            <input type="checkbox" class="custom-control-input" id="remember_me">
                            <label class="custom-control-label" for="remember_me">{{ __('Remember me') }}</label>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-user btn-block">
                        {{ __('Log in') }}
                    </button>
                </form>
                @if (Route::has('password.request'))
                <hr>
                <div class="text-center">
                    <a class="small" href="{{ route('password.request') }}">Forgot Password?</a>
                </div>
                @endif
            </div>
        </div>
    </div>

    @section('scripts')

    @vite('resources/template/js/sb-admin-2.js')
    <script type="module">
        $(function(){
            $('#show-password').click(function(){
                if($('#eye').hasClass('fa-eye-slash')){
                    $('#eye').removeClass('fa-eye-slash');
                    $('#eye').addClass('fa-eye');
                    $('#password').attr('type','text');
                } else {
                    $('#eye').removeClass('fa-eye');
                    $('#eye').addClass('fa-eye-slash');
                    $('#password').attr('type','password');
                }
            });
        });
    </script>

    @endsection

</x-auth-layout>
