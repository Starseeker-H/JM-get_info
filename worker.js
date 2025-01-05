addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const specialCases = {
  "https://18comic.vip/": {
    "Origin": "DELETE",
    "Referer": "https://18comic.vip/"
  },
  "*": {
    "Origin": "DELETE",
    "Referer": "DELETE"
  }
}

// 修正：处理请求头
function handleSpecialCases(request) {
  const url = new URL(request.url);
  const rules = specialCases[url.hostname] || specialCases["*"];
  const headers = new Headers(request.headers); // 复制原始请求头
  for (const [key, value] of Object.entries(rules)) {
    switch (value) {
      case "KEEP":
        break;
      case "DELETE":
        headers.delete(key); // 删除指定请求头
        break;
      default:
        headers.set(key, value); // 设置或覆盖请求头
        break;
    }
  }
  // 返回一个新的 Request 对象
  return new Request(request.url, {
    headers: headers,
    method: request.method,
    body: request.body
  });
}

async function handleRequest(request) {
  // 处理 OPTIONS 请求（预检请求）
  if (request.method === 'OPTIONS') {
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, User-Agent, Accept, Accept-Encoding, Accept-Language, Cache-Control, Cookie, Referer, Sec-CH-UA, Sec-CH-UA-Mobile, Sec-CH-UA-Platform, Sec-Fetch-Dest, Sec-Fetch-Mode, Sec-Fetch-Site, Sec-Fetch-User, Upgrade-Insecure-Requests');
    return new Response(null, { headers });
  }

  try {
    // 处理特殊请求头
    const modifiedRequest = handleSpecialCases(request);

    // 转发请求并获取响应
    const response = await fetch(modifiedRequest);

    // 处理响应头
    const responseHeaders = new Headers(response.headers);
    responseHeaders.set('Access-Control-Allow-Origin', '*');
    responseHeaders.set('X-Proxy-Success', 'true');

    // 返回新的响应对象
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders
    });
  } catch (error) {
    // 处理转发失败的情况
    const headers = new Headers();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('X-Proxy-Success', 'false');
    return new Response('请求转发失败', {
      status: 500,
      statusText: 'Internal Server Error',
      headers: headers
    });
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});