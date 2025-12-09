import {db} from "./firebase"
import { addDoc, collection, doc, getDoc, serverTimestamp } from "firebase/firestore"

export const collectionRef = (name : string) => collection(db,name)

export async function addDocWithTimestamp(collectionName:string , data : any) {
    const docRef = await addDoc(collectionRef(collectionName), {
        ...data,
        createAt : serverTimestamp()
    })
    return docRef
    
}

export async function getDocById(collectionName:string , id : string) {
    const docSnap = await getDoc(doc(db,collectionName,id))
    return docSnap.exists() ? docSnap.data() : null
    
}