async function fetchData(number) {
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const url = proxyUrl + encodeURIComponent(`https://18comic.vip/album/${number}`);
    try {
        const response = await fetch(url);
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
