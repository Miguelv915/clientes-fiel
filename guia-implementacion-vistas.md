# Pulso — Guía de implementación de vistas (prototipo web)

> Objetivo de esta etapa: pasar los mockups a código web, **solo visual**, sin login, sin backend y sin permisos.
> Cada pantalla es una ruta accesible directamente, con datos de ejemplo. Se despliega para probarla en el celular y afinar detalles.
> Contexto funcional completo: ver `especificacion-fidelizacion.md`.

---

## 1. Alcance de esta fase

**Incluye**
- 8 vistas navegables por URL (cliente, cajero, admin).
- Estilos fieles al diseño (colores, tipografías, espaciados).
- Interacciones de interfaz sin servidor: QR que se renueva, pestañas, modal de canje, "No reconozco esta compra", confirmación del cajero.
- Datos simulados en un archivo (`lib/mock.ts`).
- Despliegue público para abrir desde el celular.

**No incluye (fases siguientes)**
- Registro, login, sesiones, roles y permisos.
- Base de datos, API, firma real del QR, lectura real de cámara.
- Conciliación real con el sistema de ventas.

---

## 2. Stack

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | Rutas por carpetas, despliegue directo en Vercel, luego crecerá con API routes. |
| Estilos | **Tailwind CSS v4** | Tokens del diseño en un solo lugar (`@theme`). |
| Tipografías | `next/font/google`: **Syne** (títulos) y **DM Sans** (texto) | Sin parpadeo de fuentes, sin `<link>` manual. |
| QR | `qrcode.react` | Genera un QR real a partir de un texto simulado. |
| Íconos | `lucide-react` | Íconos de trazo, iguales en estilo a los del mockup. |
| Hosting | **Vercel** | Gratis, URL HTTPS al instante, ideal para abrir en el celular. |

---

## 3. Crear el proyecto

```bash
npx create-next-app@latest pulso-web --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd pulso-web
npm install qrcode.react lucide-react
npm run dev
```

Para verlo en el celular **en tu red local** (antes de desplegar):

```bash
npm run dev -- -H 0.0.0.0
```

Luego abre en el celular `http://<IP-de-tu-PC>:3000` (misma red WiFi). En Windows la IP sale con `ipconfig`; en Mac/Linux con `ifconfig` o `ip a`.

---

## 4. Mapa de rutas

| Ruta | Vista | Mockup |
|---|---|---|
| `/` | Índice del prototipo (enlaces a todas las vistas) | — |
| `/app` | Cliente · Inicio | Main |
| `/app/check-in` | Cliente · Check-in confirmado | CheckIn |
| `/app/qr` | Cliente · Mi QR dinámico | MiQR |
| `/app/premios` | Cliente · Premios y canje | Premios |
| `/app/movimientos` | Cliente · Movimientos | Movimientos |
| `/caja` | Cajero · Escanear | CajaEscanear |
| `/caja/confirmar` | Cajero · Confirmar compra | CajaConfirmar |
| `/admin` | Administración · Panel | Admin |

> El índice `/` es solo para el prototipo: desde el celular entras ahí y saltas a cualquier pantalla. Se elimina o se protege cuando llegue el login.

---

## 5. Estructura de carpetas

