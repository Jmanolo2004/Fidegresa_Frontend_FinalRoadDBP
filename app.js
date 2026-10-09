const seedData = {
  metricas: {
    ingresos: 28450,
    ingresosCambio: 12.8,
    clientesActivos: 1248,
    clientesCambio: 8.2,
    recompensas: 386,
    recompensasCambio: 16.4,
    visitas: 3420,
    visitasCambio: 6.7,
    ventasMensuales: [18, 25, 22, 33, 29, 42, 37, 50, 44, 61, 54, 72],
    categorias: [{nombre:"Cafeterías",valor:42},{nombre:"Restaurantes",valor:28},{nombre:"Reposterías",valor:17},{nombre:"Otros",valor:13}]
  },
  clientes: [
    {id:1,nombre:"Lucía Martínez",correo:"lucia.martinez@email.com",tarjeta:"Café de la Plaza",estado:"Activa",visitas:18,ultimaVisita:"Hoy",iniciales:"LM",lat:-0.002},
    {id:2,nombre:"Mateo Fernández",correo:"mateo.fernandez@email.com",tarjeta:"Dulce Encuentro",estado:"Activa",visitas:12,ultimaVisita:"Ayer",iniciales:"MF",lat:0.003},
    {id:3,nombre:"Valentina Rojas",correo:"valentina.rojas@email.com",tarjeta:"Barbería Norte",estado:"Activa",visitas:9,ultimaVisita:"12 oct 2025",iniciales:"VR",lat:-0.004},
    {id:4,nombre:"Santiago Pérez",correo:"santiago.perez@email.com",tarjeta:"Café de la Plaza",estado:"Inactiva",visitas:3,ultimaVisita:"18 sep 2025",iniciales:"SP",lat:0.006},
    {id:5,nombre:"Camila Torres",correo:"camila.torres@email.com",tarjeta:"La Mesa Alegre",estado:"Activa",visitas:15,ultimaVisita:"Ayer",iniciales:"CT",lat:-0.007},
    {id:6,nombre:"Daniela Castillo",correo:"daniela.castillo@email.com",tarjeta:"Dulce Encuentro",estado:"Activa",visitas:7,ultimaVisita:"10 oct 2025",iniciales:"DC",lat:0.009},
    {id:7,nombre:"Andrés Vega",correo:"andres.vega@email.com",tarjeta:"Barbería Norte",estado:"Inactiva",visitas:2,ultimaVisita:"2 ago 2025",iniciales:"AV",lat:-0.011},
    {id:8,nombre:"Isabella Cruz",correo:"isabella.cruz@email.com",tarjeta:"Café de la Plaza",estado:"Activa",visitas:21,ultimaVisita:"Hoy",iniciales:"IC",lat:0.013}
  ],
  tarjetas: [
    {id:1,nombre:"Un café con cariño",tipo:"Estampillas",negocio:"Café de la Plaza",descripcion:"Disfruta tu décimo café por cuenta de la casa.",estampillas:10,clientes:324,estado:"Activa"},
    {id:2,nombre:"Dulce recompensa",tipo:"Cashback",negocio:"Dulce Encuentro",descripcion:"Acumula un 5% de vuelta en cada compra.",porcentaje:5,clientes:216,estado:"Activa"},
    {id:3,nombre:"Cortes que premian",tipo:"Estampillas",negocio:"Barbería Norte",descripcion:"Tu sexto corte tiene un 50% de descuento.",estampillas:6,clientes:148,estado:"Activa"},
    {id:4,nombre:"La Mesa te premia",tipo:"Cashback",negocio:"La Mesa Alegre",descripcion:"Recibe un 3% de cashback en tus visitas.",porcentaje:3,clientes:179,estado:"Activa"}
  ],
  ubicaciones: [
    {id:1,nombre:"Café de la Plaza",categoria:"Cafetería",direccion:"Av. de los Cafetales 245, Centro",horario:"Lun – Dom · 7:00 – 20:00",clientes:324,activa:true},
    {id:2,nombre:"Dulce Encuentro",categoria:"Repostería",direccion:"Calle Magnolia 82, San Miguel",horario:"Mar – Dom · 9:00 – 19:00",clientes:216,activa:true},
    {id:3,nombre:"Barbería Norte",categoria:"Barbería",direccion:"Blvd. de la Estación 510, Norte",horario:"Lun – Sáb · 10:00 – 21:00",clientes:148,activa:true},
    {id:4,nombre:"La Mesa Alegre",categoria:"Restaurante",direccion:"Paseo del Bosque 34, Jardines",horario:"Lun – Dom · 13:00 – 23:00",clientes:179,activa:false},
    {id:5,nombre:"Confitería Nube",categoria:"Confitería",direccion:"Calle de las Flores 117, Centro",horario:"Lun – Sáb · 8:30 – 18:30",clientes:92,activa:true}
  ],
  resenas: [
    {id:1,nombre:"Lucía Martínez",iniciales:"LM",negocio:"Café de la Plaza",fecha:"14 oct 2025",calificacion:5,comentario:"La tarjeta es muy fácil de usar. Siempre veo cuántos cafés me faltan y ya canjeé uno gratis sin complicaciones.",sentimiento:"Positiva"},
    {id:2,nombre:"Mateo Fernández",iniciales:"MF",negocio:"Dulce Encuentro",fecha:"12 oct 2025",calificacion:4,comentario:"Me gusta recibir cashback en cada compra. Sería útil poder ver un resumen de mis recompensas del mes.",sentimiento:"Positiva"},
    {id:3,nombre:"Valentina Rojas",iniciales:"VR",negocio:"Barbería Norte",fecha:"10 oct 2025",calificacion:3,comentario:"La idea funciona bien, aunque al principio no entendía cuándo se registraba mi visita. El equipo me explicó cómo hacerlo.",sentimiento:"Neutral"},
    {id:4,nombre:"Camila Torres",iniciales:"CT",negocio:"La Mesa Alegre",fecha:"8 oct 2025",calificacion:5,comentario:"El programa es claro y el personal registra mis puntos rápidamente. Me anima a volver con mis amigas.",sentimiento:"Positiva"},
    {id:5,nombre:"Andrés Vega",iniciales:"AV",negocio:"Barbería Norte",fecha:"5 oct 2025",calificacion:2,comentario:"Mi visita tardó en aparecer en la tarjeta y tuve que consultar en el local. Sería mejor recibir una confirmación inmediata.",sentimiento:"Por mejorar"}
  ],
  geolocalizacion: {radio:500,ubicacionId:1},
  configuracion: {marca:"Fidegresa",perfilNombre:"María González",perfilCorreo:"maria@fidegresa.com",tema:"claro"}
};

