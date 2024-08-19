<x-auth-layout>
    <!-- Nested Row within Card Body -->
    <div class="row">
        <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
        <div class="col-lg-6">
            <div class="p-5">
                <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-2">{{ __('Forgot Your Password?') }}</h1>
                    <p class="mb-4">{{ __('Forgot your password? No problem.Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.') }}</p>
                    @if(session()->has('error'))
                    <div class="alert alert-danger alert-dismissable">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>{!! session('error') !!}
                    </div>
                    @endif
                </div>
                <form class="user" method="POST" action="{{ route('password.email') }}">
                    @csrf
                    <div class="form-group">
                        <input type="email" name="email" class="form-control form-control-user" id="email" placeholder="{{ __('Enter email address') }}" required autofocus>
                        @error('email')<code>{{ $message }}</code>@enderror
                    </div>
                    <button type="submit" class="btn btn-primary btn-user btn-block">
                        {{ __('Email Password Reset Link') }}
                    </button>
                </form>
                <hr>
                <div class="text-center">
                    <a class="small" href="{{ route('login') }}">Already have an account? Login!</a>
                </div>
            </div>
        </div>
    </div>
</x-auth-layout>
