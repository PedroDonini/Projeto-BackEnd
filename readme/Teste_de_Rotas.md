## Usando o Insomnia
1. **Cadastrar Usuário**
   - Método: `POST`
   - URL: `http://localhost:3000/users/register`
   - Corpo (JSON):
     ```json
     {
       "username": "usuario1",
       "password": "senha123",
       "role": "user"
     }
     ```
   - Clique em "Send" para enviar a requisição.

2. **Login**
   - Método: `POST`
   - URL: `http://localhost:3000/users/login`
   - Corpo (JSON):
     ```json
     {
       "username": "usuario1",
       "password": "senha123"
     }
     ```
   - Clique em "Send".
   - Copie o `token` gerado.

3. **Criar Veículo**
   - Método: `POST`
   - URL: `http://localhost:3000/vehicles`
   - Cabeçalho:
     - `Authorization`: `Bearer {token}`
   - Corpo (JSON):
     ```json
     {
       "brand": "Toyota",
       "model": "Corolla",
       "price": 20000
     }
     ```
   - Clique em "Send".

4. **Listar Veículos**
   - Método: `GET`
   - URL: `http://localhost:3000/vehicles?limit=5&page=1`
   - Cabeçalho:
     - `Authorization`: `Bearer {token}`
   - Clique em "Send".

5. **Listar Todos os Veículos**
   - Método: `GET`
   - URL: `http://localhost:3000/vehicles/all`
   - Cabeçalho:
     - `Authorization`: `Bearer {token}`
   - Clique em "Send".

Repita esses passos para outras operações, ajustando a URL, método, corpo e cabeçalho conforme necessário.
