//Importar a dependencia do SQLITE3
const sqlite3 = require("sqlite3").verbose()

//Criar o objeto que ira realizar operações de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

//Utilizar o objeto de banco de dados para as operações

db.serialize(() => 
{
/*     //Com SQL Irei:
    //1- Criar uma tabela
    db.run
    (`
        CREATE TABLE IF NOT EXISTS places 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

    //2- Inserir dados na tabela
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
        "https://m.outdoorrevival.com/wp-content/uploads/2018/12/recycle.jpg",
        "Colectoria",
        "Guilherme Gembala, Jardim América",
        "N° 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos Eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err)
    {
        if(err)
        {
            return console.log(err)
        }
        console.log("Cadastrado com sucesso")
        console.log(this)
    }

    //db.run(query, values, afterInsertData)

    //3- Consultar os dados da tabela
    db.all('SELECT name  FROM places', function(err, rows)
    {
        if(err)
        {
            return console.log(err)
        }
        console.log("Registros encontrados:")
        console.log(rows)
    }) */

    //4- Deletar um dado da tabela 
    db.run(`DELETE FROM places WHERE id = ?`, [1], function(err)
    {
        if(err)
        {
            return console.log(err)
        }
        console.log("Registro deletado com sucesso!")
    })
})