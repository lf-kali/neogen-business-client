import axios from "axios";

const cloudApi = axios.create({
    baseURL: 'https://api.cloudinary.com/'
})

const cloudinaryServiceConfig = {    
    version: 'v1_1',
    cloudName: 'dfmf9spvx',
    uploadPreset: 'neogen-erp-avatars',
}

const baseParams = `${cloudinaryServiceConfig.version}/${cloudinaryServiceConfig.cloudName}`

export const cloudinaryService = {

    uploadAvatar: async (avatar: File) => {
        const formData = new FormData();
        formData.append('file', avatar);
        formData.append('upload_preset', cloudinaryServiceConfig.uploadPreset)
        
        try {
            const res = await cloudApi.post(`${baseParams}/image/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return res.data.secure_url;
        } catch (error) {
            console.error('Erro ao enviar foto:', error);
            return ''
        }
    }
}