```
src/
├── app/
│   ├── layout.tsx              # fuentes, fondo, metadatos
│   ├── globals.css             # tokens de diseño (@theme)
│   ├── page.tsx                # índice del prototipo
│   ├── app/                    # vistas del CLIENTE
│   │   ├── layout.tsx          # contenedor móvil + BottomNav
│   │   ├── page.tsx            # Inicio
│   │   ├── check-in/page.tsx
│   │   ├── qr/page.tsx
│   │   ├── premios/page.tsx
│   │   └── movimientos/page.tsx
│   ├── caja/                   # vistas del CAJERO
│   │   ├── layout.tsx          # contenedor móvil, sin BottomNav
│   │   ├── page.tsx            # Escanear
│   │   └── confirmar/page.tsx
│   └── admin/
│       └── page.tsx            # Panel (escritorio, responsive)
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Chip.tsx
│   │   └── IconButton.tsx
│   ├── cliente/
│   │   ├── BottomNav.tsx
│   │   ├── PointsCard.tsx
│   │   ├── VisitBanner.tsx
│   │   ├── DynamicQR.tsx
│   │   ├── RewardItem.tsx
│   │   ├── RedeemSheet.tsx
│   │   └── MovementItem.tsx
│   ├── caja/
│   │   ├── StaffHeader.tsx
│   │   ├── Scanner.tsx         # visor simulado
│   │   └── CheckList.tsx
│   └── admin/
│       ├── Sidebar.tsx
│       ├── KpiCard.tsx
│       ├── AlertsTable.tsx
│       ├── PointsByVenue.tsx
│       └── ReconciliationPanel.tsx
└── lib/
    └── mock.ts                 # datos de ejemplo de todas las vistas
```

Regla: **las páginas solo componen**; la apariencia vive en `components/` y los datos en `lib/mock.ts`. Así, cuando llegue la API, solo se reemplaza `mock.ts` por llamadas reales.

---

## 6. Tokens de diseño

### `src/app/globals.css`

```css
@import "tailwindcss";

@theme {
  /* Fondos */
  --color-bg: #0E0D12;          /* fondo general */
  --color-surface: #1C1A23;     /* tarjetas */
  --color-surface-2: #15131A;   /* barra inferior, sidebar */
  --color-surface-3: #2A2632;   /* íconos de premio, ítem activo */
  --color-line: #2C2935;        /* bordes */
  --color-line-strong: #3A3645; /* bordes de inputs */

  /* Texto */
  --color-ink: #F2EFE9;         /* texto principal */
  --color-ink-2: #C9C5D3;       /* texto secundario */
  --color-muted: #A9A4B6;       /* etiquetas, metadatos */
  --color-on-accent: #17130A;   /* texto sobre ámbar */

  /* Acentos y estados */
  --color-accent: #F5B83D;      /* ámbar: puntos, CTA */
  --color-ok: #6EE7A8;          /* confirmado, visita activa */
  --color-ok-bg: #173326;
  --color-warn-bg: #3A2F12;     /* pendiente (texto en accent) */
  --color-danger: #FFB4A8;      /* alerta, revertido */
  --color-danger-bg: #3A1C19;
  --color-redeem: #C9BDFF;      /* canjes */
  --color-redeem-bg: #2A2440;

  /* Tipografías (las variables las define next/font en layout.tsx) */
  --font-display: var(--font-syne), sans-serif;
  --font-sans: var(--font-dm-sans), sans-serif;

  /* Radios */
  --radius-card: 18px;
  --radius-hero: 22px;
  --radius-btn: 16px;
}

html, body { background: var(--color-bg); color: var(--color-ink); }
body { font-family: var(--font-sans); -webkit-tap-highlight-color: transparent; }
```

Con esto puedes usar clases como `bg-surface`, `text-muted`, `border-line`, `text-accent`, `font-display`, `rounded-card`.

### Escala de texto usada en el diseño

| Uso | Tamaño / peso | Clase sugerida |
|---|---|---|
| Número de puntos | 56px / 800, Syne | `font-display text-[56px] font-extrabold leading-none` |
| Título de pantalla | 26px / 700, Syne | `font-display text-[26px] font-bold` |
| Título de sección | 18–20px / 700, Syne | `font-display text-lg font-bold` |
| Texto | 15–16px / 400–600 | `text-[15px]` |
| Metadatos | 13px | `text-[13px] text-muted` |
| Etiqueta superior | 12–13px / 600, mayúsculas, tracking 0.1em | `text-xs font-semibold uppercase tracking-[0.1em]` |

### Medidas clave
- Contenedor móvil: ancho máx. **430px**, centrado; padding lateral **22px**.
- Botones y áreas táctiles: alto mínimo **44px**; CTA principal **56px**.
- Barra inferior: **84px** de alto, fija abajo, con `padding-bottom: env(safe-area-inset-bottom)`.
- Separación entre tarjetas: **12–16px**.

