// admin/configs/routes.js
import { Router } from 'express';
import * as admins from '../controllers/admin_controllers.js';
import * as students from '../controllers/student_controllers.js';
//
import * as enterpriseEsp from '../controllers/enterpriseEsp_controllers.js';
//

import * as nationApis from '../apis/nations_apis.js';

import { redirectIfAuthenticated, requireAuth } from '../../configs/middlewares.js'; 

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

router.get('/estudiantes', students.home);


//
router.get('/enterprise/espacios', enterpriseEsp.espacios);
// para recargarrr
router.get('/enterprise/bandeja', enterpriseEsp.espacios);
router.get('/enterprise/bloqueos', enterpriseEsp.espacios);
router.get('/enterprise/incidencias', enterpriseEsp.espacios);
router.get('/enterprise/', enterpriseEsp.espacios);
router.get('/enterprise/espacios/nuevo', enterpriseEsp.espacios);
router.get('/enterprise/espacios/equipamiento/:codigo', enterpriseEsp.espacios);
router.get('/enterprise/espacios/horario/:codigo', enterpriseEsp.espacios);
router.get('/enterprise/espacios/estado/:codigo', enterpriseEsp.espacios);


export default router;