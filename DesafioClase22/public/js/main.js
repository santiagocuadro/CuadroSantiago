const socket = io.connect();

function enviarMensaje(e) {
  e.preventDefault();
  const id = document.getElementById("id");
  const nombre = document.getElementById("nombre");
  const apellido = document.getElementById("apellido");
  const edad = document.getElementById("adad");
  const alias = document.getElementById("alias");
  const avatar = document.getElementById("avatar");
  const text = document.getElementById("text");
  const mensaje = document.getElementById("mensaje");

  if (!email.value || !mensaje.value) {
    alert("Debe completar los campos");
    return false;
  }

  socket.emit("mensajeNuevo", { id: id.value, nombre: nombre.value, apellido: apellido.value, edad: edad.value, alias: alias.value, avatar: avatar.value });
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
        `<span class="mensaje-listaMensajes">${mensaje.id}<b> ${mensaje.nombre} </b>${mensaje.apellido} </b>${mensaje.edad} </b>${mensaje.alias} </b>${mensaje.avatar}</span>`
    )
    .join("<br>");

  document.getElementById("listaMensajes").innerHTML = mensajesHtml;
});
