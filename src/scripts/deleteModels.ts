import axios from "axios";

const brandName = "Samsung"

let brandId: number;

async function deleteDeviceModels (brandName: string, firstId: number, lastId: number) {
    const { data } = await axios.get(`http://localhost:3000/cellphone-brands/name/${brandName}`, {
        headers: {Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrYWxpQGZyYW5jYS5jb20iLCJpYXQiOjE3NzU3OTE3NTQsImV4cCI6MTc3NTgyMDU1NH0.lKxmfU-j7Nwxm6UIwsUCcWeLmOwasorX_WPCA5HZCls'}
    });
    
    brandId =  data[0].id;
    console.log("id da marca:", brandId)
    
    for (let i = firstId; i <= lastId; i++) {
        console.log(`APAGANDO DISPOSITIVO DE ID ${i}`)
        try {
            const {data} = await axios.delete(`http://localhost:3000/cellphone-models/delete/${i}`, {headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJrYWxpQGZyYW5jYS5jb20iLCJpYXQiOjE3NzU3OTE3NTQsImV4cCI6MTc3NTgyMDU1NH0.lKxmfU-j7Nwxm6UIwsUCcWeLmOwasorX_WPCA5HZCls'
            }})
            console.log(data);
        } catch (error:any) {
            console.error(`ERRO AO APAGAR O DISPOSITIVO DE ID ${i}`, error)
        }
    }    
}

deleteDeviceModels(brandName, 332, 391)