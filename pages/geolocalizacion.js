window.fidegresaPageRenderers ??= {};
window.fidegresaPageRenderers.geolocalizacion = ({data,pageHeader,escapeHtml,initials,icon,getReachData}) => {
  const {location,nearby,inRange,outOfRange}=getReachData();
  const radius=Number(data.geolocalizacion.radio);
  const mapCustomers=nearby.map(person=>`
    <g class="lima-customer-marker${person.distance<=radius?" in-range":" out-of-range"}" transform="translate(${person.mapX} ${person.mapY})" aria-hidden="true">
      <circle r="18"></circle>
      <text y="4">${escapeHtml(person.iniciales||initials(person.nombre))}</text>
      <title>${escapeHtml(person.nombre)} · ${escapeHtml(person.distrito)} · ${person.distance} m</title>
    </g>`).join("");
  const districtLabels=[
    {name:"BARRANCO",x:230,y:615},
    {name:"MIRAFLORES",x:385,y:385},
    {name:"SAN ISIDRO",x:650,y:185},
    {name:"SAN BORJA",x:620,y:505},
    {name:"SANTIAGO DE SURCO",x:795,y:605}
  ];
  const locationOptions=data.ubicaciones.map(place=>`<option value="${place.id}"${Number(place.id)===Number(data.geolocalizacion.ubicacionId)?" selected":""}>${escapeHtml(place.nombre)} · ${escapeHtml(place.distrito)}</option>`).join("");
  const customerRows=nearby.map(person=>`<div class="nearby-row${person.distance<=radius?" within-reach":""}"><span class="customer-avatar">${escapeHtml(person.iniciales||initials(person.nombre))}</span><div><strong>${escapeHtml(person.nombre)}</strong><small>${escapeHtml(person.distrito)} · ${person.distance<=radius?"Dentro del radio":"Fuera del radio"}</small></div><span class="distance">${person.distance} m</span></div>`).join("");
  return `${pageHeader("Geolocalización",`${inRange.length} de ${nearby.length} clientes a ${radius} metros de ${escapeHtml(location?.nombre||"tu local")}.`,`<button class="primary-button" type="button" data-action="create-audience">${icon("users",16)}Crear Audiencia</button>`)}
    <div class="geo-layout">
      <article class="panel map-panel">
        <div class="map-canvas">
          <svg class="lima-map-svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Mapa de demostración de Barranco, Miraflores, San Isidro, San Borja y Surco. Arrastra el pin marrón para medir el alcance.">
            <defs>
              <pattern id="lima-street-grid" width="112" height="88" patternUnits="userSpaceOnUse">
                <rect width="112" height="88" fill="#f2f2ec"></rect>
                <path d="M0 13H112M0 75H112M16 0V88M98 0V88" stroke="#fff" stroke-width="7"></path>
                <path d="M0 13H112M0 75H112M16 0V88M98 0V88" stroke="#e6e4dc" stroke-width="1"></path>
              </pattern>
              <filter id="map-pin-shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#51463a" flood-opacity=".32"></feDropShadow></filter>
            </defs>
            <g class="lima-map-vector">
              <rect width="1000" height="700" fill="url(#lima-street-grid)"></rect>
              <path class="lima-water" d="M0 0H115Q142 86 106 159T128 310Q93 384 129 480T103 700H0Z"></path>
              <path class="lima-coastline" d="M115 0Q142 86 106 159T128 310Q93 384 129 480T103 700"></path>
              <path class="lima-park" d="M492 76Q554 42 610 80L626 143Q570 168 509 144Z"></path>
              <path class="lima-park" d="M703 355Q758 326 818 360L831 418Q775 446 715 416Z"></path>
              <path class="lima-park" d="M399 512Q451 483 492 517L481 565Q430 580 395 550Z"></path>
              <path class="lima-main-road" d="M132 229C325 211 440 236 595 202S831 162 1000 183"></path>
              <path class="lima-main-road" d="M160 450C357 408 478 425 628 394S847 339 1000 352"></path>
              <path class="lima-main-road" d="M400 0C414 143 452 257 489 367S556 569 578 700"></path>
              <path class="lima-main-road" d="M740 0C705 144 719 269 748 385S818 597 850 700"></path>
              <path class="lima-road-center" d="M132 229C325 211 440 236 595 202S831 162 1000 183"></path>
              <path class="lima-road-center" d="M160 450C357 408 478 425 628 394S847 339 1000 352"></path>
              <path class="lima-road-center" d="M400 0C414 143 452 257 489 367S556 569 578 700"></path>
              <path class="lima-road-center" d="M740 0C705 144 719 269 748 385S818 597 850 700"></path>
              <path class="lima-district-border" d="M130 330C320 314 481 330 638 294S836 249 1000 270"></path>
              <path class="lima-district-border" d="M171 520C357 491 513 505 666 476S858 430 1000 447"></path>
              ${districtLabels.map(label=>`<text class="lima-district-label" x="${label.x}" y="${label.y}">${label.name}</text>`).join("")}
              <text class="lima-map-label" x="22" y="112">OCÉANO PACÍFICO</text>
              <text class="lima-map-label" x="770" y="74">LIMA · PERÚ</text>
              <circle id="geo-range-circle" class="map-reach-circle" cx="${location?.mapX||0}" cy="${location?.mapY||0}" r="${radius/2.5}"></circle>
              ${mapCustomers}
            </g>
            <g class="map-business-marker" data-map-marker transform="translate(${location?.mapX||0} ${location?.mapY||0})" tabindex="0" role="button" aria-label="Pin de ${escapeHtml(location?.nombre||"tu local")}. Arrastra para moverlo y medir el alcance.">
              <path class="map-business-pin" d="M0 30C-5 20-24 6-24-9a24 24 0 1 1 48 0C24 6 5 20 0 30Z" filter="url(#map-pin-shadow)"></path>
              <circle class="map-business-pin-core" r="10"></circle>
              <circle class="map-business-pin-dot" r="3"></circle>
            </g>
          </svg>
          <span class="map-region-chip">${icon("pin",14)} Lima Metropolitana</span>
          <div class="map-toolbar"><button class="secondary-button" type="button" data-action="center-map">${icon("target",16)}Centrar mapa</button></div>
          <span class="map-credit">Mapa de demostración · clientes y puntos ilustrativos</span>
          <span class="map-drag-hint">Arrastra el pin marrón para mover tu local</span>
        </div>
      </article>
      <article class="panel geo-settings">
        <h2>Alcance de tu ubicación</h2>
        <p>Mueve el pin y ajusta el radio para explorar clientes cercanos en Lima.</p>
        <label for="geo-location">Ubicación del negocio</label>
        <select id="geo-location" class="form-control">${locationOptions}</select>
        <div class="range-value"><strong id="radius-value">${radius} m</strong><span>Radio máximo: 1 km</span></div>
        <input id="radius-input" class="range-input" type="range" min="100" max="1000" step="50" value="${radius}" aria-label="Radio de alcance en metros">
        <div class="range-labels"><span>100 m</span><span>500 m</span><span>1.000 m</span></div>
        <div class="geo-counts" data-live="geo-summary"><span><strong>${inRange.length}</strong> Dentro del radio</span><span><strong>${outOfRange.length}</strong> Fuera del radio</span></div>
        <div class="geo-audience-strip" data-live="geo-audience"><span>${icon("users",16)} Audiencia potencial</span><strong>${inRange.length} ${inRange.length===1?"cliente":"clientes"}</strong><small>en ${escapeHtml(location?.distrito||"Lima")} dentro de ${radius} m</small></div>
        <div class="nearby-list" data-live="geo-customers"><strong class="panel-title">Clientes por distancia</strong>${customerRows||`<p class="empty-state">No hay clientes para mostrar.</p>`}</div>
        <div class="geo-note"><span>${icon("target",16)}</span><span><b>Alcance demostrativo.</b> Las ubicaciones son datos de ejemplo y no se accede al GPS ni se rastrea a personas.</span></div>
      </article>
    </div>`;
};
