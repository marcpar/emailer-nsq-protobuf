const fs = require("fs");
const emailer = require("./email");
const nsqReader = require("./config/nsq");


nsqReader.connect();

nsqReader.on('message', msg => {
  console.log('Received message [%s]: %s', msg.id, msg.body.toString())
  msg.finish()
})



// try {
//   const html = fs.readFileSync("src/email_template/notification/notification.html", 'utf8');
//   console.log(emailer('"Fred Foo 👻" <foo@example.com>', "bar@example.com, baz@example.com", "Hello ✔", "Hello world?", html));
// }
// catch (err) {
//   console.error(err)
// }