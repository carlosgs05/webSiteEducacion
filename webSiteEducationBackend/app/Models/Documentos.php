<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documentos extends Model
{
    use HasFactory;

    protected $table = 'documentos'; // Nombre de la tabla
    protected $primaryKey = 'IdDocumento'; // Clave primaria
    public $timestamps = false; // Habilitar timestamps

    protected $fillable = [
        'Titulo',
        'Descripcion',
        'Url',
    ];
}
