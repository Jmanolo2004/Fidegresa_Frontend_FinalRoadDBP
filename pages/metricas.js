window.fidegresaPageRenderers ??= {};
window.fidegresaPageRenderers.metricas = ({data, heading, statCard, money, customerTable, escapeHtml, chartMarkup, selectedMetric}) => {
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
};
