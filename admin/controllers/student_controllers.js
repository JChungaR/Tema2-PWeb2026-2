// admin/controllers/student_controllers.js

export function home(req, res) {
    return res.render('estudiante/home', {
        title: 'Estudiante',
        /*currentPage: 'home',
        description:
            'Esta es una aplicación de ejemplo creada con Node.js, Express y EJS.'*/
    });
}