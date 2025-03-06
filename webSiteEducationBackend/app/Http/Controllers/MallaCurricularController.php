<?php

namespace App\Http\Controllers;

use App\Models\MallaCurricular;
use App\Models\Curso;
use Illuminate\Http\Request;

class MallaCurricularController extends Controller
{

    public function index()
    {
        // Toma la primera (y única) malla si existe.
        $malla = MallaCurricular::first();

        // Toma todos los cursos de la tabla cursos e incluye la relación con ciclo
        // Esto devolverá en cada curso un objeto "ciclo" con { IdCiclo, Ciclo }.
        $cursos = Curso::with('ciclo')->get();

        return response()->json([
            'malla'  => $malla,   // Puede ser null si no hay malla
            'cursos' => $cursos,  // Todos los cursos con sus datos de ciclo
        ], 200);
    }

    /**
     * Guarda una nueva malla con sus cursos.
     */
    public function store(Request $request)
    {
        // Crear la instancia de la malla
        $malla = new MallaCurricular();
        $malla->nombreMalla = $request->input('nombreMalla');

        // Procesar el PDF:
        // Si se envía un nuevo archivo, usarlo.
        // Si no, pero se envía un campo "oldPdf", se utiliza ese valor.
        if ($request->hasFile('pdfMalla')) {
            $file = $request->file('pdfMalla');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('pdfs'), $fileName);
            $malla->pdfMalla = 'pdfs/' . $fileName;
        } elseif ($request->input('oldPdf')) {
            $malla->pdfMalla = $request->input('oldPdf');
        }

        // Guardar la malla
        $malla->save();

        // Registrar cursos
        if ($request->has('cursos')) {
            $cursosData = json_decode($request->input('cursos'), true);
            if (is_array($cursosData)) {
                foreach ($cursosData as $cursoData) {
                    Curso::create([
                        'Nombre'  => $cursoData['Nombre'],
                        'IdCiclo' => $cursoData['IdCiclo'],
                    ]);
                }
            }
        }

        return response()->json($malla, 201);
    }

    public function update(Request $request)
    {
        // Obtener la malla actual (asumimos que siempre existe un único registro)
        $oldMalla = MallaCurricular::first();
        // Si no se envía un nuevo PDF, conservar el actual
        if (!$request->hasFile('pdfMalla') && $oldMalla && $oldMalla->pdfMalla) {
            // Se agrega el campo "oldPdf" al request para que el método store lo use
            $request->merge(['oldPdf' => $oldMalla->pdfMalla]);
        }

        // El update se realiza "simulando" una actualización:
        // Primero se eliminan (truncate) los registros existentes...
        $this->destroy();

        // ...luego se crea un nuevo registro con los datos enviados (o preservando el PDF)
        return $this->store($request);
    }

    public function destroy()
    {
        // Truncar la tabla de cursos
        Curso::truncate();

        // Truncar la tabla de malla_curricular
        MallaCurricular::truncate();

        return response()->json(['message' => 'Registros eliminados exitosamente'], 200);
    }
}
