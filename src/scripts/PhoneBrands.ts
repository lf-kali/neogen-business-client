import {JSDOM} from "jsdom"
// import { http } from "../api/http/http"
import axios from "axios"

const html = `<div>Apple</div><div>Samsung</div><div>Google</div><div>OnePlus</div><div>Motorola</div><div>Sony</div><div>Xiaomi</div><div>Nokia</div><div>Honor</div><div>DOOGEE</div><div>Blackview</div><div>OSCAL</div><div>Nothing</div><div>Asus</div><div>HTC</div><div>Huawei</div><div>HMD</div><div>BlackBerry</div><div>ZTE</div><div>RedMagic</div><div>LG</div><div>Kyocera</div><div>Fairphone</div><div>Alcatel</div><div>BLU</div><div>Razer</div><div>realme</div><div>Essential</div><div>TCL</div><div>Orbic</div><div>CAT</div><div>RED</div><div>BOOX</div><div>Lenovo</div><div>OPPO</div><div>Microsoft</div><div>Acer</div><div>Garmin</div><div>Amazon</div><div>NOA</div><div>Meizu</div><div>nubia</div><div>GIGABYTE</div><div>Gionee</div><div>vivo</div><div>Panasonic</div><div>HP</div><div>Sony Ericsson</div><div>Maxwest</div><div>Verizon</div><div>Yota</div><div>Doro</div><div>T-Mobile</div><div>Sprint</div><div>Palm</div><div>Sanyo</div><div>Casio</div><div>VERZO</div><div>TAG Heuer</div><div>Xolo</div><div>VIZIO</div><div>Fujitsu</div><div>UMX</div><div>Garmin-Asus</div><div>Airo Wireless</div><div>TerreStar</div><div>Lumigon</div><div>FiGO</div><div>NIU</div><div>altek</div><div>Micromax</div><div>ARCHOS</div><div>Best Buy</div><div>Verykool</div><div>Notion Inc</div><div>Vertu</div><div>Sonim</div><div>Karbonn</div><div>ICEMOBILE</div><div>Emporia</div><div>Philips</div><div>Dell</div><div>ViewSonic</div><div>Toshiba</div><div>Barnes &amp; Noble</div><div>Nvidia</div><div>PCD</div><div>Jolla</div><div>Eten</div><div>mobiado</div><div>i-mate</div><div>General Mobile</div><div>Fusion Garage</div><div>INQ</div><div>Videocon</div><div>Coolpad</div><div>LAVA</div><div>Saygus</div><div>Yezz</div><div>Plum</div><div>Celkon</div><div>i-mobile</div><div>Spice Mobile</div><div>Zen Mobile</div><div>Velocity</div><div>COWON</div><div>Kogan</div><div>AT&amp;T</div><div>VKMobile</div><div>Benq-Siemens</div><div>Helio</div><div>Haier</div><div>Lemon Mobiles</div><div>Handspring</div><div>Bird</div><div>Danger</div><div>WND</div><div>O2</div><div>Latte</div><div>Siemens</div><div>Pantech</div><div>Firefly Mobile</div><div>Cricket</div><div>Orange</div><div>Fly</div><div>Mitsubishi</div><div>MiTAC</div><div>Amoi</div><div>Sierra Wireless</div><div>Neonode</div><div>Sendo</div><div>Maxon</div><div>Hitachi</div><div>Sharp</div><div>NEC</div><div>Sagem</div><div>BenQ</div><div>Ericsson</div>`

const DOM = new JSDOM(html)
const doc = DOM.window.document

const containerBrandNames = doc.querySelectorAll("div")

let brandNames: string[] = []

for (let element of containerBrandNames) {
    const brandName = element.textContent;
    brandNames.push(brandName);
}

for (let brandName of brandNames) {
    axios.post('http://localhost:3000/cellphone-brands/new', {name: brandName}, {headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrYWxpQGZyYW5jYS5jb20iLCJpYXQiOjE3NzU3OTE3NTQsImV4cCI6MTc3NTgyMDU1NH0.lKxmfU-j7Nwxm6UIwsUCcWeLmOwasorX_WPCA5HZCls'
    }})
}

console.log(brandNames);