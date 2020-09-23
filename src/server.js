const express = require("express")
const server = express()

//Pegar o banco de dados
const db = require("./database/db")

//Configurar pasta publica
server.use(express.static("public"))

//Habilita o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))

//Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", 
{
    express: server,
    noCache: true
})

//Configurar caminhos da minha aplicação
//Página Inicial
//Req: Requisição
//Res: Resposta
server.get("/", (req,res) =>
{
    return res.render("index.html")
})

server.get("/create-point", (req,res) =>
{
    //rq.query: Query String da URL -> GET
    //console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req,res) =>
{
    //req.body: O corpo do formulário -> POST
    console.log(req.body)

    //Inserir os dados no BD
    const query =
    `
        INSERT INTO places 
        (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        )
        VALUES (?, ?, ?, ?, ?, ?, ?);
     `

    const values = 
    [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err)
    {
        if(err)
        {
            console.log(err)
            return res.render("create-point.html", {erro: true})
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)
})

server.get("/search-results", (req,res) =>
{
    const search = req.query.search

     //Pesquisa vazia
    if(search == "")
    {
        return res.render("search-results.html")
    }

    //Pegar os dados do banco de dados
    db.all(`SELECT *  FROM places WHERE city LIKE '%${search}%'`, function(err, rows)
    {
        if(err)
        {
            return console.log(err)
        }

        const total = rows.length

        //Mostra a página HTML com os dados do BD
        return res.render("search-results.html", {places: rows, total})
    })
})

//Ligar o servidor
const port = 3000;
server.listen(port, "192.168.0.103", () => 
{
    console.log(`Server ligado na porta: ${port}`)
})