---

## 7. Layouts

### `src/app/layout.tsx`

```tsx
import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-syne" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-dm-sans" });

export const metadata: Metadata = { title: "Pulso", description: "Prototipo de fidelización" };
export const viewport: Viewport = { themeColor: "#0E0D12", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
```

### `src/app/app/layout.tsx` (cliente)

```tsx
import BottomNav from "@/components/cliente/BottomNav";

export default function ClienteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh max-w-[430px] pb-[100px]">
      {children}
      <BottomNav />
    </div>
  );
}
```

> La vista `/app/check-in` no muestra la barra en el diseño. Opción simple: en `BottomNav` usar `usePathname()` y devolver `null` si la ruta es `/app/check-in`.

### `src/app/caja/layout.tsx` (cajero)

```tsx
export default function CajaLayout({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto flex min-h-dvh max-w-[430px] flex-col gap-4 px-[22px] pt-6 pb-8">{children}</div>;
}
```

### Admin
Sin layout propio: `/admin/page.tsx` usa un contenedor `flex flex-wrap` con el sidebar (`basis-[220px] max-w-[260px]`) y el contenido (`flex-[999_1_560px] min-w-0`). En celular el sidebar queda arriba y el contenido debajo.

---

## 8. Componentes clave

### `BottomNav.tsx`

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, QrCode, Gift, List } from "lucide-react";

const items = [
  { href: "/app", label: "Inicio", Icon: Home },
  { href: "/app/qr", label: "Mi QR", Icon: QrCode },
  { href: "/app/premios", label: "Premios", Icon: Gift },
  { href: "/app/movimientos", label: "Movimientos", Icon: List },
];

