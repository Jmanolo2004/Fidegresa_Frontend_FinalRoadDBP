window.fidegresaPageRenderers ??= {};
window.fidegresaPageRenderers.metricas = ({
  data,pageHeader,kpi,money,escapeHtml,icon,chartMarkup,selectedMetric,selectedPeriod,metricsForPeriod,percentageChange,timeAgo
}) => {
  const current=metricsForPeriod(selectedPeriod);
  const previous=metricsForPeriod(selectedPeriod,1);
  const periodTitle=selectedPeriod==="month"?"Este mes":selectedPeriod==="quarter"?"En los últimos 3 meses":"Este año";
  const comparison=selectedPeriod==="month"?"el mismo periodo del mes pasado":selectedPeriod==="quarter"?"el mismo periodo de los tres meses previos":"el mismo periodo del año pasado";
  const salesChange=percentageChange(current.sales,previous.sales);
  const changeWord=salesChange===0?"igual":salesChange>0?"más":"menos";
  const summary=`${periodTitle} tus clientes compraron ${money(current.sales)}, ${changeWord} que ${comparison}.`;
  const totalCustomers=Math.max(1,data.clientes.length);
  const categoryCounts=new Map();
  data.clientes.forEach(customer=>{
    const location=data.ubicaciones.find(item=>item.id===customer.localId||item.nombre===customer.tarjeta);
    if(location)categoryCounts.set(location.categoria,(categoryCounts.get(location.categoria)||0)+1);
  });
  const categories=[...categoryCounts.entries()].map(([name,count])=>({name,count,share:count/totalCustomers*100}));
  const locations=data.ubicaciones.map(location=>({
    ...location,
    customerCount:data.clientes.filter(customer=>customer.localId===location.id||customer.tarjeta===location.nombre).length
  })).sort((first,second)=>second.customerCount-first.customerCount);
  const recent=[...data.clientes].sort((first,second)=>new Date(second.ultimaVisita)-new Date(first.ultimaVisita)).slice(0,4);
  const inactive=data.clientes.filter(customer=>Date.now()-new Date(customer.ultimaVisita).getTime()>60*86400000).length;
  const paused=data.ubicaciones.filter(location=>!location.activa).length;
  const unanswered=data.resenas.filter(review=>!review.respuesta).length;
  const suggestions=[
    ...(inactive?[{text:`${inactive} ${inactive===1?"cliente dejó":"clientes dejaron"} de venir hace más de 60 días.`,page:"clientes",action:"Revisar clientes"}]:[]),
    ...(paused?[{text:`${paused} ${paused===1?"local está":"locales están"} en pausa.`,page:"ubicaciones",action:"Ver ubicaciones"}]:[]),
    ...(unanswered?[{text:`${unanswered} ${unanswered===1?"reseña espera":"reseñas esperan"} respuesta.`,page:"resenas",action:"Responder reseñas"}]:[])
  ].slice(0,3);
  const categoryRows=categories.map(category=>`<div class="bar-row"><span>${escapeHtml(category.name)}</span><div class="bar-track"><div class="bar-fill" style="width:${category.share}%"></div></div><span class="bar-count">${category.count}</span></div>`).join("");
  const locationRows=locations.map(location=>`<div class="bar-row"><span>${escapeHtml(location.nombre)}</span><div class="bar-track"><div class="bar-fill" style="width:${Math.max(3,location.customerCount/Math.max(1,locations[0]?.customerCount||1)*100)}%"></div></div><span class="bar-count">${location.customerCount}</span></div>`).join("");
  const recentRows=recent.map(customer=>`<li><span class="customer-avatar">${escapeHtml(customer.iniciales)}</span><span class="recent-copy"><strong>${escapeHtml(customer.nombre)}</strong><small>${escapeHtml(customer.tarjeta)} · ${escapeHtml(customer.distrito)}</small></span><span class="recent-date">${escapeHtml(timeAgo(customer.ultimaVisita))}</span></li>`).join("");
  const periodOptions=[["month","Este mes"],["quarter","Últimos 3 meses"],["year","Este año"]]
    .map(([value,label])=>`<option value="${value}"${selectedPeriod===value?" selected":""}>${label}</option>`).join("");
  return `<div data-live="metrics-header">${pageHeader("Métricas",summary)}</div>
    <div class="stats-grid" data-live="metrics-stats">
      ${kpi("Ventas con tarjeta",money(current.sales),salesChange,"Compras registradas en el periodo seleccionado.","chart",comparison)}
      ${kpi("Clientes activos",current.customers,percentageChange(current.customers,previous.customers),"Personas con una visita en los últimos 60 días.","users",comparison)}
      ${kpi("Premios canjeados",current.rewards,percentageChange(current.rewards,previous.rewards),"Recompensas registradas en este periodo.","reward",comparison)}
      ${kpi("Clientes que volvieron",`${current.returnRate.toFixed(1)}%`,percentageChange(current.returnRate,previous.returnRate),"Clientes con dos o más visitas en el periodo.","visits",comparison)}
    </div>
    <div class="metrics-toolbar">
      <label for="period-select">Periodo</label>
      <select class="select-control" id="period-select" aria-label="Elegir periodo">${periodOptions}</select>
      <label for="metric-select">Mostrar</label>
      <select class="select-control" id="metric-select" aria-label="Elegir dato del gráfico"><option value="ventas"${selectedMetric==="ventas"?" selected":""}>Ventas</option><option value="visitas"${selectedMetric==="visitas"?" selected":""}>Visitas</option></select>
    </div>
    <div class="dashboard-grid metrics-primary-grid">
      <article class="panel"><div class="panel-heading" data-live="metrics-chart-heading"><div><h2>Actividad del programa</h2><p>${periodTitle} · ${selectedMetric==="ventas"?"ventas en soles":"visitas registradas"}</p></div></div>${chartMarkup()}</article>
      <article class="panel weekly-actions"><div class="panel-heading"><div><h2>Qué hacer esta semana</h2><p>Sugerencias basadas en la actividad de tus clientes</p></div></div>${suggestions.length?`<ul>${suggestions.map(item=>`<li><span>${escapeHtml(item.text)}</span><button class="text-button" data-page="${item.page}">${item.action}</button></li>`).join("")}</ul>`:`<div class="empty-state">Todo está al día. Sigue cuidando la experiencia de tus clientes.</div>`}</article>
    </div>
    <div class="dashboard-grid metrics-secondary-grid">
      <article class="panel"><div class="panel-heading"><div><h2>Clientes por tipo de negocio</h2><p>${data.clientes.length} personas en tu programa</p></div></div><div class="bar-list">${categoryRows||`<div class="empty-state">Agrega clientes para ver la distribución.</div>`}</div></article>
      <article class="panel"><div class="panel-heading"><div><h2>Locales con más clientes</h2><p>Los ${locations.length} locales de tu programa</p></div></div><div class="bar-list">${locationRows}</div></article>
      <article class="panel recent-panel"><div class="panel-heading"><div><h2>Clientes recientes</h2><p>Últimas visitas registradas</p></div><button class="text-button" data-page="clientes">Ver todos</button></div><ul class="recent-list">${recentRows}</ul></article>
    </div>`;
};
