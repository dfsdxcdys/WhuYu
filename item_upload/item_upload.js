$(document).ready(function(){
    $("#submit_item").click(function(e){
        
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

        var coordinate = [lat,lng]
        var timestamp = Date.now();
        var date = new Date(timestamp);
        var localDateString = date.toLocaleString(); // 将日期格式化为本地字符串

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
                timestamp: localDateString
            })
        })        
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        });
    });
});