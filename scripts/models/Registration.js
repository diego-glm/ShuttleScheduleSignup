import Storage from "./Interface/StorageHandler.js"

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
        this.#storage.setOwner(this);
        this.#load();
    }
    
    async clear() {
        this.registry.clear();
        this.#reset();
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
    get(room) {
        if (!this.registry.get(room)) throw new RoomNotFoundError(room);
        
        return this.registry.get(room);
    }
    
    /** @returns {number} */
    size() {
        return this.registry.size;
    }
    
    /** @returns {Iterable<number>} */
    rooms() {
        return this.registry.keys();
    }
    
    /** @returns {Iterable<Guest>} */
    entries() {
        return this.registry.entries();
    }
    
    print(){
        for (const [room, guest] of this.registry) {
            console.log(`${room}: ${guest.name}, ${guest.phone}`);
        }
    }
    
    /** @returns {Object} A JSON-compatible object */
    toJSON() {
        return Array.from(this.registry.entries()).map(([room, guest]) => ({
            room, guest: { ...guest }
        }));
    }
    
    /** @param {string | Object} json - A JSON string or parsed object. */
    fromJSON(json) {
        const data = typeof json === 'string' ? JSON.parse(json) : json;
        if (data) {
            data.forEach(entry => {
                this.add(entry.room, entry.guest.name, entry.guest.phone);
            });
        }
    }
    
    #save() {
        this.#storage.save();
    }
    
    #load() {
        const raw = this.#storage.load();
        this.fromJSON(raw);
    }
    
    #reset() {
        this.#storage.reset();
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