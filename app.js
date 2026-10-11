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

const pageTitles = {
  metricas:"Métricas",
  tarjetas:"Tarjetas",
  clientes:"Clientes",
  ubicaciones:"Ubicaciones",
  resenas:"Reseñas",
  configuracion:"Configuración",
  geolocalizacion:"Geolocalización"
};
const defaultPage = "metricas";
const locale = "es-PE";
const currency = "PEN";
const storeKey = "fidegresa-dashboard-v1";
let data = structuredClone(seedData);
let currentPage = defaultPage;
let searchTerm = "";
let clientFilter = "Todos";
let cardFilter = "Todas";
let reviewFilter = "Todas";
let selectedMetric = "ventas";
let toastTimer;

const pageContent = document.querySelector("#page-content");
const modal = document.querySelector("#app-modal");
const modalForm = document.querySelector("#modal-form");
const iconPaths = {
  chart:"<path d='M3 3v18h18'/><path d='m19 9-5 5-4-4-5 5'/>",
  users:"<path d='M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/><circle cx='10' cy='7' r='4'/><path d='M20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75'/>",
  star:"<path d='m12 3 2.75 5.57 6.15.89-4.45 4.34 1.05 6.13L12 17.04l-5.5 2.89 1.05-6.13L3.1 9.46l6.15-.89L12 3Z'/>",
  card:"<rect x='3' y='5' width='18' height='14' rx='2'/><path d='M3 10h18M7 15h3'/>",
  pin:"<path d='M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z'/><circle cx='12' cy='10' r='2.5'/>",
  target:"<circle cx='12' cy='12' r='9'/><circle cx='12' cy='12' r='5'/><circle cx='12' cy='12' r='1'/>",
  settings:"<circle cx='12' cy='12' r='3'/><path d='m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4 1.4-1.1a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z'/>",
  bell:"<path d='M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4'/>",
  visits:"<rect x='4' y='5' width='16' height='16' rx='2'/><path d='M8 3v4m8-4v4M4 10h16m-9 4h4'/>",
  reward:"<path d='M12 8v13m0-13H7.5a2.5 2.5 0 1 1 2.5-2.5V8Zm0 0h4.5a2.5 2.5 0 1 0-2.5-2.5V8ZM4 12h16v9H4zM3 8h18v4H3z'/>",
  arrow:"<path d='M7 17 17 7M7 7h10v10'/>",
  close:"<path d='m18 6-12 12M6 6l12 12'/>",
  menu:"<path d='M4 6h16M4 12h16M4 18h16'/>"
};

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]));
}
function initials(name = "") {
  return name.split(/\s+/).filter(Boolean).slice(0,2).map(word => word[0]).join("").toUpperCase();
}
function money(value) {
  return new Intl.NumberFormat(locale,{style:"currency",currency,maximumFractionDigits:0}).format(value);
}
function isValidPage(page) {
  return Object.hasOwn(pageTitles, page);
}
function pageFromHash() {
  const page = location.hash.slice(1);
  return isValidPage(page) ? page : defaultPage;
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
  return pageTitles[page] || pageTitles[defaultPage];
}
function icon(name, size = 18) {
  const path = iconPaths[name];
  if (!path) throw new Error(`No existe el icono "${name}".`);
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}
function pageHeader(title, summary, action = "") {
  return `<div class="page-heading"><div><p class="eyebrow">Fidegresa · Tu comunidad</p><h1>${title}</h1><p data-live="page-summary">${summary}</p></div>${action}</div>`;
}
function kpi(label, value, change, explanation, iconName = "chart") {
  const variation = change !== null && change !== undefined && Number.isFinite(Number(change))
    ? `<span class="trend${Number(change) < 0 ? " negative" : ""}">${Number(change) > 0 ? "+" : ""}${Number(change)}%</span><span>vs. mes anterior</span>`
    : "";
  return `<article class="kpi-card"><div class="kpi-top"><span>${label}</span><span class="kpi-icon">${icon(iconName,18)}</span></div><div class="kpi-value">${value}</div><div class="kpi-foot">${variation}</div><p class="kpi-explanation">${explanation}</p></article>`;
}
function changeOf(series) {
  const previous = Number(series.at(-2)?.value ?? series.at(-2));
  const current = Number(series.at(-1)?.value ?? series.at(-1));
  if (series.length < 2 || !previous || !Number.isFinite(current)) return 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}
