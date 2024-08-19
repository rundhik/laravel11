<x-auth-layout>
    <!-- Nested Row within Card Body -->
    <div class="row">
        <div class="col-lg-6 d-none d-lg-block bg-password-image"></div>
        <div class="col-lg-6">
            <div class="p-5">
                <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-2">{{ __('Reset Password') }}</h1>
                    @if(session()->has('error'))
                    <div class="alert alert-danger alert-dismissable">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>{!! session('error') !!}
                    </div>
                    @endif
                </div>
                <form class="user" method="POST" action="{{ route('password.store') }}">
                    @csrf
                    <input type="hidden" name="token" value="{{ $request->route('token') }}">
                    <div class="form-group">
                        <input type="email" name="email" class="form-control form-control-user" id="email" value="{{ old('email', $request->email) }}" placeholder="{{ __('Enter email address') }}" required autofocus autocomplete="username">
                        @error('email')<code>{{ $message }}</code>@enderror
                    </div>
                    <div class="form-group">
                        <input type="password" name="password" class="form-control form-control-user" id="password" placeholder="{{ __('Password') }}" required autocomplete="new-password">
                        @error('password')<code>{{ $message }}</code>@enderror
                    </div>
                    <div class="form-group">
                        <input type="password" name="password_confirmation" class="form-control form-control-user" id="password_confirmation" placeholder="{{ __('Confirm Password') }}" required autocomplete="new-password">
                        @error('password_confirmation')<code>{{ $message }}</code>@enderror
                    </div>
                    <button type="submit" class="btn btn-primary btn-user btn-block">
                        {{ __('Reset Password') }}
                    </button>
                </form>
            </div>
        </div>
    </div>
</x-auth-layout>
