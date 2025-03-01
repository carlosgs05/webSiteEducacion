<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Response;
use App\Models\DesarrolloProfesional;
use Illuminate\Http\Request;

class DesarrolloController extends Controller
{
    public function index()
    {
        $desarrollo = DesarrolloProfesional::all();
        return response()->json($desarrollo);
    }

    public function store(Request $request)
    {
        $desarrollo = new DesarrolloProfesional();
        $desarrollo->Descripcion = $request->Descripcion;
        $desarrollo->Url = $request->Url;
        $desarrollo->Tipo = $request->Tipo;
        $desarrollo->Fecha = $request->Fecha;
    
        if ($request->hasFile('Imagen')) {
            $imagen = $request->file('Imagen');
            $nombreImagen = time() . '_' . $imagen->getClientOriginalName();
            $rutaImagen = $imagen->move(public_path('imagenes'), $nombreImagen);
            $desarrollo->Imagen = 'imagenes/' . $nombreImagen; // Guardar la ruta
        }
    
        $desarrollo->save();
        return response()->json($desarrollo);
    }
    

    public function show($id)
    {
        $desarrollo = DesarrolloProfesional::find($id);
        return response()->json($desarrollo);
    }

    public function update(Request $request, $id)
    {
        $desarrollo = DesarrolloProfesional::find($id);
        $desarrollo->Descripcion = $request->Descripcion;
        $desarrollo->Url = $request->Url;
        $desarrollo->Tipo = $request->Tipo;
        $desarrollo->Fecha = $request->Fecha;
    
        if ($request->hasFile('Imagen')) {
            // Eliminar imagen anterior si existe
            if ($desarrollo->Imagen && file_exists(public_path($desarrollo->Imagen))) {
                unlink(public_path($desarrollo->Imagen));
            }
    
            $imagen = $request->file('Imagen');
            $nombreImagen = time() . '_' . $imagen->getClientOriginalName();
            $rutaImagen = $imagen->move(public_path('imagenes'), $nombreImagen);
            $desarrollo->Imagen = 'imagenes/' . $nombreImagen; // Guardar la nueva ruta
        }
    
        $desarrollo->save();
        return response()->json($desarrollo);
    }
    

    public function destroy($id)
    {
        $desarrollo = DesarrolloProfesional::find($id);
        $desarrollo->delete();
        return response()->json($desarrollo);
    }
}
