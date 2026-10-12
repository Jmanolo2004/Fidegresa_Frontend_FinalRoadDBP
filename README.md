# Fidegresa

Panel web de fidelización para comercios locales, construido con HTML, CSS y
JavaScript sin framework ni dependencias de ejecución.

## Abrir el panel

Abre `index.html` en un navegador. El panel utiliza datos de demostración y
guarda los cambios localmente en el navegador con la clave
`fidegresa-dashboard-v1`; no se conecta a servidores ni rastrea la ubicación real
de las personas.

La pantalla de acceso, el registro y el cierre de sesión son demostraciones
locales: aceptan datos del navegador, pero no autentican cuentas ni envían o
guardan contraseñas. Al registrarte, puedes indicar el distrito y una referencia
de tu local; el panel la deja seleccionada en Geolocalización. La pantalla de
carga dura aproximadamente un segundo; la pantalla de error 404 se puede abrir
desde «¿Problemas para conectarte?».

La marca Fidegresa abre la página informativa del producto, con explicación de
las tarjetas y métricas, planes referenciales, preguntas frecuentes y avisos
legales del prototipo. Los precios no habilitan pagos ni suscripciones.

Las siete vistas están separadas en archivos JavaScript dentro de `pages/`.
`app.js` comparte los datos, componentes visuales, acciones y persistencia local.
En Configuración puedes cambiar el nombre del programa, editar los datos del
perfil, elegir el tema claro u oscuro y decidir qué avisos mostrar.

En Tarjetas puedes crear y diseñar programas de estampillas, cashback, niveles
y gift cards, personalizando el estilo, los colores, la imagen y los elementos
visibles con una vista previa. Se aceptan imágenes PNG, JPG y WebP de hasta
500 KB; se guardan únicamente en el almacenamiento local del navegador. El
código gráfico de las tarjetas es ilustrativo y no se puede escanear.

La vista Geolocalización muestra un mapa vectorial local inspirado en la
cartografía digital, con ubicaciones de demostración en Barranco, Miraflores,
San Isidro, San Borja y Santiago de Surco. Puedes mover el pin —también con las
flechas del teclado— y ajustar el radio para recalcular qué clientes de ejemplo
quedan dentro del alcance. «Crear Audiencia» permite revisar los destinatarios
y registrar un mensaje de demostración en el almacenamiento local; no consulta
Google Maps ni el GPS, ni envía notificaciones reales. En Clientes, la columna
«Ubicación» muestra el distrito de cada perfil de ejemplo.

La página informativa presenta las funciones, planes referenciales y preguntas
frecuentes del producto. Los planes no activan suscripciones ni procesan pagos.
Los recursos gráficos de marca usados por el sitio están dentro de `assets/`;
no se cargan imágenes desde servicios externos.