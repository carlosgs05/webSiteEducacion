<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicacionPersona extends Model
{
    use HasFactory;

    // Nombre de la tabla
    protected $table = 'publiclacion_persona';

    // Clave primaria
    protected $primaryKey = 'IdPublicacion';

    // Desactiva timestamps si no los usas
    public $timestamps = false;

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'IdPersona',
        'Titulo',
        'Url',
    ];

    /**
     * Relación inversa: muchas publicaciones -> 1 Persona.
     */
    public function persona()
    {
        // belongsTo: N PublicacionPersona -> 1 Persona
        return $this->belongsTo(Persona::class, 'IdPersona', 'IdPersona');
    }
}

