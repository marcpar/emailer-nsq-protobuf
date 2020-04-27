import protos from "./proto/email_pb";
import EmailMessage from "./emailMessage"

/**
 * @params {byte} 
 * TODO: Deserialize protobuf
 */
export default function deserializeBinary(byte) {
    try {
        console.info("Deserializer: ", protos.email.Email.decode(byte));
        let emailProto = protos.email.Email.decode(byte);
        let email = new EmailMessage(
            emailProto.from,
            emailProto.to,
            emailProto.subject,
            emailProto.text,
            (emailProto.html).toString('utf8'));

        return email;

    } catch (error) {
        //TODO: sentry integration
        console.error("Error: ", error)
        return false;
    }

}