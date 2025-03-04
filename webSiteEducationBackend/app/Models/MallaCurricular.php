<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MallaCurricular extends Model
{
    // Si tu tabla no sigue el estándar "malla_curriculars" 
    // o no se llama "malla_curriculars", especifica el nombre:
    protected $table = 'malla_curricular';

    // Si tu llave primaria no es 'id', defínela:
    protected $primaryKey = 'idMallaCurricular';

    // Si no usas timestamps (created_at, updated_at), desactívalos:
    public $timestamps = false;

    // Define los campos que se pueden asignar masivamente
    protected $fillable = [
        'nombreMalla',
        'pdfMalla',
    ];
}