<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Noticia;
use App\Models\ImagenesNoticia;
use Illuminate\Support\Facades\DB;
class NoticiaController extends Controller
{
    public function index()
    {
        $noticias = Noticia::with('imagenes')->get();
        return response()->json($noticias);
    }

    public function store(Request $request)
    {
        // Creamos la noticia
        $noticia = new Noticia();
        $noticia->Nombre      = $request->Nombre;
        $noticia->Fecha       = $request->Fecha;
        $noticia->Encabezado  = $request->Encabezado;
        $noticia->Descripcion = $request->Descripcion;

        // Procesamos la imagen de portada si se envía
        if ($request->hasFile('ImagenPortada')) {
            $file = $request->file('ImagenPortada');
            // Genera un nombre único combinando time() y uniqid()
            $filename = time() . '_' . uniqid() . '_' . $file->getClientOriginalName();
            $file->move(public_path('noticias'), $filename);
            $noticia->ImagenPortada = 'noticias/' . $filename;
        }

        $noticia->save();

        // Procesamos las imágenes adicionales
        if ($request->hasFile('Imagenes')) {
            foreach ($request->file('Imagenes') as $img) {
                $filenameImg = time() . '_' . uniqid() . '_' . $img->getClientOriginalName();
                $img->move(public_path('noticias'), $filenameImg);

                $imagenNoticia = new ImagenesNoticia();
                $imagenNoticia->IdNoticia = $noticia->IdNoticia;
                $imagenNoticia->Imagen = 'noticias/' . $filenameImg;
                $imagenNoticia->save();
            }
        }

        return response()->json($noticia->load('imagenes'));
    }

    public function show($id)
    {
        $noticia = Noticia::with('imagenes')->find($id);
        return response()->json($noticia);
    }

    public function update(Request $request, $id)
    {
        try {
            DB::beginTransaction();
    
            // Recuperamos la noticia o fallamos si no existe
            $noticia = Noticia::findOrFail($id);
    
            // Actualizamos los campos de texto
            $noticia->Nombre      = $request->Nombre;
            $noticia->Fecha       = $request->Fecha;
            $noticia->Encabezado  = $request->Encabezado;
            $noticia->Descripcion = $request->Descripcion;
    
            // Si se envía una nueva imagen de portada, la reemplazamos
            if ($request->hasFile('ImagenPortada')) {
                if ($noticia->ImagenPortada && file_exists(public_path($noticia->ImagenPortada))) {
                    unlink(public_path($noticia->ImagenPortada));
                }
                $file = $request->file('ImagenPortada');
                $filename = time() . '_' . uniqid() . '_' . $file->getClientOriginalName();
                $file->move(public_path('noticias'), $filename);
                $noticia->ImagenPortada = 'noticias/' . $filename;
            }
            $noticia->save();
    
            // Si se envían nuevas imágenes adicionales, las actualizamos
            if ($request->hasFile('Imagenes')) {
                // Eliminamos las imágenes antiguas
                foreach ($noticia->imagenes as $oldImg) {
                    if ($oldImg->Imagen && file_exists(public_path($oldImg->Imagen))) {
                        unlink(public_path($oldImg->Imagen));
                    }
                    $oldImg->delete();
                }
                // Guardamos las nuevas imágenes
                foreach ($request->file('Imagenes') as $img) {
                    $filenameImg = time() . '_' . uniqid() . '_' . $img->getClientOriginalName();
                    $img->move(public_path('noticias'), $filenameImg);
    
                    $imagenNoticia = new ImagenesNoticia();
                    $imagenNoticia->IdNoticia = $noticia->IdNoticia;
                    $imagenNoticia->Imagen = 'noticias/' . $filenameImg;
                    $imagenNoticia->save();
                }
            }
    
            DB::commit();
            return response()->json($noticia->load('imagenes'));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
