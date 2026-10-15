// admin/controllers/enterprise_controllers.js

export function espacios(req, res) {
    return res.render('enterpriseEspa/home', {
        title: 'Espacios',
        /*currentPage: 'home',
        description:
            'Esta es una aplicación de ejemplo creada con Node.js, Express y EJS.'*/
    });
}