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
    
    async load() {
        throw new NotImplemented('load');
    }
    
    async save() {
        throw new NotImplemented('save');
    }
    
    async clear() {
        this.registry.clear();
    }

    /**
     * @param {number} room 
     * @param {string} name 
     * @param {string} phone 
     */
    async add(room, name, phone) {
        if (this.registry.get(room)) throw new RoomAlreadyExistsError(room);
        
        this.registry.set(room, new Guest({name, phone}));
    }

    /** @param {number} room */
    async delete(room) {
        if (!this.registry.get(room)) throw new RoomNotFoundError(room);
        
        this.registry.delete(room);
    }
    
    /**
     * @param {number} room 
     * @param {string} name 
     * @param {string} phone 
     */
    async update(room, name, phone) {
        if (!this.registry.get(room)) throw new RoomNotFoundError(room);
        
        this.registry.set(room, new Guest({name, phone}))
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

class NotImplemented extends Error {
    constructor(funName) {
        super(`This ${funName} is not implemented`);
        this.name = 'MethodNotImplemented';
    }
}