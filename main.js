// main.js
Key = "SMQBZ-FY7KW-GK4RR-R63V4-VRG66-OFBJZ"

$(document).ready(function(){
    $("#register").click(function(){
        // 获取用户输入的用户名和密码
        var username = $("#username").val();
        var password = $("#password").val();

        // 发送POST请求到/register路由来注册用户
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(response => response.json())
          .then(data => alert(data.message));
    });

    $("#login").click(function(){
        // 获取用户输入的用户名和密码
        var username = $("#username").val();
        var password = $("#password").val();
        console.log(1);

        // 发送POST请求到/login路由来登录用户
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(response => response.json())
        .then(data => {
            if (data.message === "登录成功！") {
                window.location.href = "index/index.html";
                alert("登录成功！");
            } else {
                alert(data.message);
            }
        });
    // 这里添加获取物品列表和显示物品列表的代码
    });
});