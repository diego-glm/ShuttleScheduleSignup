
export default class StorageHandler {
    // owner class instant must have toJSON and fromJSON methods
    owner;
    
    setOwner(owner) {
        this.owner = owner;
    }
    
    save() {
        throw new NotImplemented('save');
    }
    
    load() {
        throw new NotImplemented('load');
    }
    
    reset() {
        throw new NotImplemented('reset');
    }
}

class NotImplemented extends Error {
    constructor(funName) {
        super(`This ${funName} is not implemented`);
        this.name = 'MethodNotImplemented';
    } 
}