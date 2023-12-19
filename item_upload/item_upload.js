$(document).ready(function(){
    $("#submit_item").click(function(){
        var name = $("#name").val();
        var price = $("#price").val();
        var message = $("#message").val();
        var lat = $("#latitude").val();
        var lng = $("#longitude").val();
        var coordinate = [lat,lng]
        var selectElement = document.getElementById('category');
        var selectedValue = selectElement.options[selectElement.selectedIndex].text;
        var timestamp = Date.now();

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
                timestamp: timestamp
            })
        })        
        .then(response => response.json())
        .then(data => {
            alert(data.message);
        });
    });

});