import json
import random

def generate_items(num_items):
    properties = ["考研资料", "电子设备", "家具", "图书", "衣物"]
    items = []

    for i in range(1, num_items + 1):
        item = {
            'id': i,
            'name': f'item{i}',
            'properties': random.choice(properties),
            'details': f'This is the detail of item{i}'
        }
        items.append(item)

    return items



items = generate_items(100)  # 生成100个物品信息

with open('data/items.json', 'w') as f:
    json.dump(items, f, indent=2)  # 将物品信息保存到JSON文件中