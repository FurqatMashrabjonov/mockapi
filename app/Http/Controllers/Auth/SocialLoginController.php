<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class SocialLoginController extends Controller
{
    public function redirectToProvider(string $provider)
    {
        if (! in_array($provider, ['github', 'google'])) {
            return 'Invalid provider.';
        }

        return Socialite::driver($provider)->redirect();
    }

    public function handleProviderCallback(string $provider)
    {
        if (! in_array($provider, ['github', 'google'])) {
            return 'Invalid provider.';
        }

        $user = Socialite::driver($provider)->user();

        $localUser = User::where('email', $user->email)->first();
        if (! $localUser) {
            $localUser = User::create([
                'name' => $user->getName() ?? $user->getNickname() ?? $user->getEmail(),
                'email' => $user->getEmail(),
                'provider' => $provider,
                'password' => bcrypt(uniqid()),
            ]);
        }
        if ($localUser->provider !== $provider) {
            return 'Email already registered with another provider.';
        }
        Auth::login($localUser, true);

        return redirect()->route('dashboard');
    }
}
