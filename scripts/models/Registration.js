import Storage from "./Interface/StorageHandler.js";

class Guest {
    /**
     * @typedef {Object} params
     * @property {string} name
     * @property {string} phone
     */
    constructor(params) {
        this.name = params.name;
        this.phone = params.phone;
    }
}

export default class Registration {
    registry = new Map();
    /**@type {Storage} */
    #storage = null;
    
    /**
     * @param {Storage} storage 
     */
    constructor(storage) {
        this.#storage = storage;
        this.#storage.collectionAddr = this.registry;
        this.#load();
    }
    
    async clear() {
        this.registry.clear();
        this.#save();
    }

    /**
     * @param {number} room 
     * @param {string} name 
     * @param {string} phone 
     */
    async add(room, name, phone) {
        if (this.registry.get(room)) throw new RoomAlreadyExistsError(room);
        
        this.registry.set(room, new Guest({name, phone}));
        
        this.#save();
    }

    /** @param {number} room */
    async delete(room) {
        if (!this.registry.get(room)) throw new RoomNotFoundError(room);
        
        this.registry.delete(room);

        this.#save();
    }
    
    /**
     * @param {number} room 
     * @param {string} name 
     * @param {string} phone 
     */
    async update(room, name, phone) {
        if (!this.registry.get(room)) throw new RoomNotFoundError(room);
        
        this.registry.set(room, new Guest({name, phone}))
        
        this.#save();
    }
    
    /** @param {number} room */
    async get(room) {
        if (!this.registry.get(room)) throw new RoomNotFoundError(room);
        
        return this.registry.get(room);
    }
    
    size() {
        return this.registry.size;
    }
    
    rooms() {
        return this.registry.keys();
    }
    
    entries() {
        return this.registry.entries();
    }
    
    print(){
        for (const [room, guest] of this.registry) {
            console.log(`${room}: ${guest.name}, ${guest.phone}`);
        }
    }
    
    #load() {
        this.#storage.load();
    }
    
    #save() {
        this.#storage.save();
    }
}

class RoomAlreadyExistsError extends Error {
    constructor(room) {
        super(`Room ${room} already exists`);
        this.name = "RoomAlreadyExistsError";
    }
}
  
class RoomNotFoundError extends Error {
    constructor(room) {
        super(`Room ${room} not found`);
        this.name = 'RoomNotFoundError';
    }
}