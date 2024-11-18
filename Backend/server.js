const express = require('express');
const taskRoutes = require('./routes/tasks');
const projectRoutes = require('./routes/projects');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // Habilita CORS
app.use(express.json()); // Middleware para parsear JSON

// Ruta principal de la SPA
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API de gestión de tareas' });
});

// Ruta para las tareas
app.use('/api/tasks', taskRoutes);
// Ruta para los proyectos
app.use('/api/projects', projectRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
