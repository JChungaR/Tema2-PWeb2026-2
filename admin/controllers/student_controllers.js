// admin/controllers/student_controllers.js

export function home(req, res) {
    return res.render('estudiantes/home', {
        title: 'Estudiantes',
        /*currentPage: 'home',
        description:
            'Esta es una aplicación de ejemplo creada con Node.js, Express y EJS.'*/
    });
}