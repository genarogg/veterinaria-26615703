const ContactosModel = require('../models/ContactosModel');
const model = new ContactosModel();

class ContactosController {
  static async add(req, res) {
    const { nombre, email, comentario } = req.body;
    const ip = req.ip;
    const fecha = new Date().toISOString().split('T')[0]; 
    const hora = new Date().toTimeString().split(' ')[0]; 

    if (!nombre || !email || !comentario) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
      await model.addContact({ nombre, email, comentario, ip, fecha, hora });
      res.status(200).json({ message: 'Mensaje enviado exitosamente' });
    } catch (error) {
      console.error('Error al guardar el contacto:', error);
      res.status(500).json({ message: 'Error al enviar el mensaje' });
    }
  }
}

module.exports = ContactosController;