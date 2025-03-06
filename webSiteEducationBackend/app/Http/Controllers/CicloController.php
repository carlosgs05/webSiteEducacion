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
        $ciclos = Ciclo::with('cursos')->get();
        return response()->json($ciclos, 200);
    }
}
