const Traceroute = require('traceroute');
 
const fastify = require('fastify')({ logger: true })

fastify.get('/', async (request, reply) => {  
    return { data: "Hello" }
    })
 

 

// Declare a route
fastify.get('/traceroute/:domain',  async (request, reply) => {
     
    try {
        return await   getData(request.params["domain"])
        .then(data => {
            // console.log(data);
            //return {data: "data"}
            return {data: data}
        })
        .catch(err => {
            console.log(err);
            fastify.log.error(err);
 
        })
    } catch (error) {
        fastify.log.error(error);
        console.log(error);
        
        process.exit(1);
    } 
    
     
    
})
 
function  getData (domain)  {
    
    
        return new Promise((resolve,reject)  => {
            Traceroute.trace(domain, (err, hops) => {
                if (err !== null) reject(err);
               if (err) {
                   console.log("2")
                   return reject(err);
                   
               }
       
               //console.log(hops);
               console.log("1")
               resolve(hops);
           });
       })
    
     
     

    
}
    //console.log( await domainInfo);
   
/*
  Traceroute.trace('hurriyet.com', (err, hops) => {

        if (err) {
            throw err;
        }

        console.log(hops);
    });
*/
 

// Run the server!
const start = async () => {

  try {
    const port = process.env.PORT || 3000;
    var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
    var server_host = process.env.YOUR_HOST || '0.0.0.0';
    await fastify.listen(server_port,server_host, () => console.log(`Listening on ${server_host}:${server_port}`))
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()