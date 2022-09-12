

class Usuario{

    constructor(unNombre, unApellido){
        this.nombre = unNombre;
        this.apellido = unApellido;
        this.libros = [];
        this.mascotas = [];
    }

    getFullName(){
        return this.nombre +" "+ this.apellido;
    }
    
    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota);
    }

    countMascota(){
        return this.mascotas.length;
    }

    addBook(nombreLibro, autorLibro){
        this.libros.push({nombre: nombreLibro, autor: autorLibro});
    }

    getBookNames(){
        let retorno = [];
        this.libros.forEach(element => {
            retorno.push(element.nombre);
        });
        return retorno;
    }


}



const usuario = new Usuario("Pedro", "Martinez");
console.log(usuario.getFullName());

usuario.addMascota("Perro");
usuario.addMascota("Gato");
console.log(usuario.countMascota());

usuario.addBook("Harry potter", "J.K. Rowling");
usuario.addBook("Game of Thrones", "George R.R. Martin");
console.log(usuario.getBookNames());












