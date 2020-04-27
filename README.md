# NSQ super mailer through protobuf.

Email queueing 

## Running

I use docker-compose.

```bash
docker-compose up -d
```

## Usage
Setup the Environemnt Variables

```bash
export NSQLOOKUPD_HOST=nsqlookupd
export NSQLOOKUPD_PORT=4161
export NSQ_TOPIC=email
export NSQ_CHANNEL=email

export NODE_ENV=development

export EMAIL_HOST=smtp.ethereal.email
export EMAIL_PORT=587
export EMAIL_USERNAME=emmy.flatley@ethereal.email
export EMAIL_PASSWORD=t3a2G2HbtrGYHcQ5nj
export EMAIL_NAME=Emmy Flatle
export EMAIL_SECURE=true
```

check /src/proto/email.proto
```proto
syntax = "proto3";

package email;

message Email {
    repeated string to = 1;
    repeated string from = 2;
    string subject= 3;
    string text = 4;
    // html = 5;
    bytes html = 5;
}
```

### Sending protobuf to nsq

```javascript
    import protos from "../src/proto/email_pb";

    let sender = protos.email.Email.create();
    sender.from = ['"Fred Foo 👻" <foo@example.com>'];
    sender.to = ["bar@example.com", "baz@example.com"];
    sender.subject = "Helloww"
    sender.text = "hello world?";
    sender.html = Buffer.from("<b>Hello world?</b>");
    
    byte = protos.email.Email.encode(sender).finish();

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


```

## TEST

```bash
yarn run test
yarn run coverage

```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)