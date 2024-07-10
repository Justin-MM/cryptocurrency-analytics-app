import { listAllCoins } from "./crypto_data_query";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


async function getCoins() {
    const response = await listAllCoins();
    if (response) {
        printElements(response);
    } else {
        printError(response);
    }
}

function printElements(response) {
    const rows = response.map((coin, idx) => {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        th.setAttribute("scope", "row");
        const td1 = document.createElement("td");
        td1.append(idx + 1);
        tr.append(td1);
        const tds = Object.keys(coin).filter(key => ["image", "id", "name", "symbol", "current_price",
            "market_cap", "price_change_24h", "total_supply", "max_supply", "circulating_supply"
        ].includes(key)).map(key => {
            const td = document.createElement("td");
            if (key === "image") {
                const img = document.createElement('img');
                img.src = coin[key];
                td.append(img);
            } else {
                if (["current_price", "market_cap", "price_change_24h"].includes(key) && coin[key]) {
                    td.append(`${(Number(coin[key])).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`);
                } else {
                    td.append(coin[key]);
                }
            }
            return td;
        });
        tr.append(...tds);
        return tr;
    });

    const tBody = document.createElement("tbody");
    tBody.setAttribute("id", "tData");
    rows.forEach(row => {
        tBody.append(row);
    });

    const existingTBody = document.querySelector('#tData');
    if (existingTBody) existingTBody.remove();
    document.querySelector('#dataTable').append(tBody);
}

function printError(error) {
    document.querySelector('#showResponse').innerText = `There was an error accessing data from CoinGecko: ${error}.`;
}

window.addEventListener("load", function () {
    getCoins();
});