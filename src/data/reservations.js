// src/data/reservations.js

const reservations = [

  // =====================================================
  // LABORATORIO DE CÓMPUTO H-304
  // 5 reservas
  // =====================================================

  {
    id: 1,

    reservationCode: 'RSV-2026-0469',

    date: '14/09/2026',

    startTime: '07:00',
    endTime: '08:00',

    student: 'Diego Salazar Mendoza',

    studentCode: '20218452',

    email: 'diego.salazar@ulima.edu.pe',

    accumulatedNoShows: 0,

    reason: 'Práctica de laboratorio',

    attendees: 2,

    guests: [],

    status: 'Atendida',

    arrivalTime: '07:03',

    space: {
      code: 'H-304',
      name: 'Laboratorio de Cómputo H-304',
      location: 'Edificio de Ingeniería'
    }
  },


  {
    id: 2,

    reservationCode: 'RSV-2026-0470',

    date: '14/09/2026',

    startTime: '09:00',
    endTime: '10:00',

    student: 'Lucía Ferreyra Ocampo',

    studentCode: '20217634',

    email: 'lucia.ferreyra@ulima.edu.pe',

    accumulatedNoShows: 1,

    reason: 'Taller de bases de datos',

    attendees: 12,

    guests: [],

    status: 'Atendida',

    arrivalTime: '09:01',

    space: {
      code: 'H-304',
      name: 'Laboratorio de Cómputo H-304',
      location: 'Edificio de Ingeniería'
    }
  },


  {
    id: 3,

    reservationCode: 'RSV-2026-0473',

    date: '14/09/2026',

    startTime: '10:00',
    endTime: '11:00',

    student: 'Camila Rojas Quispe',

    studentCode: '20221534',

    email: 'camila.rojas@ulima.edu.pe',

    accumulatedNoShows: 1,

    reason: 'Avance del proyecto final',

    fullReason:
      'Avance del proyecto final de Programación Web',

    attendees: 4,

    guests: [
      'Diego Salazar',
      'Valeria Chávez',
      'Renzo Paredes'
    ],

    status: 'Confirmada',

    minutesRemaining: 7,

    noShowAvailableAt: '10:15',

    space: {
      code: 'H-304',
      name: 'Laboratorio de Cómputo H-304',
      location: 'Edificio de Ingeniería'
    }
  },


  {
    id: 4,

    reservationCode: 'RSV-2026-0476',

    date: '14/09/2026',

    startTime: '15:00',
    endTime: '16:00',

    student: 'Renzo Paredes Núñez',

    studentCode: '20219871',

    email: 'renzo.paredes@ulima.edu.pe',

    accumulatedNoShows: 2,

    reason: 'Simulación de redes',

    attendees: 6,

    guests: [],

    status: 'Confirmada',

    space: {
      code: 'H-304',
      name: 'Laboratorio de Cómputo H-304',
      location: 'Edificio de Ingeniería'
    }
  },


  {
    id: 5,

    reservationCode: 'RSV-2026-0478',

    date: '14/09/2026',

    startTime: '18:00',
    endTime: '19:00',

    student: 'Joaquín Medina Herrera',

    studentCode: '20220341',

    email: 'joaquin.medina@ulima.edu.pe',

    accumulatedNoShows: 2,

    reason: 'Práctica de programación',

    attendees: 3,

    guests: [],

    status: 'Inasistencia',

    space: {
      code: 'H-304',
      name: 'Laboratorio de Cómputo H-304',
      location: 'Edificio de Ingeniería'
    }
  },


  // =====================================================
  // SALA DE ESTUDIO GRUPAL E-201
  // 4 reservas
  // =====================================================

  {
    id: 6,

    reservationCode: 'RSV-2026-0458',

    date: '14/09/2026',

    startTime: '08:00',
    endTime: '09:00',

    student: 'Valeria Chávez Ríos',

    studentCode: '20218765',

    email: 'valeria.chavez@ulima.edu.pe',

    accumulatedNoShows: 0,

    reason: 'Trabajo grupal de Marketing',

    attendees: 5,

    guests: [],

    status: 'Atendida',

    arrivalTime: '08:05',

    space: {
      code: 'E-201',
      name: 'Sala de Estudio Grupal E-201',
      location: 'Pabellón E'
    }
  },


  {
    id: 7,

    reservationCode: 'RSV-2026-0428',

    date: '14/09/2026',

    startTime: '11:00',
    endTime: '12:00',

    student: 'Sebastián Loayza Prado',

    studentCode: '20216784',

    email: 'sebastian.loayza@ulima.edu.pe',

    accumulatedNoShows: 0,

    reason: 'Preparación de exposición',

    attendees: 4,

    guests: [],

    status: 'Cancelada',

    cancellationSource: 'Estudiante',

    space: {
      code: 'E-201',
      name: 'Sala de Estudio Grupal E-201',
      location: 'Pabellón E'
    }
  },


  {
    id: 8,

    reservationCode: 'RSV-2026-0480',

    date: '14/09/2026',

    startTime: '16:00',
    endTime: '17:00',

    student: 'Mariana Tello Bustamante',

    studentCode: '20220118',

    email: 'mariana.tello@ulima.edu.pe',

    accumulatedNoShows: 1,

    reason: 'Asesoría de tesis',

    attendees: 3,

    guests: [],

    status: 'Confirmada',

    space: {
      code: 'E-201',
      name: 'Sala de Estudio Grupal E-201',
      location: 'Pabellón E'
    }
  },


  {
    id: 9,

    reservationCode: 'RSV-2026-0461',

    date: '14/09/2026',

    startTime: '17:00',
    endTime: '18:00',

    student: 'Andrea Villanueva Soto',

    studentCode: '20219087',

    email: 'andrea.villanueva@ulima.edu.pe',

    accumulatedNoShows: 2,

    reason: 'Laboratorio de sistemas operativos',

    attendees: 20,

    guests: [],

    status: 'Confirmada',

    lateMinutes: 16,

    space: {
      code: 'E-201',
      name: 'Sala de Estudio Grupal E-201',
      location: 'Pabellón E'
    }
  },


  // =====================================================
  // CABINA DE GRABACIÓN N-105
  // 3 reservas
  // =====================================================

  {
    id: 10,

    reservationCode: 'RSV-2026-0468',

    date: '14/09/2026',

    startTime: '09:00',
    endTime: '10:00',

    student: 'Camila Rojas Quispe',

    studentCode: '20221534',

    email: 'camila.rojas@ulima.edu.pe',

    accumulatedNoShows: 1,

    reason: 'Grabación de podcast',

    attendees: 2,

    guests: [],

    status: 'En curso',

    arrivalTime: '09:02',

    space: {
      code: 'N-105',
      name: 'Cabina de Grabación N-105',
      location: 'Pabellón N'
    }
  },


  {
    id: 11,

    reservationCode: 'RSV-2026-0483',

    date: '14/09/2026',

    startTime: '13:00',
    endTime: '14:00',

    student: 'Fernanda Zapata Vega',

    studentCode: '20221127',

    email: 'fernanda.zapata@ulima.edu.pe',

    accumulatedNoShows: 0,

    reason: 'Grabación de entrevista',

    attendees: 2,

    guests: [],

    status: 'Confirmada',

    space: {
      code: 'N-105',
      name: 'Cabina de Grabación N-105',
      location: 'Pabellón N'
    }
  },


  {
    id: 12,

    reservationCode: 'RSV-2026-0486',

    date: '14/09/2026',

    startTime: '15:00',
    endTime: '16:00',

    student: 'Gabriela Ñahui Ccama',

    studentCode: '20217463',

    email: 'gabriela.nahui@ulima.edu.pe',

    accumulatedNoShows: 0,

    reason: 'Grabación de presentación',

    attendees: 3,

    guests: [],

    status: 'Inasistencia',

    space: {
      code: 'N-105',
      name: 'Cabina de Grabación N-105',
      location: 'Pabellón N'
    }
  },


  // =====================================================
  // SALA DE REUNIONES A-410
  // 2 reservas adicionales para completar el total de 14
  // =====================================================

  {
    id: 13,

    reservationCode: 'RSV-2026-0488',

    date: '14/09/2026',

    startTime: '12:00',
    endTime: '13:00',

    student: 'Joaquín Medina Herrera',

    studentCode: '20220341',

    email: 'joaquin.medina@ulima.edu.pe',

    accumulatedNoShows: 2,

    reason: 'Reunión de proyecto',

    attendees: 5,

    guests: [],

    status: 'Atendida',

    arrivalTime: '12:04',

    space: {
      code: 'A-410',
      name: 'Sala de Reuniones A-410',
      location: 'Pabellón A'
    }
  },


  {
    id: 14,

    reservationCode: 'RSV-2026-0490',

    date: '14/09/2026',

    startTime: '18:00',
    endTime: '19:00',

    student: 'Álvaro Cárdenas Peña',

    studentCode: '20219456',

    email: 'alvaro.cardenas@ulima.edu.pe',

    accumulatedNoShows: 0,

    reason: 'Reunión de investigación',

    attendees: 6,

    guests: [],

    status: 'Confirmada',

    space: {
      code: 'A-410',
      name: 'Sala de Reuniones A-410',
      location: 'Pabellón A'
    }
  }

];


export default reservations;