<?php

namespace App\Http\Controllers;

use App\Models\CarruselHome;
use Illuminate\Http\Request;


class CarruselHomeController extends Controller
{
    public function getImagenes()
    {
        $imagenes = CarruselHome::all();
        return response()->json($imagenes);
    }

    public function deleteAllImagenes()
    {
        CarruselHome::truncate();
    }

    public function storeImagenes(Request $request)
    {
        // Primero eliminamos todas las imágenes existentes en la base de datos.
        $this->deleteAllImagenes();

        // Procesamos las imágenes que ya existían (se envían como JSON en el campo 'existingImages').
        $existingImagesJson = $request->input('existingImages');
        $existingImages = [];
        if ($existingImagesJson) {
            $existingImages = json_decode($existingImagesJson, true);
        }

        foreach ($existingImages as $imageName) {
            CarruselHome::create([
                'imagen' => $imageName
            ]);
        }

        // Procesamos los archivos nuevos.
        if ($request->hasFile('newImages')) {
            foreach ($request->file('newImages') as $file) {
                // Generamos un nombre único para evitar colisiones.
                $filename = time() . '_' . $file->getClientOriginalName();
                // Movemos el archivo a la carpeta "imagenes" dentro de public.
                $file->move(public_path('imagenes'), $filename);
                // Guardamos el nombre (con extensión) en la base de datos.
                CarruselHome::create([
                    'imagen' => $filename
                ]);
            }
        }

        return response()->json(['message' => 'Imágenes actualizadas correctamente.'], 200);
    }
}
