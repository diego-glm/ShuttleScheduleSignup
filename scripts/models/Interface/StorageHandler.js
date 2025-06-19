
export default class StorageHandler {
    /**@type {Map} */
    collectionAddr;
    
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