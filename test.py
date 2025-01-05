import requests

# 服务工作者的 URL
worker_url = 'https://agent.xz39.xyz/'  # 请根据实际情况修改

# 要转发的请求信息
payload = {
    'url': 'https://httpbin.org/post',  # 目标 URL
    'method': 'POST',
    'headers': {
        'Content-Type': 'application/json',
        'Custom-Header': 'CustomValue'
    },
    'body': {
        'key': 'value'
    }
}

# 发送 POST 请求到服务工作者
response = requests.post(worker_url, json=payload)

# 输出响应信息
print('Status Code:', response.status_code)
print('Response Headers:', response.headers)
print('Response Body:', response.text)