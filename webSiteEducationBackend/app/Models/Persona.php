<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Persona extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'persona';

    // Clave primaria
    protected $primaryKey = 'IdPersona';

    // Si no usas timestamps (created_at, updated_at), desactívalos:
    public $timestamps = false;

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'NombreCompleto',
        'Correo',
        'Cargo',
        'RolPersona',
        'Titulo',
        'Foto',
    ];

    /**
     * Relación 1:N (una Persona puede tener muchas publicaciones).
     */
    public function publicaciones()
    {
        // hasMany: 1 Persona -> muchas PublicacionPersona
        return $this->hasMany(PublicacionPersona::class, 'IdPersona', 'IdPersona');
    }
}
