import Cesium from '@/cesiumUtils/cesium'

// eslint-disable-next-line no-unused-vars
// const addTileMapProvider = (viewer) => {
//   const imageryViewModels = []
//   imageryViewModels.push(
//     new Cesium.ProviderViewModel({
//       name: 'Google_COBALT',
//       iconUrl: Cesium.buildModuleUrl(
//         'Widgets/Images/ImageryProviders/blueMarble.png'
//       ),
//       tooltip: 'Google_COBALT',
//       creationFunction() {
//         return new Cesium.TileMapServiceImageryProvider({
//           url: window.setting.geoServerBaseUrl,
//           fileExtension: 'png',
//         })
//       },
//     })
//   )
//   new Cesium.BaseLayerPicker('baseLayerPickerContainer', {
//     globe: viewer.scene.globe,
//     imageryProviderViewModels: imageryViewModels,
//   })
// }

const addTileMapProvider = (viewer) => {
  // const tiandituTk = 'a7addbae69b35c92858a74c87cacbfa1'
  const xscope_tdt_url =
    'http://192.168.0.99:9999/mongodbwcfservice/GetTDTTile/TianDiTu/{z}/{x}/{y}'
  let param = {
    url: xscope_tdt_url,
    credit: ' Analytical Graphics, Inc.',
    tilingScheme: new Cesium.GeographicTilingScheme({
      numberOfLevelZeroTilesX: 4,
      numberOfLevelZeroTilesY: 2,
    }),
    maximumLevel: 16,
  }

  viewer.imageryLayers.addImageryProvider(
    new Cesium.UrlTemplateImageryProvider(param)
  )
}
export const initCesium = (viewerName = '3d') => {
  // DEFAULT_VIEW in China
  Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
    80,
    22,
    130,
    50
  )
  Cesium.Ion.defaultAccessToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIwMTQxMGIzNC04N2M0LTQ0MDUtOTdlYi02ZGE0NTgyZGVjMzAiLCJpZCI6MzA5ODUsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1OTQ2OTQ5NzN9.JbUqIgKO92noy6B8zcYMdq8QygnMKM70RIdJZqAwwdk'
  // const url = '/geoserver' // Geoserver URL
  // const terrainUrl = '/terrain' // Terrain URL
  const is3D = viewerName === '3d'
  const containerName = is3D ? 'cesiumContainer' : 'cesiumContainer2D'
  const baseConf = {
    // imageryProvider: false,
    geocoder: false,
    navigationHelpButton: false,
    selectionIndicator: false,
    baseLayerPicker: false,
    showRenderLoopErrors: false,
  }
  const extendConf = {}
  const viewer = new Cesium.Viewer(containerName, {
    ...baseConf,
    ...extendConf,
  })
  // load terrain from Cesium IonResource site, also load your own terrain optionally
  const terrainLayer = new Cesium.CesiumTerrainProvider({
    // url: terrainUrl,
    url: Cesium.IonResource.fromAssetId(1),
    requestWaterMask: true,
    requestVertexNormals: true,
  })
  // 加载Cesium 官网的地形，亦可以加载自己的地形
  // const terrainLayer = new Cesium.CesiumTerrainProvider({
  //   url: Cesium.IonResource.fromAssetId(1),
  //   requestWaterMask: true,
  //   requestVertexNormals: true,
  // })
  // viewer.scene.terrainProvider = terrainLayer
  viewer.scene.globe.enableLighting = true

  // viewer.imageryLayers.addImageryProvider(
  //   new Cesium.IonImageryProvider({ assetId: 3 })
  // )
  addTileMapProvider(viewer)
  viewer.camera.setView({
    destination: Cesium.Cartesian3.fromDegrees(...[104, 30, 10000000]),
    orientation: {
      // heading
      heading: Cesium.Math.toRadians(0, 0),
      // pitch
      pitch: Cesium.Math.toRadians(-90),
      roll: 0.0,
    },
  })
  viewer.clock.shouldAnimate = true
  return viewer
}
