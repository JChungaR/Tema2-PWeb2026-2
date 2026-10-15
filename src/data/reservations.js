// src/data/reservations.js

const reservations = [
  {
    id: 1,
    code: 'RSV-2026-0473',
    startTime: '10:00',
    endTime: '11:00',
    student: 'Camila Rojas Quispe',
    reason: 'Avance del proyecto final',
    attendees: 4,
    status: 'Confirmada',

    space: {
      code: 'H-304',
      name: 'Laboratorio de Cómputo H-304',
      location: 'Edificio de Ingeniería'
    }
  },

  {
    id: 2,
    code: 'RSV-2026-0468',
    startTime: '09:00',
    endTime: '10:00',
    student: 'Lucía Ferreyra Ocampo',
    reason: 'Taller de bases de datos',
    attendees: 12,
    status: 'Atendida',

    space: {
      code: 'H-304',
      name: 'Laboratorio de Cómputo H-304',
      location: 'Edificio de Ingeniería'
    }
  },

  {
    id: 3,
    code: 'RSV-2026-0461',
    startTime: '17:00',
    endTime: '18:00',
    student: 'Andrea Villanueva Soto',
    reason: 'Laboratorio de sistemas operativos',
    attendees: 20,
    status: 'Confirmada',

    space: {
      code: 'E-201',
      name: 'Sala de Estudio Grupal E-201',
      location: 'Pabellón E'
    }
  }
];

export default reservations;