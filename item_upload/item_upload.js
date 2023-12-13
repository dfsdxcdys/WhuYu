$(document).ready(function(){
    $("#submit_item").click(function(){
        var name = $("#name").val();
        var price = $("#price").val();
        var message = $("#message").val();
        var lat = $("#latitude").val();
        var lng = $("#longitude").val();
        var coordinate = [lat,lng]
        var selectElement = document.getElementById('category');
        console.log(selectElement);  // 输出选中的值
        var selectedValue = selectElement.value;
        console.log(1);  // 输出选中的值

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
                selectedValue: selectedValue
            })
        })        
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        });
    });

});