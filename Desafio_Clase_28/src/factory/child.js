
process.on('message', (msj, cant) => {
  const sum = (cant) => {
    let sum = 0;
    console.log(cant);
    for (let i = 0; i < 5e9; i++) {
      sum += 1;
    }
    return sum;
  }

  let result = sum();

  process.send(`${result}`);
  process.exit();
})
 
process.send('listo');
