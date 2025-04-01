<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Mail\ResetPasswordMail;
use Illuminate\Support\Facades\Mail;
use Carbon\Carbon;

class AuthController extends Controller
{
    public function login(Request $request)
    {


        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Credenciales incorrectas'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ]);
    }

    public function user(Request $request)
    {
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }

    public function updateProfile(Request $request)
    {
        // Se usa el id enviado desde el frontend para encontrar al usuario
        $user = User::find($request->input('id'));

        try {
            // Actualizar datos básicos
            $user->name         = $request->input('name');
            $user->last_name    = $request->input('last_name');
            $user->gender       = $request->input('gender');
            $user->date_birth   = $request->input('date_birth');
            $user->phone_number = $request->input('phone_number');

            // Si se ha cargado un nuevo archivo de imagen, se actualiza la foto
            if ($request->hasFile('photo')) {
                $file = $request->file('photo');
                $filename = uniqid() . '_' . time() . '.' . $file->getClientOriginalExtension();
                $file->move(public_path('imagenes'), $filename);
                $user->photo = 'imagenes/' . $filename;
            }
            // Si se indica eliminar la imagen, se asigna null
            elseif ($request->boolean('delete_photo')) {
                $user->photo = null;
            }
            // Si no se envía nada, se mantiene la imagen existente

            $user->save();

            return response()->json(['success' => true, 'user' => $user]);
        } catch (\Exception $e) {
            Log::error('Error en updateProfile: ' . $e->getMessage(), [
                'exception' => $e,
                'request'   => $request->all(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Error interno en el servidor'
            ], 500);
        }
    }

    public function updateSecurity(Request $request)
    {
        $user = User::find($request->input('id'));

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Usuario no encontrado'], 404);
        }

        try {
            $password = $request->input('password');

            // Valida que se haya enviado una contraseña
            if (!$password) {
                return response()->json(['success' => false, 'message' => 'La contraseña es obligatoria'], 422);
            }

            // Guardar la longitud de la contraseña
            $passwordLength = strlen($request->password);

            // Actualizar la contraseña
            $user->password = Hash::make($request->password);
            $user->password_length = $passwordLength;
            $user->save();

            return response()->json(['success' => true, 'user' => $user]);
        } catch (\Exception $e) {
            Log::error('Error en updateSecurity: ' . $e->getMessage(), [
                'exception' => $e,
                'request'   => $request->all(),
            ]);
            return response()->json([
                'success' => false,
                'message' => 'Error interno en el servidor'
            ], 500);
        }
    }

    // Método para buscar usuario por correo y devolver sus datos
    public function forgot(Request $request)
    {

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        // Retornamos datos relevantes del usuario (ej. nombre y foto)
        return response()->json([
            'user' => [
                'email' => $user->email,
                'name'  => $user->name,
                'photo' => $user->photo,
            ]
        ], 200);
    }

    // Método para enviar el código de restablecimiento de contraseña
    public function sendResetCode(Request $request)
    {
        // Validar si el email existe
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(["message" => "El correo no está registrado."], 404);
        }

        // Generar código de 6 dígitos
        $code = mt_rand(100000, 999999);

        // Guardar código y su expiración (ejemplo: expira en 15 minutos)
        $user->reset_code = $code;
        $user->reset_code_expires_at = Carbon::now()->addMinutes(15);
        $user->save();

        // Enviar correo con la plantilla mejorada
        Mail::to($request->email)->send(new ResetPasswordMail($user, $code));

        return response()->json(["message" => "Código enviado."], 200);
    }

    // Método para validar el código de restablecimiento
    public function validateResetCode(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || $user->reset_code !== (int) $request->code) {
            return response()->json(["success" => false, "message" => "Código incorrecto."], 400);
        }

        if (Carbon::now()->greaterThan($user->reset_code_expires_at)) {
            return response()->json(["success" => false, "message" => "El código ha expirado."], 400);
        }

        return response()->json(["success" => true, "message" => "Código válido."], 200);
    }

    // Método para restablecer la contraseña
    public function resetPassword(Request $request)
    {
        // Validación de campos y requisitos de la contraseña
        $request->validate([
            'email' => 'required|email',
            'password' => [
                'required',
                'string',
                'min:8',
                'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/'
            ],
            'password_confirmation' => 'required|same:password',
        ], [
            'password.regex' => 'La contraseña debe tener al menos una mayúscula, una minúscula y un número.',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(["message" => "Usuario no encontrado."], 404);
        }

        // Verificar que la nueva contraseña no sea igual a la anterior
        if (Hash::check($request->password, $user->password)) {
            return response()->json(["message" => "La nueva contraseña no puede ser igual a la anterior."], 422);
        }

        // Guardar la longitud de la contraseña
        $passwordLength = strlen($request->password);

        // Actualizar la contraseña y eliminar el código de restablecimiento
        $user->password = Hash::make($request->password);
        $user->password_length = $passwordLength;
        $user->reset_code = null;
        $user->reset_code_expires_at = null;
        $user->save();

        return response()->json(["success" => true, "message" => "Contraseña restablecida con éxito."], 200);
    }
}
