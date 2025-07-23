<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $IdDesarrollo
 * @property string $Descripcion
 * @property string $Imagen
 * @property string $Url
 * @property string $Tipo
 * @property string $Fecha
 */
class DesarrolloProfesional extends Model
{
    use HasFactory;
    
    protected $table = 'desarrollo_profesional';
    protected $primaryKey = 'IdDesarrollo';
    public $timestamps = false;
    
    protected $fillable = [
        'Descripcion', 
        'Imagen', 
        'Url', 
        'Tipo', 
        'Fecha'
    ];
}