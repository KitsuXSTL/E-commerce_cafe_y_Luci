const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true,
    maxlength: [120, 'El nombre no puede superar los 120 caracteres']
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es obligatoria'],
    trim: true,
    maxlength: [1000, 'La descripción no puede superar los 1000 caracteres']
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
    min: [0, 'El stock no puede ser negativo']
  },
  categoria: {
    type: String,
    required: [true, 'La categoría es obligatoria'],
    enum: {
      values: ['mochilas', 'sombreros', 'anchetas', 'bebidas', 'souvenirs', 'otros'],
      message: '{VALUE} no es una categoría válida'
    }
  },
  imagenes: [{ type: String }],
  artesano: { type: String, trim: true },
  material: { type: String, trim: true },
  origen: { type: String, trim: true },
  activo: { type: Boolean, default: true }
}, {
  timestamps: true
});

productSchema.index({ nombre: 'text', descripcion: 'text' });

module.exports = mongoose.model('Product', productSchema);