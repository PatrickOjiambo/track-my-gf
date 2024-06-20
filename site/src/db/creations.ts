"use server";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
interface Request {
  request_id: string;
  sender_address: string;
  receiver_address: string;
}
export async function createRequest(request: Request) {
    const{request_id, sender_address, receiver_address} = request;
  try{
    await setDoc(doc(db, "requests", request_id),{
        sender_address,
        receiver_address
    });
  }catch(error){
    console.error("Error creating a request ", error);
    throw new Error("Could not create a request");
  }
}