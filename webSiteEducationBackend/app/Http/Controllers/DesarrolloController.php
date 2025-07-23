<?php

namespace App\Http\Controllers;

use App\Models\DesarrolloProfesional;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class DesarrolloController extends Controller
{
    public function index()
    {
        $desarrollo = DesarrolloProfesional::all();
        return response()->json($desarrollo);
    }

    /**
     * Almacena un nuevo registro de desarrollo profesional.
     */
    public function store(Request $request)
    {
        // Reglas de validación
        $rules = [
            'Descripcion' => ['required', 'string'],
            'Url'         => ['required', 'url', 'max:255'],
            'Tipo'        => ['required', 'string', 'max:100'],
            'Fecha'       => ['required', 'date'],
            'Imagen'      => ['required', 'image', 'mimes:jpg,jpeg,png'],
        ];

        // Mensajes personalizados
        $messages = [
            'Descripcion.required' => 'La descripción es obligatoria',
            'Descripcion.string'   => 'La descripción debe ser texto',
            'Url.required'         => 'La URL es obligatoria',
            'Url.url'              => 'La URL debe tener un formato válido',
            'Url.max'              => 'La URL no puede exceder 255 caracteres',

            'Tipo.required'        => 'El tipo es obligatorio',
            'Tipo.string'          => 'El tipo debe ser texto',
            'Tipo.max'             => 'El tipo no puede exceder 100 caracteres',

            'Fecha.required'       => 'La fecha es obligatoria',
            'Fecha.date'           => 'La fecha debe ser una fecha válida',

            'Imagen.required'      => 'La imagen es obligatoria',
            'Imagen.image'         => 'El archivo debe ser una imagen',
            'Imagen.mimes'         => 'La imagen debe ser jpg, jpeg o png',
        ];

        // Ejecutamos el validador
        $validator = Validator::make($request->all(), $rules, $messages);

        // Si falla, devolvemos JSON con todos los errores
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Errores de validación',
                'errors'  => $validator->errors(),
            ], 422);
        }

        // Validación exitosa: guardamos
        $data = $validator->validated();

        $desarrollo = new DesarrolloProfesional();
        $desarrollo->Descripcion = $data['Descripcion'];
        $desarrollo->Url         = $data['Url'];
        $desarrollo->Tipo        = $data['Tipo'];
        $desarrollo->Fecha       = $data['Fecha'];

        if ($request->hasFile('Imagen')) {
            $imagen       = $request->file('Imagen');
            $nombreImagen = time() . '_' . $imagen->getClientOriginalName();
            $imagen->move(public_path('imagenes'), $nombreImagen);
            $desarrollo->Imagen = 'imagenes/' . $nombreImagen;
        }

        $desarrollo->save();

        return response()->json([
            'message' => 'Registro creado con éxito.',
            'data'    => $desarrollo,
        ], 201);
    }

    /**
     * Actualiza un registro existente de desarrollo profesional.
     */
    public function update(Request $request, $id)
    {
        $desarrollo = DesarrolloProfesional::findOrFail($id);

        $rules = [
            'Descripcion' => ['required', 'string'],
            'Url'         => ['required', 'max:255'],
            'Tipo'        => ['required', 'string', 'max:100'],
            'Fecha'       => ['required', 'date'],
            'Imagen'      => ['nullable', 'image', 'mimes:jpg,jpeg,png'],
        ];

        $messages = [
            'Descripcion.required' => 'La descripción es obligatoria',
            'Descripcion.string'   => 'La descripción debe ser texto',
            'Url.required'         => 'La URL es obligatoria',
            'Url.max'              => 'La URL no puede exceder 255 caracteres',
            'Tipo.required'        => 'El tipo es obligatorio',
            'Tipo.string'          => 'El tipo debe ser texto',
            'Tipo.max'             => 'El tipo no puede exceder 100 caracteres',
            'Fecha.required'       => 'La fecha es obligatoria',
            'Fecha.date'           => 'La fecha debe ser una fecha válida',
            'Imagen.image'         => 'El archivo debe ser una imagen',
            'Imagen.mimes'         => 'La imagen debe ser jpg, jpeg o png',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Errores de validación',
                'errors'  => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();

        // Actualizar campos básicos
        $desarrollo->update([
            'Descripcion' => $data['Descripcion'],
            'Url'         => $data['Url'],
            'Tipo'        => $data['Tipo'],
            'Fecha'       => $data['Fecha'],
        ]);

        // Manejo de la imagen
        if ($request->hasFile('Imagen')) {
            // Eliminar imagen anterior si existe
            $imagenAnterior = $desarrollo->Imagen;
            if ($imagenAnterior) {
                $rutaCompleta = public_path($imagenAnterior);
                if (File::exists($rutaCompleta)) {
                    File::delete($rutaCompleta);
                }
            }

            // Guardar nueva imagen
            $imagen = $request->file('Imagen');
            $nombreArchivo = time() . '_' . $imagen->getClientOriginalName();
            $imagen->move(public_path('imagenes'), $nombreArchivo);

            // Actualizar solo el campo de imagen
            $desarrollo->update(['Imagen' => 'imagenes/' . $nombreArchivo]);
        }

        return response()->json([
            'message' => 'Registro actualizado con éxito.',
            'data'    => $desarrollo->fresh(),
        ], 200);
    }

    public function destroy($id)
    {
        $desarrollo = DesarrolloProfesional::find($id);
        $desarrollo->delete();
        return response()->json($desarrollo);
    }
}
