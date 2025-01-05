async function fetchData(number) {
    const proxyUrl = 'https://agent.s552356310.workers.dev/';
    const targetUrl = `https://18comic.vip/album/${number}`;
    const url = proxyUrl + targetUrl;

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5,ja;q=0.4,mt;q=0.3',
        'Cache-Control': 'max-age=0',
        'Cookie': 'theme=light; ipcountry=HK; AVS=83n4fd74hvkrcqej8r74rbk209; __cflb=02DiuDFSTg91mAHCXokVePBgH1pMSYFvTZ4JVymCFcp1r; _gid=GA1.2.332190751.1736054357; _clck=10o7u8r%7C2%7Cfsb%7C0%7C1820; ipm5=fb4d1adfdf2e1d93abb9d5a9c56c805a; rec_author=%E4%BE%A0%E8%A1%8C%E9%A9%AC%20LSD; _ga_C1BGNGMN6J=GS1.2.1736054357.2.1.1736054361.0.0.0; UGVyc2lzdFN0b3JhZ2U=%7B%7D; bnState_1997124={"impressions":2,"delayStarted":0}; cover=1; _gat_ga0=1; _gat_ga1=1; _ga_VW05C6PGN3=GS1.1.1736060260.3.0.1736060260.60.0.0; _ga=GA1.1.1672048054.1735163035; yuo1=%7B%22objName%22:%22x8SzxRAz2IuF%22,%22request_id%22:2,%22zones%22:%5B%7B%22idzone%22:%225067278%22,%22sub%22:%2278%22,%22container%22:%7B%7D,%22here%22:%7B%7D%7D%5D%7D; cf_clearance=1tf8Jy3aYDcI1o0otPIOeJvarFi41Yap4.H4R76tS0c-1736060261-1.2.1.1-jm54mnCB6U5aHjD3vaYWLQTmLx7pxhVAJDpnXGWNMFr95RjBd3jkwV.LnCHlubuqOgUnweROAbhbfHv4sRk7HnyF5GpAXOcEqq93sCiI6I6JVUNBcc4d64W_kW63euXRqC8tEgW9JfmhuLvxu6Zfgg9NDXlcbuUWVYxrBjqLH8rzBfWF_GMjhcE8SWHGVTdf7IeZ8k2apZ0giJU6RYgD4OidGNPj5jYBz.8NFhEF6RsI7itMRjjipxCnb4MgZu0QmsjvJvd.eFe4CuZ5e6R2obAiI_7H3kUZYNb896IVbdiLE1KHMs7fn0jIehxenVZak.AmLilpTmeMi7YrpI8EjG85h5Bqycxsq4KGHL_sALf.LDqcPEwe8EU.nFkECOFapfdNI8sVULpJuNi_FYvsKg',
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
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ headers })
        });
        if (response.ok) {
            const contents = await response.text();
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