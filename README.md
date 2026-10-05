## Sumário
- Requisitos
- Estrutura
- Como executar
- Configuração do ambiente
- Redes e persistência
- Exemplos
- Como encerrar

## Requisitos
- Git.
- Docker funcionando e Docker Compose 2.24 ou superior.
- Internet na primeira construção para baixar imagens e dependências.
- Portas 8080, 3006 e 5433 disponíveis.

## Estrutura
```text
api/ -API NestJS, DTOs e Dockerfile
front/ -Front React, proxy Nginx e Dockerfile
deploy/ -Docker Compose e SQL de inicialização
compose.yaml -Permite executar o Compose pela raiz
.env.example -Configurações de exemplo
.gitignore -Arquivos que não entram no Git
```

## Como executar
Clone e execute pelo terminal:
```bash
git clone https://github.com/Apollito22/prova2-devops.git
cd prova2-devops
docker compose up -d --build
```
`docker compose up` também constrói imagens que faltarem. Após alterar o código, use `--build`.
Para conferir os serviços e os logs:
```bash
docker compose ps
docker compose logs --tail=50
```

Endereços:
- Front: http://localhost:8080
- API: http://localhost:3006/classes
- Swagger: http://localhost:3006/docs
- Status da API e do banco: http://localhost:3006/health
- PostgreSQL: `localhost:5433`
O banco começa com três turmas de exemplo. O front lista o GET em uma tabela.

## Configuração do ambiente
O Compose usa `.env.example`. Um `.env` na raiz pode substituir esses valores.
Para personalizar:
```bash
cp .env.example .env
```

Valores de exemplo:
```text
POSTGRES_DB=turmas
POSTGRES_USER=aluno
POSTGRES_PASSWORD=admin
DB_HOST=banco
DB_PORT=5432
PORT=3000
FRONT_PORT=8080
API_PORT=3006
DB_EXTERNAL_PORT=5433
```
A senha é de exemplo para uso local. `.gitignore` e `.dockerignore` excluem `.env`, dependências e builds.

## Redes e persistência
- `rede_banco`: conecta PostgreSQL e API.
- `rede_front`: conecta API e front.
A API participa das duas redes. O proxy Nginx chama `api:3000/classes` pelo DNS interno do Docker. A API acessa `banco:5432`.
O volume `postgres_data`, montado em `/var/lib/postgresql/data`, mantém os dados após remover os containers. `deploy/init.sql` cria a tabela e os exemplos em um volume novo.


## Exemplos
### Cadastrar
No Swagger, use **Try it out** em `POST /classes` e envie:
```json
{
  "name": "Turma de Redes",
  "shift": "noturno",
  "capacity": 25,
  "start_date": "05/10/2026"
}
```
Exemplo de resposta;
```json
{
  "id": 4,
  "name": "Turma de Redes",
  "shift": "noturno",
  "capacity": 25,
  "start_date": "05/10/2026"
}
```

### Listar e buscar
```bash
curl http://localhost:3006/classes
curl http://localhost:3006/classes/4
```

Troque `4` pelo ID cadastrado. A busca retorna um objeto como o cadastro; a listagem retorna um array:
```json
[
  {
    "id": 1,
    "name": "Sistemas de Informação",
    "shift": "noturno",
    "capacity": 35,
    "start_date": "03/08/2026"
  }
]
```

### Atualizar e excluir
No Swagger, informe o ID da turma:
- PUT: envie os quatro campos.
- PATCH: envie, por exemplo, `{"capacity":40}`.
- DELETE: informe apenas o ID.

## Como encerrar
Remover containers e redes, mantendo os dados:
```bash
docker compose down
```
Remover também o volume e apagar os dados do banco:
```bash
docker compose down -v
```
Teste o volume cadastrando uma turma e executando `down`, depois `up -d`. A turma deve continuar salva, use `down` sem `-v` nesse teste.