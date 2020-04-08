var routes = require('./routes.json');

//route('name,['1']);
export default function () {
    var args = Array.prototype.slice.call(arguments);
    var name = args.shift();

    if(routes[name] === undefined) {
        console.log('Error');
    } else {
        return '/' + 
            routes[name]
                .split('/')
                .map(str => str[0] === '{' ? args.shift() : str)
                .join('/');
    }
}