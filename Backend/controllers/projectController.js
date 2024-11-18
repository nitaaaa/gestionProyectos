const db = require('../config/db'); // Asegúrate de tener configurada tu conexión a MySQL

// Obtener todos los proyectos
exports.getProjects = async (req, res) => {
    try {
        const [projects] = await db.query('SELECT * FROM proyectos');
        
        // Para cada proyecto, obtenemos sus tareas asociadas
        for (let project of projects) {
            const [tasks] = await db.query('SELECT * FROM tareas WHERE proyecto_id = ?', [project.id]);
            project.tareas = tasks; // Asignamos las tareas al proyecto
        }

        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los proyectos' });
    }
};

// Crear un nuevo proyecto
exports.createProject = async (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'El campo nombre es obligatorio' });
    }

    try {
        const [result] = await db.query(
            'INSERT INTO proyectos (nombre, descripcion) VALUES (?, ?)',
            [nombre, descripcion]
        );
        const newProject = {
            id: result.insertId,
            nombre,
            descripcion
        };
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el proyecto' });
    }
};

// Actualizar un proyecto existente
exports.updateProject = async (req, res) => {
    const projectId = parseInt(req.params.id);
    const { nombre, descripcion } = req.body;

    if (!nombre) {
        return res.status(400).json({ error: 'El campo nombre es obligatorio' });
    }

    try {
        const [result] = await db.query(
            'UPDATE proyectos SET nombre = ?, descripcion = ? WHERE id = ?',
            [nombre, descripcion, projectId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        res.json({ id: projectId, nombre, descripcion });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el proyecto' });
    }
};

// Eliminar un proyecto
exports.deleteProject = async (req, res) => {
    const projectId = parseInt(req.params.id);

    try {
        const [result] = await db.query('DELETE FROM proyectos WHERE id = ?', [projectId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        res.json({ message: 'Proyecto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el proyecto' });
    }
};
