async function fetchData(number) {
    const proxyUrl = 'https://agent.xz39.xyz/';
    const targetUrl = `https://18comic.vip/album/${number}`;

    // 自定义请求头
    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5,ja;q=0.4,mt;q=0.3',
        'Cache-Control': 'max-age=0',
        'Cookie': 'ipcountry=HK; theme=light; AVS=1ulfg45dd0gq01q4em2fq472g0; __cflb=02DiuDFSTg91mAHCXon7ZX52jqwWDiVcSRRfWT3YXAgnp; _gid=GA1.2.1796652780.1736070888; _clck=bvwfpq%7C2%7Cfsb%7C0%7C1831; cf_clearance=ByTy2lldZDz47TNAt9HdvOLD5DOtnCjwDP.qgpGEzhs-1736070892-1.2.1.1-Ou9Sm8gNe86hpq0OGZVt_WWECSPag83Ud_hUXXugkHgOYSdwFAffQgVRBV4szAdfWg1HThfBIJ9FD8Caw.B2VqnHuV7K74OEchn4JO95ZLkI.fR..IjWfDDlRP7imO3s8hWqJPLj69dJtAC4ljMe3Rkf5Zi1DA8uIrowcpDv23l7qqb4nBd_6LFRqX9MapRX0tv0T6PDSAN4qwuuJFxFf4Ca0dwg2bOsxyAmDgpsZLNY2dXtHlFxHT9OXc3NGk22TfRwK79pl7yZpVJqRFOQ1qSWwIjveh_WhKNJpRUu9fE3FitCTtnHlu7z900qxUY_kr9yygAvpaHouHS8h83OewI7AvUGVGuiKO0ucMrytFezHEqcciwsWdZAF0e8.HNyyeCiB4xxRdAX65oxZlsqHQ; ipm5=fb4d1adfdf2e1d93abb9d5a9c56c805a; UGVyc2lzdFN0b3JhZ2U=%7B%7D; cover=1; bnState_1997124={"impressions":2,"delayStarted":0}; remember=a%3A3%3A%7Bs%3A8%3A%22username%22%3Bs%3A9%3A%22552356310%22%3Bs%3A8%3A%22password%22%3Bs%3A32%3A%222d78b614533e17f416f79d3db13263fb%22%3Bs%3A5%3A%22check%22%3Bs%3A40%3A%222d64d10de3441fb2de5fbc34ff3ac25faa58b34b%22%3B%7D; _gat_ga0=1; _gat_ga1=1; yuo1=%7B%22objName%22:%22kd4Rr0QDmKq%22,%22request_id%22:2,%22zones%22:%5B%7B%22idzone%22:%225067278%22,%22sub%22:%2278%22,%22container%22:%7B%7D,%22here%22:%7B%7D%7D%5D%7D; pc_u_guide=1; _ga_VW05C6PGN3=GS1.1.1736070889.5.1.1736071523.23.0.0; _ga=GA1.2.182121136.1736070888; _ga_C1BGNGMN6J=GS1.2.1736070897.1.1.1736071523.0.0.0; _clsk=1nm6vpg%7C1736071524492%7C12%7C0%7Co.clarity.ms%2Fcollect; _gali=wrapper',
        'Referer': 'https://18comic.vip/',
        'Sec-CH-UA': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'Sec-CH-UA-Mobile': '?0',
        'Sec-CH-UA-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
    };

    try {
        const response = await fetch(proxyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: targetUrl,
                method: 'GET',
                headers: headers
            })
        });

        if (response.ok) {
            const { contents } = await response.json();
            const parser = new DOMParser();
            const doc = parser.parseFromString(contents, 'text/html');
            const data = extractData(doc);
            displayData(data, number);
        } else {
            document.getElementById('copy-message').innerText = '获取内容失败';
        }
    } catch (err) {
        document.getElementById('copy-message').innerText = '请求失败';
    }
}

function extractData(doc) {
    const data = {};
    data.name = doc.querySelector("#wrapper > div.container > div:nth-child(4) > div > div.panel.panel-default.visible-lg.hidden-xs > div.panel-heading > div.pull-left > h1")?.innerText.trim() || '';
    data.titles = Array.from(doc.querySelectorAll("#wrapper > div.container > div:nth-child(4) > div > div.panel.panel-default.visible-lg.hidden-xs > div.panel-body > div > div.col-lg-7 > div:nth-child(1) > div:nth-child(2) > span > a")).map(el => el.innerText.trim());
    data.authors = Array.from(doc.querySelectorAll("#wrapper > div.container > div:nth-child(4) > div > div.panel.panel-default.visible-lg.hidden-xs > div.panel-body > div > div.col-lg-7 > div:nth-child(1) > div:nth-child(5) > span > a")).map(el => el.innerText.trim());
    data.tags = Array.from(doc.querySelectorAll("#wrapper > div.container > div:nth-child(4) > div > div.panel.panel-default.visible-lg.hidden-xs > div.panel-body > div > div.col-lg-7 > div:nth-child(1) > div:nth-child(4) > span > a")).map(el => el.innerText.trim());
    data.description = doc.querySelector("#wrapper > div.container > div:nth-child(4) > div > div.panel.panel-default.visible-lg.hidden-xs > div.panel-body > div > div.col-lg-7 > div:nth-child(1) > div:nth-child(8)")?.innerText.trim().replace('敘述：', '').trim() || '无简介';
    data.cover_image_path = doc.querySelector("#album_photo_cover div.show_zoom img")?.src || '';
    return data;
}

function displayData(data, number) {
    const dataContainer = document.getElementById('data-display');
    dataContainer.innerHTML = `
        <p>ID：JM${number} <span onclick="copyText(this)" class="copyable">${number}</span></p>
        <p>漫画名称：<span onclick="copyText(this)" class="copyable">${data.name}</span></p>
        <p>原标题：${data.titles.map(title => `<span onclick="copyText(this)" class="copyable">${title}</span>`).join(' ')}</p>
        <p>作者：${data.authors.map(author => `<span onclick="copyText(this)" class="copyable">${author}</span>`).join(' ')}</p>
        <p>标签：${data.tags.map(tag => `<span onclick="copyText(this)" class="copyable">${tag}</span>`).join(' ')}</p>
        <p>简介：${data.description}</p>
    `;
    const coverDisplay = document.getElementById('cover-display');
    coverDisplay.innerHTML = data.cover_image_path ? `<img src="${data.cover_image_path}" alt="封面图片">` : '';
}

async function copyText(element) {
    try {
        await navigator.clipboard.writeText(element.innerText);
        document.getElementById('copy-message').innerText = '内容已复制到剪贴板';
    } catch (err) {
        document.getElementById('copy-message').innerText = '复制失败';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const number = event.target.number.value;
        fetchData(number);
    });
});
