/**
 * @params {byte} 
 * TODO: Deserialize protobuf
 */
export default function deserializeBinary(byte) {
    try {
        schema.Email.deserializeBinary(byte)
    } catch (error) {
        //TODO: sentry integration
        console.error("error: ", error)
    }

}