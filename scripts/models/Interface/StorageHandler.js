
export default class StorageHandler {
    // owner class instant must have toJSON and fromJSON methods
    owner;
    
    save() {
        throw new NotImplemented('save');
    }
    
    load() {
        throw new NotImplemented('save');
    }
}

class NotImplemented extends Error {
    constructor(funName) {
        super(`This ${funName} is not implemented`);
        this.name = 'MethodNotImplemented';
    } 
}