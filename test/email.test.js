import { expect } from "chai";
import emailer from "../src/emailer";
import EmailMessage from "../src/emailMessage";
import Schema from "../src/proto/email_pb";

describe("NSQ EMAILER", () => {
    describe("emailer function", () => {

        it("should be true", async () => {
            const emailMessage = new EmailMessage('"Fred Foo 👻" <foo@example.com>', "bar@example.com, baz@example.com", "Hello ✔", "Hello world?")
            sendnsq();
            setTimeout(1000)
            let result = await emailer(emailMessage)


            //const str = sayHello();
            console.log(result)
            expect(true).to.equal(result)

            //done();
        });
    });

    // describe("send protobuf nsq email", () => {
    //     it("shoud be able to send protobuf", async () => {
    //         sendnsq();
    //     });
    // });
})


function sendnsq() {
    const sender = new Schema.Email();
    sender.setFrom('"Fred Foo 👻" <foo@example.com>')
    sender.setTo("bar@example.com")
    sender.setSubject("Hello ✔")
    sender.setText("Hello world?")
    sender.setHtml("<h3>HELLO WORLD MEN!!!<h3>")

    //console.log("binary" + sender.serializeBinary())

    const w = new nsq.Writer('127.0.0.1', 4150)
    w.connect();

    w.on('ready', () => {
        w.publish('sample_topic', sender.serializeBinary());
        w.close();
    });

    w.on('closed', () => {
        console.log('Writer closed');
    })
}