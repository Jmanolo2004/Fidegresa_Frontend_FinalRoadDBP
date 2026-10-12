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
guardan contraseñas. La pantalla de carga dura aproximadamente un segundo; la
pantalla de error 404 se puede abrir desde «¿Problemas para conectarte?».

La marca Fidegresa abre la página informativa del producto, con explicación de
las tarjetas y métricas, planes referenciales, preguntas frecuentes y avisos
legales del prototipo. Los precios no habilitan pagos ni suscripciones.

Las siete vistas están separadas en archivos JavaScript dentro de `pages/`.
`app.js` comparte los datos, componentes visuales, acciones y persistencia local.

En Tarjetas puedes crear y diseñar programas de estampillas, cashback, niveles
y gift cards, personalizando el estilo, los colores, la imagen y los elementos
visibles con una vista previa. Las imágenes seleccionadas se guardan únicamente
en el almacenamiento local del navegador (límite de 500 KB); el código gráfico
de las tarjetas es ilustrativo y no se puede escanear.