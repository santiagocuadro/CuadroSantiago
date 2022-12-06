const socket = io.connect();

function enviarMensaje(e) {
  e.preventDefault();
  const id = document.getElementById("id");
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const edad = document.getElementById("edad");
  const alias = document.getElementById("alias");
  const avatar = document.getElementById("avatar");
  const text = document.getElementById("text");

  if (!id.value || !nombre.value || !apellido.value || !edad.value || !alias.value || !avatar.value || !text.value) {
    alert("Debe completar los campos");
    return false;
  }

  socket.emit("mensajeNuevo", {author: { id: id.value, nombre: nombre.value, apellido: apellido.value, edad: edad.value, alias: alias.value, avatar: avatar.value}, text: text.value});
  mensaje.value = "";
  return false;
}

document
  .getElementById("messagesFormBtn")
  .addEventListener("click", enviarMensaje);

socket.on("mensajes", (mensajes) => {
  let mensajesHtml = mensajes
    .map(
      (mensaje) =>
        `<span class="mensaje-listaMensajes">${mensaje.author.id}<b> ${mensaje.author.nombre} </b>${mensaje.author.apellido}  </b>${mensaje.author.edad}  </b>${mensaje.author.alias}  </b>${mensaje.author.avatar}  </b>${mensaje.text}</span>`
    )
    .join("<br>");

  document.getElementById("listaMensajes").innerHTML = mensajesHtml;
});

const createProductTable = async (products) => {
  const template = await fetch("views/products-table.hbs");
  const templateText = await template.text();
  const templateCompiled = Handlebars.compile(templateText);
  return templateCompiled({ products });
};

const addProduct = () => {
  const title = document.getElementById("title");
  const price = document.getElementById("price");
  const thumbnail = document.getElementById("thumbnail");

  if (!title.value || !price.value) {
    alert("Debe completar los campos");
  }

  socket.emit("add-product", {
    title: title.value,
    price: price.value,
    thumbnail: thumbnail.value,
  });

  title.value = "";
  price.value = "";
  thumbnail.value = "";
};

document.getElementById("add-product").addEventListener("click", addProduct);

socket.on("products", async (products) => {
  const template = await createProductTable(products);
  document.getElementById("products").innerHTML = template;
});
