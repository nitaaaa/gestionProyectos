const db = require('../config/db');

// Obtener todas las tareas
exports.getTasks = async (req, res) => {
    try {
        const [tasks] = await db.query('SELECT * FROM tareas');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las tareas' });
    }
};

// Crear una nueva tarea
exports.createTask = async (req, res) => {
    const { titulo, descripcion, estado = 'pendiente', prioridad = 'media' } = req.body;

    try {
        const [result] = await db.query(
            'INSERT INTO tareas (titulo, descripcion, estado, prioridad) VALUES (?, ?, ?, ?)',
            [titulo, descripcion, estado, prioridad]
        );
        const newTask = { id: result.insertId, titulo, descripcion, estado, prioridad };
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
    const taskId = parseInt(req.params.id);
    const { titulo, descripcion, estado, prioridad } = req.body;

    try {
        const [result] = await db.query(
            'UPDATE tareas SET titulo = ?, descripcion = ?, estado = ?, prioridad = ? WHERE id = ?',
            [titulo, descripcion, estado, prioridad, taskId]
        );

        if (result.affectedRows === 0) return res.status(404).json({ error: 'Tarea no encontrada' });

        res.json({ id: taskId, titulo, descripcion, estado, prioridad });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
};

// Elimina una tarea
exports.deleteTask = async (req, res) => {
    const taskId = parseInt(req.params.id);

    try {
        const [result] = await db.query(
            'DELETE FROM tareas WHERE id = ?',
            [taskId]
        );

        if (result.affectedRows === 0) return res.status(404).json({ error: 'Tarea no encontrada' });

        res.json({ message: 'Tarea eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
};

