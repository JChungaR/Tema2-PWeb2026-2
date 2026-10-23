// admin/configs/routes.js
import { Router } from 'express';
import * as admins from '../controllers/admin_controllers.js';


import * as student from '../controllers/student_controllers.js';

import * as enterpriseEsp from '../controllers/enterpriseEsp_controllers.js';


import * as nationApis from '../apis/nations_apis.js';

import { redirectIfAuthenticated, requireAuth, soloRolEncargado, soloRolEstudiante } from '../../configs/middlewares.js';

const router = Router();

// react views
router.get('/admin', requireAuth, admins.home);
router.get('/admin/players', requireAuth, admins.home);
router.get('/admin/teams', requireAuth, admins.home);
router.get('/admin/leagues', requireAuth, admins.home);
router.get('/admin/nations', requireAuth, admins.home);
router.get('/admin/catalogs', requireAuth, admins.home);
// api nations
router.get('/api/v1/nations', nationApis.listNations);
router.get('/api/v1/nations/:id', nationApis.getNationById);
router.post('/api/v1/nations', nationApis.createNation);
router.put('/api/v1/nations/:id', nationApis.updateNation);
router.delete('/api/v1/nations/:id', nationApis.deleteNation);

//estudiante
router.get('/estudiante', soloRolEstudiante, student.home);
router.get('/estudiante/mi-cuenta', soloRolEstudiante, student.home);
router.get('/estudiante/confirmacion-reserva', soloRolEstudiante, student.home)
router.get('/estudiante/mis-reservas', soloRolEstudiante, student.home);
router.get('/estudiante/confirmacion', soloRolEstudiante, student.home);
router.get('/estudiante/detalle', soloRolEstudiante, student.home);
router.get('/estudiante/detalle/:id', soloRolEstudiante, student.home);
router.get('/estudiante/disponibilidad', soloRolEstudiante, student.home);
router.get('/estudiante/mis-incidencias', soloRolEstudiante, student.home);

router.get('/estudiante/reportar-incidencia', soloRolEstudiante, student.home);


//
router.get('/enterprise/espacios', soloRolEncargado, enterpriseEsp.espacios);
// para recargarrr
router.get('/enterprise/bandeja', soloRolEncargado, enterpriseEsp.espacios);
router.get('/enterprise/bloqueos', soloRolEncargado, enterpriseEsp.espacios);

router.get('/enterprise/incidencias', soloRolEncargado, enterpriseEsp.espacios); 

router.get('/enterprise/incidencias/detalle/:codigo', soloRolEncargado, enterpriseEsp.espacios);

router.get('/enterprise/', soloRolEncargado, enterpriseEsp.espacios);
router.get('/enterprise/espacios/nuevo', soloRolEncargado, enterpriseEsp.espacios);
router.get('/enterprise/espacios/equipamiento/:codigo',soloRolEncargado, enterpriseEsp.espacios);
router.get('/enterprise/espacios/horario/:codigo', soloRolEncargado, enterpriseEsp.espacios);
router.get('/enterprise/espacios/estado/:codigo', soloRolEncargado, enterpriseEsp.espacios);
router.get('/enterprise/bandeja/sin-reservas', soloRolEncargado, enterpriseEsp.espacios);
router.get('/enterprise/bandeja/registro', soloRolEncargado, enterpriseEsp.espacios);
router.get('/enterprise/reservas/buscar',soloRolEncargado, enterpriseEsp.espacios)


export default router;