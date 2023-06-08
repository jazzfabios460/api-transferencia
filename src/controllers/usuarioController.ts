import { Request, Response, NextFunction } from "express"
import { prisma } from "../metodosGerais"

// Ao criar um usuário, também é criado uma conta, não faz sentido existir usuario sem conta!
export const criar = async (req:Request, res:Response, next:NextFunction)=>{
   const {nomeQuery,emailQuery,senhaQuery}:any = req.query
   let {nome, email, senha}:any = req.body  
   if (nomeQuery && emailQuery && senhaQuery) {
    nome = nomeQuery
    email = emailQuery
    senha = senhaQuery
   }
   console.log({nome,email,senha})
   try {
     await prisma.usuario.create({
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
  
     await prisma.conta.create({
      data:{
        saldo:100,
        id_usuario:idUsuario?.id || ""
      }
     })
     res.json("Usuario criado com sucesso!")
   } catch (error) {
    res.status(400).json(error)
   }
}

export const listar = async (req:Request, res:Response, next:NextFunction)=>{
  try {
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
        },
        
      })
      res.json(usuario)
    } catch (error) {
      res.status(400).json(error)
    }
}

export const listaPorId = async (req:Request, res:Response, next:NextFunction)=>{
  try {
      let id = req.params.id
      const {id_usuario}:any = req.query
       if (id_usuario) {
         id = id_usuario
       }
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
      res.json(usuario)
    } catch (error) {
      res.status(400).json(error)
    }
}

export const atualizar = async (req:Request, res:Response, next:NextFunction)=>{
    const id = req.params.id
    const {nome, email, senha} = req.body 
    try {
      await prisma.usuario.update({
        where:{
          id
        },
        data:{
          email,nome,senha
        }
      })
      res.json("usuario atualizado com sucesso!")
    } catch (error) {
      res.status(400).json(error)
    }
}

export const deletar = async (req:Request, res:Response, next:NextFunction)=>{
    const id = req.params.id
    try {
      await prisma.usuario.delete({
        where:{
          id
        }
      })
      res.json("usuario deleta com sucesso!")
    } catch (error) {
     res.status(400).json(error)
    }
}