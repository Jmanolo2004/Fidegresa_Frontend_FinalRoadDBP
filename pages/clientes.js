window.fidegresaPageRenderers ??= {};
window.fidegresaPageRenderers.clientes = ({data,pageHeader,kpi,customerTable,escapeHtml,searchTerm,clientFilter,icon}) => {
  const results = data.clientes.filter(person => {
    const matchesTerm = `${person.nombre} ${person.correo} ${person.tarjeta}`.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTerm && (clientFilter === "Todos" || person.estado === clientFilter);
  });
  const totalVisits=data.clientes.reduce((total,person)=>total+Number(person.visitas||0),0);
  const activeCount=data.clientes.filter(person=>person.estado==="Activa").length;
  return `${pageHeader("Clientes",`${data.clientes.length} personas registradas; ${activeCount} tienen su tarjeta activa.`,`<button class="secondary-button" data-action="export-clients">${icon("arrow",16)}Descargar lista</button>`)}
    <div class="stats-grid">${kpi("Clientes registrados",data.clientes.length,null,"Personas inscritas en el programa.","users")}${kpi("Tarjetas activas",data.clientes.filter(person=>person.estado==="Activa").length,null,"Clientes con actividad vigente.","card")}${kpi("Visitas totales",totalVisits,null,"Visitas guardadas en el programa.","visits")}${kpi("Promedio de visitas",(totalVisits/Math.max(1,data.clientes.length)).toFixed(1),null,"Visitas por persona en promedio.","chart")}</div>
    <article class="panel activity-panel"><div class="panel-heading"><div><h2>Directorio de clientes</h2><p>Busca personas y revisa su actividad</p></div></div><div class="section-toolbar"><label class="search-wrap"><span class="search-icon">${icon("users",16)}</span><input class="search-input" id="client-search" type="search" placeholder="Buscar nombre, correo o tarjeta" value="${escapeHtml(searchTerm)}"></label><select class="filter-select" id="client-filter" aria-label="Filtrar por estado"><option${clientFilter==="Todos"?" selected":""}>Todos</option><option${clientFilter==="Activa"?" selected":""}>Activa</option><option${clientFilter==="Inactiva"?" selected":""}>Inactiva</option></select></div><div data-live="client-results">${customerTable(results)}<div class="table-meta"><span>${results.length} resultados de ${data.clientes.length} clientes</span><span>Datos de demostración</span></div></div></article>`;
};
