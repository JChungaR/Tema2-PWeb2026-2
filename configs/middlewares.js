// configs/middlewares.js

import { hasRole } from '../configs/helpers.js';

/**
 * Middleware para manejar errores 404
 * Si es una petición API (empieza con /api) devuelve JSON
 * Si es una petición web normal devuelve la vista 404
 */
export function notFoundHandler(req, res) {
  // Verificar si es una petición a la API
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({
      success: false,
      message: 'Recurso no encontrado',
      data: null,
      error: 'Error 404'
    });
  }
  
  // Para peticiones no-API (y solo GET) renderizar vista 404
  if (req.method === 'GET') {
    return res.status(404).render('404', {
      title: 'Página no encontrada',
      message: 'La página que buscas no existe.',
      currentPage: '404'
    });
  }
  
  // Para otros métodos HTTP en rutas no-API
  return res.status(404).json({
    success: false,
    message: 'Recurso no encontrado',
    data: null,
    error: 'Error 404'
  });
}

/**
 * Middleware para manejo de errores generales
 * (Opcional - puedes expandirlo según necesites)
 */
export function errorHandler(err, req, res, next) {
  console.error('Error:', err.stack || err);
  
  // Determinar si es una petición API
  const isApiRequest = req.path.startsWith('/api/');
  
  const statusCode = err.statusCode || 500;
  
  if (isApiRequest) {
    return res.status(statusCode).json({
      success: false,
      message: err.message || 'Error interno del servidor',
      data: null,
      error: `Error ${statusCode}`
    });
  }
  
  // Para peticiones web
  res.status(statusCode).render('error', {
    title: 'Error',
    message: err.message || 'Ha ocurrido un error inesperado.',
    statusCode: statusCode
  });
}

export function requireAuth(req, res, next) {
  // Verificar si es una petición API
  const isApiRequest = req.path.startsWith('/api/');
  
  // Verificar si el usuario tiene sesión activa
  const isAuthenticated = req.session && req.session.correo && req.session.role && req.session.password;
  if (isAuthenticated) {
    // Si está autenticado, continuar
    return next();
  }
  
  // Si NO está autenticado y es la ruta raíz '/'
  if (req.path === '/') {
    // Redireccionar a sign-in
    return res.redirect('/sign-in');
  }
  
  // Si NO está autenticado
  if (isApiRequest || req.method !== 'GET') {
    // Para APIs o métodos no-GET, devolver JSON
    return res.status(401).json({
      success: false,
      message: 'Acceso no autorizado',
      data: null,
      error: 'Error 401: No autenticado'
    });
  }
  
  // Para peticiones GET no-API, mostrar vista 401
  return res.status(401).render('401', {
    title: 'Acceso no autorizado',
    message: 'Debes iniciar sesión para acceder a esta página.',
    statusCode: 401,
    clase: 'hidden'
  });
}

// configs/middlewares.js
/** 
 * Middleware para redirigir a usuarios autenticados
 * Si el usuario ya tiene sesión activa, lo redirige a la página principal
 */
export function redirectIfAuthenticated(req, res, next) {
  // Verificar si el usuario tiene sesión activa
  const isAuthenticated = req.session && req.session.user && req.session.user.id;
  
  // Si está autenticado Y está intentando acceder a rutas de autenticación
  const isAuthRoute = [
    '/sign-in',
    '/sign-up',
    '/login',
    '/register',
    '/reset-password'
  ].some(route => req.path === route);
  
  if (isAuthenticated && isAuthRoute) {
    // Redirigir al home si ya está logueado y quiere acceder a rutas de auth
    return res.redirect('/');
  }
  
  // Si no está autenticado o no es una ruta de auth, continuar
  next();
}

export function redirectIfLogin(req, res, next) {
  // Verificar si el usuario tiene sesión activa
  const isAuthenticated = req.session && req.session.correo && req.session.role && req.session.password;
  
  // Si está autenticado Y está intentando acceder a rutas de autenticación
  const isAuthRoute = [
    '/sign-in',
    '/sign-up',
    '/',
    '/reglamento',
    '/mesa-de-ayuda',
    '/spaces',
    '/recover-password',
    '/sign-up',
    '/sign-up/student',
    '/sign-up/staff',
    '/cuenta-creada',
  ].some(route => req.path === route);
  
  if (isAuthenticated && isAuthRoute) {
    // Redirigir al home si ya está logueado y quiere acceder a rutas de auth
    if(req.session.role == 'estudiante'){
      return res.redirect('/estudiante');
    }
    else if(req.session.role == 'encargado'){
      return res.redirect('/enterprise/');
    }
  }
  
  // Si no está autenticado o no es una ruta de auth, continuar
  next();
}

function rutaInicioPorRol(role) {
  if (role === 'estudiante') return '/estudiante';
  if (role === 'encargado') return '/enterprise/';
  return '/'; // sin sesión
}

export function soloRolEstudiante(req, res, next) {
  // Verificar si el usuario tiene sesión activa
  const role = req.session.role;
  
  if (role != 'estudiante') {
      return res.status(401).render('401', {
        title: 'Acceso no autorizado',
        message: 'Debes tener el rol de estudiante',
        statusCode: 401,
        rutaInicio: rutaInicioPorRol(role),
        
        
    });
  }
  
  // Si no está autenticado o no es una ruta de auth, continuar
  next();
}

export function soloRolEncargado(req, res, next) {
  // Verificar si el usuario tiene sesión activa
  const role = req.session.role;
  
  if (role != 'encargado') {
      return res.status(401).render('401', {
        title: 'Acceso no autorizado',
        message: 'Debes tener el rol de encargado',
        statusCode: 401,
        rutaInicio: rutaInicioPorRol(role),
        
        
    });
  }
  
  // Si no está autenticado o no es una ruta de auth, continuar
  next();
}

export function viewFlash(req, res, next) {
  res.locals.successMessage = req.flash('success');
  res.locals.errorMessage = req.flash('error');
  next();
}

export function viewSession(req, res, next) {
  res.locals.session = req.session;
  res.locals.user = req.session?.user || null;
  res.locals.isAuthenticated = !!req.session?.user?.id;

  next();
}

export function viewEnv(req, res, next) {
  res.locals.BASE_URL = process.env.BASE_URL || '/';
  res.locals.STATIC_URL = process.env.STATIC_URL || '/';
  res.locals.FILES_URL = process.env.URL_FILES_SERVICE || '/';
  res.locals.ACCESS_URL = process.env.URL_ACCESS_SERVICE || '/';
    
  next();
}

export function viewHelpers(req, res, next) {
  res.locals.hasRole = (roleName) => 
    hasRole(req.session, roleName);
  res.locals.roleHasPermission = (role, permission) =>
    roleHasPermission(req.session, role, permission);

  next();
}