const files = {
  metricas:"Metricas.json",
  clientes:"Clientes.json",
  tarjetas:"Tarjetas.json",
  ubicaciones:"ubicaciones.json",
  resenas:"Reseñas.json",
  geolocalizacion:"Geolocalizacion.json",
  configuracion:"Configuración.json"
};
const storeKey = "fidegresa-dashboard-v1";
let data = structuredClone(seedData);
let currentPage = "metricas";
let searchTerm = "";
let clientFilter = "Todos";
let cardFilter = "Todas";
let selectedMetric = "ventas";
let toastTimer;

const pageContent = document.querySelector("#page-content");
const modal = document.querySelector("#app-modal");
const modalForm = document.querySelector("#modal-form");

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]));
}
function initials(name = "") {
  return name.split(/\s+/).filter(Boolean).slice(0,2).map(word => word[0]).join("").toUpperCase();
}
function money(value) {
  return new Intl.NumberFormat("es-MX",{style:"currency",currency:"MXN",maximumFractionDigits:0}).format(value);
}
function saveData() {
  try {
    localStorage.setItem(storeKey, JSON.stringify(data));
  } catch (error) {
    console.error("No fue posible guardar los datos del panel.", error);
    showToast("No fue posible guardar los cambios en este navegador.", true);
  }
}
function showToast(message, isError = false) {
  const region = document.querySelector("#toast-region");
  region.innerHTML = `<div class="toast${isError ? " error" : ""}">${escapeHtml(message)}</div>`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => region.replaceChildren(), 3200);
}
function titleFor(page) {
  return ({metricas:"Métricas",tarjetas:"Tarjetas",clientes:"Clientes",ubicaciones:"Ubicaciones",resenas:"Reseñas",configuracion:"Configuración",geolocalizacion:"Geolocalización"})[page] || "Métricas";
}
function heading(title, subtitle, action = "") {
  return `<div class="page-heading"><div><p class="eyebrow">Fidegresa · Tu comunidad</p><h1>${title}</h1><p>${subtitle}</p></div>${action}</div>`;
}
function statCard(label, value, foot, icon) {
  return `<article class="stat-card"><div class="stat-top"><span>${label}</span><span class="stat-icon">${icon}</span></div><div class="stat-value">${value}</div><div class="stat-foot">${foot}</div></article>`;
}
function customerTable(customers) {
  if (!customers.length) return `<div class="empty-state">No encontramos clientes para esta búsqueda.</div>`;
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>CLIENTE</th><th>EMAIL</th><th>TARJETA</th><th>ESTADO</th><th>VISITAS</th><th>ÚLTIMA VISITA</th></tr></thead><tbody>${customers.map(customer => `<tr><td class="customer-cell"><span class="customer-avatar">${escapeHtml(customer.iniciales || initials(customer.nombre))}</span>${escapeHtml(customer.nombre)}</td><td>${escapeHtml(customer.correo)}</td><td>${escapeHtml(customer.tarjeta)}</td><td><span class="status-pill${customer.estado === "Inactiva" ? " inactive" : ""}">${escapeHtml(customer.estado)}</span></td><td>${customer.visitas}</td><td>${escapeHtml(customer.ultimaVisita)}</td></tr>`).join("")}</tbody></table></div>`;
}
function chartMarkup() {
  const values = selectedMetric === "visitas"
    ? data.metricas.ventasMensuales.map((value,index) => Math.round(value * (.7 + (index % 4) * .08)))
    : data.metricas.ventasMensuales;
  const width = 650, height = 185, left = 34, top = 15, plotWidth = 595, plotHeight = 137;
  const points = values.map((value,index) => `${left + index * plotWidth / 11},${top + plotHeight - (value / 80) * plotHeight}`).join(" ");
  const areaPath = `M ${left},${top + plotHeight} L ${points.replaceAll(" ", " L ")} L ${left + plotWidth},${top + plotHeight} Z`;
  const labels = ["Nov","Dic","Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct"];
  return `<div class="chart-wrap"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${selectedMetric === "ventas" ? "Gráfico de ventas" : "Gráfico de visitas"} por mes" preserveAspectRatio="none"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ad8059" stop-opacity=".25"/><stop offset="1" stop-color="#ad8059" stop-opacity=".01"/></linearGradient></defs>${[0,1,2,3].map(index => `<line class="chart-grid" x1="${left}" y1="${top + index * plotHeight / 3}" x2="${left + plotWidth}" y2="${top + index * plotHeight / 3}"/><text class="chart-label" x="0" y="${top + index * plotHeight / 3 + 3}">${selectedMetric === "ventas" ? `${80 - index * 25}k` : 800 - index * 250}</text>`).join("")}<path class="chart-area" d="${areaPath}"/><polyline class="chart-line" points="${points}"/>${values.map((value,index) => `<circle class="chart-dot" cx="${left + index * plotWidth / 11}" cy="${top + plotHeight - (value / 80) * plotHeight}" r="3"/>`).join("")}${labels.map((label,index) => `<text class="chart-label" text-anchor="middle" x="${left + index * plotWidth / 11}" y="${height - 5}">${label}</text>`).join("")}</svg><span class="chart-tooltip">Oct · ${selectedMetric === "ventas" ? "$72,000" : "684 visitas"}</span></div>`;
}
function renderMetrics() {
  const metric = data.metricas;
  const activeCount = data.clientes.filter(person => person.estado === "Activa").length;
  return `${heading("Un vistazo a tu comunidad","Así se mueve tu programa de fidelización este mes")}
    <div class="stats-grid">
      ${statCard("Ingresos por clientes",money(metric.ingresos),`<span class="trend">↗ ${metric.ingresosCambio}%</span>vs. mes anterior`,"↗")}
      ${statCard("Clientes activos",new Intl.NumberFormat("es-MX").format(Math.max(metric.clientesActivos,activeCount)),`<span class="trend">↗ ${metric.clientesCambio}%</span>vs. mes anterior`,"♙")}
      ${statCard("Recompensas canjeadas",metric.recompensas,`<span class="trend">↗ ${metric.recompensasCambio}%</span>vs. mes anterior`,"✳")}
      ${statCard("Visitas registradas",new Intl.NumberFormat("es-MX").format(metric.visitas),`<span class="trend">↗ ${metric.visitasCambio}%</span>vs. mes anterior`,"⌂")}
    </div>
    <div class="dashboard-grid">
      <article class="panel"><div class="panel-heading"><div><h2>Actividad del programa</h2><p>Un resumen de tus clientes durante el último año</p></div><select class="select-control" id="metric-select" aria-label="Elegir métrica"><option value="ventas"${selectedMetric === "ventas" ? " selected" : ""}>Ventas</option><option value="visitas"${selectedMetric === "visitas" ? " selected" : ""}>Visitas</option></select></div>${chartMarkup()}<div class="legend"><span>${selectedMetric === "ventas" ? "Ventas con tarjeta de lealtad" : "Visitas registradas"}</span></div></article>
      <article class="panel"><div class="panel-heading"><div><h2>Clientes por categoría</h2><p>Negocios que más conectan</p></div><span class="stat-icon">◌</span></div><div class="bar-list">${metric.categorias.map(category => `<div class="bar-row"><span>${escapeHtml(category.nombre)}</span><div class="bar-track"><div class="bar-fill" style="width:${category.valor}%"></div></div><span class="bar-count">${category.valor}%</span></div>`).join("")}</div><p class="stat-foot">Basado en clientes con una tarjeta activa.</p></article>
    </div>
    <article class="panel activity-panel"><div class="panel-heading"><div><h2>Clientes recientes</h2><p>${activeCount} clientes activos en tus ubicaciones</p></div><button class="text-button" data-page="clientes">Ver todos →</button></div>${customerTable([...data.clientes].slice(0,5))}</article>`;
}
function renderClients() {
  const results = data.clientes.filter(person => {
    const matchesTerm = `${person.nombre} ${person.correo} ${person.tarjeta}`.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTerm && (clientFilter === "Todos" || person.estado === clientFilter);
  });
  return `${heading("Tus clientes","Conoce a las personas que hacen crecer a tus negocios",`<button class="secondary-button" data-action="export-clients">↓ &nbsp; Exportar lista</button>`)}
    <div class="stats-grid">${statCard("Clientes registrados",data.clientes.length,"En todas tus ubicaciones","♙")}${statCard("Tarjetas activas",data.clientes.filter(person=>person.estado==="Activa").length,"Clientes con actividad vigente","▤")}${statCard("Visitas totales",data.clientes.reduce((total,person)=>total+person.visitas,0),"Registradas por el programa","⌂")}${statCard("Visitas por cliente",(data.clientes.reduce((total,person)=>total+person.visitas,0)/Math.max(1,data.clientes.length)).toFixed(1),"Promedio de visitas","↗")}</div>
    <article class="panel activity-panel"><div class="panel-heading"><div><h2>Directorio de clientes</h2><p>Consulta sus tarjetas y actividad</p></div></div><div class="section-toolbar"><label class="search-wrap"><span>⌕</span><input class="search-input" id="client-search" type="search" placeholder="Buscar nombre, correo o tarjeta" value="${escapeHtml(searchTerm)}"></label><select class="filter-select" id="client-filter" aria-label="Filtrar por estado"><option${clientFilter==="Todos"?" selected":""}>Todos</option><option${clientFilter==="Activa"?" selected":""}>Activa</option><option${clientFilter==="Inactiva"?" selected":""}>Inactiva</option></select></div>${customerTable(results)}<div class="table-meta"><span>Mostrando ${results.length} de ${data.clientes.length} clientes</span><span>Datos actualizados hoy</span></div></article>`;
}
function renderCards() {
  const cards = data.tarjetas.filter(card => cardFilter === "Todas" || card.tipo === cardFilter);
  return `${heading("Tarjetas de lealtad","Crea beneficios que hagan que tus clientes quieran volver",`<button class="primary-button" data-action="new-card">＋ &nbsp; Crear tarjeta</button>`)}
    <div class="stats-grid">${statCard("Tarjetas creadas",data.tarjetas.length,"En tus ubicaciones","▤")}${statCard("Estampillas",data.tarjetas.filter(card=>card.tipo==="Estampillas").length,"Programas de visitas","✳")}${statCard("Cashback",data.tarjetas.filter(card=>card.tipo==="Cashback").length,"Programas de recompensa","↗")}${statCard("Participantes",data.tarjetas.reduce((sum,card)=>sum+Number(card.clientes||0),0),"En todos tus programas","♙")}</div>
    <article class="panel"><div class="panel-heading"><div><h2>Tus programas</h2><p>Diseña y administra beneficios para tu comunidad</p></div><select class="filter-select" id="card-filter" aria-label="Filtrar tarjetas"><option${cardFilter==="Todas"?" selected":""}>Todas</option><option${cardFilter==="Estampillas"?" selected":""}>Estampillas</option><option${cardFilter==="Cashback"?" selected":""}>Cashback</option></select></div>
      ${cards.length ? `<div class="cards-grid">${cards.map(card => `<div><div class="loyalty-card${card.tipo==="Cashback"?" cashback":""}"><span class="card-kicker">${escapeHtml(data.configuracion.marca)} · ${escapeHtml(card.tipo)}</span><h3>${escapeHtml(card.nombre)}</h3><p>${escapeHtml(card.descripcion)}</p>${card.tipo==="Estampillas"?`<div class="stamp-row">${Array.from({length:Math.min(card.estampillas,10)},(_,index)=>`<span class="stamp${index<Math.max(1,Math.floor(card.estampillas/3))?" filled":""}">${index<Math.max(1,Math.floor(card.estampillas/3))?"✓":"·"}</span>`).join("")}</div>`:`<div class="stamp-row"><span class="stamp filled">${card.porcentaje}%</span><span class="card-bottom">de vuelta en cada compra</span></div>`}<div class="card-bottom"><span>${escapeHtml(card.negocio)}</span><span>${card.tipo==="Estampillas"?`${card.estampillas} visitas para premiar`:`${card.porcentaje}% cashback`}</span></div></div><div class="card-footer"><span>${card.clientes||0} clientes · ${escapeHtml(card.estado)}</span><div class="card-actions"><button class="small-action" data-action="edit-card" data-id="${card.id}">Editar</button><button class="small-action" data-action="delete-card" data-id="${card.id}">Eliminar</button></div></div></div>`).join("")}</div>`:`<div class="empty-state">Todavía no hay tarjetas de este tipo.</div>`}</article>`;
}
function renderLocations() {
  return `${heading("Ubicaciones","Administra los negocios que forman parte de tu comunidad",`<button class="primary-button" data-action="new-location">＋ &nbsp; Agregar ubicación</button>`)}
    <div class="stats-grid">${statCard("Ubicaciones",data.ubicaciones.length,"Negocios registrados","⌂")}${statCard("Activas",data.ubicaciones.filter(location=>location.activa).length,"Recibiendo clientes","◎")}${statCard("Clientes vinculados",data.ubicaciones.reduce((sum,location)=>sum+location.clientes,0),"En todos los negocios","♙")}${statCard("Categorías",new Set(data.ubicaciones.map(location=>location.categoria)).size,"Tipos de negocio","✳")}</div>
    <div class="location-grid">${data.ubicaciones.map(location=>`<article class="panel location-card"><span class="location-icon">${location.categoria==="Cafetería"?"☕":location.categoria==="Restaurante"?"♨":location.categoria==="Barbería"?"✂":"✿"}</span><h3>${escapeHtml(location.nombre)}</h3><p>${escapeHtml(location.categoria)}<br>${escapeHtml(location.direccion)}<br>${escapeHtml(location.horario)}</p><div class="location-meta"><span class="status-pill${location.activa?"":" inactive"}">${location.activa?"Activa":"Pausada"} · ${location.clientes} clientes</span><button class="switch${location.activa?" on":""}" role="switch" aria-checked="${location.activa}" aria-label="${location.activa?"Pausar":"Activar"} ${escapeHtml(location.nombre)}" data-action="toggle-location" data-id="${location.id}"></button></div></article>`).join("")}</div>`;
}
function renderReviews() {
  const average=data.resenas.reduce((sum,review)=>sum+Number(review.calificacion),0)/Math.max(1,data.resenas.length);
  const counts=[5,4,3,2,1].map(stars=>data.resenas.filter(review=>Number(review.calificacion)===stars).length);
  return `${heading("La voz de tus clientes","Opiniones sinceras sobre la experiencia con el programa")}
    <div class="review-summary"><article class="panel rating-card"><strong class="rating-number">${average.toFixed(1)}</strong><span class="stars">★★★★★</span><span class="rating-caption">${data.resenas.length} comentarios compartidos</span></article><article class="panel rating-breakdown">${[5,4,3,2,1].map((stars,index)=>`<div class="rating-row"><span>${stars} estrellas</span><div class="bar-track"><div class="bar-fill" style="width:${data.resenas.length?counts[index]/data.resenas.length*100:0}%"></div></div><span>${counts[index]}</span></div>`).join("")}</article></div>
    <article class="panel"><div class="panel-heading"><div><h2>Comentarios de clientes</h2><p>Lo que está funcionando y aquello que podemos mejorar</p></div><span class="status-pill">${data.resenas.filter(review=>review.sentimiento==="Positiva").length} positivas</span></div><div class="review-list">${data.resenas.map(review=>`<div class="review-item"><span class="customer-avatar">${escapeHtml(review.iniciales||initials(review.nombre))}</span><div class="review-copy"><div class="review-top"><strong>${escapeHtml(review.nombre)}</strong><span class="stars">${"★".repeat(Number(review.calificacion))}<span style="color:#e8e3dc">${"★".repeat(5-Number(review.calificacion))}</span></span><span class="review-date">${escapeHtml(review.fecha)}</span></div><div class="review-business">${escapeHtml(review.negocio)} · <span class="status-pill${review.sentimiento==="Por mejorar"?" pending":""}">${escapeHtml(review.sentimiento)}</span></div><p>${escapeHtml(review.comentario)}</p></div></div>`).join("")}</div></article>`;
}
function renderSettings() {
  const settings=data.configuracion;
  return `${heading("Configuración","Personaliza cómo funciona tu programa de fidelización")}
    <div class="settings-grid">
      <article class="panel settings-card"><div class="settings-card-heading"><span class="settings-icon">✿</span><div><h2>Marca</h2><p>La identidad que ven tus clientes</p></div></div><div class="settings-line"><div><strong>Nombre del programa</strong><small id="brand-name">${escapeHtml(settings.marca)}</small></div><button class="secondary-button" data-action="edit-brand">Editar</button></div><div class="settings-line"><div><strong>Color de marca</strong><small>Paleta café y crema</small></div><span class="theme-chip selected" style="background:#725037" aria-label="Color café"></span></div></article>
      <article class="panel settings-card"><div class="settings-card-heading"><span class="settings-icon">◐</span><div><h2>Tema</h2><p>Elige cómo se ve tu espacio de trabajo</p></div></div><div class="settings-line"><div><strong>Modo de visualización</strong><small id="theme-description">${settings.tema==="oscuro"?"Tema oscuro":"Tema claro"}</small></div><div class="theme-options"><button class="theme-chip${settings.tema==="claro"?" selected":""}" style="background:#faf8f4" data-action="theme" data-theme="claro" aria-label="Tema claro"></button><button class="theme-chip${settings.tema==="oscuro"?" selected":""}" style="background:#46382e" data-action="theme" data-theme="oscuro" aria-label="Tema oscuro"></button></div></div></article>
      <article class="panel settings-card"><div class="settings-card-heading"><span class="settings-icon">♙</span><div><h2>Mi perfil</h2><p>Tu información de administradora</p></div></div><div class="settings-line"><div><strong>${escapeHtml(settings.perfilNombre)}</strong><small>${escapeHtml(settings.perfilCorreo)}</small></div><button class="secondary-button" data-action="profile">Editar perfil</button></div></article>
      <article class="panel settings-card"><div class="settings-card-heading"><span class="settings-icon">⌂</span><div><h2>Ubicaciones activas</h2><p>Controla dónde está disponible el programa</p></div></div>${data.ubicaciones.map(location=>`<div class="settings-line"><div><strong>${escapeHtml(location.nombre)}</strong><small>${escapeHtml(location.categoria)}</small></div><button class="switch${location.activa?" on":""}" role="switch" aria-checked="${location.activa}" aria-label="Cambiar estado de ${escapeHtml(location.nombre)}" data-action="toggle-location" data-id="${location.id}"></button></div>`).join("")}<button class="text-button" data-page="ubicaciones">Administrar ubicaciones →</button></article>
      <article class="panel settings-card wide"><div class="settings-card-heading"><span class="settings-icon">ⓘ</span><div><h2>Cuenta</h2><p>Administra los datos guardados en este dispositivo</p></div></div><div class="settings-line"><div><strong>Eliminar cuenta</strong><small>Elimina los cambios y restaura los datos de demostración de este navegador.</small></div><button class="danger-button" data-action="delete-account">Eliminar cuenta</button></div></article>
    </div>`;
}
function renderGeo() {
  const geo=data.geolocalizacion;
  const location=data.ubicaciones.find(place=>Number(place.id)===Number(geo.ubicacionId))||data.ubicaciones[0];
  const nearby=data.clientes.slice(0,4);
  return `${heading("Tu comunidad, cerca","Visualiza clientes alrededor de tus ubicaciones. La ubicación de las personas es ilustrativa.")}
    <div class="geo-layout"><article class="panel map-panel"><div class="map-canvas" role="img" aria-label="Mapa esquemático con radio de ${geo.radio} metros alrededor de ${escapeHtml(location?.nombre||"la ubicación")}"><span class="map-water"></span><span class="map-label" style="top:14%;left:12%">CENTRO</span><span class="map-label" style="top:76%;left:69%">PARQUE CENTRAL</span><span class="map-label" style="top:20%;left:72%">SAN MIGUEL</span><span class="map-road one"></span><span class="map-road two"></span><div class="map-radius"><span class="map-radius-label">${geo.radio} m</span></div><span class="map-shop">⌂</span>${nearby.map((person,index)=>`<span class="map-pin p${index+1}"><span>${escapeHtml(person.iniciales||initials(person.nombre))}</span></span>`).join("")}<div class="map-toolbar"><button class="secondary-button" data-action="center-map">◎ &nbsp; Centrar mapa</button></div><span class="map-credit">Mapa esquemático · Ubicaciones de demostración</span></div></article>
      <article class="panel geo-settings"><h2>Alcance de tu ubicación</h2><p>Define el radio de alcance para ver cuántos clientes están cerca de tu negocio.</p><label for="radius-input">Ubicación del negocio</label><select id="geo-location" class="form-control">${data.ubicaciones.map(place=>`<option value="${place.id}"${Number(place.id)===Number(geo.ubicacionId)?" selected":""}>${escapeHtml(place.nombre)}</option>`).join("")}</select><div class="range-value"><strong id="radius-value">${geo.radio} m</strong><span>Radio máximo: 1 km</span></div><input id="radius-input" class="range-input" type="range" min="100" max="1000" step="50" value="${geo.radio}" aria-label="Radio de alcance en metros"><div class="range-labels"><span>100 m</span><span>500 m</span><span>1.000 m</span></div><div class="nearby-list"><strong class="panel-title">Clientes cercanos</strong>${nearby.map((person,index)=>`<div class="nearby-row"><span class="customer-avatar">${escapeHtml(person.iniciales||initials(person.nombre))}</span><div><strong>${escapeHtml(person.nombre)}</strong><small>${escapeHtml(person.tarjeta)}</small></div><span class="distance">${[120,280,460,720][index]} m</span></div>`).join("")}</div><div class="geo-note"><span>ⓘ</span><span><b>Privacidad primero.</b> Los puntos del mapa son ilustrativos; esta demostración no solicita ni rastrea la ubicación real de los clientes.</span></div></article></div>`;
}
function render() {
  document.querySelector("#breadcrumb-current").textContent=titleFor(currentPage);
  document.querySelector(".brand-name").innerHTML=`${escapeHtml(data.configuracion.marca)}<small>FIDELIZA CON CARIÑO</small>`;
  document.querySelector(".brand-mark").textContent=initials(data.configuracion.marca).slice(0,1)||"F";
  document.querySelector(".top-avatar").textContent=initials(data.configuracion.perfilNombre);
  document.querySelector(".profile-mini .avatar").textContent=initials(data.configuracion.perfilNombre);
  document.querySelector(".profile-mini span:nth-child(2)").innerHTML=`<strong>${escapeHtml(data.configuracion.perfilNombre)}</strong><small>Administradora</small>`;
  document.querySelectorAll(".nav-link").forEach(link=>link.classList.toggle("active",link.dataset.page===currentPage));
  const renderers={metricas:renderMetrics,tarjetas:renderCards,clientes:renderClients,ubicaciones:renderLocations,resenas:renderReviews,configuracion:renderSettings,geolocalizacion:renderGeo};
  pageContent.innerHTML=renderers[currentPage]();
  document.body.classList.toggle("dark-theme",data.configuracion.tema==="oscuro");
}
function goTo(page) {
  if (!titleFor(page)) return;
  currentPage=page;
  searchTerm="";
  if (location.hash!==`#${page}`) history.pushState(null,"",`#${page}`);
  document.querySelector("#sidebar").classList.remove("open");
  render();
}
function openModal(title, subtitle, contents, submitLabel, onSubmit, wide = false) {
  modalForm.innerHTML=`<div class="modal-head"><div><h2>${title}</h2><p>${subtitle}</p></div><button type="button" class="modal-close" data-action="close-modal" aria-label="Cerrar">×</button></div>${contents}<div class="modal-actions"><button type="button" class="secondary-button" data-action="close-modal">Cancelar</button><button type="submit" class="primary-button">${submitLabel}</button></div>`;
  modalForm.dataset.wide=wide?"true":"false";
  modalForm.onsubmit=event=>{event.preventDefault();onSubmit(new FormData(modalForm));};
  modal.showModal();
}
function cardDialog(card) {
  const existing=Boolean(card);
  const fields=`<div class="form-grid"><div class="form-field full"><label for="card-name">Nombre de la tarjeta</label><input id="card-name" class="form-control" name="nombre" required maxlength="50" value="${escapeHtml(card?.nombre||"")}" placeholder="Ej. Un café con cariño"></div><div class="form-field"><label for="card-type">Tipo de recompensa</label><select id="card-type" class="form-control" name="tipo"><option${card?.tipo==="Estampillas"||!card?" selected":""}>Estampillas</option><option${card?.tipo==="Cashback"?" selected":""}>Cashback</option></select></div><div class="form-field"><label for="card-location">Ubicación</label><select id="card-location" class="form-control" name="negocio">${data.ubicaciones.map(place=>`<option${card?.negocio===place.nombre?" selected":""}>${escapeHtml(place.nombre)}</option>`).join("")}</select></div><div class="form-field full"><label for="card-description">Descripción del beneficio</label><input id="card-description" class="form-control" name="descripcion" required maxlength="100" value="${escapeHtml(card?.descripcion||"")}" placeholder="Describe la recompensa para tus clientes"></div><div class="form-field" id="stamps-field"><label for="card-stamps">Estampillas para premiar</label><input id="card-stamps" class="form-control" name="estampillas" type="number" min="2" max="10" value="${card?.estampillas||10}"></div><div class="form-field" id="cashback-field"><label for="card-cashback">Porcentaje de cashback</label><input id="card-cashback" class="form-control" name="porcentaje" type="number" min="1" max="50" value="${card?.porcentaje||5}"></div></div>`;
  openModal(existing?"Editar tarjeta":"Crear tarjeta de lealtad","Configura un beneficio sencillo para tus clientes",fields,existing?"Guardar cambios":"Crear tarjeta",formData=>{
    const type=formData.get("tipo");
    const updated={...card,nombre:String(formData.get("nombre")).trim(),tipo:type,negocio:String(formData.get("negocio")),descripcion:String(formData.get("descripcion")).trim(),estado:card?.estado||"Activa",clientes:card?.clientes||0};
    if(type==="Estampillas") updated.estampillas=Number(formData.get("estampillas"));
    else updated.porcentaje=Number(formData.get("porcentaje"));
    if(existing) data.tarjetas=data.tarjetas.map(item=>item.id===card.id?updated:item);
    else data.tarjetas.unshift({...updated,id:Date.now()});
    saveData();modal.close();render();showToast(existing?"Tarjeta actualizada.":"Tarjeta creada con éxito.");
  });
  const type=document.querySelector("#card-type");
  const updateFields=()=>{document.querySelector("#stamps-field").style.display=type.value==="Estampillas"?"grid":"none";document.querySelector("#cashback-field").style.display=type.value==="Cashback"?"grid":"none";};
  type.addEventListener("change",updateFields);updateFields();
}
function locationDialog() {
  const form=`<div class="form-grid"><div class="form-field full"><label for="location-name">Nombre del negocio</label><input id="location-name" class="form-control" name="nombre" required maxlength="50" placeholder="Ej. Café de la Plaza"></div><div class="form-field"><label for="location-type">Tipo de negocio</label><select id="location-type" class="form-control" name="categoria"><option>Cafetería</option><option>Restaurante</option><option>Barbería</option><option>Repostería</option><option>Confitería</option><option>Otro</option></select></div><div class="form-field"><label for="location-address">Dirección</label><input id="location-address" class="form-control" name="direccion" required maxlength="100" placeholder="Calle y número"></div><div class="form-field full"><label for="location-hours">Horario de atención</label><input id="location-hours" class="form-control" name="horario" maxlength="60" placeholder="Lun – Sáb · 9:00 – 18:00"></div></div>`;
  openModal("Agregar ubicación","Suma un negocio al programa Fidegresa",form,"Agregar ubicación",formData=>{
    data.ubicaciones.push({id:Date.now(),nombre:String(formData.get("nombre")).trim(),categoria:String(formData.get("categoria")),direccion:String(formData.get("direccion")).trim(),horario:String(formData.get("horario")).trim()||"Horario por definir",clientes:0,activa:true});
    saveData();modal.close();render();showToast("Ubicación agregada.");
  });
}
function profileDialog() {
  const profile=data.configuracion;
  const form=`<div class="form-grid"><div class="form-field full"><label for="profile-name">Nombre</label><input id="profile-name" class="form-control" name="nombre" required maxlength="60" value="${escapeHtml(profile.perfilNombre)}"></div><div class="form-field full"><label for="profile-email">Correo electrónico</label><input id="profile-email" class="form-control" name="correo" type="email" required maxlength="100" value="${escapeHtml(profile.perfilCorreo)}"></div></div>`;
  openModal("Mi perfil","Actualiza los datos de tu cuenta administradora",form,"Guardar perfil",formData=>{
    profile.perfilNombre=String(formData.get("nombre")).trim();profile.perfilCorreo=String(formData.get("correo")).trim();
    saveData();modal.close();render();showToast("Perfil actualizado.");
  });
}
function exportClients() {
  const rows=[["Nombre","Correo","Tarjeta","Estado","Visitas","Última visita"],...data.clientes.map(person=>[person.nombre,person.correo,person.tarjeta,person.estado,person.visitas,person.ultimaVisita])];
  const csv="\uFEFF"+rows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(",")).join("\r\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
  const link=document.createElement("a");link.href=url;link.download="clientes-fidegresa.csv";link.click();URL.revokeObjectURL(url);
  showToast("Lista de clientes exportada.");
}
function loadSavedData() {
  try {
    const saved=localStorage.getItem(storeKey);
    if(saved) data={...data,...JSON.parse(saved)};
  } catch(error) {
    console.error("Los datos guardados del panel no se pudieron leer.",error);
    showToast("No fue posible leer los datos guardados.",true);
  }
}
async function loadJsonSeedData() {
  if(location.protocol==="file:") {
    showToast("Vista local de demostración. Para cargar los JSON, abre el proyecto en un servidor local.");
    return;
  }
  try {
    const entries=await Promise.all(Object.entries(files).map(async([key,file])=>{
      const response=await fetch(`./${encodeURIComponent(file)}`);
      if(!response.ok) throw new Error(`${file}: HTTP ${response.status}`);
      const text=await response.text();
      return [key,text.trim()?JSON.parse(text):null];
    }));
    const saved=localStorage.getItem(storeKey);
    for(const [key,value] of entries) if(value && !saved) data[key]=value;
    if(!saved) saveData();
    render();
  } catch(error) {
    console.error("No se pudieron cargar los datos JSON.",error);
    showToast("No se pudieron cargar los archivos JSON. Revisa la consola del navegador.",true);
  }
}

