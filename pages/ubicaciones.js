window.fidegresaPageRenderers ??= {};
window.fidegresaPageRenderers.ubicaciones = ({data,pageHeader,kpi,escapeHtml,icon}) => {
  const locations=data.ubicaciones.map(location=>({
    ...location,
    customerCount:data.clientes.filter(customer=>Number(customer.localId)===Number(location.id)||(!customer.localId&&customer.tarjeta===location.nombre)).length
  }));
  const activeCount=locations.filter(location=>location.activa).length;
  const linkedCustomers=locations.reduce((total,location)=>total+location.customerCount,0);
  const categories=new Set(locations.map(location=>location.categoria));
  const cards=locations.map(location=>`<article class="panel location-card">
    <span class="location-icon">${icon("pin",22)}</span>
    <div class="location-title"><h3>${escapeHtml(location.nombre)}</h3><span class="category-label">${escapeHtml(location.categoria)}</span></div>
    <p>${escapeHtml(location.direccion)}<br>${escapeHtml(location.distrito)} · ${escapeHtml(location.horario)}</p>
    <div class="location-meta"><span class="status-pill${location.activa?"":" inactive"}">${location.activa?"Activo":"En pausa"} · ${location.customerCount} ${location.customerCount===1?"cliente":"clientes"}</span><div class="location-actions"><button class="text-button" type="button" data-action="edit-location" data-id="${Number(location.id)}" aria-label="Editar ${escapeHtml(location.nombre)}">Editar</button><button class="switch${location.activa?" on":""}" type="button" role="switch" aria-checked="${location.activa}" aria-label="${location.activa?"Pausar":"Activar"} ${escapeHtml(location.nombre)}" data-action="toggle-location" data-id="${Number(location.id)}"></button></div></div>
  </article>`).join("");
  return `${pageHeader("Ubicaciones",`${activeCount} de ${locations.length} locales reciben clientes en tu programa.`,`<button class="primary-button" type="button" data-action="new-location">${icon("pin",16)}Agregar local</button>`)}
    <div class="stats-grid">${kpi("Locales",locations.length,null,"Negocios registrados en tu comunidad.","pin")}${kpi("Activos",activeCount,null,"Locales que reciben clientes.","chart")}${kpi("Clientes vinculados",linkedCustomers,null,"Personas relacionadas con tus locales.","users")}${kpi("Categorías",categories.size,null,"Tipos de negocio que participan.","card")}</div>
    <div class="location-grid">${cards||`<div class="empty-state">Todavía no hay locales. Agrega el primero para comenzar.</div>`}</div>`;
};
