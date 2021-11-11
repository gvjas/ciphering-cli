import { Readable }from 'stream';
import fs from 'fs';

export class ReadStream extends Readable {
    
    constructor(filename) {
        super();
        this.filename = filename;
        this.fd = null;
        this.sizeChunk = 64;
    }
    _construct(callback) {
      fs.open(this.filename, (err, fd) => {
            if (err) {
                callback(err);
            } else {
                this.fd = fd;
                callback();
            }
      });
    }
    _read() {
        const buf = Buffer.alloc(this.sizeChunk);
        fs.read(this.fd, buf, 0, this.sizeChunk, null, (err, bytesRead) => {
            if (err) {
                this.destroy(err);
            } else {
                // console.log(bytesRead)
                this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
            }
        });
    }
    _destroy(err, callback) {
        if (this.fd) {
            fs.close(this.fd, (er) => callback(er || err));
        } else {
            callback(err);
        }
    }
}