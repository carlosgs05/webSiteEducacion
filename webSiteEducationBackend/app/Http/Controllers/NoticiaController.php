<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Noticia;
use App\Models\ImagenesNoticia;

class NoticiaController extends Controller
{
    public function index()
    {
        $noticias = Noticia::with('imagenes')->get();
        return response()->json($noticias);
    }

    public function store(Request $request)
    {
        $noticia = new Noticia();
        $noticia->Nombre      = $request->Nombre;
        $noticia->Fecha       = $request->Fecha;
        $noticia->Encabezado  = $request->Encabezado;
        $noticia->Descripcion = $request->Descripcion;

        if ($request->hasFile('ImagenPortada')) {
            $file = $request->file('ImagenPortada');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('noticias'), $filename);
            $noticia->ImagenPortada = 'noticias/' . $filename;
        }

        $noticia->save();

        if ($request->hasFile('Imagenes')) {
            foreach ($request->file('Imagenes') as $img) {
                $filenameImg = time() . '_' . $img->getClientOriginalName();
                $img->move(public_path('noticias'), $filenameImg);

                $imagenNoticia = new ImagenesNoticia();
                $imagenNoticia->IdNoticia = $noticia->IdNoticia;
                $imagenNoticia->Imagen = 'noticias/' . $filenameImg;
                $imagenNoticia->save();
            }
        }

        return response()->json(
             $noticia->load('imagenes')
        );
    }
    public function show($id)
    {
        $noticia = Noticia::with('imagenes')->find($id);
        return response()->json($noticia);
    }

    public function update(Request $request, $id)
    {
        $noticia = Noticia::find($id);
    
        $noticia->Nombre      = $request->Nombre;
        $noticia->Fecha       = $request->Fecha;
        $noticia->Encabezado  = $request->Encabezado;
        $noticia->Descripcion = $request->Descripcion;

        if ($request->hasFile('ImagenPortada')) {
            if ($noticia->ImagenPortada && file_exists(public_path($noticia->ImagenPortada))) {
                unlink(public_path($noticia->ImagenPortada));
            }
            $file = $request->file('ImagenPortada');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('noticias'), $filename);
            $noticia->ImagenPortada = 'noticias/' . $filename;
        }
        $noticia->save();

        // Manejar nuevas imágenes
        if ($request->hasFile('Imagenes')) {
            foreach ($noticia->imagenes as $oldImg) {
                if (file_exists(public_path($oldImg->Imagen))) {
                    unlink(public_path($oldImg->Imagen));
                }
                $oldImg->delete();
            }
            foreach ($request->file('Imagenes') as $img) {
                $filenameImg = time() . '_' . $img->getClientOriginalName();
                $img->move(public_path('noticias'), $filenameImg);

                $imagenNoticia = new ImagenesNoticia();
                $imagenNoticia->IdNoticia = $noticia->IdNoticia;
                $imagenNoticia->Imagen = 'noticias/' . $filenameImg;
                $imagenNoticia->save();
            }
        }

        return response()->json(
            $noticia->load('imagenes')
        );
    }
    public function destroy($id)
    {
        $noticia = Noticia::with('imagenes')->find($id);
    
        if ($noticia->ImagenPortada && file_exists(public_path($noticia->ImagenPortada))) {
            unlink(public_path($noticia->ImagenPortada));
        }

        foreach ($noticia->imagenes as $img) {
            if ($img->Imagen && file_exists(public_path($img->Imagen))) {
                unlink(public_path($img->Imagen));
            }
            $img->delete();
        }

        $noticia->delete();

        return response()->json($noticia);
    }
}
