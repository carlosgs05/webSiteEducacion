<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Http\Request;

class PersonaController extends Controller
{
    /**
     * Muestra un listado de todas las personas con sus publicaciones.
     */
    public function index()
    {
        // Eager Loading de la relación 'publicaciones'
        $personas = Persona::with(relations: 'publicaciones')->get();

        // O devolverlos como JSON (por ejemplo, en una API):
        return response()->json($personas);
    }

    /**
     * Almacena una nueva persona y sus publicaciones (si las hay).
     */ public function store(Request $request)
    {
        // Crear una nueva instancia de Persona
        $persona = new Persona();

        // Asignar los campos del request (mapeando Nombres a NombreCompleto, TituloPersona a Titulo)
        $persona->NombreCompleto = $request->Nombres;
        $persona->Correo = $request->Correo;
        $persona->Cargo = $request->Cargo;
        $persona->Titulo = $request->TituloPersona; // TituloPersona del frontend se guarda como Titulo
        $persona->RolPersona = $request->RolPersona; // Se envía desde el frontend (valor de prop tipo)

        // Procesar la imagen si existe en el request
        if ($request->hasFile('Foto')) {
            $imagen = $request->file('Foto');
            $nombreImagen = time() . '_' . $imagen->getClientOriginalName();
            // Mover la imagen a la carpeta 'imagenes' dentro del public
            $imagen->move(public_path('imagenes'), $nombreImagen);
            $persona->Foto = 'imagenes/' . $nombreImagen; // Guardar la ruta relativa
        }

        // Guardar la persona en la base de datos
        $persona->save();

        // Si se enviaron publicaciones, recorrer el array y crearlas asociadas a la persona
        if ($request->has('publicaciones')) {
            foreach ($request->input('publicaciones') as $pubData) {
                $persona->publicaciones()->create([
                    'Titulo' => $pubData['titulo'],
                    'Url'    => $pubData['url'],
                ]);
            }
        }

        // Devolver la persona creada como JSON
        return response()->json($persona, 201);
    }

    /**
     * Actualiza una persona y sus publicaciones.
     * Se borran todas las publicaciones previas y se crean las nuevas enviadas.
     */
    public function update(Request $request, $id)
    {
        // Buscar la persona por ID o fallar si no existe
        $persona = Persona::findOrFail($id);

        // Actualizar los campos de la persona
        $persona->NombreCompleto = $request->Nombres;
        $persona->Correo = $request->Correo;
        $persona->Cargo = $request->Cargo;
        $persona->Titulo = $request->TituloPersona; // El campo del frontend TituloPersona se guarda como Titulo
        $persona->RolPersona = $request->RolPersona; // Se envía desde el frontend (valor de prop tipo)

        // Procesar la imagen si se envía una nueva
        if ($request->hasFile('Foto')) {
            $imagen = $request->file('Foto');
            $nombreImagen = time() . '_' . $imagen->getClientOriginalName();
            // Mover la imagen a la carpeta 'imagenes' dentro del public
            $imagen->move(public_path('imagenes'), $nombreImagen);
            $persona->Foto = 'imagenes/' . $nombreImagen; // Guardar la ruta relativa
        }

        // Guardar los cambios de la persona
        $persona->save();

        // Eliminar todas las publicaciones actuales asociadas a la persona
        // (No usamos truncate para no eliminar datos de otras personas, se elimina solo mediante el modelo relacionado)
        $persona->publicaciones()->delete();

        // Si se enviaron publicaciones, recorrer el array y crearlas asociadas a la persona
        if ($request->has('publicaciones')) {
            foreach ($request->input('publicaciones') as $pubData) {
                $persona->publicaciones()->create([
                    'Titulo' => $pubData['titulo'],
                    'Url'    => $pubData['url'],
                ]);
            }
        }

        // Devolver la persona actualizada como JSON
        return response()->json($persona, 200);
    }

    /**
     * Elimina una persona y sus publicaciones.
     */
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
