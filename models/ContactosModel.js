const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class ContactosModel {
  constructor() {
    this.dbPath = path.resolve(__dirname, 'contactos.db');
    this.db = new sqlite3.Database(this.dbPath, (err) => {
      if (err) {
        console.error('Error al conectar con la base de datos:', err);
      } else {
        this.createTable();
      }
    });
  }

  createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS contactos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        email TEXT,
        comentario TEXT,
        ip TEXT,
        fecha TEXT,
        hora TEXT
      )
    `;
    this.db.run(query, (err) => {
      if (err) {
        console.error('Error al crear la tabla:', err);
      }
    });
  }

  addContact(data) {
    const query = `
      INSERT INTO contactos (nombre, email, comentario, ip, fecha, hora)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [data.nombre, data.email, data.comentario, data.ip, data.fecha, data.hora];
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  getContacts() {
    const query = `SELECT * FROM contactos`;
    return new Promise((resolve, reject) => {
      this.db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  getContactById(id) {
    const query = `SELECT * FROM contactos WHERE id = ?`;
    return new Promise((resolve, reject) => {
      this.db.get(query, [id], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }

  updateContact(id, data) {
    const query = `
      UPDATE contactos
      SET nombre = ?, email = ?, comentario = ?, ip = ?, fecha = ?, hora = ?
      WHERE id = ?
    `;
    const params = [data.nombre, data.email, data.comentario, data.ip, data.fecha, data.hora, id];
    return new Promise((resolve, reject) => {
      this.db.run(query, params, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }

  deleteContact(id) {
    const query = `DELETE FROM contactos WHERE id = ?`;
    return new Promise((resolve, reject) => {
      this.db.run(query, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.changes);
        }
      });
    });
  }
}

module.exports = ContactosModel;