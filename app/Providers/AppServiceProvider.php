<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::before(function ($user, $ability) {
            return $user->hasRole('Super Admin') ? true : null;
        });

        // Menentukan rate limit untuk grup 'api'
        RateLimiter::for('api', function (Request $request) {
            // Membatasi 60 permintaan per menit, menggunakan ID user atau IP
            return Limit::perMinute(60)->by($request->user()?->id ?: $request->ip());
        });
    }
}
