<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class PersonaController extends Controller
{
    /* Muestra un listado de todas las personas con sus publicaciones asociadas */
    public function index()
    {
        // Eager Loading de la relación 'publicaciones'
        $personas = Persona::with(relations: 'publicaciones')->get();

        // devolverlos como JSON
        return response()->json($personas);
    }

    /* Registra una persona con sus publicaciones asociadas */
    public function store(Request $request)
    {
        // Reglas de validación incluyendo formato (regex)
        $rules = [
            'Nombres'         => ['required', 'string', 'max:255', 'regex:/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/'],
            'Correo'          => ['required', 'email', 'max:255'],
            'Cargo'           => ['required', 'string', 'max:50', 'regex:/^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ ]+$/'],
            'TituloPersona'   => ['required', 'string', 'max:255'],
            'RolPersona'      => ['required', Rule::in(['Autoridades', 'Personal Docente', 'Personal Administrativo'])],
            'Foto'            => ['required', 'image', 'mimes:jpg,jpeg,png'],
        ];

        $messages = [
            'Nombres.required'       => 'El nombre es obligatorio.',
            'Nombres.regex'          => 'El nombre solo puede contener letras y espacios',
            'Correo.required'        => 'El correo es obligatorio',
            'Correo.email'           => 'El correo debe tener un formato válido',
            'Cargo.required'         => 'El cargo es obligatorio',
            'Cargo.regex'            => 'El cargo solo puede contener letras, números y espacios',
            'TituloPersona.required' => 'El título es obligatorio',
            'RolPersona.in'          => 'El rol seleccionado no es válido',
            'Foto.required'         => 'La foto es obligatoria',
            'Foto.image'             => 'La foto debe ser una imagen',
            'Foto.mimes'             => 'La foto debe ser jpg, jpeg o png',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Errores de validación',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        $persona = new Persona();
        $persona->NombreCompleto = $data['Nombres'];
        $persona->Correo         = $data['Correo'];
        $persona->Cargo          = $data['Cargo'];
        $persona->Titulo         = $data['TituloPersona'];
        $persona->RolPersona     = $data['RolPersona'];

        if ($request->hasFile('Foto')) {
            $imagen       = $request->file('Foto');
            $nombreImagen = time() . '_' . $imagen->getClientOriginalName();
            $imagen->move(public_path('imagenes'), $nombreImagen);
            $persona->Foto = 'imagenes/' . $nombreImagen;
        }

        $persona->save();

        if (!empty($data['publicaciones'])) {
            foreach ($data['publicaciones'] as $pubData) {
                $persona->publicaciones()->create([
                    'Titulo' => $pubData['titulo'],
                    'Url'    => $pubData['url'],
                ]);
            }
        }

        return response()->json([
            'message' => 'Persona creada con éxito.',
            'data'    => $persona->load('publicaciones'),
        ], 201);
    }

    /* Edita una personas especídfica y sus publicaciones asociadas */
    public function update(Request $request, $id)
    {
        $persona = Persona::findOrFail($id);

        // Reglas de validación incluyendo publicaciones
        $rules = [
            'Nombres'         => ['required', 'string', 'max:255', 'regex:/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/'],
            'Correo'          => ['required', 'email', 'max:255'],
            'Cargo'           => ['required', 'string', 'max:50', 'regex:/^[A-Za-z0-9ÁÉÍÓÚáéíóúñÑ ]+$/'],
            'TituloPersona'   => ['required', 'string', 'max:255'],
            'RolPersona'      => ['required', Rule::in(['Autoridades', 'Personal Docente', 'Personal Administrativo'])],
            'Foto'            => ['nullable', 'image', 'mimes:jpg,jpeg,png'],
            'publicaciones'   => ['nullable', 'array'], // Añadir regla para publicaciones
        ];

        // Añadir reglas dinámicas para cada publicación
        if ($request->has('publicaciones')) {
            foreach ($request->input('publicaciones') as $key => $value) {
                $rules["publicaciones.$key.titulo"] = ['required'];
                $rules["publicaciones.$key.url"] = ['required'];
            }
        }

        $messages = [
            'Nombres.required'       => 'El nombre es obligatorio.',
            'Nombres.regex'          => 'El nombre solo puede contener letras y espacios',
            'Correo.required'        => 'El correo es obligatorio',
            'Correo.email'           => 'El correo debe tener un formato válido',
            'Cargo.required'         => 'El cargo es obligatorio',
            'Cargo.regex'            => 'El cargo solo puede contener letras, números y espacios',
            'TituloPersona.required' => 'El título es obligatorio',
            'RolPersona.in'          => 'El rol seleccionado no es válido',
            'Foto.image'             => 'La foto debe ser una imagen',
            'Foto.mimes'             => 'La foto debe ser jpg, jpeg o png',
            'publicaciones.*.titulo.required' => 'El título de la publicación es obligatorio',
            'publicaciones.*.titulo.string'   => 'El título debe ser texto',
            'publicaciones.*.titulo.max'      => 'El título no debe exceder 255 caracteres',
            'publicaciones.*.url.required'    => 'La URL de la publicación es obligatoria',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Errores de validación',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        $persona->NombreCompleto = $data['Nombres'];
        $persona->Correo         = $data['Correo'];
        $persona->Cargo          = $data['Cargo'];
        $persona->Titulo         = $data['TituloPersona'];
        $persona->RolPersona     = $data['RolPersona'];

        if ($request->hasFile('Foto')) {
            $imagen       = $request->file('Foto');
            $nombreImagen = time() . '_' . $imagen->getClientOriginalName();
            $imagen->move(public_path('imagenes'), $nombreImagen);
            $persona->Foto = 'imagenes/' . $nombreImagen;
        }

        $persona->save();

        // Obtener publicaciones del request
        $publicaciones = $request->input('publicaciones', []);

        // Reemplazar publicaciones
        $persona->publicaciones()->delete();

        foreach ($publicaciones as $pubData) {
            $persona->publicaciones()->create([
                'Titulo' => $pubData['titulo'],
                'Url'    => $pubData['url'],
            ]);
        }

        return response()->json([
            'message' => 'Persona actualizada con éxito.',
            'data'    => $persona->load('publicaciones'),
        ], 200);
    }

    /* Elimina una persona y sus publicaciones asociadas */
    public function destroy($id)
    {
        // Buscar la persona o lanzar excepción si no se encuentra
        $persona = Persona::findOrFail($id);

        // Eliminar todas las publicaciones asociadas a la persona
        $persona->publicaciones()->delete();

        // Eliminar la persona
        $persona->delete();

        return response()->json(['message' => 'Persona eliminada correctamente'], 200);
    }
}
