const Schema = require("./proto/email_pb");
var protobuf = require("protobufjs/minimal");
const nsq = require('nsqjs')
function sendnsq() {
    let sender = new Schema.Email();
    sender.setFrom('"Fred Foo 👻" <foo@example.com>')
    sender.setTo("bar@example.com")
    sender.setSubject("Hello ✔")
    sender.setText("Hello world?")
    sender.setHtml("<h3>HELLO WORLD MEN!!!<h3>")

    protobuf.load("./proto/email.proto", function (err, root) {
        if (err)
            throw err;

        var EmailMessage = root.lookupType
    });

    //let bytes = sender.serializeBinary();
    console.log("Serialize: ", sender.serializeBinary());
    // console.log("Deserialize", Schema.deserializeBinary(bytes))

    const w = new nsq.Writer('127.0.0.1', 4150)
    w.connect();

    w.on('ready', () => {
        console.log("binary")
        w.publish('sample_topic', sender.serializeBinary(), err => {
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