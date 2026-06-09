"use client";

import { useState, useRef, useCallback, useMemo } from "react";
import Map, { Source, Layer, NavigationControl } from "react-map-gl/maplibre";
import type { MapRef, MapMouseEvent } from "react-map-gl/maplibre";
import type { CircleLayerSpecification as CircleLayer, SymbolLayerSpecification as SymbolLayer } from "maplibre-gl";
import type { GeoJSONSource } from "maplibre-gl";
import Link from "next/link";
import { X } from "lucide-react";
import type { FeedPost } from "@/types";

// ─── Stadtteil-Mittelpunkte ───────────────────────────────────────────────────

const DISTRICT_COORDS: Record<string, { lat: number; lng: number }> = {
  "Eppendorf":    { lat: 53.5953, lng: 9.9869 },
  "Winterhude":   { lat: 53.6050, lng: 10.0100 },
  "Hoheluft":     { lat: 53.5830, lng: 9.9750 },
  "Eimsbüttel":   { lat: 53.5740, lng: 9.9580 },
  "Sternschanze": { lat: 53.5620, lng: 9.9650 },
  "Altona":       { lat: 53.5500, lng: 9.9450 },
  "Ottensen":     { lat: 53.5550, lng: 9.9150 },
  "St. Pauli":    { lat: 53.5510, lng: 9.9650 },
  "Innenstadt":   { lat: 53.5500, lng: 10.0000 },
  "Uhlenhorst":   { lat: 53.5700, lng: 10.0150 },
  "Barmbek":      { lat: 53.5880, lng: 10.0350 },
  "HafenCity":    { lat: 53.5400, lng: 10.0000 },
};

function pinCoords(post: FeedPost): { lat: number; lng: number } | null {
  // Use real geocoded coordinates if available
  if (post.lat && post.lng) return { lat: post.lat, lng: post.lng };
  // Only fall back to district center for posts without a real address
  const base = DISTRICT_COORDS[post.district];
  return base ?? null;
}

// ─── Mapbox Layer-Definitionen ────────────────────────────────────────────────

const clusterCircleLayer: CircleLayer = {
  id: "clusters",
  type: "circle",
  source: "posts",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": "#3B5FDB",
    "circle-radius": ["step", ["get", "point_count"], 22, 10, 30, 30, 38],
    "circle-stroke-width": 3,
    "circle-stroke-color": "#fff",
    "circle-opacity": 0.9,
  },
};

const clusterCountLayer: SymbolLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "posts",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 13,
  },
  paint: { "text-color": "#ffffff" },
};

const pinLayer: CircleLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "posts",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": [
      "match", ["get", "type"],
      "empfehlung",    "#3B5FDB",
      "frage",         "#6B84E8",
      "treffen",       "#C26A3F",
      "suche",         "#6F855A",
      "veranstaltung", "#C26A3F",
      "#3B5FDB",
    ],
    "circle-radius": 9,
    "circle-stroke-width": 2.5,
    "circle-stroke-color": "#ffffff",
  },
};

// ─── Typ-Labels ───────────────────────────────────────────────────────────────

const TYPE_LABEL: Record<string, string> = {
  empfehlung: "Empfehlung", frage: "Frage", treffen: "Treffen",
  suche: "Suche", veranstaltung: "Veranstaltung",
};

// ─── Komponente ───────────────────────────────────────────────────────────────

