# Fidegresa_Frontend_FinalRoadDBP

## Ejecutar el panel

El panel funciona como una aplicación estática. Para que el navegador pueda cargar los archivos JSON, inicia un servidor local en esta carpeta:

```powershell
python -m http.server 8000
```

Abre `http://localhost:8000` en el navegador. Si abres `index.html` directamente como archivo, el panel también funciona con sus datos de demostración integrados, aunque el navegador impide leer los JSON locales en ese modo.

Los datos de inicio están en `Metricas.json`, `Clientes.json`, `Tarjetas.json`, `ubicaciones.json`, `Reseñas.json`, `Geolocalizacion.json` y `Configuración.json`. Los cambios realizados desde el panel se guardan en el almacenamiento local del navegador.

La vista de geolocalización es esquemática y utiliza clientes de demostración; no rastrea la ubicación real de las personas.