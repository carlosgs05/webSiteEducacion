<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

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

            // Hashea la contraseña y actualiza el usuario
            $user->password = Hash::make($password);
            // Se guarda la longitud de la contraseña original
            $user->password_length = $request->input('passwordLength');
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
}
