const express = require('express');
const body_parser = require('body-parser');

const app = express();

let autores = [
    {
        id: 1,
        nombre: "Jorge Luis",
        apellido: "Borges",
        fechaNacimiento: "24/08/1899",
        libros: [
            {
                id: 1,
                titulo: "Ficciones1",
                descripcion: "Se trata de uno de sus mas...",
                anioPublicacion: 1944
            },
            {
                id: 3,
                titulo: "Facciones3",
                descripcion: "Se trata de uno de sus mas...",
                anioPublicacion: 1944
            },
            {
                id: 5,
                titulo: "Fricciones5",
                descripcion: "Se trata de uno de sus mas...",
                anioPublicacion: 1944
            }
            ,{
                id: 7,
                titulo: "Fraccionesss7",
                descripcion: "Se trata de uno de sus mas...",
                anioPublicacion: 1944
            }
        ]
    },
    {
        id: 2,
        nombre: "Julio",
        apellido: "Cortazar",
        fechaNacimiento: "26/08/1914",
        libros: [
            {
                id: 2,
                titulo: "Rayuelas2",
                descripcion: "Se trata de uno de sus mas...",
                anioPublicacion: 1963
            },
            {
                id: 4,
                titulo: "Rayolas4",
                descripcion: "Se trata de uno de sus mas...",
                anioPublicacion: 1944
            },
            {
                id: 6,
                titulo: "Rayadas6",
                descripcion: "Se trata de uno de sus mas...",
                anioPublicacion: 1944
            },
            {
                id: 8,
                titulo: "Ratones8",
                descripcion: "Se trata de uno de sus mas...",
                anioPublicacion: 1944
            }
        ]
    }
];

app.use(body_parser.json());

function createAuthor(req, res, next) {
    const author = req.body;
    if(!author){
        res.status(400).send('Autor inválido');
    }
    autores.push(author);
    next();
}
//############ Ruta "/autores" ############### 

app.get('/autores', (req, res) => {
    res.send(autores);
})

app.post('/autores', createAuthor,(req, res) => {
    res.status(200).send('Autor creado!');
})

//############ Ruta "/autores/id" ############### 

app.get('/autores/:id', (req, res) => {
    const id_autor = req.params.id;
    const author = autores.filter(autor => autor.id == id_autor);
    res.send(author);
})

app.delete('/autores/:id', (req, res) => {
    const id_autor = req.params.id;
    autores = autores.filter(autor => autor.id != id_autor);
    res.send(autores);
})

app.put('/autores/:id', (req, res) => {
    const id_autor = req.params.id;
    autores = autores.filter(autor => autor.id != id_autor);
    const update_author = req.body;
    console.log(update_author);
    if(!update_author){
        res.status(400).send('Autor inválido');
    }
    autores.push(update_author);
    res.send(autores);
})

//############ Ruta "/autores/id/libros" ###############

app.get('/autores/:id/libros', (req, res) => {
    const id_autor = req.params.id;
    const author = autores.find(autor => autor.id == id_autor);
    console.log(author);
    const libros = author.libros;
    console.log(libros);
    res.send(libros);
})

app.post('/autores/:id/libros', (req, res) => {
    const id_autor = req.params.id;
    const new_libro = req.body;
    autores.forEach(autor => {
        if(autor.id == id_autor) {
            autor.libros.push(new_libro);
        }
    })
    res.send(autores);
})

//############ Ruta "/autores/id/libros/idLibro" ###############

app.get('/autores/:id/libros/:idLibro', (req, res) => {
    const id_autor = req.params.id;
    const id_libro = req.params.idLibro;
    const author = autores.find(autor => autor.id == id_autor);
    const libroSeleccionado = author.libros.find(libro => libro.id == id_libro);
    res.send(libroSeleccionado);
})

app.put('/autores/:id/libros/:idLibro', (req, res) => {
    const id_autor = req.params.id;
    const id_libro = req.params.idLibro;
    const new_libro = req.body;
    const author = autores.find(autor => autor.id == id_autor);
    author.libros = author.libros.filter(libro => libro.id != id_libro);
    author.libros.push(new_libro);
    res.send(autores);
})

app.delete('/autores/:id/libros/:idLibro', (req,res) => {
    const id_autor = req.params.id;
    const id_libro = req.params.idLibro;
    const author = autores.find(autor => autor.id == id_autor);
    author.libros = author.libros.filter(libro => libro.id != id_libro);
    res.send(autores);
})


//############ Middleware para manejar posibles errores ###############

app.use((err, req, res, next) => {
    if(!err) return next();
    console.log(err);
    res.status(500).send('Error :(');
})

app.listen('3000', () => {
    console.log('Servidor Funcionando!');
})