export function KarteView({ posts }: { posts: FeedPost[] }) {
  const mapRef = useRef<MapRef>(null);
  const [selected, setSelected] = useState<FeedPost | null>(null);
  const [cursor, setCursor] = useState("grab");

  // Only show treffen/veranstaltungen that have a meeting location
  const mapPosts = posts.filter(
    (p) => (p.type === "treffen" || p.type === "veranstaltung") && p.meeting?.where
  );

  // GeoJSON aus Posts bauen
  const geojson = useMemo(() => ({
    type: "FeatureCollection" as const,
    features: mapPosts
      .map((p) => {
        const c = pinCoords(p);
        if (!c) return null;
        return {
          type: "Feature" as const,
          geometry: { type: "Point" as const, coordinates: [c.lng, c.lat] },
          properties: {
            id: p.id, type: p.type, title: p.title,
            author: p.author, district: p.district,
            time: p.time, body: p.body ?? "",
          },
        };
      })
      .filter((f): f is NonNullable<typeof f> => f !== null),
  }), [mapPosts]);

  const handleClick = useCallback((e: MapMouseEvent) => {
    const features = e.features;
    if (!features?.length) { setSelected(null); return; }

    const feature = features[0];

    if (feature.layer?.id === "clusters") {
      const clusterId = feature.properties?.cluster_id as number;
      const source = mapRef.current?.getSource("posts") as GeoJSONSource | undefined;
      if (source && "getClusterExpansionZoom" in source) {
        (source as any).getClusterExpansionZoom(clusterId).then((zoom: number) => {
          const coords = (feature.geometry as GeoJSON.Point).coordinates as [number, number];
          mapRef.current?.easeTo({ center: coords, zoom: zoom + 0.5, duration: 450 });
        }).catch(() => {});;
      }
    } else if (feature.layer?.id === "unclustered-point") {
      const post = posts.find((p) => p.id === feature.properties?.id);
      if (post) setSelected(post);
    }
  }, [posts]);

  return (
    <div style={{ position: "relative", width: "100%", height: "calc(100dvh - 64px)" }}>
      <Map
        ref={mapRef}
        initialViewState={{ longitude: 9.993, latitude: 53.563, zoom: 12.2 }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        interactiveLayerIds={["clusters", "unclustered-point"]}
        onClick={handleClick}
        cursor={cursor}
        onMouseEnter={() => setCursor("pointer")}
        onMouseLeave={() => setCursor("grab")}
      >
        <NavigationControl position="top-right" />

        <Source
          id="posts"
          type="geojson"
          data={geojson}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={48}
        >
          <Layer {...clusterCircleLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...pinLayer} />
        </Source>
      </Map>

      {/* Leer-State */}
      {posts.length === 0 && (
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center", pointerEvents: "none",
        }}>
          <div style={{
            background: "rgba(245,241,232,0.92)", backdropFilter: "blur(12px)",
            borderRadius: 16, padding: "20px 28px", textAlign: "center",
          }}>
            <div style={{ fontFamily: "var(--font-ui)", fontSize: 18, fontWeight: 500, color: "var(--ink)" }}>
              Noch keine Beiträge auf der Karte.
            </div>
          </div>
        </div>
      )}

      {/* Bottom Sheet */}
      {selected && (
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          background: "var(--surface-card)",
          borderRadius: "20px 20px 0 0",
          borderTop: "1px solid var(--border-soft)",
          padding: "20px 20px calc(72px + env(safe-area-inset-bottom, 0px)) 20px",
          boxShadow: "0 -4px 32px rgba(60,48,28,0.12)",
          zIndex: 10,
        }}>
          {/* Handle */}
          <div style={{
            width: 36, height: 4, borderRadius: 99,
            background: "var(--border)", margin: "0 auto 16px",
          }} />

          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <span style={{
                display: "inline-block", fontSize: 10, fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase",
                fontFamily: "var(--font-mono)", color: "var(--cobalt-700)",
                background: "var(--cobalt-50)", borderRadius: 999, padding: "2px 9px", marginBottom: 8,
              }}>
                {TYPE_LABEL[selected.type] ?? selected.type}
              </span>
              <h3 style={{
                fontFamily: "var(--font-ui)",
                fontSize: 20, fontWeight: 600, color: "var(--ink)",
                margin: "0 0 6px", lineHeight: 1.2, letterSpacing: "-0.02em",
              }}>
                {selected.title}
              </h3>
              <p style={{ fontSize: 13, color: "var(--fg-muted)", margin: 0 }}>
                {selected.author} · {selected.district} · {selected.time}
              </p>
              {selected.body && (
                <p style={{ fontSize: 14, color: "var(--fg)", lineHeight: 1.55, margin: "10px 0 0" }}>
                  {selected.body.length > 100 ? selected.body.slice(0, 100) + "…" : selected.body}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setSelected(null)}
              style={{
                background: "var(--surface-card)", border: "1px solid var(--border)",
                borderRadius: 999, width: 36, height: 36,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0,
              }}
            >
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>

          <Link
            href={`/feed/${selected.id}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16,
              background: "var(--cobalt-500)", color: "#fff", borderRadius: 999,
              padding: "11px 22px", fontFamily: "var(--font-ui)", fontSize: 14,
              fontWeight: 500, textDecoration: "none",
            }}
          >
            Beitrag lesen
          </Link>
        </div>
      )}
    </div>
  );
}
