const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Rutas para los proyectos
router.get('/', projectController.getProjects);          // Obtener todos los proyectos
router.post('/', projectController.createProject);       // Crear un nuevo proyecto
router.put('/:id', projectController.updateProject);     // Actualizar un proyecto existente
router.delete('/:id', projectController.deleteProject);  // Eliminar un proyecto

module.exports = router;
