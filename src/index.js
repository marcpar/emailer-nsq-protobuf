import emailer from "./emailer";
import nsqReader from "./config/nsq";
import chalk from 'chalk';
import figlet from 'figlet';
import { } from 'dotenv/config';
import EmailMessage from "./emailMessage";
import dsproto from "../src/deserializeProto";


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


    let email = dsproto(msg.body);
    emailer(email);


    msg.finish()
  } catch (exception) {

    console.error("Exception Error: " + exception)
  }

})




