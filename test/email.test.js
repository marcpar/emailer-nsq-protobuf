import { expect } from "chai";
import emailer from "../src/emailer";
import EmailMessage from "../src/emailMessage";
import dsproto from "../src/deserializeProto";
import protos from "../src/proto/email_pb";
import nsq from 'nsqjs';
import fs from "fs";
import path from "path";

describe("NSQ EMAILER", () => {
    describe("emailer function", () => {

        it("should be true", async () => {
            const html = fs.readFileSync(path.resolve(__dirname, "../src/email_template/notification/notification.html"), 'utf8');

            const emailMessage = new EmailMessage('"Fred Foo 👻" <foo@example.com>', "bar@example.com, baz@example.com", "Hello ✔", "test", html);

            const result = await emailer(emailMessage)


            expect(true).to.equal(result)

        }).timeout(4000);
    });

    describe("Deserialize protobuf", () => {
        it("should be able to deserialize protobuf", () => {
            let byte = createProtobuf();
            let email = dsproto(byte);
            console.log("TEST: " + email.from);


            expect(['"Fred Foo 👻" <foo@example.com>']).to.eql(email.from);
            expect(["bar@example.com", "baz@example.com"]).to.eql(email.to);

        });
    });

    describe("Send NSQ", () => {

        it("should be able to send messages to nsq", (done) => {
            let sent = sendnsq();
            console.log("send nsq")
            setTimeout(done, 15000);
            expect(true).to.equal(sent);
        }).timeout(4000);
    });
});

function createProtobuf() {
    let sender;
    let byte;
    try {
        const html = fs.readFileSync(path.resolve(__dirname, "../src/email_template/notification/notification.html"), 'utf8');
        sender = protos.email.Email.create({
            "from": ['"Fred Foo 👻" <foo@example.com>'],
            "to": ["bar@example.com", "baz@example.com"],
            "subject": "helloww",
            "text": "hello world?",
            "html": Buffer.from(html)
        })
        // sender.from =['"Fred Foo 👻" <foo@example.com>'] ;
        // sender.to = ["bar@example.com", "baz@example.com"];
        // sender.subject = "Helloww"
        // sender.text = "hello world?";
        // sender.html = "<b>Hello world?</b>";

        byte = protos.email.Email.encode(sender).finish();
    } catch (error) {
        console.error("error: ", error);
    }

    return byte
}

function sendnsq() {

    let byte = createProtobuf();

    const w = new nsq.Writer('127.0.0.1', 4150)
    w.connect();

    w.on('ready', () => {

        w.publish('email', byte, err => {
            console.log("ready")
            if (err) { return console.error("Error: ", err.message) }
            console.log('Message sent successfully')
            return true;
            w.close()
        });

    });

    w.on('closed', () => {
        console.log('Writer closed');
    })
    w.on('error', (error) => {
        console.log(error)
        return false
    });
    //console.log("binary" + sender.serializeBinary())
}