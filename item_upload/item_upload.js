$(document).ready(function () {
    $("#submit_item").click(function (e) {

        e.preventDefault(); // 阻止表单的默认提交行为
        var name = $("#name").val();
        var price = $("#price").val();
        var message = $("#message").val();
        var lat = $("#latitude").val();
        var lng = $("#longitude").val();
        var selectElement = document.getElementById('category');
        var selectedValue = selectElement.options[selectElement.selectedIndex].text;

        // 检查各个输入框是否已填写
        if (!name || !price || !message || !lat || !lng || !selectedValue) {
            e.preventDefault(); // 阻止表单提交
            alert('请填写表格内所有信息'); // 显示错误信息
            return;
        }

        var coordinate = [lat, lng]
        var timestamp = Date.now();
        var date = new Date(timestamp);
        var localDateString = date.toLocaleString(); // 将日期格式化为本地字符串

        var locationName = []; // 地点名称

        $.ajax({
            url: "https://apis.map.qq.com/ws/geocoder/v1/",
            type: "get",
            dataType: "jsonp",
            data: {
                key: "SMQBZ-FY7KW-GK4RR-R63V4-VRG66-OFBJZ",
                location: lat + "," + lng,
                get_poi: "1",//是否返回周边POI列表：1.返回；0不返回(默认)
                output: "jsonp"
            },
            success: function (data) {
                console.log(data);
                
                if (data.status == 0) {
                    // var address = data.result.formatted_addresses.recommend;
                    // $("#address").html(address);
                    locationName = data.result.address;
                    console.log(locationName);
                } 

                // 在获取到地址之后再发送请求
                fetch('http://localhost:5000/items', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        price: price,
                        message: message,
                        coordinate: coordinate,
                        selectedValue: selectedValue,
                        timestamp: localDateString,
                        locationName: locationName // 添加地点名称
                    })
                })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                });
            }
        });


        

        // // 通过经纬度获取地址描述
        // // 使用 geocoder 对象的 getAddress 方法进行逆地址解析
        // geocoder.getAddress(new TMap.LatLng(lat, lng), function(result) {
        //     if (result.status === 0) {
        //         var locationName = result.result.address; // 获取地点名称

        //         // 在 fetch 请求的 body 中添加 locationName 字段
        //         fetch('http://localhost:5000/items', {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({
        //                 name: name,
        //                 price: price,
        //                 message: message,
        //                 coordinate: coordinate,
        //                 selectedValue: selectedValue,
        //                 timestamp: localDateString,
        //                 locationName: locationName // 添加地点名称
        //             })
        //         })        
        //         .then(response => response.json())
        //         .then(data => {
        //             alert(data.message);
        //             console.log(data.item.locationName); // 输出地址信息
        //         });
        //     } else {
        //         console.error('Geocoding failed: ' + result.message);
        //     }
        // });


    });
});