<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Noticia extends Model
{
    use HasFactory;

    protected $table = 'noticia'; 
    protected $primaryKey = 'IdNoticia'; 
    public $timestamps = false;  

    protected $fillable = [
        'Nombre',
        'Fecha',
        'ImagenPortada',
        'Encabezado',
        'Descripcion'
    ];
    public function imagenes()
    {
        return $this->hasMany(ImagenesNoticia::class, 'IdNoticia', 'IdNoticia');
    }
}
