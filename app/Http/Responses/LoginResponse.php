<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{

    public function toResponse($request)
    {
        return $request->wantsJson()
                    ? redirect('/user')
                    : redirect()->intended(config('fortify.home'));
    }

}
