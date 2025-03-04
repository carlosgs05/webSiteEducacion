<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ciclo extends Model
{
    protected $table = 'ciclo';          // Nombre de la tabla
    protected $primaryKey = 'IdCiclo';   // Llave primaria
    public $timestamps = false;          // Asumiendo que no usas created_at/updated_at

    protected $fillable = [
        'Ciclo', // Campo con el nombre del ciclo
    ];
}