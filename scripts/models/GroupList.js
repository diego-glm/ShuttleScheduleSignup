
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
    /**@type {number} */
    #id;
    /**@type {Spot} */
    #head = null;
    /**@type {number} */
    #maxOccupancy;
    
    /**
     * @param {number} max 
     */
    constructor(max = 10, id) {
        this.#maxOccupancy = max;
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
    }
    
    /**
     * @param {number} room 
     */
    removeAll(room) {
        this.remove(room, -1);
    }
    
    /**
     * @returns {number} Total Occupancy in this list
     */
    occupancy() {
        let total = 0;
        let current = this.#head;
        while (current) {
            total += current.groupSize;
            current = current.next;
        }
        return total;
    }
    
    getId() {
        return this.#id;
    }

    #spotsLeft() {
        return this.#maxOccupancy - this.occupancy();
    }
    
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
            id: this.#id,
            maxOccupancy: this.#maxOccupancy,
            spots
        };
    }
    
    static fromJSON(json) {
        const data = typeof json === 'string' ? JSON.parse(json) : json;
        const list = new GroupList(data.maxOccupancy, data.id);
        for (const spot of data.spots) {
            list.add(spot.room, spot.groupSize);
        }
        return list;
    }
    
    print() {
        let current = this.#head;
        while (current) {
        console.log(`Room ${current.room}, Group Size: ${current.groupSize}`);
        current = current.next;
        }
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