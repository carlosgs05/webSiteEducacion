<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $table = 'cursos';         // Nombre de la tabla
    protected $primaryKey = 'IdCurso';   // Llave primaria
    public $timestamps = false;          // Si no usas created_at/updated_at

    protected $fillable = [
        'Nombre',
        'IdCiclo', // Relaciona con la tabla ciclo
    ];

    /**
     * Relación con el modelo Ciclo.
     * Un curso pertenece a un ciclo.
     */
    public function ciclo()
    {
        // belongsTo(Ciclo::class, 'IdCiclo', 'IdCiclo')
        // 1er parámetro: Modelo al que pertenece
        // 2do parámetro: llave foránea en esta tabla
        // 3er parámetro: llave primaria en la tabla referenciada
        return $this->belongsTo(Ciclo::class, 'IdCiclo', 'IdCiclo');
    }
}
