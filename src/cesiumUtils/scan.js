import Cesium from '@/cesiumUtils/cesium'

let onTickcallback
// 根据两个点 开始角度、夹角度 求取立面的扇形
function computeCirclularFlight(x1, y1, x2, y2, fx, angle) {
  const positionArr = []
  positionArr.push(x1)
  positionArr.push(y1)
  positionArr.push(0)
  const radius = Cesium.Cartesian3.distance(
    Cesium.Cartesian3.fromDegrees(x1, y1),
    Cesium.Cartesian3.fromDegrees(x2, y2)
  )
  for (let i = fx; i <= fx + angle; i++) {
    const h = radius * Math.sin((i * Math.PI) / 180.0)
    const r = Math.cos((i * Math.PI) / 180.0)
    const x = (x2 - x1) * r + x1
    const y = (y2 - y1) * r + y1
    positionArr.push(x)
    positionArr.push(y)
    positionArr.push(h)
  }
  return positionArr
}

// compute target point postion according to first point position radius and heading
function calcPoints(x1, y1, radius, heading) {
  const m = Cesium.Transforms.eastNorthUpToFixedFrame(
    Cesium.Cartesian3.fromDegrees(x1, y1)
  )
  const rx = radius * Math.cos((heading * Math.PI) / 180.0)
  const ry = radius * Math.sin((heading * Math.PI) / 180.0)
  const translation = Cesium.Cartesian3.fromElements(rx, ry, 0)
  const d = Cesium.Matrix4.multiplyByPoint(
    m,
    translation,
    new Cesium.Cartesian3()
  )
  const c = Cesium.Cartographic.fromCartesian(d)
  const x2 = Cesium.Math.toDegrees(c.longitude)
  const y2 = Cesium.Math.toDegrees(c.latitude)
  console.log('calcPoints', x1, y1, x2, y2)

  // 用这两个点去算扇形
  return computeCirclularFlight(x1, y1, x2, y2, 0, 45)
}
function addTestPoint(viewer, longitude, latitude, height, color) {
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
    point: {
      color: color,
      pixelSize: 5,
    },
  })
}
export const setScan = (viewer, nactive = false) => {
  if (nactive) {
    viewer.entities.removeById('scan')
    viewer.entities.removeById('wall')
    viewer.clock.onTick.removeEventListener(onTickcallback)
    return
  }
  // viewer.entities.add({
  //   id: 'scan',
  //   name: 'Scan',
  //   position: Cesium.Cartesian3.fromDegrees(114, 30),
  //   ellipsoid: {
  //     radii: new Cesium.Cartesian3(200000.0, 200000.0, 200000.0),
  //     maximumCone: Cesium.Math.toRadians(90),
  //     material: Cesium.Color.BLUE.withAlpha(0.3),
  //     outline: true,
  //     outlineColor: Cesium.Color.BLUE.withAlpha(0.5),
  //     outlineWidth: 1,
  //   },
  // })
  let heading = 0
  // 初始状态
  let positionArr = calcPoints(114, 30, 200000, heading)
  addTestPoint(viewer, 114, 30, 0, Cesium.Color.RED)
  addTestPoint(
    viewer,
    116.07192994208566,
    29.983695371151963,
    0,
    Cesium.Color.BLUE
  )
  console.log('positionArr', positionArr)
  // viewer.entities.add({
  //   id: 'wall',
  //   wall: {
  //     positions: new Cesium.CallbackProperty(
  //       () => Cesium.Cartesian3.fromDegreesArrayHeights(positionArr),
  //       false
  //     ),
  //     material: Cesium.Color.AQUAMARINE.withAlpha(0.5),
  //   },
  // })

  //const result = positionArr.slice(0, 9)

  // const result = [
  //   -90.0, 41.0, 0.0, -85.0, 41.0, 500000.0, -82.0, 41.0, 400000.0, -80.0, 41.0,
  //   100000.0,
  // ]
  // console.log(result)
  // const positions = Cesium.Cartesian3.fromDegreesArrayHeights(result)
  // const hierarchy = new Cesium.PolygonHierarchy(positions)
  try {
    viewer.entities.add({
      id: 'polygon',
      polygon: {
        hierarchy: new Cesium.CallbackProperty(() => {
          const positions =
            Cesium.Cartesian3.fromDegreesArrayHeights(positionArr)
          const hierarchy = new Cesium.PolygonHierarchy(positions)

          return hierarchy
        }, false),
        perPositionHeight: true,
        material: Cesium.Color.AQUAMARINE.withAlpha(0.5),
      },
    })
  } catch (e) {
    console.error('Error adding entity:', e)
  }
  // viewer.entities.add({
  //   id: 'polygon',
  //   polygon: {
  //     hierarchy: new Cesium.CallbackProperty(
  //       () => Cesium.Cartesian3.fromDegreesArrayHeights(result),
  //       false
  //     ),
  //     // Cesium.Cartesian3.fromDegreesArrayHeights(result),
  //     perPositionHeight: true,
  //     material: Cesium.Color.AQUAMARINE.withAlpha(0.5),
  //   },
  // })
  // 执行动画效果
  viewer.clock.onTick.addEventListener(
    (onTickcallback = () => {
      heading += 0.5
      positionArr = calcPoints(114, 30, 200000, heading)
    })
  )
}
