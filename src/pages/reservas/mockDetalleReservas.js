// src/pages/reservas/mockDetalleReservas.js
// Detalles indexados por id (coinciden con MOCK_RESERVAS de MisReservas.jsx)

export const MOCK_DETALLES = {
    // 1 · Confirmada
    '1': {
        id: '1',
        codigo: 'RSV-2026-0473',
        estado: 'Confirmada',
        fechaRegistro: '12/09/2026 a las 20:14',
        espacio: 'Laboratorio de Cómputo H-304',
        ubicacion: 'Edificio de Ingeniería, piso 3',
        fecha: '14/09/2026',
        bloque: '10:00 – 11:00',
        motivo: 'Avance del proyecto final de Programación Web',
        invitadosCount: 3,
        invitadosCapacidad: 29,
        invitados: [
            { nombre: 'Diego Salazar Mendoza', email: 'diego.salazar@ulima.edu.pe' },
            { nombre: 'Valeria Chávez Ríos', email: 'valeria.chavez@ulima.edu.pe' },
            { nombre: 'Renzo Paredes Núñez', email: 'renzo.paredes@ulima.edu.pe' },
        ],
        trazabilidad: [
            { titulo: 'Reserva creada', detalle: '12/09/2026 20:14 · Camila Rojas', completado: true },
            { titulo: 'Invitados notificados', detalle: '12/09/2026 20:15 · Sistema', completado: true },
            { titulo: 'Estado: confirmada', detalle: '13/09/2026 08:00 · Sistema', completado: true },
            { titulo: 'Registro de llegada', detalle: 'Pendiente · tolerancia hasta 10:15', completado: false },
        ],
        permitirCancelar: true,
        notaCancelacion: 'Puedes cancelar hasta las 08:00 del 14/09/2026 sin acumular inasistencias.',
    },

    // 2 · Confirmada
    '2': {
        id: '2',
        codigo: 'RSV-2026-0455',
        estado: 'Confirmada',
        fechaRegistro: '10/09/2026 a las 16:42',
        espacio: 'Sala de Estudio Grupal E-201',
        ubicacion: 'Pabellón E, piso 2',
        fecha: '15/09/2026',
        bloque: '18:00 – 19:00',
        motivo: 'Preparación del examen parcial de Estadística',
        invitadosCount: 5,
        invitadosCapacidad: 8,
        invitados: [
            { nombre: 'Andrea Quispe Flores', email: 'andrea.quispe@ulima.edu.pe' },
            { nombre: 'Matías Torres León', email: 'matias.torres@ulima.edu.pe' },
            { nombre: 'Lucía Fernández Vega', email: 'lucia.fernandez@ulima.edu.pe' },
            { nombre: 'Sebastián Ortega Díaz', email: 'sebastian.ortega@ulima.edu.pe' },
            { nombre: 'Fiorella Mejía Campos', email: 'fiorella.mejia@ulima.edu.pe' },
        ],
        trazabilidad: [
            { titulo: 'Reserva creada', detalle: '10/09/2026 16:42 · Camila Rojas', completado: true },
            { titulo: 'Invitados notificados', detalle: '10/09/2026 16:43 · Sistema', completado: true },
            { titulo: 'Estado: confirmada', detalle: '11/09/2026 08:00 · Sistema', completado: true },
            { titulo: 'Registro de llegada', detalle: 'Pendiente · tolerancia hasta 18:15', completado: false },
        ],
        permitirCancelar: true,
        notaCancelacion: 'Puedes cancelar hasta las 08:00 del 15/09/2026 sin acumular inasistencias.',
    },

    // 3 · En curso
    '3': {
        id: '3',
        codigo: 'RSV-2026-0468',
        estado: 'En curso',
        fechaRegistro: '11/09/2026 a las 09:30',
        espacio: 'Cabina de Grabación N-105',
        ubicacion: 'Pabellón N, piso 1',
        fecha: '14/09/2026',
        bloque: '09:00 – 10:00',
        motivo: 'Grabación del podcast para el curso de Comunicación Digital',
        invitadosCount: 1,
        invitadosCapacidad: 4,
        invitados: [
            { nombre: 'Gabriela Núñez Salas', email: 'gabriela.nunez@ulima.edu.pe' },
        ],
        trazabilidad: [
            { titulo: 'Reserva creada', detalle: '11/09/2026 09:30 · Camila Rojas', completado: true },
            { titulo: 'Invitados notificados', detalle: '11/09/2026 09:31 · Sistema', completado: true },
            { titulo: 'Estado: confirmada', detalle: '12/09/2026 08:00 · Sistema', completado: true },
            { titulo: 'Registro de llegada', detalle: '14/09/2026 09:03 · Jorge Ramírez', completado: true },
            { titulo: 'Estado: en curso', detalle: '14/09/2026 09:03 · Sistema', completado: true },
        ],
        permitirCancelar: false,
        notaCancelacion: null,
    },

    // 4 · Confirmada
    '4': {
        id: '4',
        codigo: 'RSV-2026-0480',
        estado: 'Confirmada',
        fechaRegistro: '13/09/2026 a las 11:05',
        espacio: 'Sala de Reuniones A-410',
        ubicacion: 'Pabellón A, piso 4',
        fecha: '17/09/2026',
        bloque: '14:00 – 15:00',
        motivo: 'Reunión de coordinación del equipo de Tesis',
        invitadosCount: 7,
        invitadosCapacidad: 12,
        invitados: [
            { nombre: 'Rodrigo Castillo Peña', email: 'rodrigo.castillo@ulima.edu.pe' },
            { nombre: 'Mariana Huamán Soto', email: 'mariana.huaman@ulima.edu.pe' },
            { nombre: 'Joaquín Rivas Medina', email: 'joaquin.rivas@ulima.edu.pe' },
            { nombre: 'Daniela Paredes Aguilar', email: 'daniela.paredes@ulima.edu.pe' },
            { nombre: 'Álvaro Benites Cruz', email: 'alvaro.benites@ulima.edu.pe' },
            { nombre: 'Camila Vargas Lozano', email: 'camila.vargas@ulima.edu.pe' },
            { nombre: 'Nicolás Espinoza Rey', email: 'nicolas.espinoza@ulima.edu.pe' },
        ],
        trazabilidad: [
            { titulo: 'Reserva creada', detalle: '13/09/2026 11:05 · Camila Rojas', completado: true },
            { titulo: 'Invitados notificados', detalle: '13/09/2026 11:06 · Sistema', completado: true },
            { titulo: 'Estado: confirmada', detalle: '13/09/2026 11:06 · Sistema', completado: true },
            { titulo: 'Registro de llegada', detalle: 'Pendiente · tolerancia hasta 14:15', completado: false },
        ],
        permitirCancelar: true,
        notaCancelacion: 'Puedes cancelar hasta las 08:00 del 17/09/2026 sin acumular inasistencias.',
    },

    // 5 · Atendida
    '5': {
        id: '5',
        codigo: 'RSV-2026-0402',
        estado: 'Atendida',
        fechaRegistro: '05/09/2026 a las 18:20',
        espacio: 'Sala Biblioteca B-102',
        ubicacion: 'Biblioteca, piso 1',
        fecha: '08/09/2026',
        bloque: '11:00 – 12:00',
        motivo: 'Trabajo grupal de Investigación de Mercados',
        invitadosCount: 2,
        invitadosCapacidad: 10,
        invitados: [
            { nombre: 'Paola Zegarra Linares', email: 'paola.zegarra@ulima.edu.pe' },
            { nombre: 'Iván Delgado Rojas', email: 'ivan.delgado@ulima.edu.pe' },
        ],
        trazabilidad: [
            { titulo: 'Reserva creada', detalle: '05/09/2026 18:20 · Camila Rojas', completado: true },
            { titulo: 'Invitados notificados', detalle: '05/09/2026 18:21 · Sistema', completado: true },
            { titulo: 'Estado: confirmada', detalle: '06/09/2026 08:00 · Sistema', completado: true },
            { titulo: 'Registro de llegada', detalle: '08/09/2026 11:04 · Personal de biblioteca', completado: true },
            { titulo: 'Estado: atendida', detalle: '08/09/2026 12:00 · Sistema', completado: true },
        ],
        permitirCancelar: false,
        notaCancelacion: null,
    },

    // 6 · Inasistencia
    '6': {
        id: '6',
        codigo: 'RSV-2026-0367',
        estado: 'Inasistencia',
        fechaRegistro: '31/08/2026 a las 14:10',
        espacio: 'Laboratorio de Redes H-201',
        ubicacion: 'Edificio de Ingeniería, piso 2',
        fecha: '03/09/2026',
        bloque: '16:00 – 17:00',
        motivo: 'Práctica de configuración de routers para Redes de Computadoras',
        invitadosCount: 3,
        invitadosCapacidad: 30,
        invitados: [
            { nombre: 'Esteban Morales Gil', email: 'esteban.morales@ulima.edu.pe' },
            { nombre: 'Karen Alvarado Pinto', email: 'karen.alvarado@ulima.edu.pe' },
            { nombre: 'Franco Lazo Valdivia', email: 'franco.lazo@ulima.edu.pe' },
        ],
        trazabilidad: [
            { titulo: 'Reserva creada', detalle: '31/08/2026 14:10 · Camila Rojas', completado: true },
            { titulo: 'Invitados notificados', detalle: '31/08/2026 14:11 · Sistema', completado: true },
            { titulo: 'Estado: confirmada', detalle: '01/09/2026 08:00 · Sistema', completado: true },
            { titulo: 'Registro de llegada', detalle: 'No registrada · tolerancia vencida 16:15', completado: false },
            { titulo: 'Estado: inasistencia', detalle: '03/09/2026 16:30 · Jorge Ramírez', completado: true },
        ],
        permitirCancelar: false,
        notaCancelacion: null,
    },
};

// Compatibilidad con el export anterior
export const MOCK_DETALLE_RESERVA = MOCK_DETALLES['1'];