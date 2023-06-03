import { Request, Response, NextFunction } from "express"
import { prisma } from "../metodosGerais"

export const criar = async (req:Request, res:Response, next:NextFunction)=>{
   const {nome, email, senha} = req.body 
   const usuario = await prisma.usuario.create({
    data:{
      nome,
      email,
      senha
    },
   })
   const idUsuario = await prisma.usuario.findUnique({
    where:{
      nome
    },
    select:{
      id:true
    }
   })

   const conta = await prisma.conta.create({
    data:{
      saldo:100,
      id_usuario:idUsuario?.id || ""
    }
   })
   try {
     res.json("Usuario criado com sucesso!")
   } catch (error) {
    res.json(error)
   }
}

export const listar = async (req:Request, res:Response, next:NextFunction)=>{
    const usuario =await prisma.usuario.findMany({
      select:{
        id:true,
        email:true,
        nome:true,
        conta:{
          select:{
            saldo:true
          }
        }
      }
    })
    try {
      res.json(usuario)
    } catch (error) {
     res.json(error)
    }
}

export const listaPorId = async (req:Request, res:Response, next:NextFunction)=>{
    const id = req.params.id
    const usuario =await prisma.usuario.findMany({
      select:{
        email:true,
        nome:true,
        conta:{
          select:{
            saldo:true
          }
        }
      },
      where:{
        id
      }
    })
    try {
      res.json(usuario)
    } catch (error) {
     res.json(error)
    }
}

export const atualizar = async (req:Request, res:Response, next:NextFunction)=>{
    const id = req.params.id
    const {nome, email, senha} = req.body 
    try {
      const r = await prisma.usuario.update({
        where:{
          id
        },
        data:{
          email,nome,senha
        }
      })
      res.json("usuario atualizado com sucesso!")
    } catch (error) {
     res.json(error)
    }
}

export const deletar = async (req:Request, res:Response, next:NextFunction)=>{
    const id = req.params.id
    try {
      const r = await prisma.usuario.delete({
        where:{
          id
        }
      })
      res.json("usuario deleta com sucesso!")
    } catch (error) {
     res.json(error)
    }
}