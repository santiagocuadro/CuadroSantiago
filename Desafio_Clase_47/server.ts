import { 
  serve,
  ServerRequest,
} from 'https://deno.land/std@0.106.0/http/server.ts';

const PORT = 8080;

const server = serve({
  port: PORT,
});

console.log("http://localhost:" + PORT);

const handleRequest = (req: ServerRequest) => {
  const frase = extraerFrase(req);
  if(frase) {
    const fraseAlReves = frase.split(" ").reverse().join(" ");
    
    req.respond({
      status: 200,
      headers: new Headers({ "content-type": "text/html; charset=utf-8" }),
      body: fraseAlReves,
    });
  } else {
    req.respond({status: 400, body: ''})
  }
}

const extraerFrase = (req: ServerRequest) => {
  const query = req.url.replace(/\//g, ""); 
  const params = new URLSearchParams(query); 
  return params.get("frase");
}

for await (const req of server) {
  handleRequest(req)
}
