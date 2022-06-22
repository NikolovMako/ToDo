# Simple Todo with Register & Login

1.First load the Node folder into your IDE, npm install and docker compose -up.

2.Setup the environments and your docker image, and in app.ts at row 48 add "sequelizeConnection.sync({force:true})".

3.Run npx ts-node server.ts in the terminal, then you can then remove the command at row 48. You now have 2 tables set to work with.

4.Load react-ui and run npm install & npm start.

5.Hit Localhost:"Your localhost port" & you can now register, login and then (create,edit,delete) your own Todo.
