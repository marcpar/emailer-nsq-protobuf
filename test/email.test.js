import { expect } from "chai";
import emailer from "../src/emailer";
import EmailMessage from "../src/emailMessage";
import dsproto from "../src/deserializeProto";
import Schema from "../src/proto/email_pb";
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

        }).timeout(10000);
    });

    describe("Deserialize protobuf", () => {
        it("should be able to deserialize protobuf", () => {
            let byte = createProtobuf();
            console.log("TEST: " + dsproto(byte));
            // let email = new EmailMessage

            expect('"Fred Foo 👻" <foo@example.com>').to.equal(email.from);
            expect("bar@example.com").to.equal(email.to);


        });
    });

    describe("Send NSQ", () => {
        it("should be able to send messages to nsq", () => {
            let sent = sendnsq();
            expect(true).to.equal(sent);
        });
    });
});

function createProtobuf() {
    let sender = new Schema.Email();
    let byte;
    try {
        sender.setFrom('"Fred Foo 👻" <foo@example.com>');
        sender.setTo("bar@example.com");
        sender.setSubject("Hello ✔");
        sender.setText("Hello world?");
        sender.setHtml("<h3>HELLO WORLD MEN!!!<h3>");
        byte = sender.serializeBinary();
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

        w.publish('Email', byte, err => {
            if (err) { return console.error(err.message) }
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