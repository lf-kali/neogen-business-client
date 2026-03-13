import axios from "axios";
import {JSDOM} from "jsdom"
// ========================================================================================================================================================================================================================================================================================================================================================


// ***IMPORTANTE*** NÃO ESQUEÇA DE ALTERAR!
// NOME DA MARCA 
const brandName = "acer";


//  SUBSTITUA O QUE ESTÁ ENTRE AS CRAZES
const html = `<ul>



<li><a href="acer_betouch_e400-3154.php"><img src="https://fdn2.gsmarena.com/vv/bigpic/acer-betouch-e400.jpg" title="Acer beTouch E400 Android smartphone. Announced Feb 2010. Features 3.2″  display, Snapdragon S1 chipset, 3.15 MP primary camera, 1090 mAh battery, 256 MB RAM."><strong><span>beTouch E400</span></strong></a></li><li><a href="acer_neotouch_p300-3138.php"><img src="https://fdn2.gsmarena.com/vv/bigpic/acer-p300.jpg" title="Acer neoTouch P300 Windows Mobile smartphone. Announced Feb 2010. Features 3.2″  display, Snapdragon S1 chipset, 3.15 MP primary camera, 970 mAh battery, 256 MB RAM."><strong><span>neoTouch P300</span></strong></a></li><li><a href="acer_betouch_e110-3137.php"><img src="https://fdn2.gsmarena.com/vv/bigpic/acer-e110.jpg" title="Acer beTouch E110 Android smartphone. Announced Feb 2010. Features 2.8″  display, 3.15 MP primary camera, 1500 mAh battery, 256 MB RAM."><strong><span>beTouch E110</span></strong></a></li><li><a href="acer_liquid-2968.php"><img src="https://fdn2.gsmarena.com/vv/bigpic/acer-liquid-new.jpg" title="Acer Liquid Android smartphone. Announced Oct 2009. Features 3.5″  display, Snapdragon S1 chipset, 5 MP primary camera, 1350 mAh battery, 256 MB RAM."><strong><span>Liquid</span></strong></a></li><li><a href="acer_neotouch-2958.php"><img src="https://fdn2.gsmarena.com/vv/bigpic/acer-neo-touch-new.jpg" title="Acer neoTouch Windows Mobile smartphone. Announced Oct 2009. Features 3.8″  display, Snapdragon S1 chipset, 5 MP primary camera, 1350 mAh battery, 256 MB RAM."><strong><span>neoTouch</span></strong></a></li><li><a href="acer_betouch_e200-2961.php"><img src="https://fdn2.gsmarena.com/vv/bigpic/acer-be-touch-e200.jpg" title="Acer beTouch E200 Windows Mobile smartphone. Announced Oct 2009. Features 3.0″  display, Snapdragon S1 chipset, 3.15 MP primary camera, 1140 mAh battery, 256 MB RAM."><strong><span>beTouch E200</span></strong></a></li><li><a href="acer_betouch_e100-2959.php"><img src="https://fdn2.gsmarena.com/vv/bigpic/acer-be-touch-e100.jpg" title="Acer beTouch E100 Windows Mobile smartphone. Announced Oct 2009. Features 3.2″  display, Snapdragon S1 chipset, 2 MP primary camera, 1140 mAh battery, 256 MB RAM."><strong><span>beTouch E100</span></strong></a></li><li><a href="acer_betouch_e101-2960.php"><img src="https://fdn2.gsmarena.com/vv/bigpic/acer-be-touch-e101.jpg" title="Acer beTouch E101 Windows Mobile smartphone. Announced Oct 2009. Features 3.2″  display, Snapdragon S1 chipset, 2 MP primary camera, 1140 mAh battery, 256 MB RAM."><strong><span>beTouch E101</span></strong></a></li><li><a href="acer_dx650-2888.php"><img src="https://fdn2.gsmarena.com/vv/bigpic/acer-dx650.jpg" title="Acer DX650 Windows Mobile smartphone. Announced Jun 2009. Features 2.8″  display, 2 MP primary camera, 1260 mAh battery."><strong><span>DX650</span></strong></a></li><li><a href="acer_m900-2719.php"><img src="https://fdn2.gsmarena.com/vv/bigpic/acer-m900.jpg" title="Acer M900 Windows Mobile smartphone. Announced Feb 2009. Features 3.8″  display, 5 MP primary camera, 1530 mAh battery."><strong><span>M900</span></strong></a></li><li><a href="acer_f900-2717.php"><img src="https://fdn2.gsmarena.com/vv/bigpic/acer-f900.jpg" title="Acer F900 Windows Mobile smartphone. Announced Feb 2009. Features 3.8″  display, 3.15 MP primary camera, 1530 mAh battery, 128 MB RAM."><strong><span>F900</span></strong></a></li><li><a href="acer_x960-2716.php"><img src="https://fdn2.gsmarena.com/vv/bigpic/acer-x960.jpg" title="Acer X960 Windows Mobile smartphone. Announced Feb 2009. Features 2.8″  display, 3.15 MP primary camera, 1530 mAh battery, 128 MB RAM."><strong><span>X960</span></strong></a></li><li><a href="acer_dx900-2718.php"><img src="https://fdn2.gsmarena.com/vv/bigpic/acer-dx900.jpg" title="Acer DX900 Windows Mobile smartphone. Announced Feb 2009. Features 2.8″  display, 3.15 MP primary camera, 1530 mAh battery, 128 MB RAM."><strong><span>DX900</span></strong></a></li>


</ul>`




// ===================  NÃO MEXER DAQUI PRA BAIXO!!!!!!! =======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
// ===================  NÃO MEXER DAQUI PRA BAIXO!!!!!!! =======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
// ===================  NÃO MEXER DAQUI PRA BAIXO!!!!!!! =======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
// ===================  NÃO MEXER DAQUI PRA BAIXO!!!!!!! =======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================
// ===================  NÃO MEXER DAQUI PRA BAIXO!!!!!!! =======================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================================









const DOM = new JSDOM(html);
const doc = DOM.window.document;

const containerModelNames = doc.querySelectorAll("span");
let modelNames: string[] = [];


for (let element of containerModelNames) {
    const modelName = element.textContent;
    modelNames.push(modelName);
}


let brandId: number;

async function registerDeviceModels (brandName: string, modelNames: string[]) {
    const { data } = await axios.get(`https://neogen-erp-server.onrender.com/device-brands/name/${brandName}`, {
        headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb290QHJvb3QuY29tIiwiaWF0IjoxNzczMzYyNDc0LCJleHAiOjE3NzMzOTEyNzR9.mAeTXE0NH-OaohMCeamgL-I40irM4vUO-NxKAkCqEVg'}
    });
    
    brandId =  data[0].id;
    console.log("id da marca:", brandId)
    console.log(modelNames)
    
    for (let modelName of modelNames) {
        await axios.post('https://neogen-erp-server.onrender.com/device-models/new', {name: modelName, brandId: brandId}, {headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJyb290QHJvb3QuY29tIiwiaWF0IjoxNzczMzYyNDc0LCJleHAiOjE3NzMzOTEyNzR9.mAeTXE0NH-OaohMCeamgL-I40irM4vUO-NxKAkCqEVg'
        }})
    }    
}

registerDeviceModels(brandName, modelNames);





