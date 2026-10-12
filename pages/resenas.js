window.fidegresaPageRenderers ??= {};
window.fidegresaPageRenderers.resenas = ({data,pageHeader,escapeHtml,initials,icon,reviewFilter,reviewResponseFilter,timeAgo}) => {
  const average=data.resenas.reduce((sum,review)=>sum+Number(review.calificacion),0)/Math.max(1,data.resenas.length);
  const counts=[5,4,3,2,1].map(score=>data.resenas.filter(review=>Number(review.calificacion)===score).length);
  const positive=data.resenas.filter(review=>review.sentimiento==="Positiva").length;
  const neutral=data.resenas.filter(review=>review.sentimiento==="Neutral").length;
  const improve=data.resenas.filter(review=>review.sentimiento==="Por mejorar").length;
  const pending=data.resenas.filter(review=>!String(review.respuesta||"").trim()).length;
  const pendingLabel=pending===1?"1 pendiente de respuesta":`${pending} pendientes de respuesta`;
  const reviews=data.resenas.filter(review=>{
    const matchesSentiment=reviewFilter==="Todas"||review.sentimiento===reviewFilter;
    const hasReply=Boolean(String(review.respuesta||"").trim());
    const matchesReply=reviewResponseFilter==="Todas"||(reviewResponseFilter==="Respondidas"?hasReply:!hasReply);
    return matchesSentiment&&matchesReply;
  });
  const stars=score=>Array.from({length:5},(_,index)=>`<span class="${index<score?"star-on":"star-off"}">${icon("star",14)}</span>`).join("");
  const reviewRows=reviews.map(review=>{
    const reviewDate=new Intl.DateTimeFormat("es-PE",{day:"numeric",month:"long",year:"numeric"}).format(new Date(review.fecha));
    const answer=String(review.respuesta||"").trim();
    const reply=answer
      ? `<div class="review-answer"><div class="review-answer-heading"><strong>Respuesta del negocio</strong><span class="review-reply-status answered">Respondida</span></div><p>${escapeHtml(answer)}</p><button class="text-button" type="button" data-action="review-reply" data-id="${Number(review.id)}">Editar respuesta</button></div>`
      : `<button class="text-button review-reply-button" type="button" data-action="review-reply" data-id="${Number(review.id)}">Responder reseña</button>`;
    return `<article class="review-item"><span class="customer-avatar">${escapeHtml(review.iniciales||initials(review.nombre))}</span><div class="review-copy"><div class="review-top"><strong>${escapeHtml(review.nombre)}</strong><span class="stars" aria-label="${Number(review.calificacion)} de 5 estrellas">${stars(Number(review.calificacion))}</span><time class="review-date" datetime="${escapeHtml(review.fecha)}" title="${escapeHtml(reviewDate)}">${escapeHtml(timeAgo(review.fecha))}</time></div><div class="review-business">${escapeHtml(review.negocio)} · <span class="status-pill${review.sentimiento==="Por mejorar"?" pending":""}">${escapeHtml(review.sentimiento)}</span></div><p>${escapeHtml(review.comentario)}</p>${reply}</div></article>`;
  }).join("");
  const sentimentOptions=["Todas","Positiva","Neutral","Por mejorar"]
    .map(value=>`<option value="${value}"${reviewFilter===value?" selected":""}>${value==="Todas"?"Todas las opiniones":value==="Positiva"?"Positivas":value==="Neutral"?"Neutrales":"Por mejorar"}</option>`).join("");
  const replyOptions=["Todas","Pendientes","Respondidas"]
    .map(value=>`<option value="${value}"${reviewResponseFilter===value?" selected":""}>${value==="Todas"?"Todas las respuestas":value}</option>`).join("");
  return `${pageHeader("Reseñas",`${average.toFixed(1)} de 5 estrellas en ${data.resenas.length} opiniones; ${pendingLabel}.`)}
    <div class="review-summary"><article class="panel rating-card"><strong class="rating-number">${average.toFixed(1)}</strong><span class="stars" aria-label="${average.toFixed(1)} de 5 estrellas">${stars(Math.round(average))}</span><span class="rating-caption">${data.resenas.length} comentarios compartidos</span></article><article class="panel rating-breakdown">${[5,4,3,2,1].map((score,index)=>`<div class="rating-row"><span>${score} estrellas</span><div class="bar-track"><div class="bar-fill" style="width:${data.resenas.length?counts[index]/data.resenas.length*100:0}%"></div></div><span>${counts[index]}</span></div>`).join("")}</article></div>
    <div class="sentiment-grid"><article class="sentiment-card"><strong>${positive}</strong><span>Positivas</span></article><article class="sentiment-card"><strong>${neutral}</strong><span>Neutrales</span></article><article class="sentiment-card"><strong>${improve}</strong><span>Por mejorar</span></article><article class="sentiment-card pending-reviews"><strong>${pending}</strong><span>Sin responder</span></article></div>
    <article class="panel review-panel"><div class="panel-heading"><div><h2>Comentarios de clientes</h2><p>Responde desde aquí; los cambios se guardan en este navegador.</p></div><div class="review-filters"><select class="filter-select" id="review-filter" aria-label="Filtrar por opinión">${sentimentOptions}</select><select class="filter-select" id="review-response-filter" aria-label="Filtrar por respuesta">${replyOptions}</select></div></div><div class="review-list" data-live="reviews" aria-live="polite">${reviewRows||`<div class="empty-state">No hay reseñas con estos filtros.</div>`}</div></article>`;
};
