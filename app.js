const seedData = window.fidegresaDemoData;

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
let selectedPeriod = "month";
let toastTimer;
let activeMapDrag = null;
const mapMetersPerUnit = 2.5;
const mapDistricts = {
  Barranco:{x:300,y:555},
  Miraflores:{x:410,y:325},
  "San Isidro":{x:625,y:245},
  "San Borja":{x:585,y:455},
  Surco:{x:735,y:535}
};

const pageContent = document.querySelector("#page-content");
const modal = document.querySelector("#app-modal");
const modalForm = document.querySelector("#modal-form");
const screenElements = {
  loading: document.querySelector("#loading-screen"),
  landing: document.querySelector("#landing-screen"),
  terms: document.querySelector("#terms-screen"),
  privacy: document.querySelector("#privacy-screen"),
  login: document.querySelector("#login-screen"),
  register: document.querySelector("#register-screen"),
  connection: document.querySelector("#connection-screen"),
  dashboard: document.querySelector("#dashboard-screen")
};
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
  menu:"<path d='M4 6h16M4 12h16M4 18h16'/>",
  chevron:"<path d='m6 9 6 6 6-6'/>",
  logout:"<path d='M10 17l5-5-5-5m5 5H3'/><path d='M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6'/>"
};

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, character => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]));
}
function renderAuthCards() {
  const container=document.querySelector("#auth-cards");
  const cards=[...data.tarjetas];
  for(let index=cards.length-1;index>0;index--){
    const swapIndex=Math.floor(Math.random()*(index+1));
    [cards[index],cards[swapIndex]]=[cards[swapIndex],cards[index]];
  }
  container.innerHTML=cards.slice(0,3).map((card,index)=>`
    <article class="showcase-card showcase-card-${index+1}${card.tipo==="Cashback"?" cashback":""}">
      <span class="showcase-card-type">${escapeHtml(card.tipo)} · ${escapeHtml(card.negocio)}</span>
      <strong>${escapeHtml(card.nombre)}</strong>
      <span class="showcase-card-reward">${card.tipo==="Cashback"?`${Number(card.porcentaje)||0}% de vuelta`:`${Number(card.estampillas)||0} visitas para premiar`}</span>
      <span class="showcase-card-bottom">${icon(card.tipo==="Cashback"?"reward":"star",16)} Beneficios que te hacen volver</span>
    </article>`).join("");
}
function showScreen(name) {
  const next=screenElements[name];
  if(!next) throw new Error(`No existe la pantalla "${name}".`);
  for(const [key,screen] of Object.entries(screenElements)) screen.hidden=key!==name;
  if(name!=="loading") window.scrollTo(0,0);
  if(name==="login") renderAuthCards();
}
function withLoading(nextScreen) {
  showScreen("loading");
  window.setTimeout(()=>showScreen(nextScreen),1000);
}
function startDemoSession(email) {
  try {
    sessionStorage.setItem("fidegresa-demo-session","active");
    sessionStorage.setItem("fidegresa-demo-email",email);
  } catch(error) {
    console.error("No fue posible iniciar la sesión de demostración.",error);
    showScreen("login");
    showToast("El navegador no permitió iniciar la demostración.",true);
    return;
  }
  withLoading("dashboard");
}
function initials(name = "") {
  return name.split(/\s+/).filter(Boolean).slice(0,2).map(word => word[0]).join("").toUpperCase();
}
function money(value) {
  return new Intl.NumberFormat(locale,{style:"currency",currency,maximumFractionDigits:2}).format(value);
}
function timeAgo(value) {
  const days=Math.max(0,Math.floor((Date.now()-new Date(value).getTime())/86400000));
  if(days===0)return "hoy";
  if(days===1)return "ayer";
  if(days<30)return `hace ${days} ${days===1?"día":"días"}`;
  const months=Math.floor(days/30);
  if(months<12)return `hace ${months} ${months===1?"mes":"meses"}`;
  const years=Math.floor(days/365);
  return `hace ${years} ${years===1?"año":"años"}`;
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
    return true;
  } catch (error) {
    console.error("No fue posible guardar los datos del panel.", error);
    showToast("No fue posible guardar los cambios en este navegador.", true);
    return false;
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
  return `<div class="page-heading"><div><h1>${title}</h1><p data-live="page-summary">${summary}</p></div>${action}</div>`;
}
function mapPositionFor(district) {
  return mapDistricts[district]||mapDistricts.Miraflores;
}
function ensureMapData() {
  if(!Array.isArray(data.audiencias)) data.audiencias=[];
  data.ubicaciones.forEach((place,index)=>{
    const district=Object.hasOwn(mapDistricts,place.distrito)?place.distrito:Object.keys(mapDistricts)[index%Object.keys(mapDistricts).length];
    place.distrito=district;
    const position=mapPositionFor(district);
    if(!Number.isFinite(Number(place.mapX))) place.mapX=position.x;
    if(!Number.isFinite(Number(place.mapY))) place.mapY=position.y;
  });
  data.clientes.forEach((person,index)=>{
    const associatedLocation=data.ubicaciones.find(place=>place.nombre===person.tarjeta)||data.ubicaciones[index%Math.max(1,data.ubicaciones.length)];
    const district=Object.hasOwn(mapDistricts,person.distrito)?person.distrito:associatedLocation?.distrito||Object.keys(mapDistricts)[index%Object.keys(mapDistricts).length];
    person.distrito=district;
    if(!Number.isFinite(Number(person.mapX))||!Number.isFinite(Number(person.mapY))){
      const center=mapPositionFor(district);
      const offset=((Number(person.id)||index+1)*47)%151-75;
      person.mapX=center.x+offset;
      person.mapY=center.y-offset*.62;
    }
  });
}
function getReachData() {
  const geo=data.geolocalizacion;
  const location=data.ubicaciones.find(place=>Number(place.id)===Number(geo.ubicacionId))||data.ubicaciones[0];
  const nearby=data.clientes.map(person=>({
    ...person,
    distance:distanceBetween(person.latitud,person.longitud,location?.latitud,location?.longitud)
  })).sort((first,second)=>first.distance-second.distance);
  const inRange=nearby.filter(person=>person.distance<=Number(geo.radio));
  return {location,nearby,inRange,outOfRange:nearby.filter(person=>person.distance>Number(geo.radio))};
}
function isCustomerActive(customer) {
  return Date.now()-new Date(customer.ultimaVisita).getTime()<=60*86400000;
}
function distanceBetween(latitudeA,longitudeA,latitudeB,longitudeB) {
  const radians=degrees=>degrees*Math.PI/180;
  const lat1=radians(Number(latitudeA)||0);
  const lat2=radians(Number(latitudeB)||0);
  const latitudeDelta=lat2-lat1;
  const longitudeDelta=radians((Number(longitudeB)||0)-(Number(longitudeA)||0));
  const haversine=Math.sin(latitudeDelta/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(longitudeDelta/2)**2;
  const meters=6371000*2*Math.atan2(Math.sqrt(haversine),Math.sqrt(1-haversine));
  return Math.max(50,Math.round(meters/10)*10);
}
function kpi(label, value, change, explanation, iconName = "chart", comparisonLabel = "vs. mes anterior") {
  const variation = change !== null && change !== undefined && Number.isFinite(Number(change))
    ? `<span class="trend${Number(change) < 0 ? " negative" : ""}">${Number(change) > 0 ? "+" : ""}${Number(change)}%</span><span>${escapeHtml(comparisonLabel)}</span>`
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
  const {start,end}=periodBounds(selectedPeriod);
  const buckets=[];
  if(selectedPeriod==="month"){
    for(let day=new Date(start);day<end;day.setDate(day.getDate()+1)){
      const date=new Date(day);
      buckets.push({
        start:new Date(date.getFullYear(),date.getMonth(),date.getDate()),
        end:new Date(date.getFullYear(),date.getMonth(),date.getDate()+1),
        short:new Intl.DateTimeFormat(locale,{day:"numeric"}).format(date),
        label:new Intl.DateTimeFormat(locale,{day:"numeric",month:"long"}).format(date)
      });
    }
  }else{
    for(let month=new Date(start);month<end;month.setMonth(month.getMonth()+1)){
      const date=new Date(month);
      buckets.push({
        start:new Date(date.getFullYear(),date.getMonth(),1),
        end:new Date(date.getFullYear(),date.getMonth()+1,1),
        short:new Intl.DateTimeFormat(locale,{month:"short"}).format(date).replace(".",""),
        label:new Intl.DateTimeFormat(locale,{month:"long",year:"numeric"}).format(date)
      });
    }
  }
  return buckets.map(bucket=>{
    const records=data.visitas.filter(visit=>{
      const date=new Date(visit.fecha);
      return date>=bucket.start&&date<bucket.end;
    });
    const label=bucket.label;
    const short=bucket.short;
    return {
      ...bucket,
      label:label.charAt(0).toLocaleUpperCase(locale)+label.slice(1),
      short:short.charAt(0).toLocaleUpperCase(locale)+short.slice(1),
      value:records.reduce((total,visit)=>total+(metricName==="visitas"?1:visit.monto),0)
    };
  });
}
function periodBounds(period=selectedPeriod,shift=0) {
  const now=new Date();
  const duration=period==="year"?now.getMonth()+1:period==="quarter"?3:1;
  const monthOffset=period==="year"?12*shift:duration*shift;
  const start=period==="year"
    ?new Date(now.getFullYear()-shift,0,1)
    :new Date(now.getFullYear(),now.getMonth()-(period==="quarter"?2:0)-monthOffset,1);
  const end=new Date(now);
  if(shift){
    end.setDate(1);
    end.setMonth(end.getMonth()-monthOffset);
    end.setDate(Math.min(now.getDate(),new Date(end.getFullYear(),end.getMonth()+1,0).getDate()));
  }
  return {start,end};
}
function metricsForPeriod(period=selectedPeriod,shift=0) {
  const {start,end}=periodBounds(period,shift);
  const visits=data.visitas.filter(visit=>{
    const date=new Date(visit.fecha);
    return date>=start&&date<end;
  });
  const frequency=visits.reduce((counts,visit)=>{
    counts.set(visit.clienteId,(counts.get(visit.clienteId)||0)+1);
    return counts;
  },new Map());
  const uniqueCustomers=new Set(frequency.keys());
  const returning=[...frequency.values()].filter(count=>count>1).length;
  const active=new Set(data.clientes.filter(customer=>{
    const lastVisit=data.visitas
      .filter(visit=>visit.clienteId===customer.id&&new Date(visit.fecha)<end)
      .reduce((latest,visit)=>Math.max(latest,new Date(visit.fecha).getTime()),0);
    return lastVisit&&end.getTime()-lastVisit<=60*86400000;
  }).map(customer=>customer.id));
  return {
    sales:visits.reduce((total,visit)=>total+visit.monto,0),
    customers:active.size,
    rewards:data.canjes.filter(item=>{
      const date=new Date(item.fecha);
      return date>=start&&date<end;
    }).length,
    returnRate:uniqueCustomers.size?returning/uniqueCustomers.size*100:0
  };
}
function percentageChange(current,previous) {
  if(!previous)return current?100:0;
  return Number(((current-previous)/previous*100).toFixed(1));
}
function filterCustomers(term=searchTerm,status=clientFilter) {
  const normalize=value=>String(value??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase(locale);
  const query=normalize(term.trim());
  const phoneQuery=query.replace(/\D/g,"");
  return data.clientes.filter(customer=>{
    if(status!=="Todos"&&customer.estado!==status)return false;
    const local=data.ubicaciones.find(place=>Number(place.id)===Number(customer.localId));
    const searchable=normalize(`${customer.nombre} ${customer.correo} ${customer.telefono} ${customer.tarjeta} ${customer.distrito} ${local?.nombre||""}`);
    const phone=String(customer.telefono||"").replace(/\D/g,"");
    return !query||searchable.includes(query)||(phoneQuery.length>=3&&phone.includes(phoneQuery));
  }).sort((first,second)=>new Date(second.ultimaVisita)-new Date(first.ultimaVisita));
}
function customerTable(customers) {
  if (!customers.length) return `<div class="empty-state">No encontramos clientes para esta búsqueda. Prueba con otro nombre, correo, teléfono o local.</div>`;
  const formatDate=value=>new Intl.DateTimeFormat(locale,{day:"numeric",month:"short",year:"numeric"}).format(new Date(value));
  return `<div class="table-wrap customer-table"><table class="data-table"><thead><tr><th>Cliente</th><th>Contacto</th><th>Local</th><th>Distrito</th><th>Actividad</th><th>Visitas</th><th>Última visita</th></tr></thead><tbody>${customers.map(customer=>{
    const local=data.ubicaciones.find(place=>Number(place.id)===Number(customer.localId));
    const email=String(customer.correo||"");
    const phone=String(customer.telefono||"");
    const phoneNumber=phone.replace(/\D/g,"");
    return `<tr><td class="customer-cell" data-label="Cliente"><span class="customer-avatar">${escapeHtml(customer.iniciales||initials(customer.nombre))}</span><span>${escapeHtml(customer.nombre)}</span></td><td class="customer-contact" data-label="Contacto">${email?`<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`:`<span>Sin correo</span>`}${phoneNumber?`<a href="tel:${phoneNumber}">${escapeHtml(phone)}</a>`:`<span>Sin teléfono</span>`}</td><td data-label="Local">${escapeHtml(local?.nombre||customer.tarjeta||"Sin local")}</td><td data-label="Distrito">${escapeHtml(customer.distrito||local?.distrito||"Sin zona")}</td><td data-label="Actividad"><span class="status-pill${customer.estado==="Inactiva"?" inactive":""}">${escapeHtml(customer.estado)}</span></td><td data-label="Visitas">${Number(customer.visitas)||0}</td><td data-label="Última visita"><span title="${escapeHtml(formatDate(customer.ultimaVisita))}">${escapeHtml(timeAgo(customer.ultimaVisita))}</span></td></tr>`;
  }).join("")}</tbody></table></div>`;
}
function chartMarkup() {
  const series = monthlySeries(selectedMetric);
  const values = series.map(item => item.value);
  const width = 650, height = 185, left = 58, top = 15, plotWidth = 569, plotHeight = 137;
  const maxValue = Math.max(1,...values);
  const step=selectedMetric==="ventas"
    ?(selectedPeriod==="month"?(maxValue>500?250:50):maxValue>20000?10000:maxValue>5000?2500:1000)
    :Math.max(5,Math.ceil(maxValue/4/5)*5);
  const axisMaximum=Math.max(step*4,Math.ceil(maxValue/(step*4))*step*4);
  const xFor=index=>left+(series.length===1?plotWidth/2:index*plotWidth/(series.length-1));
  const yFor=value=>top+plotHeight-(value/axisMaximum)*plotHeight;
  const points = values.map((value,index) => `${xFor(index)},${yFor(value)}`).join(" ");
  const areaPath = values.length>1?`M ${left},${top + plotHeight} L ${points.replaceAll(" ", " L ")} L ${left + plotWidth},${top + plotHeight} Z`:"";
  const formatValue = value => selectedMetric === "ventas" ? money(value) : new Intl.NumberFormat(locale).format(value);
  const pointsHtml = values.map((value,index) => {
    const x=xFor(index);
    const y=yFor(value);
    const tooltip=`${series[index].label} · ${formatValue(value)}`;
    return `<circle class="chart-dot" cx="${x}" cy="${y}" r="4" tabindex="0" data-chart-tooltip="${escapeHtml(tooltip)}" aria-label="${escapeHtml(tooltip)}"><title>${escapeHtml(tooltip)}</title></circle>`;
  }).join("");
  const axisLabel=value=>selectedMetric==="ventas"?(value>=1000?`S/ ${value/1000} mil`:money(value)):new Intl.NumberFormat(locale).format(value);
  const tooltip=series.length?`${series.at(-1).label} · ${formatValue(values.at(-1))}`:"Sin actividad en este periodo";
  const labelStride=Math.max(1,Math.ceil(series.length/6));
  return `<div class="chart-wrap" data-live="chart"><svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${selectedMetric==="ventas"?"Ventas en soles":"Visitas"} durante ${selectedPeriod==="month"?"este mes":selectedPeriod==="quarter"?"los últimos tres meses":"este año"}" preserveAspectRatio="none"><defs><linearGradient id="chart-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#ad8059" stop-opacity=".25"/><stop offset="1" stop-color="#ad8059" stop-opacity=".01"/></linearGradient></defs>${[0,1,2,3,4].map(index=>{const tick=Math.round(axisMaximum*(1-index/4)/step)*step;return `<line class="chart-grid" x1="${left}" y1="${top+index*plotHeight/4}" x2="${left+plotWidth}" y2="${top+index*plotHeight/4}"/><text class="chart-label" x="0" y="${top+index*plotHeight/4+3}">${axisLabel(tick)}</text>`;}).join("")}<path class="chart-area" d="${areaPath}"/><polyline class="chart-line" points="${points}"/>${pointsHtml}${series.map((item,index)=>(index%labelStride===0||index===series.length-1)?`<text class="chart-label" text-anchor="middle" x="${xFor(index)}" y="${height-5}">${escapeHtml(item.short)}</text>`:"").join("")}</svg><span class="chart-tooltip" aria-live="polite">${escapeHtml(tooltip)}</span></div><details class="chart-data"><summary>Ver datos del gráfico</summary><div class="table-wrap"><table class="data-table"><thead><tr><th>Fecha</th><th>${selectedMetric==="ventas"?"Ventas":"Visitas"}</th></tr></thead><tbody>${series.map(item=>`<tr><td>${escapeHtml(item.label)}</td><td>${formatValue(item.value)}</td></tr>`).join("")}</tbody></table></div></details>`;
}
function render() {
  document.querySelector("#breadcrumb-current").textContent=titleFor(currentPage);
  document.querySelector(".top-avatar").textContent=initials(data.configuracion.perfilNombre);
  document.querySelector(".profile-mini .avatar").textContent=initials(data.configuracion.perfilNombre);
  document.querySelector(".profile-mini span:nth-child(2)").innerHTML=`<strong>${escapeHtml(data.configuracion.perfilNombre)}</strong><small>Administradora</small>`;
  document.querySelectorAll(".nav-link").forEach(link=>link.classList.toggle("active",link.dataset.page===currentPage));
  document.querySelectorAll("[data-icon]").forEach(node => { node.innerHTML = icon(node.dataset.icon, 18); });
  const notificationCount=document.querySelector("#notification-count");
  const count=notices().length;
  notificationCount.textContent=count>9?"9+":String(count);
  notificationCount.hidden=count===0;
  document.documentElement.style.setProperty("--brand-primary",data.configuracion.colorPrincipal||"#603f2a");
  const renderers=window.fidegresaPageRenderers;
  const renderer=renderers[currentPage];
  if(!renderer) throw new Error(`No se encontró el renderizador de la página "${currentPage}".`);
  pageContent.innerHTML=renderer({data,pageHeader,kpi,money,customerTable,filterCustomers,escapeHtml,initials,icon,chartMarkup,monthlySeries,changeOf,selectedMetric,selectedPeriod,metricsForPeriod,percentageChange,timeAgo,searchTerm,clientFilter,cardFilter,reviewFilter,getReachData});
  document.body.classList.toggle("dark-theme",data.configuracion.tema==="oscuro");
}
function refreshLive() {
  const renderer = window.fidegresaPageRenderers[currentPage];
  if (!renderer) throw new Error(`No se encontró el renderizador de la página "${currentPage}".`);
  const html = renderer({data,pageHeader,kpi,money,customerTable,filterCustomers,escapeHtml,initials,icon,chartMarkup,monthlySeries,changeOf,selectedMetric,selectedPeriod,metricsForPeriod,percentageChange,timeAgo,searchTerm,clientFilter,cardFilter,reviewFilter,getReachData});
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
  document.querySelector("#profile-menu").hidden=true;
  document.querySelector(".profile-mini").setAttribute("aria-expanded","false");
  render();
}
function openModal(title, subtitle, contents, submitLabel, onSubmit, wide = false) {
  modalForm.innerHTML=`<div class="modal-head"><div><h2>${title}</h2><p>${subtitle}</p></div><button type="button" class="modal-close" data-action="close-modal" aria-label="Cerrar">${icon("close",16)}</button></div>${contents}<div class="modal-actions"><button type="button" class="secondary-button" data-action="close-modal">Cancelar</button><button type="submit" class="primary-button" data-action="submit-modal">${submitLabel}</button></div>`;
  modalForm.dataset.wide=wide?"true":"false";
  modalForm.onsubmit=async event=>{event.preventDefault();await onSubmit(new FormData(modalForm));};
  modal.showModal();
}
function cardPreviewMarkup(card, renderIcon) {
  const safeColor=value=>/^#[0-9a-f]{6}$/i.test(value||"")?value:"#603f2a";
  const primary=safeColor(card.color);
  const accent=safeColor(card.colorAcento);
  const image=typeof card.imagen==="string"&&/^data:image\/(?:png|jpeg|webp);base64,/i.test(card.imagen)
    ? `<img class="loyalty-artwork" src="${escapeHtml(card.imagen)}" alt="">`
    : "";
  const logo=image||`<span class="loyalty-monogram">${escapeHtml((card.negocio||"F").trim().slice(0,1).toUpperCase())}</span>`;
  let reward="";
  if(card.tipo==="Estampillas"){
    const count=Math.max(2,Math.min(12,Number(card.estampillas)||10));
    reward=card.mostrarProgreso?`<div class="loyalty-progress-stamps" aria-label="${count} espacios de visita">${Array.from({length:count},(_,index)=>`<span class="${index<Math.min(3,count)?"collected":""}">${index<Math.min(3,count)?renderIcon("star",12):""}</span>`).join("")}</div>`:"";
  }else if(card.tipo==="Cashback"){
    reward=card.mostrarProgreso?`<div class="loyalty-reward-value"><strong>${Number(card.porcentaje)||5}%</strong><span>cashback en compras</span></div>`:"";
  }else if(card.tipo==="Niveles"){
    const levelNames=["BRONCE","PLATA","ORO","DIAMANTE"];
    const levels=Math.max(3,Math.min(4,Number(card.niveles)||3));
    reward=card.mostrarProgreso?`<div class="loyalty-levels">${levelNames.slice(0,levels).map((level,index)=>`<span class="${index===Math.min(1,levels-1)?"current":""}"><i>${index+1}</i>${level}</span>`).join("")}</div>`:"";
  }else if(card.tipo==="Giftcard"){
    reward=card.mostrarProgreso?`<div class="loyalty-reward-value gift-balance"><strong>S/ ${Number(card.saldo)||100}</strong><span>saldo de regalo</span></div>`:"";
  }
  const code=card.mostrarQr?`<span class="loyalty-demo-code" aria-label="Código decorativo no escaneable"><i></i><b>DEMO</b></span>`:"";
  return `<article class="loyalty-card-visual style-${escapeHtml(card.estilo||"elegante")}" style="--loyalty-primary:${primary};--loyalty-accent:${accent}">
    ${image?`<div class="loyalty-artwork-wrap">${logo}</div>`:""}
    <div class="loyalty-card-top">${image?`<span class="loyalty-brand-name">${escapeHtml(card.negocio||"Tu negocio")}</span>`:`${logo}<span class="loyalty-brand-name">${escapeHtml(card.negocio||"Tu negocio")}</span>`}<span class="loyalty-program-type">${escapeHtml(card.tipo||"Estampillas")}</span></div>
    <div class="loyalty-card-copy"><h3>${escapeHtml(card.nombre||"Nombre de tu programa")}</h3><p>${escapeHtml(card.descripcion||"Tu beneficio aparecerá aquí")}</p></div>
    ${reward}
    <div class="loyalty-card-bottom"><span><small>BENEFICIO</small><strong>${escapeHtml(card.premio||card.descripcion||"Tu recompensa")}</strong></span>${code}</div>
  </article>`;
}
function cardDialog(card) {
  const existing=Boolean(card);
  const selectedType=card?.tipo||"Estampillas";
  const color=card?.color||"#603f2a";
  const accent=card?.colorAcento||"#c8894f";
  const locationOptions=data.ubicaciones.map(place=>`<option value="${escapeHtml(place.nombre)}"${card?.negocio===place.nombre?" selected":""}>${escapeHtml(place.nombre)}</option>`).join("");
  const fields=`<div class="card-designer">
    <div class="card-designer-form">
      <section class="designer-section"><div class="designer-section-title"><span>01</span><div><h3>Datos del programa</h3><p>Define qué verá tu cliente.</p></div></div>
        <div class="form-grid">
          <div class="form-field full"><label for="card-name">Nombre de la tarjeta</label><input id="card-name" class="form-control" name="nombre" required maxlength="50" value="${escapeHtml(card?.nombre||"")}" placeholder="Ej. Café de la Plaza"></div>
          <div class="form-field"><label for="card-type">Tipo de programa</label><select id="card-type" class="form-control" name="tipo"><option${selectedType==="Estampillas"?" selected":""}>Estampillas</option><option${selectedType==="Cashback"?" selected":""}>Cashback</option><option${selectedType==="Niveles"?" selected":""}>Niveles</option><option${selectedType==="Giftcard"?" selected":""}>Giftcard</option></select></div>
          <div class="form-field"><label for="card-location">Local asociado</label><select id="card-location" class="form-control" name="negocio" required>${locationOptions}</select></div>
          <div class="form-field full"><label for="card-description">Mensaje de beneficio</label><input id="card-description" class="form-control" name="descripcion" required maxlength="100" value="${escapeHtml(card?.descripcion||"")}" placeholder="Ej. Tu décimo café va por nuestra cuenta"></div>
          <div class="form-field card-type-field" data-card-field="estampillas"><label for="card-stamps">Visitas para obtener premio</label><input id="card-stamps" class="form-control" name="estampillas" type="number" min="2" max="12" value="${card?.estampillas||10}"></div>
          <div class="form-field card-type-field" data-card-field="cashback"><label for="card-cashback">Cashback por compra (%)</label><input id="card-cashback" class="form-control" name="porcentaje" type="number" min="1" max="50" value="${card?.porcentaje||5}"></div>
          <div class="form-field card-type-field" data-card-field="niveles"><label for="card-level-count">Niveles del programa</label><select id="card-level-count" class="form-control" name="niveles"><option value="3"${Number(card?.niveles||3)===3?" selected":""}>3 niveles</option><option value="4"${Number(card?.niveles)===4?" selected":""}>4 niveles</option></select></div>
          <div class="form-field card-type-field" data-card-field="giftcard"><label for="card-balance">Saldo inicial (S/)</label><input id="card-balance" class="form-control" name="saldo" type="number" min="1" max="10000" value="${card?.saldo||100}"></div>
          <div class="form-field full"><label for="card-reward">Premio o nivel destacado</label><input id="card-reward" class="form-control" name="premio" required maxlength="70" value="${escapeHtml(card?.premio||card?.descripcion||"")}" placeholder="Ej. Bebida gratis, nivel Oro o S/ 100 de saldo"></div>
        </div>
      </section>
      <section class="designer-section"><div class="designer-section-title"><span>02</span><div><h3>Identidad visual</h3><p>Personaliza la imagen y los colores.</p></div></div>
        <div class="form-grid">
          <div class="form-field"><label for="card-color">Color principal</label><div class="color-control"><input id="card-color" name="color" type="color" value="${escapeHtml(color)}"><output for="card-color">${escapeHtml(color)}</output></div></div>
          <div class="form-field"><label for="card-accent">Color de acento</label><div class="color-control"><input id="card-accent" name="colorAcento" type="color" value="${escapeHtml(accent)}"><output for="card-accent">${escapeHtml(accent)}</output></div></div>
          <div class="form-field full"><label for="card-template">Estilo de tarjeta</label><select id="card-template" class="form-control" name="estilo"><option value="elegante"${card?.estilo==="elegante"||!card?" selected":""}>Elegante · degradado y contraste</option><option value="corporativo"${card?.estilo==="corporativo"?" selected":""}>Corporativo · limpio y estructurado</option><option value="vibrante"${card?.estilo==="vibrante"?" selected":""}>Vibrante · acento protagonista</option></select></div>
          <div class="form-field full"><label for="card-image">Imagen o logotipo (opcional)</label><input id="card-image" class="form-control image-file-input" name="imagenArchivo" type="file" accept="image/png,image/jpeg,image/webp"><small class="field-hint">PNG, JPG o WebP · máximo 500 KB. La imagen se almacena solo en este navegador.</small><input name="imagenActual" type="hidden" value="${escapeHtml(card?.imagen||"")}"><button type="button" class="text-button image-remove"${card?.imagen?"":" hidden"}>Quitar imagen</button></div>
        </div>
      </section>
      <section class="designer-section"><div class="designer-section-title"><span>03</span><div><h3>Elementos de la tarjeta</h3><p>Elige qué información mostrar.</p></div></div>
        <div class="designer-toggles"><label><input type="checkbox" name="mostrarProgreso"${card?.mostrarProgreso!==false?" checked":""}><span><strong>Progreso o beneficios</strong><small>Estampillas, niveles o cashback</small></span></label><label><input type="checkbox" name="mostrarQr"${card?.mostrarQr!==false?" checked":""}><span><strong>Código de cliente</strong><small>Vista ilustrativa, no escaneable</small></span></label></div>
      </section>
    </div>
    <aside class="card-preview-panel"><div class="card-preview-heading"><div><span class="preview-live-dot"></span> VISTA PREVIA</div><span>Frente de la tarjeta</span></div><div id="card-live-preview"></div><div class="preview-tip">${icon("star",15)} Los cambios se reflejan al instante.</div><p class="preview-disclaimer">Simulación de diseño. El código mostrado es decorativo y no permite escanear.</p></aside>
  </div>`;
  openModal(existing?"Diseñar tarjeta":"Crear programa de fidelización","Configura contenido, beneficios e identidad visual en un solo lugar.",fields,existing?"Guardar diseño":"Crear programa",async formData=>{
    const type=String(formData.get("tipo"));
    const file=formData.get("imagenArchivo");
    let image=String(formData.get("imagenActual")||"");
    if(file instanceof File&&file.size){
      if(!["image/png","image/jpeg","image/webp"].includes(file.type)){
        showToast("Elige una imagen PNG, JPG o WebP.",true);
        return;
      }
      if(file.size>512000){
        showToast("La imagen debe pesar 500 KB o menos.",true);
        return;
      }
      try {
        image=await new Promise((resolve,reject)=>{
          const reader=new FileReader();
          reader.onload=()=>typeof reader.result==="string"?resolve(reader.result):reject(new Error("El archivo de imagen no produjo un resultado válido."));
          reader.onerror=()=>reject(reader.error||new Error("No se pudo leer la imagen seleccionada."));
          reader.readAsDataURL(file);
        });
      } catch(error) {
        console.error("No fue posible cargar la imagen de la tarjeta.",error);
        showToast("No se pudo cargar la imagen seleccionada.",true);
        return;
      }
    }
    const updated={
      ...card,
      nombre:String(formData.get("nombre")).trim(),
      tipo:type,
      negocio:String(formData.get("negocio")),
      descripcion:String(formData.get("descripcion")).trim(),
      premio:String(formData.get("premio")).trim(),
      color:String(formData.get("color")),
      colorAcento:String(formData.get("colorAcento")),
      estilo:String(formData.get("estilo")),
      imagen:image,
      mostrarProgreso:formData.has("mostrarProgreso"),
      mostrarQr:formData.has("mostrarQr"),
      estado:card?.estado||"Activa",
      clientes:card?.clientes||0
    };
    if(type==="Estampillas") updated.estampillas=Number(formData.get("estampillas"));
    if(type==="Cashback") updated.porcentaje=Number(formData.get("porcentaje"));
    if(type==="Niveles") updated.niveles=Number(formData.get("niveles"));
    if(type==="Giftcard") updated.saldo=Number(formData.get("saldo"));
    const previousCards=data.tarjetas;
    if(existing) data.tarjetas=data.tarjetas.map(item=>item.id===card.id?updated:item);
    else data.tarjetas=[{...updated,id:Date.now()},...data.tarjetas];
    if(!saveData()){
      data.tarjetas=previousCards;
      return;
    }
    if(modal.open) modal.close();
    render();
    showToast(existing?"Diseño de tarjeta actualizado.":"Programa creado con éxito.");
  },true);
  const type=document.querySelector("#card-type");
  const updateTypeFields=()=>{
    const fieldByType={Estampillas:"estampillas",Cashback:"cashback",Niveles:"niveles",Giftcard:"giftcard"};
    for(const [typeName,fieldName] of Object.entries(fieldByType)){
      const field=document.querySelector(`[data-card-field="${fieldName}"]`);
      field.hidden=type.value!==typeName;
      field.querySelector("input,select").disabled=field.hidden;
    }
    updateCardPreview();
  };
  type.addEventListener("change",updateTypeFields);
  modalForm.oninput=event=>{
    if(event.target.matches("#card-color,#card-accent")){
      event.target.parentElement.querySelector("output").value=event.target.value.toUpperCase();
    }
    if(event.target.closest(".card-designer")) updateCardPreview();
  };
  modalForm.onchange=event=>{
    if(event.target.matches("#card-image")){
      const file=event.target.files?.[0];
      if(file){
        if(!["image/png","image/jpeg","image/webp"].includes(file.type)||file.size>512000){
          showToast(file.size>512000?"La imagen debe pesar 500 KB o menos.":"Elige una imagen PNG, JPG o WebP.",true);
          event.target.value="";
          return;
        }
        const reader=new FileReader();
        reader.onload=()=>{
          if(typeof reader.result==="string"){
            modalForm.elements.imagenActual.value=reader.result;
            document.querySelector(".image-remove").hidden=false;
            updateCardPreview();
          }
        };
        reader.onerror=()=>showToast("No se pudo previsualizar la imagen seleccionada.",true);
        reader.readAsDataURL(file);
      }
    }
    if(event.target.closest(".card-designer")) updateCardPreview();
  };
  document.querySelector(".image-remove").addEventListener("click",()=>{
    modalForm.elements.imagenActual.value="";
    document.querySelector("#card-image").value="";
    document.querySelector(".image-remove").hidden=true;
    updateCardPreview();
  });
  updateTypeFields();
  function updateCardPreview(){
    const preview=document.querySelector("#card-live-preview");
    if(!preview||!modal.open)return;
    const value=name=>String(modalForm.elements.namedItem(name)?.value||"");
    const safeColor=value("color").match(/^#[0-9a-f]{6}$/i)?value("color"):"#603f2a";
    const safeAccent=value("colorAcento").match(/^#[0-9a-f]{6}$/i)?value("colorAcento"):"#c8894f";
    const image=value("imagenActual");
    const previewData={
      nombre:value("nombre")||"Nombre de tu programa",
      tipo:value("tipo"),
      negocio:value("negocio"),
      descripcion:value("descripcion")||"Tu beneficio aparecerá aquí",
      premio:value("premio")||"Tu próxima recompensa",
      estampillas:Number(value("estampillas"))||10,
      porcentaje:Number(value("porcentaje"))||5,
      niveles:Number(value("niveles"))||3,
      saldo:Number(value("saldo"))||100,
      color:safeColor,
      colorAcento:safeAccent,
      estilo:value("estilo"),
      imagen:image,
      mostrarProgreso:modalForm.elements.mostrarProgreso.checked,
      mostrarQr:modalForm.elements.mostrarQr.checked
    };
    preview.innerHTML=cardPreviewMarkup(previewData,icon);
  }
}
function locationDialog() {
  const form=`<div class="form-grid"><div class="form-field full"><label for="location-name">Nombre del negocio</label><input id="location-name" class="form-control" name="nombre" required maxlength="50" placeholder="Ej. Café de la Plaza"></div><div class="form-field"><label for="location-type">Tipo de negocio</label><select id="location-type" class="form-control" name="categoria"><option>Cafetería</option><option>Restaurante</option><option>Barbería</option><option>Repostería</option><option>Confitería</option><option>Otro</option></select></div><div class="form-field"><label for="location-district">Distrito</label><select id="location-district" class="form-control" name="distrito" required>${Object.keys(mapDistricts).map(district=>`<option>${escapeHtml(district)}</option>`).join("")}</select></div><div class="form-field full"><label for="location-address">Dirección o referencia</label><input id="location-address" class="form-control" name="direccion" required maxlength="100" placeholder="Av. o referencia dentro del distrito"></div><div class="form-field full"><label for="location-hours">Horario de atención</label><input id="location-hours" class="form-control" name="horario" maxlength="60" placeholder="Lun – Sáb · 9:00 – 18:00"></div></div>`;
  openModal("Agregar ubicación","Suma un negocio al programa Fidegresa",form,"Agregar ubicación",formData=>{
    const distrito=String(formData.get("distrito"));
    const position=mapPositionFor(distrito);
    data.ubicaciones.push({id:Date.now(),nombre:String(formData.get("nombre")).trim(),categoria:String(formData.get("categoria")),direccion:`${String(formData.get("direccion")).trim()}, ${distrito}, Lima`,distrito,mapX:position.x,mapY:position.y,horario:String(formData.get("horario")).trim()||"Horario por definir",clientes:0,activa:true});
    saveData();modal.close();render();showToast("Ubicación agregada.");
  });
}
function createAudienceDialog() {
  const {location,inRange}=getReachData();
  const audienceRows=inRange.length
    ? inRange.map(person=>`<li><span class="customer-avatar">${escapeHtml(person.iniciales||initials(person.nombre))}</span><span><strong>${escapeHtml(person.nombre)}</strong><small>${escapeHtml(person.distrito)} · ${person.distance} m</small></span></li>`).join("")
    : `<li class="audience-empty">Aún no hay clientes en este radio. Amplía el alcance para crear una audiencia.</li>`;
  const content=`<div class="audience-count"><span>Personas que recibirían el aviso</span><strong>${inRange.length}</strong></div><ul class="audience-recipient-list">${audienceRows}</ul><div class="form-field audience-message-field"><label for="audience-message">Mensaje de notificación</label><textarea id="audience-message" class="form-control" name="mensaje" required maxlength="240" rows="3" placeholder="Escribe una invitación breve para tus clientes…"></textarea><small class="field-hint">Hasta 240 caracteres.</small></div><p class="audience-demo-note">Demostración local: el envío se registrará aquí, pero no llegará como notificación real a los dispositivos.</p>`;
  openModal("Crear audiencia",`${escapeHtml(location?.nombre||"Tu local")} · ${data.geolocalizacion.radio} m · ${escapeHtml(location?.distrito||"Lima")}`,content,"Enviar notificación",formData=>{
    const message=String(formData.get("mensaje")||"").trim();
    if(!inRange.length){
      showToast("Amplía el radio para incluir clientes antes de enviar.",true);
      return;
    }
    if(!message){
      showToast("Escribe un mensaje para la audiencia.",true);
      return;
    }
    data.audiencias.unshift({id:Date.now(),ubicacion:location.nombre,distrito:location.distrito,radio:Number(data.geolocalizacion.radio),clientes:inRange.map(person=>person.id),mensaje:message,fecha:new Date().toISOString()});
    if(!saveData()){
      data.audiencias.shift();
      return;
    }
    modal.close();
    showToast(`Notificación de demostración registrada para ${inRange.length} ${inRange.length===1?"cliente":"clientes"}.`);
  },true);
  modalForm.querySelector('[data-action="submit-modal"]').disabled=!inRange.length;
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
  const rows=[["Nombre","Correo","Teléfono","Local","Distrito","Estado","Visitas","Última visita"],...filterCustomers().map(person=>[
    person.nombre,
    person.correo,
    person.telefono||"",
    data.ubicaciones.find(place=>Number(place.id)===Number(person.localId))?.nombre||person.tarjeta||"Sin local",
    person.distrito||"Sin zona",
    person.estado,
    person.visitas,
    person.ultimaVisita
  ])];
  const csv="\uFEFF"+rows.map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(",")).join("\r\n");
  const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));
  const link=document.createElement("a");link.href=url;link.download="clientes-fidegresa.csv";link.click();URL.revokeObjectURL(url);
  showToast("Lista de clientes exportada.");
}
function notices() {
  const preferences=data.configuracion.avisos||{};
  const inactive = data.clientes.filter(person => !isCustomerActive(person)).length;
  const paused = data.ubicaciones.filter(place => !place.activa).length;
  const unanswered = data.resenas.filter(review => !review.respuesta).length;
  const upcomingBirthdays=data.clientes.filter(person=>{
    if(!person.cumpleanos)return false;
    const [day,month]=person.cumpleanos.split("/").map(Number);
    const now=new Date();
    const birthday=new Date(now.getFullYear(),month-1,day);
    birthday.setHours(0,0,0,0);
    const today=new Date(now.getFullYear(),now.getMonth(),now.getDate());
    if(birthday<today)birthday.setFullYear(birthday.getFullYear()+1);
    return (birthday-today)/86400000<=7;
  }).length;
  return [
    ...(preferences.inactivos!==false&&inactive ? [{message:`${inactive} ${inactive===1?"cliente dejó":"clientes dejaron"} de venir hace más de 60 días.`,page:"clientes"}] : []),
    ...(preferences.localesEnPausa!==false&&paused ? [{message:`${paused} ${paused===1?"local está":"locales están"} en pausa.`,page:"ubicaciones"}] : []),
    ...(preferences.resenas!==false&&unanswered ? [{message:`${unanswered} ${unanswered===1?"reseña espera":"reseñas esperan"} respuesta.`,page:"resenas"}] : []),
    ...(preferences.cumpleanos!==false&&upcomingBirthdays ? [{message:`${upcomingBirthdays} ${upcomingBirthdays===1?"cliente cumple":"clientes cumplen"} años esta semana.`,page:"clientes"}] : [])
  ];
}
function confirmInModal(title, description, submitLabel, onConfirm) {
  openModal(title,description,"",submitLabel,formData=>onConfirm(formData));
}
function loadSavedData() {
  try {
    const saved=localStorage.getItem(storeKey);
    if(saved){
      const parsed=JSON.parse(saved);
      const hasCurrentShape=parsed?.schemaVersion===2
        &&Array.isArray(parsed.clientes)&&parsed.clientes.length>=24&&parsed.clientes.length<=40
        &&Array.isArray(parsed.visitas)&&Array.isArray(parsed.ubicaciones)&&Array.isArray(parsed.tarjetas);
      if(hasCurrentShape){
        data={...data,...parsed,configuracion:{...seedData.configuracion,...parsed.configuracion}};
      }else{
        data=structuredClone(seedData);
        saveData();
      }
    }
  } catch(error) {
    console.error("Los datos guardados del panel no se pudieron leer.",error);
    data=structuredClone(seedData);
    saveData();
    showToast("Los datos anteriores no se pudieron migrar. Se cargaron datos de demostración nuevos.",true);
  }
  ensureMapData();
}
const actions = {
  menu: button => {
    const sidebar=document.querySelector("#sidebar");
    const open=sidebar.classList.toggle("open");
    button.setAttribute("aria-expanded",String(open));
  },
  "toggle-profile-menu": button => {
    const menu=document.querySelector("#profile-menu");
    menu.hidden=!menu.hidden;
    button.setAttribute("aria-expanded",String(!menu.hidden));
  },
  logout: () => {
    try {
      sessionStorage.removeItem("fidegresa-demo-session");
      sessionStorage.removeItem("fidegresa-demo-email");
    } catch(error) {
      console.error("No fue posible cerrar la sesión de demostración.",error);
      showToast("No fue posible cerrar la sesión.",true);
      return;
    }
    document.querySelector("#login-password").value="";
    showScreen("login");
  },
  "retry-connection": () => {
    withLoading(navigator.onLine?"login":"connection");
    if(navigator.onLine) window.setTimeout(()=>showToast("El modo de demostración no utiliza un servidor de conexión."),1000);
  },
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
    const content=items.length?`<ul class="notice-list">${items.map(item=>`<li><span>${escapeHtml(item.message)}</span><button type="button" class="text-button" data-page="${item.page}">Revisar</button></li>`).join("")}</ul>`:`<p class="modal-message">No hay avisos nuevos. Tu programa está al día.</p>`;
    openModal("Avisos del programa","Información calculada con tus datos locales.",content,"Listo",()=>modal.close());
  },
  "close-modal": () => modal.close(),
  "submit-modal": button => button.form?.requestSubmit(),
  "export-clients": () => exportClients(),
  "create-audience": () => createAudienceDialog(),
  "center-map": () => {
    const {location}=getReachData();
    if(!location) return;
    const position=mapPositionFor(location.distrito);
    location.mapX=position.x;
    location.mapY=position.y;
    saveData();
    syncGeoMap();
    refreshLive();
    showToast(`Mapa centrado en ${location.nombre}.`);
  }
};
document.addEventListener("click",event=>{
  if(!event.target.closest(".profile-menu-wrap")){
    document.querySelector("#profile-menu").hidden=true;
    document.querySelector(".profile-mini").setAttribute("aria-expanded","false");
  }
  const legalLink=event.target.closest("[data-legal-screen]");
  if(legalLink){
    event.preventDefault();
    const screen=legalLink.dataset.legalScreen;
    history.pushState({fidegresaScreen:screen},"",legalLink.getAttribute("href"));
    showScreen(screen);
    return;
  }
  const publicHome=event.target.closest("[data-public-home]");
  if(publicHome){
    event.preventDefault();
    if(screenElements.terms.hidden===false||screenElements.privacy.hidden===false){
      history.pushState({fidegresaScreen:"landing"},"","#inicio");
    }
    showScreen("landing");
    return;
  }
  const authButton=event.target.closest("[data-auth-screen]");
  if(authButton){
    const destination=authButton.dataset.authScreen;
    if(authButton.closest(".marketing-header-actions")) withLoading(destination);
    else showScreen(destination);
    return;
  }
  const pageLink=event.target.closest("[data-page]");
  if(pageLink){event.preventDefault();goTo(pageLink.dataset.page);return;}
  const button=event.target.closest("[data-action]");
  if(!button)return;
  const action=actions[button.dataset.action];
  if(!action){console.error(`No existe la acción "${button.dataset.action}".`);return;}
  if(button.dataset.action==="submit-modal") event.preventDefault();
  action(button);
});
function syncGeoMap() {
  const {location}=getReachData();
  const marker=pageContent.querySelector("[data-map-marker]");
  const circle=pageContent.querySelector("#geo-range-circle");
  if(!location||!marker||!circle) return;
  marker.setAttribute("transform",`translate(${location.mapX} ${location.mapY})`);
  circle.setAttribute("cx",String(location.mapX));
  circle.setAttribute("cy",String(location.mapY));
  circle.setAttribute("r",String(Number(data.geolocalizacion.radio)/mapMetersPerUnit));
}
function updateDraggedMapMarker(event) {
  if(!activeMapDrag) return;
  const matrix=activeMapDrag.svg.getScreenCTM();
  if(!matrix) return;
  const point=new DOMPoint(event.clientX,event.clientY).matrixTransform(matrix.inverse());
  const {location}=getReachData();
  if(!location) return;
  location.mapX=Math.max(45,Math.min(955,Math.round(point.x)));
  location.mapY=Math.max(45,Math.min(655,Math.round(point.y)));
  syncGeoMap();
  refreshLive();
}
document.addEventListener("pointerdown",event=>{
  const chartPoint=event.target.closest("[data-chart-tooltip]");
  if(chartPoint){
    const tooltip=chartPoint.closest(".chart-wrap")?.querySelector(".chart-tooltip");
    if(tooltip)tooltip.textContent=chartPoint.dataset.chartTooltip;
  }
  const marker=event.target.closest("[data-map-marker]");
  if(!marker) return;
  const svg=marker.ownerSVGElement;
  if(!svg) return;
  event.preventDefault();
  svg.setPointerCapture(event.pointerId);
  activeMapDrag={svg,pointerId:event.pointerId};
  svg.classList.add("is-dragging");
});
document.addEventListener("pointerover",event=>{
  const chartPoint=event.target.closest("[data-chart-tooltip]");
  const tooltip=chartPoint?.closest(".chart-wrap")?.querySelector(".chart-tooltip");
  if(tooltip)tooltip.textContent=chartPoint.dataset.chartTooltip;
});
document.addEventListener("pointermove",event=>{
  if(activeMapDrag?.pointerId===event.pointerId) updateDraggedMapMarker(event);
});
const finishMapDrag=event=>{
  if(activeMapDrag?.pointerId!==event.pointerId) return;
  activeMapDrag.svg.classList.remove("is-dragging");
  activeMapDrag=null;
  saveData();
};
document.addEventListener("pointerup",finishMapDrag);
document.addEventListener("pointercancel",finishMapDrag);
document.addEventListener("keydown",event=>{
  if(event.key==="Escape"){
    document.querySelector("#profile-menu").hidden=true;
    document.querySelector(".profile-mini").setAttribute("aria-expanded","false");
  }
  const marker=event.target.closest("[data-map-marker]");
  const delta={ArrowLeft:[-12,0],ArrowRight:[12,0],ArrowUp:[0,-12],ArrowDown:[0,12]}[event.key];
  if(!marker||!delta) return;
  event.preventDefault();
  const {location}=getReachData();
  if(!location) return;
  location.mapX=Math.max(45,Math.min(955,location.mapX+delta[0]));
  location.mapY=Math.max(45,Math.min(655,location.mapY+delta[1]));
  saveData();
  syncGeoMap();
  refreshLive();
});
document.addEventListener("focusin",event=>{
  const chartPoint=event.target.closest("[data-chart-tooltip]");
  const tooltip=chartPoint?.closest(".chart-wrap")?.querySelector(".chart-tooltip");
  if(tooltip)tooltip.textContent=chartPoint.dataset.chartTooltip;
});
document.querySelector("#login-form").addEventListener("submit",event=>{
  event.preventDefault();
  const formData=new FormData(event.currentTarget);
  const email=String(formData.get("email")).trim();
  if(!email||!formData.get("password")) return;
  startDemoSession(email);
});
document.querySelector("#register-form").addEventListener("submit",event=>{
  event.preventDefault();
  const formData=new FormData(event.currentTarget);
  const business=String(formData.get("business")).trim();
  const firstName=String(formData.get("firstName")).trim();
  const lastName=String(formData.get("lastName")).trim();
  const email=String(formData.get("email")).trim();
  const password=String(formData.get("password"));
  if(!business||!firstName||!lastName||!email||password.length<8) return;
  data.configuracion.marca=business;
  data.configuracion.perfilNombre=`${firstName} ${lastName}`;
  data.configuracion.perfilCorreo=email;
  if(!data.ubicaciones.some(place=>place.nombre.toLowerCase()===business.toLowerCase())){
    data.ubicaciones.unshift({
      id:Date.now(),
      nombre:business,
      categoria:String(formData.get("category")),
      direccion:"Dirección pendiente",
      horario:"Horario por definir",
      clientes:0,
      activa:true
    });
  }
  saveData();
  event.currentTarget.reset();
  render();
  startDemoSession(email);
});
document.addEventListener("input",event=>{
  if(event.target.id==="client-search"){searchTerm=event.target.value;refreshLive();}
  if(event.target.id==="radius-input"){data.geolocalizacion.radio=Number(event.target.value);document.querySelector("#radius-value").textContent=`${event.target.value} m`;saveData();syncGeoMap();refreshLive();}
});
document.addEventListener("change",event=>{
  if(event.target.id==="client-filter"){clientFilter=event.target.value;refreshLive();}
  if(event.target.id==="card-filter"){cardFilter=event.target.value;refreshLive();}
  if(event.target.id==="review-filter"){reviewFilter=event.target.value;refreshLive();}
  if(event.target.id==="metric-select"){selectedMetric=event.target.value;refreshLive();}
  if(event.target.id==="period-select"){selectedPeriod=event.target.value;refreshLive();}
  if(event.target.id==="geo-location"){data.geolocalizacion.ubicacionId=Number(event.target.value);saveData();render();}
});
window.addEventListener("popstate",()=>{
  if(location.hash==="#terminos"){showScreen("terms");return;}
  if(location.hash==="#privacidad"){showScreen("privacy");return;}
  if(screenElements.terms.hidden===false||screenElements.privacy.hidden===false){
    showScreen("landing");
    if(location.hash) document.querySelector(location.hash)?.scrollIntoView();
    return;
  }
  currentPage=pageFromHash();
  render();
});
document.querySelector("#today-label").textContent=new Intl.DateTimeFormat(locale,{weekday:"short",day:"numeric",month:"short",year:"numeric"}).format(new Date());
document.querySelector(".footer span").textContent=`© ${new Date().getFullYear()} Fidegresa`;
document.querySelector(".footer b").innerHTML=icon("star",12);
loadSavedData();
currentPage=pageFromHash();
render();
const existingDemoSession=sessionStorage.getItem("fidegresa-demo-session")==="active";
const legalScreenFromHash=location.hash==="#terminos"?"terms":location.hash==="#privacidad"?"privacy":null;
window.setTimeout(()=>showScreen(legalScreenFromHash||(existingDemoSession?"dashboard":"login")),1000);