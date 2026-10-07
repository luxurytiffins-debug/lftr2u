import { db } from './db';
export async function serviceArea(pincode:string){ return db.serviceArea.findUnique({where:{pincode}}); }
export async function deliveryCharge(subtotal:number){ return subtotal>=109?0:15; }
export function mealAvailable(from?:string|null,to?:string|null){ if(!from||!to)return true; const parts=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date()); const h=Number(parts.find(x=>x.type==='hour')?.value||0),m=Number(parts.find(x=>x.type==='minute')?.value||0); const now=h*60+m; const [fh,fm]=from.split(':').map(Number),[th,tm]=to.split(':').map(Number); return now>=fh*60+fm&&now<=th*60+tm; }
