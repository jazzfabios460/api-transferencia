import { Request, Response, NextFunction } from "express"
import { prisma } from "../metodosGerais"
import Jwt from 'jsonwebtoken'
require('dotenv').config()
const secretKey = process.env.secretkey || ""
export const autenticar = async (req:Request, res:Response, next:NextFunction)=>{
    const {email, senha} = req.body
    let resposta = ""
    try {
        const usuario =await prisma.usuario.findFirst({
           where:{
              email,senha
           },
           select:{
            email:true,
            nome:true,
            id:true
           }
        })
        if (usuario) {
            res.json({
                token:Jwt.sign({user:usuario?.nome},secretKey,{expiresIn:"1d"}),
                usuario
            })
        }else{
            res.status(401).json("Usuario ou senha inválidos!")
        }
      } catch (error) {
        res.status(400).json(error)
      }
  }

  export const autorizacao = async (req:Request, res:Response, next:NextFunction)=>{
      try {
        const token:any = req.headers["x-access-token"];
        Jwt.verify(token,secretKey,(err:any, e:any)=>{
           if(err) res.status(401);
           res.json("Usuário "+e.user+" está autenticado!")
        })
        
    } catch (error) {
        res.status(401).send("não autorizado")
    }
  }