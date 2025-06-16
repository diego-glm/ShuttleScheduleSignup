
export default class StorageHandler {
    /**@type {Map} */
    mapAddr;
    
    /**
     * @param {string} data 
     */
    save(data) {
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