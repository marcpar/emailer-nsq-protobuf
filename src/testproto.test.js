const protos = require("./proto/email_pb");
const protobuf = require("protobufjs");



const nsq = require('nsqjs')
function sendnsq() {
    let sender = protos.email.Email.create();
    sender.from = ['"Fred Foo 👻" <foo@example.com>'];
    sender.to = ["bar@example.com", "baz@example.com"];
    sender.subject = "Helloww"
    sender.text = "hello world?";
    sender.html = Buffer.from("<b>Hello world?</b>");


    let byte = protos.email.Email.encode(sender).finish();
    //let bytes = sender.serializeBinary();
    console.log("Serialize: ", byte);
    // console.log("Deserialize", Schema.deserializeBinary(bytes))

    const w = new nsq.Writer('127.0.0.1', 4150)
    w.connect();

    w.on('ready', () => {
        console.log("binary")
        w.publish('email', byte, err => {
            if (err) { return console.error(err.message) }
            console.log('Message sent successfully')
            w.close()
        });

    });

    w.on('closed', () => {
        console.log('Writer closed');
    })
    w.on('error', (error) => {
        console.log(error)
    });
}

sendnsq();