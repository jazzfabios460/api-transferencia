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
