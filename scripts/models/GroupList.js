import Storage from "./Interface/StorageHandler.js"

class Spot {
    /**@type {Spot} */
    next = null
    /**
     * @param {number} room 
     * @param {number} groupSize 
     */
    constructor(room, groupSize) {
      this.room = room;
      this.groupSize = groupSize;
    }
}

export default class GroupList {
    /**@type {Spot} */
    #head = null;
    /**@type {number} */
    #maxOccupancy;
    /**@type {Storage} */
    #storage = null;
    
    /**
     * @param {number} max 
     * @param {Storage} storage 
     */
    constructor(max = 10, storage) {
        this.#maxOccupancy = max;
        this.#storage = storage;
        this.#storage.setOwner(this);
    }
    
    /**
     * @param {number} room 
     * @param {number} groupSize 
     */
    add(room, groupSize) {
        const newSpot = new Spot(room, groupSize);
        
        if (this.#head !== null) {
            let current = this.#head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newSpot;
        } else {
            this.#head = newSpot;
        }
        
        this.#save();
    }
    
    /**
     * @param {number} room 
     * @param {number} groupSegment 
     */
    remove(room, newGroupSize) {
        if (this.#head.room === room) {
            if (newGroupSize === -1) {
                this.#head = this.#head.next;
            } else {
                this.#head.size = newGroupSize;
            }
        } else {
            let current = this.#head;
            while (current.next && current.next.room !== room) {
                current = current.next;
            }

            if (current.next && current.next.room === room) {
                if (newGroupSize === -1) {
                    current.next = current.next.next;    
                } else {
                    current.next.size = newGroupSize;
                }
            }
        }
        
        this.#save();
    }
    
    /** @param {number} room */
    removeAll(room) {
        this.remove(room, -1);
        this.#save;
    }
    
    /**
     * @returns {Spot}
     */
    getHead() {
        return this.#head;
    }
    
    /**
     * @returns {Generator<{room: number, name: string}>}
     */
    getStream() {
        return streamList(this.#head);
    }
    
    clear() {
        this.#head = null;
        this.#reset();
    }
    
    /** @returns {number} Total Occupancy in this list */
    occupancy() {
        let total = 0;
        let current = this.#head;
        while (current) {
            total += current.groupSize;
            current = current.next;
        }
        return total;
    }

    #spotsLeft() {
        return this.#maxOccupancy - this.occupancy();
    }
    
    print() {
        let current = this.#head;
        while (current) {
        console.log(`Room ${current.room}, Group Size: ${current.groupSize}`);
        current = current.next;
        }
    }
    
    /** @returns {Object} A JSON-compatible object */
    toJSON() {
        const spots = [];
        let current = this.#head;
        while (current) {
            spots.push({
                room: current.room,
                groupSize: current.groupSize
            });
            current = current.next;
        }
      
        return {
            maxOccupancy: this.#maxOccupancy,
            spots
        };
    }
    
    /** @param {string | Object} json - A JSON string or parsed object. */
    fromJSON(json) {
        const data = typeof json === 'string' ? JSON.parse(json) : json;
        for (const spot of data.spots) {
            this.add(spot.room, spot.groupSize);
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

/**
 * @param {Spot} head
 * @returns {Generator<{room: number, name: string}>}
 */
function* streamList(head) {
    let current = head;
    while (current) {
        for (let i = 0; i < current.groupSize; i++) {
            yield current.room;
        }
        current = current.next;
    }
}

class OccupancyExceeded extends Error {
    constructor(funName) {
        super(`This ${funName} is not implemented`);
        this.name = 'OccupancyExceeded';
    }
}

class SpotNotFound extends Error {
    constructor(room) {
        super(`Spot for ${room} is not found`);
        this.name = 'SpotNotFound';
    }
}