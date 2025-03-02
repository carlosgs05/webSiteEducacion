<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImagenesNoticia extends Model
{
    use HasFactory;

    protected $table = 'imagenes_noticia';
    protected $primaryKey = 'IdImagen';
    public $timestamps = false;

    protected $fillable = [
        'IdNoticia',
        'Imagen'
    ];

    public function noticia()
    {
        return $this->belongsTo(Noticia::class, 'IdNoticia', 'IdNoticia');
    }
}
