window.fidegresaPageRenderers ??= {};
window.fidegresaPageRenderers.metricas = ({data,pageHeader,kpi,money,customerTable,escapeHtml,chartMarkup,monthlySeries,changeOf,selectedMetric,icon}) => {
  const sales = monthlySeries("ventas");
  const visits = monthlySeries("visitas");
  const activeCount = data.clientes.filter(person => person.estado === "Activa").length;
  const locations = [...data.ubicaciones].sort((a,b) => b.clientes - a.clientes).slice(0,4);
  const summary = `${money(data.metricas.ingresos)} en ventas y ${new Intl.NumberFormat("es-PE").format(data.metricas.visitas)} visitas este mes.`;
  return `${pageHeader("Métricas",summary)}
    <div class="stats-grid">
      ${kpi("Ventas del programa",money(data.metricas.ingresos),changeOf(sales), "Compras identificadas con una tarjeta de lealtad.", "chart")}
      ${kpi("Clientes activos",new Intl.NumberFormat("es-PE").format(Math.max(data.metricas.clientesActivos,activeCount)),data.metricas.clientesCambio,"Personas que mantienen activa su relación con el programa.","users")}
      ${kpi("Recompensas canjeadas",data.metricas.recompensas,data.metricas.recompensasCambio,"Beneficios que tus clientes ya disfrutaron.","reward")}
      ${kpi("Visitas registradas",new Intl.NumberFormat("es-PE").format(data.metricas.visitas),changeOf(visits),"Visitas reconocidas en tus locales este mes.","visits")}
    </div>
    <div class="dashboard-grid">
      <article class="panel"><div class="panel-heading"><div><h2>Actividad del programa</h2><p>Ventas o visitas durante los últimos 12 meses</p></div><select class="select-control" id="metric-select" aria-label="Elegir métrica" data-live="metric-select"><option value="ventas"${selectedMetric === "ventas" ? " selected" : ""}>Ventas</option><option value="visitas"${selectedMetric === "visitas" ? " selected" : ""}>Visitas</option></select></div>${chartMarkup()}<div class="legend"><span>${selectedMetric === "ventas" ? "Ventas con tarjeta de lealtad" : "Visitas registradas"}</span></div></article>
      <article class="panel"><div class="panel-heading"><div><h2>Clientes por tipo de negocio</h2><p>Participación en el programa</p></div>${icon("users",18)}</div><div class="bar-list">${data.metricas.categorias.map(category => `<div class="bar-row"><span>${escapeHtml(category.nombre)}</span><div class="bar-track"><div class="bar-fill" style="width:${category.valor}%"></div></div><span class="bar-count">${category.valor}%</span></div>`).join("")}</div><p class="stat-foot">Porcentaje de clientes registrados por categoría.</p></article>
    </div>
    <div class="dashboard-grid">
      <article class="panel"><div class="panel-heading"><div><h2>Locales con más clientes</h2><p>Los negocios más elegidos por la comunidad</p></div></div><div class="bar-list">${locations.map(location=>`<div class="bar-row"><span>${escapeHtml(location.nombre)}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.max(5,location.clientes/Math.max(...locations.map(item=>item.clientes))*100)}%"></div></div><span class="bar-count">${location.clientes}</span></div>`).join("")}</div></article>
      <article class="panel"><div class="panel-heading"><div><h2>Clientes recientes</h2><p>${activeCount} clientes activos en tus ubicaciones</p></div><button class="text-button" data-page="clientes">Ver todos</button></div>${customerTable([...data.clientes].slice(0,4))}</article>
    </div>`;
};
