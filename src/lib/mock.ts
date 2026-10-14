export const cliente = {
  nombre: "Andrea",
  iniciales: "AR",
  nombreCorto: "Andrea R.",
  nivel: "Plata",
  siguienteNivel: "Oro",
  puntos: 1240,
  puntosSiguienteNivel: 1500,
  clienteDesde: "mar. 2026",
};

export const visitaActiva = {
  local: "Discoteca [Nombre]",
  checkIn: "23:14",
  validaHasta: "6:00 a. m.",
  bonoEntrada: 20,
  visitasMes: 3,
};

export type Premio = {
  id: number;
  nombre: string;
  lugar: string;
  costo: number;
  categoria: "Tragos" | "Descuentos" | "Experiencias";
};

export const premios: Premio[] = [
  { id: 1, nombre: "Trago de la casa", lugar: "Cualquier barra", costo: 150, categoria: "Tragos" },
  { id: 2, nombre: "Shot doble", lugar: "Discoteca [Nombre]", costo: 220, categoria: "Tragos" },
  { id: 3, nombre: "20% en tu cuenta", lugar: "Bar [Nombre]", costo: 400, categoria: "Descuentos" },
  { id: 4, nombre: "Entrada sin cola", lugar: "Discoteca [Nombre]", costo: 900, categoria: "Experiencias" },
  { id: 5, nombre: "Botella para la mesa", lugar: "Discoteca [Nombre]", costo: 2500, categoria: "Experiencias" },
];

export type EstadoMov = "Pendiente" | "Confirmada" | "Canje" | "Revertida";
export type Movimiento = { id: string; titulo: string; meta: string; puntos: number; estado: EstadoMov };

export const movimientos: { grupo: string; items: Movimiento[] }[] = [
  {
    grupo: "Esta noche",
    items: [
      { id: "a", titulo: "Compra · Barra 2", meta: "00:42 · Ticket B-10482 · S/ 64.00", puntos: 64, estado: "Pendiente" },
      { id: "b", titulo: "Compra · Barra 1", meta: "23:58 · Ticket B-10411 · S/ 38.00", puntos: 38, estado: "Pendiente" },
      { id: "c", titulo: "Bono de check-in", meta: "23:14 · Discoteca [Nombre]", puntos: 20, estado: "Confirmada" },
    ],
  },
  {
    grupo: "Sábado 10 oct",
    items: [
      { id: "d", titulo: "Canje · Trago de la casa", meta: "01:20 · Validado en Barra 1", puntos: -150, estado: "Canje" },
      { id: "e", titulo: "Compra · Bar [Nombre]", meta: "22:31 · Ticket A-55210 · S/ 120.00", puntos: 120, estado: "Confirmada" },
      { id: "f", titulo: "Compra · Barra 3", meta: "00:05 · Ticket B-09977 · S/ 45.00", puntos: 45, estado: "Revertida" },
    ],
  },
];

export const cajero = { nombre: "Carlos M.", punto: "Barra 2", turnoAbierto: true };

export const validacionesCaja = [
  { label: "QR válido y sin usar", valor: "OK" },
  { label: "Visita activa en este local", valor: "23:14" },
  { label: "Compras esta noche", valor: "2 de 5" },
  { label: "Última compra", valor: "hace 44 min" },
];

export const compraEjemplo = { monto: 64, ticket: "B-10482", puntos: 64 };

export const kpis = [
  { label: "Clientes activos", valor: "1,284", nota: "con al menos un check-in" },
  { label: "Visitas registradas", valor: "3,907", nota: "en los 7 locales" },
  { label: "Puntos emitidos", valor: "186,420", nota: "9% aún pendientes de conciliar" },
  { label: "Canjes", valor: "642", nota: "tragos, descuentos y experiencias" },
];

export const alertas = [
  { severidad: "Alta", motivo: "Mismo par cajero–cliente 9 veces en 3 noches", quien: "Carlos M. · Luis P." },
  { severidad: "Alta", motivo: "Ticket B-09977 no existe en ventas", quien: "Rosa T. · Diego F." },
  { severidad: "Media", motivo: "Cliente reportó compra no reconocida", quien: "Carlos M. · Andrea R." },
];

export const puntosPorLocal = [
  { local: "Discoteca [Nombre]", puntos: 82400 },
  { local: "Bar [Nombre]", puntos: 41250 },
  { local: "Empresa 3", puntos: 28900 },
  { local: "Empresa 4", puntos: 19870 },
  { local: "Empresa 5", puntos: 14000 },
];

export const conciliacion = {
  ultimoCierre: "Dom 11 oct · Discoteca",
  conciliadas: 412,
  sinTicket: 6,
  montoDistinto: 2,
};
