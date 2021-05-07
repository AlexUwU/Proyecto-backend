const { Schema, model } = require('mongoose');

const SolicitudSchema = new Schema({
    titulo: { type: String},
    descripcion: { type: String}
});

module.exports = model('Solicitud', SolicitudSchema);