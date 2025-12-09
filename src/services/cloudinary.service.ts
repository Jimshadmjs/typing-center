import axios from "axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

export async function uploadImageUnsigned(file:File) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    const form = new FormData()
    form.append("file",file)
    form.append("upload_preset",UPLOAD_PRESET)
    const resp = await axios.post(url,form)
    return resp.data
}


export function cloudinaryUrl(publicId:string , options:{w?:number,h?:number,crop?:string} = {} ) {
    const {w,h,crop = "fill"} = options
    let trans = []
    if (w) trans.push(`w_${w}`)
    if (h) trans.push(`h_${h}`)
    trans.push(`c_${crop}`)
     return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${trans.join(",")}/${publicId}`;
}