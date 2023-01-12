const http = require('http');

const server = http.createServer((request, response) => {
    const url = request.url;
    const method = request.method;

    if (url == '/') {
        response.write('<html>');
        response.write('<head><title>Website</title><head>');
        response.write('<body><h1>Welcome to Homepage</h1><p><a href="/users">Users List</a></p><p><a href="/create-user">Create User</a></p></body>');
        response.write('</html>');
        response.end();
    }

    if (url == '/users') {
        response.write('<html>');
        response.write('<head><title>Website Users</title><head>');
        response.write('<body><h1>Users List</h1><ul><li>user1</li><li>user2</li><li>user3</li></ul>');
        response.write('<p><a href="/">Home Page</a></p><p><a href="/create-user">Create User</a></p></body>');
        response.write('</html>');
        response.end();
    }

    if (url == '/create-user' && method == 'GET') {
        response.write('<html>');
        response.write('<head><title>Add User</title><head>');
        response.write('<body><h1>Users List</h1><form action="/create-user" method="POST"><input type="text" name="username"><button type="submit">Add</button></form>');
        response.write('<p><a href="/">Home Page</a></p><p><a href="/users">Users List</a></p></body>');
        response.write('</html>');
        response.end();
    }

    if (url == '/create-user' && method == 'POST') {
        const content = [];

        request.on('data', (chunk) => {
            content.push(chunk);
        });

        request.on('end', () => {
            const parsedContent = Buffer.concat(content).toString().split('=')[1];
            console.log(parsedContent);    
        });

        response.setHeader('Location','/create-user');
        response.statusCode = 302;
        return response.end();
    }

});

server.listen(3000);
