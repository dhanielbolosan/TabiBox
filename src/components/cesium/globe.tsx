'use client';

import { useEffect, useRef } from 'react';
import { Cartesian3, createOsmBuildingsAsync, Ion, Math as CesiumMath, Terrain, Viewer } from 'cesium'

export default function Globe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<any>(null);

    useEffect(() => {
        let viewer: any;
        (async () => {
            (window as any).CESIUM_BASE_URL = '/cesium/';

            const Cesium = await import('cesium');

            await import('cesium/Build/Cesium/Widgets/widgets.css');

            Cesium.Ion.defaultAccessToken = process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN!;

            if (!containerRef.current) return;

            viewer = new Cesium.Viewer(containerRef.current, {
                baseLayerPicker: false,
                timeline: false,
                animation: false,
                sceneModePicker: false,
                geocoder: false,
                homeButton: false,
                terrain: Cesium.Terrain.fromWorldTerrain()
            });
            
            viewer.scene.globe.enableLighting = true;
            viewerRef.current = viewer;
            viewer.camera.flyTo({
                destination: Cartesian3.fromDegrees(-122.4175, 37.655, 400),
                orientation: {
                    heading: CesiumMath.toRadians(0.0),
                    pitch: CesiumMath.toRadians(-15.0),
                }
            });

            const buildingTileset = await createOsmBuildingsAsync();
            viewer.scene.primitives.add(buildingTileset);
        })();
        return () => viewerRef.current?.destroy();
    }, []);

    return <div className="w-full h-full" ref={containerRef} />;
}