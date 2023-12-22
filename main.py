# main.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

# 读取JSON文件
with open('data/users.json', 'r', encoding='utf-8') as f:
    users = json.load(f)
    
# 读取物品数据
with open('data/items.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

app = Flask(__name__)
CORS(app)


@app.route('/register', methods=['POST'])
def register():
    user = request.get_json()
    users.append(user)
    return jsonify({"message": "注册成功！"}), 201

@app.route('/login', methods=['POST'])
def login():
    user = request.get_json()
    print(user)
    print(users[0]['password'])
    if user in users:
        return jsonify({"message": "登录成功！"}), 200
    elif user['username'] != users[0]['username']:
        return jsonify({"message": "用户名错误!"}), 401
    elif user['password'] != users[0]['password']:
        return jsonify({"message": "密码!"}), 401
    else:
        return jsonify({"message": "错误!"}), 401
    
@app.route('/items', methods=['POST'])
def add_item():
    item = request.get_json()
    id = len(items) + 1
    new_item = {
        "id": id,
        "name": item['name'],
        "price": item['price'],
        "message": item['message'],
        "coordinate": item['coordinate'],
        "selectedValue": item['selectedValue'],
        "timestamp" : item['timestamp'],
        "locationName":item['locationName'],
        "username": item['username']
    }
    items.append(new_item)
    with open('./data/items.json', 'w', encoding='utf-8') as f:
        json.dump(items, f, ensure_ascii=False, indent=4)
    
    print("添加成功！请返回主页地图查看您发布的物品。")
    return jsonify({"message": "添加成功！请返回主页地图查看您发布的物品。"}), 201

@app.route('/latest-items', methods=['GET'])
def get_latest_items():
    latest_items = items[-5:][::-1]
    return jsonify(latest_items), 200

@app.route('/items', methods=['GET'])
def get_items():
    return jsonify(items), 200

if __name__ == '__main__':
    app.run(debug=True)