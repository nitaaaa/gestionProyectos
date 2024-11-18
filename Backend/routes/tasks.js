const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Rutas de tareas
router.get('/', taskController.getTasks);       // GET - Leer tareas
router.post('/', taskController.createTask);    // POST - Crear nueva tarea
router.put('/:id', taskController.updateTask);  // PUT - Actualizar tarea
router.delete('/:id', taskController.deleteTask);   // DELETE - Eliminar tarea

module.exports = router;
