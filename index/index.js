var items = [];
$(document).ready(function () {
    // 发送 GET 请求
    fetch('http://localhost:5000/items', {
        methods: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json())
        .then(data => {
            // 在这里处理返回的数据
            items = data;
        })
        .catch(error => {
            // 在这里处理错误
            console.error('Error:', error);
        });
});
function initMap() {
    //定义地图中心点坐标
    var center = new TMap.LatLng(30.539120, 114.364484)
    //定义map变量，调用 TMap.Map() 构造函数创建地图
    var map = new TMap.Map(document.getElementById('container'), {
        center: center,//设置地图中心点坐标
        zoom: 17.2,   //设置地图缩放级别
        pitch: 43.5,  //设置俯仰角
        rotation: 45    //设置地图旋转角度
    });
    for (var i = 0; i < items.length; i++) {
        var marker = new TMap.MultiMarker({
            map: map,
            styles: {
                // 点标记样式
                marker: new TMap.MarkerStyle({
                    width: 20, // 样式宽
                    height: 30, // 样式高
                    src: "../img/Marker.png", // 图片地址
                    anchor: { x: 10, y: 30 }, // 描点位置
                }),
            },
            geometries: [{
                "id": i,
                "styleId": 'marker',
                "position": new TMap.LatLng(items[i]['coordinate'][0], items[i]['coordinate'][1]),
                id: 'marker' + i,
            },
            ],
        });
    }
}