import {NextResponse} from 'next/server';import {db} from '@/lib/db';
export async function GET(){const products=await db.product.findMany({where:{active:true},include:{category:true},orderBy:{createdAt:'asc'}});return NextResponse.json({products})}
