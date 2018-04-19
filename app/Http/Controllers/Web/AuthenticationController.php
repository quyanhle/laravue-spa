<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Socialite;

/**
 *  AuthenticationController
 */
class AuthenticationController extends Controller
{
    public function getSocialRedirect($account)
    {
        try {
            return Socialite::with($account)->redirect();

        } catch (\InvalidArgumentException $e) {
            return redirect('/login');
        }

    }

    public function getSocialCallback($account)
    {
        $socialUser = Socialite::with($account)->user();
        $user       = User::where('provider_id', $socialUser->id)->where('provider', $account)->first();
        if (!$user) {
            $userData['name']        = $socialUser->getName();
            $userData['email']       = ($socialUser->getEmail() != '') ? $socialUser->getEmail() : '';
            $userData['avatar']      = $socialUser->getAvatar();
            $userData['provider']    = $account;
            $userData['provider_id'] = $socialUser->getId();
            $userData['password']    = '';

            $user = User::create($userData);
        }
        Auth::login($user);
        return redirect('/#/home');
    }

}
