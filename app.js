const Traceroute = require('traceroute');

Traceroute.trace('hurriyet.com', (err, hops) => {

    if (err) {
        throw err;
    }

    console.log(hops);
});