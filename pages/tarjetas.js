window.fidegresaPageRenderers ??= {};
window.fidegresaPageRenderers.tarjetas = ({data,pageHeader,kpi,escapeHtml,cardFilter,icon}) => {
  const cards=data.tarjetas.filter(card=>cardFilter==="Todas"||card.tipo===cardFilter);
  const typeLabels=["Estampillas","Cashback","Niveles","Giftcard"];
  const typeIcon={Estampillas:"star",Cashback:"reward",Niveles:"users",Giftcard:"card"};
  const typeCounts=Object.fromEntries(typeLabels.map(type=>[type,data.tarjetas.filter(card=>card.tipo===type).length]));
  const safeColor=value=>/^#[0-9a-f]{6}$/i.test(value||"")?value:"#603f2a";
  const previewCard=card=>{
    const primary=safeColor(card.color);
    const accent=safeColor(card.colorAcento);
    const image=typeof card.imagen==="string"&&/^data:image\/(?:png|jpeg|webp);base64,/i.test(card.imagen)
      ? `<img class="loyalty-artwork" src="${escapeHtml(card.imagen)}" alt="">`
      : "";
    const mark=image||`<span class="loyalty-monogram">${escapeHtml((card.negocio||"F").trim().slice(0,1).toUpperCase())}</span>`;
    let reward="";
    if(card.tipo==="Estampillas"){
      const total=Math.max(2,Math.min(12,Number(card.estampillas)||10));
      reward=Array.from({length:total},(_,index)=>`<span class="loyalty-stamp${index<Math.min(3,total)?" collected":""}">${index<Math.min(3,total)?icon("star",12):""}</span>`).join("");
      reward=card.mostrarProgreso===false?"":`<div class="loyalty-progress-stamps" aria-label="${total} espacios para visitas">${reward}</div>`;
    }else if(card.tipo==="Cashback"){
      reward=card.mostrarProgreso===false?"":`<div class="loyalty-reward-value"><strong>${Number(card.porcentaje)||5}%</strong><span>cashback en compras</span></div>`;
    }else if(card.tipo==="Niveles"){
      const levels=["BRONCE","PLATA","ORO","DIAMANTE"].slice(0,Math.max(3,Math.min(4,Number(card.niveles)||3)));
      reward=card.mostrarProgreso===false?"":`<div class="loyalty-levels">${levels.map((level,index)=>`<span class="${index===Math.min(1,levels.length-1)?"current":""}"><i>${index+1}</i>${level}</span>`).join("")}</div>`;
    }else if(card.tipo==="Giftcard"){
      reward=card.mostrarProgreso===false?"":`<div class="loyalty-reward-value gift-balance"><strong>S/ ${Number(card.saldo)||100}</strong><span>saldo de regalo</span></div>`;
    }
    const code=card.mostrarQr===false?"":`<span class="loyalty-demo-code" aria-label="Código decorativo no escaneable"><i></i><b>DEMO</b></span>`;
    return `<article class="loyalty-card-visual style-${escapeHtml(card.estilo||"elegante")}" style="--loyalty-primary:${primary};--loyalty-accent:${accent}">
      ${image?`<div class="loyalty-artwork-wrap">${mark}</div>`:""}
      <div class="loyalty-card-top">${image?`<span class="loyalty-brand-name">${escapeHtml(card.negocio||"Tu negocio")}</span>`:`${mark}<span class="loyalty-brand-name">${escapeHtml(card.negocio||"Tu negocio")}</span>`}<span class="loyalty-program-type">${escapeHtml(card.tipo||"Estampillas")}</span></div>
      <div class="loyalty-card-copy"><h3>${escapeHtml(card.nombre||"Programa de fidelidad")}</h3><p>${escapeHtml(card.descripcion||"Un beneficio especial para tus clientes.")}</p></div>
      ${reward}
      <div class="loyalty-card-bottom"><span><small>BENEFICIO</small><strong>${escapeHtml(card.premio||card.descripcion||"Tu recompensa")}</strong></span>${code}</div>
    </article>`;
  };
  const typeOptions=["Todas",...typeLabels].map(type=>`<option value="${type}"${cardFilter===type?" selected":""}>${type==="Giftcard"?"Gift cards":type}</option>`).join("");
  const cardsMarkup=cards.length?`<div class="cards-grid">${cards.map(card=>{
    const location=data.ubicaciones.find(place=>place.nombre===card.negocio);
    const isActive=location?location.activa:card.estado!=="En pausa";
    return `<article class="program-card">
      ${previewCard(card)}
      <div class="program-card-meta"><span class="program-status${isActive?"":" paused"}"><i></i>${isActive?"Activa":"En pausa"}</span><span>${Number(card.clientes)||0} clientes</span><span>${escapeHtml(card.negocio||"Sin local")}</span></div>
      <div class="program-card-actions"><button class="small-action" data-action="edit-card" data-id="${Number(card.id)}">${icon("settings",14)}Diseñar</button><button class="small-action danger-text" data-action="delete-card" data-id="${Number(card.id)}">${icon("close",14)}Eliminar</button></div>
    </article>`;
  }).join("")}</div>`:`<div class="empty-state">No hay programas en esta categoría. Crea uno para comenzar.</div>`;
  return `${pageHeader("Tarjetas","Diseña programas de lealtad con la identidad y los beneficios de tu negocio.",`<button class="primary-button" data-action="new-card">${icon("card",16)}Crear programa</button>`)}
    <div class="stats-grid card-program-stats">
      ${kpi("Programas creados",data.tarjetas.length,null,"Tarjetas de lealtad listas para tus clientes.","card")}
      ${kpi("Estampillas",typeCounts.Estampillas,null,"Premia visitas y compras frecuentes.","star")}
      ${kpi("Cashback",typeCounts.Cashback,null,"Devuelve un porcentaje de cada compra.","reward")}
      ${kpi("Niveles y gift cards",typeCounts.Niveles+typeCounts.Giftcard,null,"Reconoce progreso y ofrece saldo de regalo.","users")}
    </div>
    <section class="card-builder-intro"><div><span class="card-builder-kicker">DISEÑADOR DE PROGRAMAS</span><h2>Una experiencia que lleva tu marca.</h2><p>Personaliza beneficios, colores e imagen. Visualiza el diseño y administra tus programas desde aquí.</p></div><div class="card-type-chips">${typeLabels.map(type=>`<span>${icon(typeIcon[type],14)}${type==="Giftcard"?"Gift card":type}</span>`).join("")}</div></section>
    <article class="panel card-program-panel"><div class="panel-heading"><div><h2>Tus programas</h2><p>Diseña, edita o elimina tarjetas de lealtad</p></div><select class="filter-select" id="card-filter" aria-label="Filtrar programas">${typeOptions}</select></div><div data-live="card-results">${cardsMarkup}</div></article>`;
};
