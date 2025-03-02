<?php

namespace App\Http\Controllers;

use App\Models\Documentos;
use Illuminate\Http\Request;

class DocumentoController extends Controller
{
    // Listar documentos
    public function index()
    {
        $documentos = Documentos::all();
        return response()->json($documentos);
        
    }

    // Registrar un nuevo documento
    public function store(Request $request)
    {

        $documento = new Documentos();
        $documento->Titulo = $request->Titulo;
        $documento->Descripcion = $request->Descripcion;
        $documento->Url = $request->Url;
        $documento->save();

        return response()->json($documento);

    }

    // Mostrar un documento por ID
    public function show($id)
    {
        $documento = Documentos::find($id);
       
        return response()->json($documento);
    }

    // Editar un documento
    public function update(Request $request, $id)
    {
        $documento = Documentos::find($id);

        $documento->Titulo = $request->Titulo;
        $documento->Descripcion = $request->Descripcion;
        $documento->Url = $request->Url;
        $documento->save();

        return response()->json( $documento);
    }

    // Eliminar un documento
    public function destroy($id)
    {
        $documento = Documentos::find($id);
        $documento->delete();
        return response()->json($documento);
    }
}
