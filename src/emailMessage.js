/**
 *  @param {String} from 
 *  @param {String} to 
 *  
 *  @param {String} subject 
 *  @param {String} text 
 *  @param {Blob} body
 */
export default class EmailMessage {
    constructor(from, to, subject, text, html) {

        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
        this.html = html;
    }

}