export default function BottomNav() {
  const path = usePathname();
  if (path === "/app/check-in") return null;
  return (
    <nav aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 mx-auto grid h-[84px] max-w-[430px] grid-cols-4 border-t border-line bg-surface-2 px-2 pb-[max(14px,env(safe-area-inset-bottom))]">
      {items.map(({ href, label, Icon }) => {
        const active = path === href;
        return (
          <Link key={href} href={href}
            className={`flex flex-col items-center justify-center gap-1 text-xs ${active ? "text-accent" : "text-muted"}`}>
            <Icon size={22} strokeWidth={1.8} aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
```

### `DynamicQR.tsx` (se renueva cada N segundos)

```tsx
"use client";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const ABC = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const makeCode = () =>
  Array.from({ length: 6 }, (_, i) => ABC[Math.floor(Math.random() * ABC.length)] + (i === 2 ? "-" : "")).join("");

export default function DynamicQR({ ttl = 45 }: { ttl?: number }) {
  const [left, setLeft] = useState(ttl);
  const [code, setCode] = useState(makeCode);

  useEffect(() => {
    const t = setInterval(() => {
      setLeft((s) => {
        if (s <= 1) { setCode(makeCode()); return ttl; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [ttl]);

  // En el prototipo el contenido es simulado. En producción vendrá firmado del servidor.
  const payload = `pulso:demo:${code}:${Date.now() - (ttl - left) * 1000}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-4 rounded-[26px] bg-ink p-6 text-bg">
        <QRCodeSVG value={payload} size={252} bgColor="#F2EFE9" fgColor="#0E0D12" aria-label="Código QR personal" />
        <div className="flex flex-col items-center">
          <span className="text-xs text-[#55505F]">Código manual</span>
          <span className="font-display text-2xl font-bold tracking-[0.12em]">{code}</span>
        </div>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-ink-2">Se renueva en</span>
        <span className="font-semibold text-accent">{left} s</span>
      </div>
      <div className="h-1.5 rounded-full bg-line">
        <div className="h-1.5 rounded-full bg-accent transition-[width] duration-1000 ease-linear"
          style={{ width: `${(left / ttl) * 100}%` }} />
      </div>
    </div>
  );
}
```

### Interacciones de solo interfaz (`"use client"` + `useState`)

| Vista | Estado | Comportamiento |
|---|---|---|
| `/app/premios` | `tab`, `selected` | Filtra por categoría; "Canjear" abre `RedeemSheet` (hoja inferior con código y botón "Listo"). Premios con costo mayor al saldo muestran "Faltan X pts" en lugar del botón. |
| `/app/movimientos` | `reported: Set<string>` | "No reconozco esta compra" solo en ítems *Pendiente*; al tocarlo, se reemplaza por "Reporte enviado…". |
| `/caja` | `tab` | Pestañas "Acreditar compra" / "Validar canje" cambian el texto del visor. "Validar" lleva a `/caja/confirmar`. |
| `/caja/confirmar` | `done` | "Confirmar compra" muestra el estado de éxito y el botón "Escanear siguiente cliente" (→ `/caja`). |

---

## 9. Datos de ejemplo — `src/lib/mock.ts`

```ts
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

export type Premio = { id: number; nombre: string; lugar: string; costo: number; categoria: "Tragos" | "Descuentos" | "Experiencias" };
export const premios: Premio[] = [
  { id: 1, nombre: "Trago de la casa", lugar: "Cualquier barra", costo: 150, categoria: "Tragos" },
  { id: 2, nombre: "Shot doble", lugar: "Discoteca [Nombre]", costo: 220, categoria: "Tragos" },
  { id: 3, nombre: "20% en tu cuenta", lugar: "Bar [Nombre]", costo: 400, categoria: "Descuentos" },
  { id: 4, nombre: "Entrada sin cola", lugar: "Discoteca [Nombre]", costo: 900, categoria: "Experiencias" },
  { id: 5, nombre: "Botella para la mesa", lugar: "Discoteca [Nombre]", costo: 2500, categoria: "Experiencias" },
];

export type EstadoMov = "Pendiente" | "Confirmada" | "Canje" | "Revertida";
export const movimientos = [
  { grupo: "Esta noche", items: [
    { id: "a", titulo: "Compra · Barra 2", meta: "00:42 · Ticket B-10482 · S/ 64.00", puntos: 64, estado: "Pendiente" as EstadoMov },
    { id: "b", titulo: "Compra · Barra 1", meta: "23:58 · Ticket B-10411 · S/ 38.00", puntos: 38, estado: "Pendiente" as EstadoMov },
    { id: "c", titulo: "Bono de check-in", meta: "23:14 · Discoteca [Nombre]", puntos: 20, estado: "Confirmada" as EstadoMov },
  ]},
  { grupo: "Sábado 10 oct", items: [
    { id: "d", titulo: "Canje · Trago de la casa", meta: "01:20 · Validado en Barra 1", puntos: -150, estado: "Canje" as EstadoMov },
    { id: "e", titulo: "Compra · Bar [Nombre]", meta: "22:31 · Ticket A-55210 · S/ 120.00", puntos: 120, estado: "Confirmada" as EstadoMov },
    { id: "f", titulo: "Compra · Barra 3", meta: "00:05 · Ticket B-09977 · S/ 45.00", puntos: 45, estado: "Revertida" as EstadoMov },
  ]},
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
```

> Todos los números son de ejemplo. Los `[Nombre]` se reemplazan con los locales reales.

---

## 10. Especificación por vista

### `/app` — Inicio
1. Saludo ("Buenas noches," + nombre en Syne 24px) y botón de notificaciones (44×44, circular, `bg-surface border-line`).
2. **PointsCard**: fondo `accent`, texto `on-accent`; etiqueta "TUS PUNTOS", chip de nivel (fondo oscuro, texto ámbar), número grande, "Te faltan X pts para el nivel Oro", barra de progreso (`puntos / puntosSiguienteNivel`).
3. **VisitBanner**: punto verde (`ok`) + "Visita activa · {local}" + "Check-in {hora} · válida hasta…".
4. CTA blanco (`bg-ink text-bg`, 56px): "Mostrar mi QR al pagar" → `/app/qr`.
5. "Premios para ti" + "Ver todos" (→ `/app/premios`) + 2 tarjetas en fila.

### `/app/check-in` — Check-in confirmado
- Botón cerrar (→ `/app`) arriba a la derecha.
- Centro: círculo 120px `bg-ok-bg border-ok` con check; etiqueta "CHECK-IN CONFIRMADO" en verde; título "Bienvenida a {local}" (Syne 34px); texto explicativo.
- Tarjeta con cuadrícula 2×2: Hora, Ubicación ("Verificada"), Bono de entrada (+20 pts en ámbar), Visitas este mes.
- CTA ámbar "Ir a mi cuenta" → `/app`.
- Más adelante esta ruta será el destino del QR fijo de la entrada, ej. `/app/check-in?local=disco-centro&t=TOKEN`.

### `/app/qr` — Mi QR
- Título + texto "Muéstralo al cajero después de pagar. Cambia cada 45 segundos y sirve una sola vez."
- `DynamicQR` (sección 8).
- Aviso con ícono de escudo verde: "No compartas capturas…".
- Recomendación: subir el brillo no se puede por web, pero sí evitar que la pantalla se apague con la Wake Lock API (opcional, fase 2).

### `/app/premios` — Premios
- Encabezado con chip de saldo.
- Pestañas tipo píldora: Todos / Tragos / Descuentos / Experiencias (activa: `bg-ink text-bg`).
- Lista de `RewardItem`: ícono 52px, nombre, lugar, costo en ámbar; botón "Canjear" o texto "Faltan X pts".
- `RedeemSheet`: overlay `bg-black/70`, hoja clara (`bg-ink text-bg`) con radio superior 26px, código grande en borde punteado, "Válido por 10 minutos", botón "Listo".

### `/app/movimientos` — Movimientos
- Texto: "Los puntos quedan pendientes hasta que se confirma la venta al cierre del día."
- Grupos por fecha con etiqueta en mayúsculas.
- `MovementItem`: título, metadatos (hora · ticket · monto), puntos a la derecha y `Chip` de estado:

| Estado | Fondo | Texto | Puntos |
|---|---|---|---|
| Pendiente | `warn-bg` | `accent` | blanco |
| Confirmada | `ok-bg` | `ok` | blanco |
| Canje | `redeem-bg` | `redeem` | `redeem`, con "−" |
| Revertida | `danger-bg` | `danger` | gris tachado |

### `/caja` — Escanear
- `StaffHeader`: "MODO CAJA" (ámbar) + "Barra 2 · Carlos M." + chip verde "Turno abierto".
- Control segmentado de 2 pestañas.
- Visor: caja negra `#050407` que ocupa el alto disponible (`flex-1`), con 4 esquinas ámbar (bordes de 4px) y línea de escaneo; texto inferior según pestaña.
- Abajo: input de código manual + botón "Validar" → `/caja/confirmar`.
- Fase 2: reemplazar el visor por `html5-qrcode` o `@zxing/browser` (la cámara requiere HTTPS, que Vercel ya da).

### `/caja/confirmar` — Confirmar compra
- Volver (→ `/caja`) + título.
- Tarjeta del cliente: avatar con iniciales en ámbar, nombre corto, nivel y antigüedad.
- `CheckList`: 4 filas con punto verde, etiqueta y valor.
- Formulario: Monto (S/), N° de ticket del sistema de ventas (con ayuda "Obligatorio. Se cruza con las ventas del día al cierre."), resumen "+64 pts" en caja `#2A2312`.
- Botón ámbar "Confirmar compra" → estado de éxito (check verde, "+64 pts acreditados", texto de conciliación pendiente) + botón "Escanear siguiente cliente".
- Inputs con `inputMode="decimal"` en monto para abrir el teclado numérico en el celular.

### `/admin` — Panel
- Sidebar: logo "Pulso." (punto ámbar), enlaces (Resumen activo; Alertas con contador rojo; Conciliación; Clientes; Premios; Locales y cajeros; Reglas de puntos).
- Encabezado: grupo + "Resumen de la semana" + filtros (local, rango de fechas) como botones.
- 4 `KpiCard` en `grid-cols-[repeat(auto-fit,minmax(200px,1fr))]`.
- Fila con `AlertsTable` (tabla con scroll horizontal en celular: envolver en `overflow-x-auto`, `min-w-[560px]`) y `PointsByVenue` (barras horizontales proporcionales al máximo).
- `ReconciliationPanel`: texto + botón "Subir CSV / Excel" + 4 indicadores (último cierre, conciliadas en verde, sin ticket en rojo, monto distinto en ámbar).

---

## 11. Índice del prototipo — `src/app/page.tsx`

```tsx
import Link from "next/link";

const grupos = [
  { titulo: "Cliente", rutas: [["/app", "Inicio"], ["/app/check-in", "Check-in"], ["/app/qr", "Mi QR"], ["/app/premios", "Premios"], ["/app/movimientos", "Movimientos"]] },
  { titulo: "Cajero", rutas: [["/caja", "Escanear"], ["/caja/confirmar", "Confirmar compra"]] },
  { titulo: "Administración", rutas: [["/admin", "Panel"]] },
];

export default function Indice() {
  return (
    <main className="mx-auto flex max-w-[430px] flex-col gap-8 px-[22px] py-10">
      <h1 className="font-display text-3xl font-extrabold">Pulso<span className="text-accent">.</span> prototipo</h1>
      {grupos.map((g) => (
        <section key={g.titulo} className="flex flex-col gap-2">
          <h2 className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">{g.titulo}</h2>
          {g.rutas.map(([href, label]) => (
            <Link key={href} href={href}
              className="flex min-h-[52px] items-center justify-between rounded-card border border-line bg-surface px-4 font-semibold">
              {label} <span className="text-sm text-muted">{href}</span>
            </Link>
          ))}
        </section>
      ))}
    </main>
  );
}
```

---

## 12. Desplegar y ver en el celular

1. Sube el proyecto a GitHub:
   ```bash
   git init && git add . && git commit -m "Prototipo de vistas"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/pulso-web.git
   git push -u origin main
   ```
2. En vercel.com → **Add New → Project** → importa el repo → **Deploy** (sin configuración extra).
3. Abre en el celular la URL `https://pulso-web-xxxx.vercel.app`.
4. Cada `git push` vuelve a desplegar solo; cada rama genera una URL de vista previa para probar cambios sin tocar la principal.
5. Opcional: en el navegador del celular, **Añadir a pantalla de inicio** para verlo a pantalla completa como app.

---

## 13. Checklist para afinar en el celular

- [ ] Nada se corta con el notch ni con la barra inferior del sistema (`viewport-fit=cover` + `env(safe-area-inset-*)`).
- [ ] Todas las áreas táctiles ≥ 44px; ningún botón queda muy pegado a otro.
- [ ] Textos legibles con brillo bajo (contraste del gris `muted` sobre `surface`).
- [ ] El QR se escanea bien con otro celular a 20–30 cm.
- [ ] Inputs de caja abren el teclado correcto y la página no hace zoom (font-size ≥ 16px en inputs).
- [ ] Panel admin usable en celular: sidebar arriba, tabla con scroll horizontal.
- [ ] Probar en iPhone (Safari) y Android (Chrome).

---

## 14. Orden de trabajo sugerido

1. Crear proyecto, `globals.css`, `layout.tsx`, `mock.ts`, índice `/`.
2. Componentes `ui/` (Button, Card, Chip, IconButton).
3. Vistas del cliente: Inicio → Mi QR → Premios → Movimientos → Check-in.
4. Vistas de caja.
5. Panel admin.
6. Desplegar en Vercel y revisar con la checklist.
7. Siguiente fase: autenticación y roles, base de datos (Prisma + PostgreSQL) y API según `especificacion-fidelizacion.md`.
