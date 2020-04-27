import emailer from "./emailer";
import nsqReader from "./config/nsq";
import chalk from 'chalk';
import figlet from 'figlet';
import { } from 'dotenv/config';
import Email from "./proto/email_pb";
import EmailMessage from "./emailMessage";
import fs from "fs";
import path from "path";

/**
 * Banner for EMAILER
 */

console.log(
  chalk.yellow(
    figlet.textSync('NSQ-EMAILER', { horizontalLayout: 'full' })
  )
);

// NSQLOOKUPD_HOST = nsqlookupd
// NSQLOOKUPD_PORT = 4161
// NSQ_TOPIC = sample_topic
// NSQ_CHANNEL = test_channel


// NODE_ENV = development

// EMAIL_HOST = smtp.ethereal.email
// EMAIL_PORT = 587
// EMAIL_USERNAME = emmy.flatley@ethereal.email
// EMAIL_PASSWORD = t3a2G2HbtrGYHcQ5nj
// EMAIL_NAME = Emmy Flatle
// EMAIL_SECURE = false

console.table([
  { environment: "NODE_ENV", "value": process.env.NODE_ENV }]
)



nsqReader.connect();

nsqReader.on('message', msg => {
  try {

    console.log('Received message [%s]: %s', msg.id, msg.body)
    // console.log(Email.deserializeBinary(msg.body))

    const html = fs.readFileSync(path.resolve(__dirname, "./email_template/notification/notification.html"), 'utf8');
    emailer(new EmailMessage('"Fred Foo 👻" <foo@example.com>', "bar@example.com, baz@example.com", "Hello ✔", "Hello world?", html));


    msg.finish()
  } catch (exception) {

    console.error("Exception Error: " + exception)
  }

})



// try {
//   const html = fs.readFileSync("src/email_template/notification/notification.html", 'utf8');
//   console.log(emailer('"Fred Foo 👻" <foo@example.com>', "bar@example.com, baz@example.com", "Hello ✔", "Hello world?", html));
// }
// catch (err) {
//   console.error(err)
// }

