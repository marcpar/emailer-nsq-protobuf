/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.email = (function () {

    /**
     * Namespace email.
     * @exports email
     * @namespace
     */
    var email = {};

    email.Email = (function () {

        /**
         * Properties of an Email.
         * @memberof email
         * @interface IEmail
         * @property {Array.<string>|null} [to] Email to
         * @property {Array.<string>|null} [from] Email from
         * @property {string|null} [subject] Email subject
         * @property {string|null} [text] Email text
         * @property {Uint8Array|null} [html] Email html
         */

        /**
         * Constructs a new Email.
         * @memberof email
         * @classdesc Represents an Email.
         * @implements IEmail
         * @constructor
         * @param {email.IEmail=} [properties] Properties to set
         */
        function Email(properties) {
            this.to = [];
            this.from = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Email to.
         * @member {Array.<string>} to
         * @memberof email.Email
         * @instance
         */
        Email.prototype.to = $util.emptyArray;

        /**
         * Email from.
         * @member {Array.<string>} from
         * @memberof email.Email
         * @instance
         */
        Email.prototype.from = $util.emptyArray;

        /**
         * Email subject.
         * @member {string} subject
         * @memberof email.Email
         * @instance
         */
        Email.prototype.subject = "";

        /**
         * Email text.
         * @member {string} text
         * @memberof email.Email
         * @instance
         */
        Email.prototype.text = "";

        /**
         * Email html.
         * @member {Uint8Array} html
         * @memberof email.Email
         * @instance
         */
        Email.prototype.html = $util.newBuffer([]);

        /**
         * Creates a new Email instance using the specified properties.
         * @function create
         * @memberof email.Email
         * @static
         * @param {email.IEmail=} [properties] Properties to set
         * @returns {email.Email} Email instance
         */
        Email.create = function create(properties) {
            return new Email(properties);
        };

        /**
         * Encodes the specified Email message. Does not implicitly {@link email.Email.verify|verify} messages.
         * @function encode
         * @memberof email.Email
         * @static
         * @param {email.IEmail} message Email message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Email.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.to != null && message.to.length)
                for (var i = 0; i < message.to.length; ++i)
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.to[i]);
            if (message.from != null && message.from.length)
                for (var i = 0; i < message.from.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.from[i]);
            if (message.subject != null && Object.hasOwnProperty.call(message, "subject"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.subject);
            if (message.text != null && Object.hasOwnProperty.call(message, "text"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.text);
            if (message.html != null && Object.hasOwnProperty.call(message, "html"))
                writer.uint32(/* id 5, wireType 2 =*/42).bytes(message.html);
            return writer;
        };

        /**
         * Encodes the specified Email message, length delimited. Does not implicitly {@link email.Email.verify|verify} messages.
         * @function encodeDelimited
         * @memberof email.Email
         * @static
         * @param {email.IEmail} message Email message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Email.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an Email message from the specified reader or buffer.
         * @function decode
         * @memberof email.Email
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {email.Email} Email
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Email.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.email.Email();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.to && message.to.length))
                            message.to = [];
                        message.to.push(reader.string());
                        break;
                    case 2:
                        if (!(message.from && message.from.length))
                            message.from = [];
                        message.from.push(reader.string());
                        break;
                    case 3:
                        message.subject = reader.string();
                        break;
                    case 4:
                        message.text = reader.string();
                        break;
                    case 5:
                        message.html = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes an Email message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof email.Email
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {email.Email} Email
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Email.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an Email message.
         * @function verify
         * @memberof email.Email
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Email.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.to != null && message.hasOwnProperty("to")) {
                if (!Array.isArray(message.to))
                    return "to: array expected";
                for (var i = 0; i < message.to.length; ++i)
                    if (!$util.isString(message.to[i]))
                        return "to: string[] expected";
            }
            if (message.from != null && message.hasOwnProperty("from")) {
                if (!Array.isArray(message.from))
                    return "from: array expected";
                for (var i = 0; i < message.from.length; ++i)
                    if (!$util.isString(message.from[i]))
                        return "from: string[] expected";
            }
            if (message.subject != null && message.hasOwnProperty("subject"))
                if (!$util.isString(message.subject))
                    return "subject: string expected";
            if (message.text != null && message.hasOwnProperty("text"))
                if (!$util.isString(message.text))
                    return "text: string expected";
            if (message.html != null && message.hasOwnProperty("html"))
                if (!(message.html && typeof message.html.length === "number" || $util.isString(message.html)))
                    return "html: buffer expected";
            return null;
        };

        /**
         * Creates an Email message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof email.Email
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {email.Email} Email
         */
        Email.fromObject = function fromObject(object) {
            if (object instanceof $root.email.Email)
                return object;
            var message = new $root.email.Email();
            if (object.to) {
                if (!Array.isArray(object.to))
                    throw TypeError(".email.Email.to: array expected");
                message.to = [];
                for (var i = 0; i < object.to.length; ++i)
                    message.to[i] = String(object.to[i]);
            }
            if (object.from) {
                if (!Array.isArray(object.from))
                    throw TypeError(".email.Email.from: array expected");
                message.from = [];
                for (var i = 0; i < object.from.length; ++i)
                    message.from[i] = String(object.from[i]);
            }
            if (object.subject != null)
                message.subject = String(object.subject);
            if (object.text != null)
                message.text = String(object.text);
            if (object.html != null)
                if (typeof object.html === "string")
                    $util.base64.decode(object.html, message.html = $util.newBuffer($util.base64.length(object.html)), 0);
                else if (object.html.length)
                    message.html = object.html;
            return message;
        };

        /**
         * Creates a plain object from an Email message. Also converts values to other types if specified.
         * @function toObject
         * @memberof email.Email
         * @static
         * @param {email.Email} message Email
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Email.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.to = [];
                object.from = [];
            }
            if (options.defaults) {
                object.subject = "";
                object.text = "";
                if (options.bytes === String)
                    object.html = "";
                else {
                    object.html = [];
                    if (options.bytes !== Array)
                        object.html = $util.newBuffer(object.html);
                }
            }
            if (message.to && message.to.length) {
                object.to = [];
                for (var j = 0; j < message.to.length; ++j)
                    object.to[j] = message.to[j];
            }
            if (message.from && message.from.length) {
                object.from = [];
                for (var j = 0; j < message.from.length; ++j)
                    object.from[j] = message.from[j];
            }
            if (message.subject != null && message.hasOwnProperty("subject"))
                object.subject = message.subject;
            if (message.text != null && message.hasOwnProperty("text"))
                object.text = message.text;
            if (message.html != null && message.hasOwnProperty("html"))
                object.html = options.bytes === String ? $util.base64.encode(message.html, 0, message.html.length) : options.bytes === Array ? Array.prototype.slice.call(message.html) : message.html;
            return object;
        };

        /**
         * Converts this Email to JSON.
         * @function toJSON
         * @memberof email.Email
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Email.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Email;
    })();

    return email;
})();

module.exports = $root;