document.addEventListener("click",event=>{
  const pageLink=event.target.closest("[data-page]");
  if(pageLink){event.preventDefault();goTo(pageLink.dataset.page);return;}
  const actionButton=event.target.closest("[data-action]");
  if(!actionButton)return;
  const {action,id}=actionButton.dataset;
  if(action==="menu") document.querySelector("#sidebar").classList.toggle("open");
  if(action==="new-card") cardDialog();
  if(action==="edit-card") {const card=data.tarjetas.find(item=>item.id===Number(id));if(card)cardDialog(card);}
  if(action==="delete-card") {
    const card=data.tarjetas.find(item=>item.id===Number(id));
    if(card&&confirm(`¿Eliminar la tarjeta "${card.nombre}"?`)){data.tarjetas=data.tarjetas.filter(item=>item.id!==card.id);saveData();render();showToast("Tarjeta eliminada.");}
  }
  if(action==="new-location") locationDialog();
  if(action==="toggle-location") {
    const place=data.ubicaciones.find(item=>item.id===Number(id));
    if(place){place.activa=!place.activa;saveData();render();showToast(`${place.nombre}: ${place.activa?"ubicación activada":"ubicación pausada"}.`);}
  }
  if(action==="profile") profileDialog();
  if(action==="edit-brand") {
    const name=prompt("Nombre de marca:",data.configuracion.marca);
    if(name?.trim()){data.configuracion.marca=name.trim().slice(0,50);saveData();render();showToast("Nombre de marca actualizado.");}
  }
  if(action==="theme") {data.configuracion.tema=actionButton.dataset.theme;saveData();render();showToast("Tema actualizado.");}
  if(action==="delete-account"&&confirm("Se borrarán los cambios guardados en este navegador y se restaurarán los datos de demostración. ¿Deseas continuar?")){
    try{localStorage.removeItem(storeKey);data=structuredClone(seedData);saveData();render();showToast("Cuenta local restablecida.");}
    catch(error){console.error("No fue posible restablecer la cuenta local.",error);showToast("No fue posible restablecer los datos.",true);}
  }
  if(action==="close-modal") modal.close();
  if(action==="export-clients") exportClients();
  if(action==="center-map") {showToast("Mapa centrado en "+(data.ubicaciones.find(place=>place.id===Number(data.geolocalizacion.ubicacionId))?.nombre||"la ubicación seleccionada")+".");}
});
document.addEventListener("input",event=>{
  if(event.target.id==="client-search"){searchTerm=event.target.value;const cursor=event.target.selectionStart;render();const search=document.querySelector("#client-search");search.focus();search.setSelectionRange(cursor,cursor);}
  if(event.target.id==="radius-input"){data.geolocalizacion.radio=Number(event.target.value);document.querySelector("#radius-value").textContent=`${event.target.value} m`;const radius=document.querySelector(".map-radius");radius.style.width=`${Math.min(280,90+Number(event.target.value)*.19)}px`;radius.querySelector(".map-radius-label").textContent=`${event.target.value} m`;document.querySelector(".map-canvas").setAttribute("aria-label",`Mapa esquemático con radio de ${event.target.value} metros`);saveData();}
});
document.addEventListener("change",event=>{
  if(event.target.id==="client-filter"){clientFilter=event.target.value;render();}
  if(event.target.id==="card-filter"){cardFilter=event.target.value;render();}
  if(event.target.id==="metric-select"){selectedMetric=event.target.value;render();}
  if(event.target.id==="geo-location"){data.geolocalizacion.ubicacionId=Number(event.target.value);saveData();render();}
});
window.addEventListener("popstate",()=>{currentPage=location.hash.slice(1)||"metricas";render();});
document.querySelector("#today-label").textContent=new Intl.DateTimeFormat("es-MX",{weekday:"short",day:"numeric",month:"short",year:"numeric"}).format(new Date());
document.querySelector(".footer span").textContent=`© ${new Date().getFullYear()} Fidegresa`;
loadSavedData();
currentPage=location.hash.slice(1)||"metricas";
render();
loadJsonSeedData();
