import { useEffect, useRef } from "react";
import L from "leaflet";
import { getMarkerRadius, getMarkerColor, buildPopupHtml } from "../../utils/riskUtils";

export default function LeafletMap({ theme, scenario, activeLayer, zones, onZoneClick }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef([]);
  const tileRef = useRef(null);

  // Init map once
  useEffect(() => {
    if (mapInstance.current) return;
    const map = L.map(mapRef.current, {
      center: [-2.19, -79.90],
      zoom: 11,
      zoomControl: false,
      attributionControl: false,
    });
    L.control.zoom({ position: "bottomright" }).addTo(map);
    tileRef.current = L.tileLayer(theme.mapTiles, { maxZoom: 18 }).addTo(map);
    mapInstance.current = map;
    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, []);

  // Update tile layer on theme change
  useEffect(() => {
    if (!mapInstance.current || !tileRef.current) return;
    tileRef.current.setUrl(theme.mapTiles);
  }, [theme.mapTiles]);

  // Rebuild markers when data/layer/scenario changes
  useEffect(() => {
    if (!mapInstance.current || !zones.length) return;
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    zones.forEach(zone => {
      const color = getMarkerColor(zone, activeLayer, scenario);
      const radius = getMarkerRadius(zone, activeLayer, scenario);

      const circle = L.circleMarker([zone.lat, zone.lng], {
        radius,
        fillColor: color,
        color,
        weight: 2,
        opacity: 0.9,
        fillOpacity: 0.45,
      }).addTo(mapInstance.current);

      circle.bindPopup(buildPopupHtml(zone, scenario), {
        className: "mangrowall-popup",
        maxWidth: 260,
      });

      circle.on("click", () => {
        onZoneClick(zone);
        circle.openPopup();
      });

      markersRef.current.push(circle);
    });
  }, [zones, scenario, activeLayer]);

  return (
    <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
  );
}
