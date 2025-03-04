<?php

namespace App\Http\Controllers;

use App\Models\MallaCurricular;

class MallaCurricularController extends Controller
{
    /**
     * Obtiene todos los registros de la tabla malla_curricular.
     */
    public function index()
    {
        return response()->json(MallaCurricular::all(), 200);
    }
}
