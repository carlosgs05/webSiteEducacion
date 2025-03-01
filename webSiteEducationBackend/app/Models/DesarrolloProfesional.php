<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DesarrolloProfesional extends Model
{
    use HasFactory;
    protected $table = 'desarrollo_profesional';
    protected $primaryKey = 'IdDesarrollo';
    public $timestamps = false;
    protected $fillable = ['Descripcion', 'Imagen', 'Url', 'Tipo', 'Fecha'];

}
