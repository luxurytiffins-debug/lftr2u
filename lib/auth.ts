import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { db } from './db';
const secret = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret-change-me');
export async function hashPassword(p:string){ return bcrypt.hash(p,12); }
export async function verifyPassword(p:string,h:string){ return bcrypt.compare(p,h); }
export async function signSession(userId:string, role:string){ return new SignJWT({userId,role}).setProtectedHeader({alg:'HS256'}).setIssuedAt().setExpirationTime('7d').sign(secret); }
export async function getSession(){ const token=(await cookies()).get('luxury_session')?.value; if(!token)return null; try{return (await jwtVerify(token,secret)).payload as {userId:string;role:string}}catch{return null} }
export async function requireUser(){const s=await getSession(); if(!s) throw new Error('UNAUTHORIZED'); const u=await db.user.findUnique({where:{id:s.userId}}); if(!u||!u.active) throw new Error('UNAUTHORIZED'); return u;}
export async function requireAdmin(){const u=await requireUser();if(u.role!=='ADMIN')throw new Error('FORBIDDEN');return u}
