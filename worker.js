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
function handleSpecialCases(request) {
  const url = new URL(request.url);
  const rules = specialCases[url.hostname] || specialCases["*"];
  for (const [key, value] of Object.entries(rules)) {
    switch (value) {
      case "KEEP":
        break;
      case "DELETE":
        request.headers.delete(key);
        break;
      default:
        request.headers.set(key, value);
        break;
    }
  }
}
async function handleRequest(request) {
  const url = new URL(request.url);

  // 处理预检请求
  if (request.method === 'OPTIONS') {
      return new Response(null, {
          status: 204,
          headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type, Authorization',
              'Access-Control-Max-Age': '86400'
          }
      });
  }

  if (url.pathname === "/") {
      return new Response("Please enter the link after the /")
  };

  const targetUrl = url.pathname.replace("/", "") + url.search + url.hash;
  const requestBody = await request.json();
  const headers = new Headers(requestBody.headers);

  const modifiedRequest = new Request(targetUrl, {
      headers: headers,
      method: request.method,
      body: request.body,
      redirect: 'follow'
  });

  const response = await fetch(modifiedRequest);
  const modifiedResponse = new Response(response.body, response);
  modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
  return modifiedResponse;
}