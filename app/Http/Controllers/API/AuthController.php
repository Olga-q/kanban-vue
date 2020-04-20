<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\User;

class AuthController extends Controller
{
    private $name;
    private $email;
    private $password;

    public function __construct()
    {
        $this->email = request('email') ?? '';
        $this->name = request('name') ?? '';
        $this->password = request('password') ?? '';
    }
    public function register()
    {
        $nameRe = "/^.{3,}$/";
        $passwordRe = "/^.{6,}$/";
        if (! preg_match($nameRe, $this->name)) {
            return response()->json([
                'message' => 'Имя должно состоять более, чем из 3 символов',
                'status' => 422
            ], 422);
        }

        if (! preg_match($passwordRe, $this->password)) {
            return response()->json([
                'message' => 'Пароль должен состоять более, чем из 6 символов',
                'status' => 422
            ], 422);
        }

        $user = User::whereEmail($this->email)->first();

        if ($user) {
            return response()->json([
                'message' => 'Пользователь с данным email уже существует',
                'status' => 422
            ], 422);
        }


        User::create([
            'name' => $this->name,
            'email' => $this->email,
            'password' => bcrypt($this->password)
        ]);

        return $this->login();
    }

    public function login()
    {
        $user = User::whereEmail($this->email)->first();

        if (!$user) {
            return response()->json([
                'message' => 'Неверно введены email или пароль',
                'status' => 422
            ], 422);
        }

        if (!Hash::check($this->password, $user->password)) {
            return response()->json([
                'message' => 'Неверно введены email или пароль',
                'status' => 422
            ], 422);
        }

        // Внутренний API запрос для получения токенов
        $client = DB::table('oauth_clients')
            ->where('password_client', true)
            ->first();

        // Убедимся, что Password Client существует в БД (т.е. Laravel Passport
        // установлен правильно)
        if (!$client) {
            return response()->json([
                'message' => 'Что-то пошло не так',
                'status' => 500
            ], 500);
        }

        $data = [
            'grant_type' => 'password',
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'username' => $this->email,
            'password' => $this->password,
        ];

        $request = Request::create('/oauth/token', 'POST', $data);

        $response = app()->handle($request);

        // Проверяем был ли внутренний запрос успешным
        if ($response->getStatusCode() != 200) {
            return response()->json([
                'message' => $response->getContent(),
                'status' => 422
            ], 422);
        }

        // Вытаскиваем данные из ответа
        $data = json_decode($response->getContent());

        // Формируем окончательный ответ в нужном формате
        return response()->json([
            'token' => $data->access_token,
            'user' => $user,
            'status' => 200
        ]);
    }

    public function logout()
    {
        $accessToken = auth()->user()->token();
    
        $refreshToken = DB::table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);
    
        $accessToken->revoke();
        
        $this->email = '';
        $this->name = '';
        $this->password = '';

        return response()->json(['status' => 200]);
    }

    public function getUser()
    {
        return auth()->user();
    }
}
