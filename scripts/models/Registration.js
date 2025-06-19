import Storage from "./LocalStorage.js"

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
    
    toJSON() {
        return Array.from(this.registry.entries()).map(([room, guest]) => ({
            room, guest: { ...guest }
        }));
    }
    
    static fromJSON(json) {
        const data = typeof json === 'string' ? JSON.parse(json) : json;
        const jsonRegistry = new Registration(new Storage('registration'));
        
        data.forEach(entry => {
            jsonRegistry.add(entry.room, entry.guest.name, entry.guest.phone);
        });
        
        return jsonRegistry;
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

export function test(params) {
    console.log('start of test');
    const myRegistry = new Registration(new Storage('registration'));
    myRegistry.clear();
    myRegistry.add(201, 'name', '615');
    myRegistry.add(202, 'name2', '616');
    myRegistry.print();
}

export function test1(params) {
    const myRegistry = new Registration(new Storage('registration'));
    myRegistry.clear();
    myRegistry.add(201, 'name', '615');
    myRegistry.add(202, 'name2', '616');
    myRegistry.clear();
    const plain = {...myRegistry};
    
    console.log(`Plain print: ${plain}`);
    console.log(plain);
    
    const tojson = myRegistry.toJSON();
    console.log(`toJSON: ${tojson}`);
    console.log(tojson);
    const fromjson = Registration.fromJSON(tojson);
    console.log(`fromJSON: ${fromjson}`);
    console.log({...fromjson});
    
    const areEqual = (a, b) =>
        a instanceof Registration &&
        b instanceof Registration &&
        JSON.stringify(a) === JSON.stringify(b);
    
    console.log(areEqual(myRegistry, fromjson));
    myRegistry.clear();
    
}