function monthlySeries(metricName = "ventas") {
  const source = data.metricas.ventasMensuales;
  const shape = metricName === "visitas"
    ? source.map((value, index) => value * (0.68 + (index % 4) * 0.09))
    : source;
  const total = metricName === "visitas" ? data.metricas.visitas : data.metricas.ingresos;
  const scale = total / shape.at(-1);
  const month = new Date();
  return shape.map((value, index) => {
    const date = new Date(month.getFullYear(), month.getMonth() - (shape.length - index - 1), 1);
    return { label: new Intl.DateTimeFormat(locale, {month:"short", year:"numeric"}).format(date), value: Math.round(value * scale) };
  });
}
function customerTable(customers) {
  if (!customers.length) return `<div class="empty-state">No encontramos clientes para esta búsqueda.</div>`;
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>CLIENTE</th><th>EMAIL</th><th>TARJETA</th><th>ESTADO</th><th>VISITAS</th><th>ÚLTIMA VISITA</th></tr></thead><tbody>${customers.map(customer => `<tr><td class="customer-cell"><span class="customer-avatar">${escapeHtml(customer.iniciales || initials(customer.nombre))}</span>${escapeHtml(customer.nombre)}</td><td>${escapeHtml(customer.correo)}</td><td>${escapeHtml(customer.tarjeta)}</td><td><span class="status-pill${customer.estado === "Inactiva" ? " inactive" : ""}">${escapeHtml(customer.estado)}</span></td><td>${customer.visitas}</td><td>${escapeHtml(customer.ultimaVisita)}</td></tr>`).join("")}</tbody></table></div>`;
}
function chartMarkup() {
  const series = monthlySeries(selectedMetric);
  const values = series.map(item => item.value);
  const width = 650, height = 185, left = 34, top = 15, plotWidth = 595, plotHeight = 137;
  const maxValue = Math.max(...values) * 1.15;
  const points = values.map((value,index) => `${left + index * plotWidth / 11},${top + plotHeight - (value / maxValue) * plotHeight}`).join(" ");
  const areaPath = `M ${left},${top + plotHeight} L ${points.replaceAll(" ", " L ")} L ${left + plotWidth},${top + plotHeight} Z`;
  const formatValue = value => selectedMetric === "ventas" ? money(value) : new Intl.NumberFormat(locale).format(value);
  const topLabel = selectedMetric === "ventas" ? money(maxValue) : new Intl.NumberFormat(locale).format(maxValue);
  const pointsHtml = values.map((value,index) => {
    const x = left + index * plotWidth / 11;
    const y = top + plotHeight - (value / maxValue) * plotHeight;
    return `<circle class="chart-dot" cx="${x}" cy="${y}" r="3"><title>${escapeHtml(series[index].label)} · ${formatValue(value)}</title></circle>`;
  }).join("");
  return `<div class="chart-wrap" data-live="chart"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${selectedMetric === "ventas" ? "Gráfico de ventas en soles" : "Gráfico de visitas"} por mes" preserveAspectRatio="none"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ad8059" stop-opacity=".25"/><stop offset="1" stop-color="#ad8059" stop-opacity=".01"/></linearGradient></defs>${[0,1,2,3].map(index => `<line class="chart-grid" x1="${left}" y1="${top + index * plotHeight / 3}" x2="${left + plotWidth}" y2="${top + index * plotHeight / 3}"/><text class="chart-label" x="0" y="${top + index * plotHeight / 3 + 3}">${selectedMetric === "ventas" ? money(maxValue * (1-index/3)) : Math.round(maxValue * (1-index/3))}</text>`).join("")}<path class="chart-area" d="${areaPath}"/><polyline class="chart-line" points="${points}"/>${pointsHtml}${series.map((item,index) => `<text class="chart-label" text-anchor="middle" x="${left + index * plotWidth / 11}" y="${height - 5}">${escapeHtml(item.label.split(" ")[0])}</text>`).join("")}</svg><span class="chart-tooltip">${escapeHtml(series.at(-1).label)} · ${formatValue(values.at(-1))}</span></div><details class="chart-data"><summary>Ver datos mensuales</summary><div class="table-wrap"><table class="data-table"><thead><tr><th>MES</th><th>${selectedMetric === "ventas" ? "VENTAS" : "VISITAS"}</th></tr></thead><tbody>${series.map(item=>`<tr><td>${escapeHtml(item.label)}</td><td>${formatValue(item.value)}</td></tr>`).join("")}</tbody></table></div></details>`;
}
function render() {
  document.querySelector("#breadcrumb-current").textContent=titleFor(currentPage);
  document.querySelector(".top-avatar").textContent=initials(data.configuracion.perfilNombre);
  document.querySelector(".profile-mini .avatar").textContent=initials(data.configuracion.perfilNombre);
  document.querySelector(".profile-mini span:nth-child(2)").innerHTML=`<strong>${escapeHtml(data.configuracion.perfilNombre)}</strong><small>Administradora</small>`;
  document.querySelectorAll(".nav-link").forEach(link=>link.classList.toggle("active",link.dataset.page===currentPage));
  document.querySelectorAll("[data-icon]").forEach(node => { node.innerHTML = icon(node.dataset.icon, 18); });
  const renderers=window.fidegresaPageRenderers;
  const renderer=renderers[currentPage];
  if(!renderer) throw new Error(`No se encontró el renderizador de la página "${currentPage}".`);
  pageContent.innerHTML=renderer({data,pageHeader,kpi,money,customerTable,escapeHtml,initials,icon,chartMarkup,monthlySeries,changeOf,selectedMetric,searchTerm,clientFilter,cardFilter,reviewFilter});
  document.body.classList.toggle("dark-theme",data.configuracion.tema==="oscuro");
}
function refreshLive() {
  const renderer = window.fidegresaPageRenderers[currentPage];
  if (!renderer) throw new Error(`No se encontró el renderizador de la página "${currentPage}".`);
  const html = renderer({data,pageHeader,kpi,money,customerTable,escapeHtml,initials,icon,chartMarkup,monthlySeries,changeOf,selectedMetric,searchTerm,clientFilter,cardFilter,reviewFilter});
  const template = document.createElement("template");
  template.innerHTML = html;
  for (const current of [...pageContent.querySelectorAll("[data-live]")]) {
    const replacement = template.content.querySelector(`[data-live="${current.dataset.live}"]`);
    if (replacement) current.replaceWith(replacement);
  }
}
function goTo(page) {
  if (!isValidPage(page)) return;
  currentPage=page;
  searchTerm="";
  if (location.hash!==`#${page}`) history.pushState(null,"",`#${page}`);
  document.querySelector("#sidebar").classList.remove("open");
  render();
}
function openModal(title, subtitle, contents, submitLabel, onSubmit, wide = false) {
  modalForm.innerHTML=`<div class="modal-head"><div><h2>${title}</h2><p>${subtitle}</p></div><button type="button" class="modal-close" data-action="close-modal" aria-label="Cerrar">${icon("close",16)}</button></div>${contents}<div class="modal-actions"><button type="button" class="secondary-button" data-action="close-modal">Cancelar</button><button type="submit" class="primary-button" data-action="submit-modal">${submitLabel}</button></div>`;
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
function notices() {
  const inactive = data.clientes.filter(person => person.estado === "Inactiva").length;
  const paused = data.ubicaciones.filter(place => !place.activa).length;
  const improve = data.resenas.filter(review => review.sentimiento === "Por mejorar").length;
  return [
    ...(inactive ? [`${inactive} clientes dejaron de venir recientemente.`] : []),
    ...(paused ? [`${paused} locales están en pausa.`] : []),
    ...(improve ? [`${improve} reseñas requieren atención.`] : [])
  ];
}
function confirmInModal(title, description, submitLabel, onConfirm) {
  openModal(title,description,"",submitLabel,formData=>onConfirm(formData));
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
const actions = {
  menu: () => document.querySelector("#sidebar").classList.toggle("open"),
  "new-card": () => cardDialog(),
  "edit-card": button => {
    const card=data.tarjetas.find(item=>item.id===Number(button.dataset.id));
    if(card) cardDialog(card);
  },
  "delete-card": button => {
    const card=data.tarjetas.find(item=>item.id===Number(button.dataset.id));
    if(!card) return;
    confirmInModal("Eliminar tarjeta",`¿Quieres eliminar “${escapeHtml(card.nombre)}”? Esta acción no se puede deshacer.`,"Eliminar",()=>{
      data.tarjetas=data.tarjetas.filter(item=>item.id!==card.id);
      saveData();modal.close();render();showToast("Tarjeta eliminada.");
    });
  },
  "new-location": () => locationDialog(),
  "toggle-location": button => {
    const place=data.ubicaciones.find(item=>item.id===Number(button.dataset.id));
    if(place){place.activa=!place.activa;saveData();render();showToast(`${place.nombre}: ${place.activa?"local activado":"local pausado"}.`);}
  },
  profile: () => profileDialog(),
  "edit-brand": () => {
    const content=`<div class="form-field"><label for="brand-name-input">Nombre del programa</label><input id="brand-name-input" class="form-control" name="nombre" required maxlength="50" value="${escapeHtml(data.configuracion.marca)}"></div>`;
    openModal("Nombre del programa","Actualiza el nombre que aparece en tus tarjetas.",content,"Guardar",formData=>{
      data.configuracion.marca=String(formData.get("nombre")).trim();
      saveData();modal.close();render();showToast("Nombre del programa actualizado.");
    });
  },
  theme: button => {data.configuracion.tema=button.dataset.theme;saveData();render();showToast("Tema actualizado.");},
  "reset-data": () => confirmInModal("Restablecer datos","Se reemplazarán tus cambios por los datos originales de demostración.","Restablecer",()=>{
    try {
      localStorage.removeItem(storeKey);
      data=structuredClone(seedData);
      saveData();modal.close();render();showToast("Datos de demostración restablecidos.");
    } catch(error) {
      console.error("No fue posible restablecer los datos locales.",error);
      showToast("No fue posible restablecer los datos.",true);
    }
  }),
  notifications: () => {
    const items=notices();
    const content=items.length?`<ul class="notice-list">${items.map(item=>`<li>${escapeHtml(item)}</li>`).join("")}</ul>`:`<p class="modal-message">No hay avisos nuevos. Tu programa está al día.</p>`;
    openModal("Avisos del programa","Información calculada con tus datos locales.",content,"Listo",()=>modal.close());
  },
  "close-modal": () => modal.close(),
  "submit-modal": button => button.form?.requestSubmit(),
  "export-clients": () => exportClients(),
  "center-map": () => showToast("Mapa centrado en "+(data.ubicaciones.find(place=>place.id===Number(data.geolocalizacion.ubicacionId))?.nombre||"la ubicación seleccionada")+".")
};
document.addEventListener("click",event=>{
  const pageLink=event.target.closest("[data-page]");
  if(pageLink){event.preventDefault();goTo(pageLink.dataset.page);return;}
  const button=event.target.closest("[data-action]");
  if(!button)return;
  const action=actions[button.dataset.action];
  if(!action){console.error(`No existe la acción "${button.dataset.action}".`);return;}
  if(button.dataset.action==="submit-modal") event.preventDefault();
  action(button);
});
document.addEventListener("input",event=>{
  if(event.target.id==="client-search"){searchTerm=event.target.value;refreshLive();}
  if(event.target.id==="radius-input"){data.geolocalizacion.radio=Number(event.target.value);document.querySelector("#radius-value").textContent=`${event.target.value} m`;saveData();refreshLive();}
});
document.addEventListener("change",event=>{
  if(event.target.id==="client-filter"){clientFilter=event.target.value;refreshLive();}
  if(event.target.id==="card-filter"){cardFilter=event.target.value;refreshLive();}
  if(event.target.id==="review-filter"){reviewFilter=event.target.value;refreshLive();}
  if(event.target.id==="metric-select"){selectedMetric=event.target.value;refreshLive();}
  if(event.target.id==="geo-location"){data.geolocalizacion.ubicacionId=Number(event.target.value);saveData();render();}
});
window.addEventListener("popstate",()=>{currentPage=pageFromHash();render();});
document.querySelector("#today-label").textContent=new Intl.DateTimeFormat(locale,{weekday:"short",day:"numeric",month:"short",year:"numeric"}).format(new Date());
document.querySelector(".footer span").textContent=`© ${new Date().getFullYear()} Fidegresa`;
document.querySelector(".footer b").innerHTML=icon("star",12);
loadSavedData();
currentPage=pageFromHash();
render();