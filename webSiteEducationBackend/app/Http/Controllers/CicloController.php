<?php

namespace App\Http\Controllers;

use App\Models\Ciclo;
use Illuminate\Http\Request;

class CicloController extends Controller
{
    /**
     * Retorna todos los registros de la tabla ciclo en formato JSON.
     */
    public function index()
    {
        $ciclos = Ciclo::all();
        return response()->json($ciclos, 200);
    }

    // Otros métodos (store, update, destroy, etc.) si los necesitas...
}
