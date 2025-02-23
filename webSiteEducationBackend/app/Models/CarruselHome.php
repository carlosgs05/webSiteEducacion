<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CarruselHome extends Model
{
    use HasFactory;

    // Nombre de la tabla en la base de datos
    protected $table = 'home_carrusel';

    // Clave primaria
    protected $primaryKey = 'idImagen';

    // Si no usas created_at y updated_at
    public $timestamps = false;

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'imagen'
    ];
}
