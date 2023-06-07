# Api de Transferência financeira

## Abaixo esta a lista dos endpoints de 2 formas
* Usando  a documentação do Sweggar = https://api-transferencia.vercel.app/swagger/
* Usando a forma direta como no documento abaixo

### Usuários
#### Métodos GET, listando usuários
* Listar todos os usuários = https://api-transferencia.vercel.app/usuario/listar
* Listar usuário por id = https://api-transferencia.vercel.app/usuario/listar/id
#### Métodos POST, cadastrando usuários 
link: https://api-transferencia.vercel.app/usuario/criar
*  {
    "nome":"nome do usuario",
    "email":"email do usuario",
    "senha":"senha do usuario"
   }

#### Métodos DELETE, excluindo usuários    
link: https://api-transferencia.vercel.app/usuario/deletar/id
#### Métodos PUT, atualizando usuários    
link: https://api-transferencia.vercel.app/usuario/atualizar/id
*  {
    "nome":"nome do usuario",
    "email":"email do usuario",
    "senha":"senha do usuario"
   }

### Conta

#### Método GET listar as contas 
* link: https://api-transferencia.vercel.app/conta/
#### Método GET listar as contas por id
* link: https://api-transferencia.vercel.app/conta/id
#### Método PUT transferir dinheiro entre usuários pelos seus ids
* link: https://api-transferencia.vercel.app/conta/transferencia
* {
	"idPagador":"id do pagador",
    "idCobrador":"id do cobrador",
    "valor":valor numerico
  }

### Autenticação 

#### Método POST logar o usuário
* link: https://api-transferencia.vercel.app/autenticacao/login
* {
	"email":"email cadastrado",
	"senha":"senha cadastrada"
  }
#### Método GET autenticação de usuário
* link: https://api-transferencia.vercel.app/autenticacao/autorizacao
* este endpoint retorna se o usuário esta autenticado passando o token no headers da requisição da seguinte forma
*     headers:{
        "Content-Type":"application/json",
        "x-access-token":token
      },  
* o token expira em 1 dia      
