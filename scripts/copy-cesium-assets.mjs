import { cpSync } from 'fs';

const src = 'node_modules/cesium/Build/Cesium';
const dest = 'public/cesium';

for (const folder of ['Workers', 'ThirdParty', 'Assets', 'Widgets']) {
    cpSync(`${src}/${folder}`, `${dest}/${folder}`, { recursive: true });
}