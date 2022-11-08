import {openDB} from 'idb'
import { Trip } from './models/Trip'

const DATABASE_NAME = "TripDB"

export async function insertTrip(customerInfo:Trip){
    const db = await openDB(DATABASE_NAME,1)
    const id = await db.put("customers",customerInfo)
    return id
}

export async function getAllTrips(){
    const db = await openDB(DATABASE_NAME,1)
    const result = await db.getAll("customers")
    return result
}
export async function getTripById(id:number){
    const db = await openDB(DATABASE_NAME,1)
    return await db.get("customers",id)
}

initDB().then(()=>{
    console.log("database created!")
})

async function initDB() {
    const db = await openDB(DATABASE_NAME,1,{
        upgrade(db){
            const store = db.createObjectStore('customers',{
                keyPath: 'id',
                autoIncrement:true
            })
        }
    })
}
