import { } from 'dotenv/config';
import nsq from 'nsqjs';

const reader = new nsq.Reader(process.env.NSQ_TOPIC, process.env.NSQ_CHANNEL, {
    lookupdHTTPAddresses: process.env.NSQLOOKUPD_HOST + ":" + process.env.NSQLOOKUPD_PORT
});

module.exports = reader;

