
class Spot {
    /**@type {Spot} */
    next = null
    /**
     * @param {number} id 
     * @param {number} size 
     */
    constructor(id, size) {
      this.id = id;
      this.size = size;
    }
}

export default class GroupList {
    /**@type {Spot} */
    #head = null;
    /**@type {number} */
    #maxOccupancy;
    
    /**
     * @param {number} max 
     */
    constructor(max = 10) {
        this.#maxOccupancy = max;
    }
    
    /**
     * @param {number} roomNumber 
     * @param {number} groupSize 
     */
    add(roomNumber, groupSize) {
        const newSpot = new Spot(roomNumber, groupSize);
        
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
     * @param {number} roomNumber 
     * @param {number} groupSegment 
     */
    remove(roomNumber, newGroupSize) {
        if (this.#head.roomNumber === roomNumber) {
            if (newGroupSize === -1) {
                this.#head = this.#head.next;
            } else {
                this.#head.size = newGroupSize;
            }
        } else {
            let current = this.#head;
            while (current.next && current.next.roomNumber !== roomNumber) {
                current = current.next;
            }

            if (current.next && current.next.roomNumber === roomNumber) {
                if (newGroupSize === -1) {
                    current.next = current.next.next;    
                } else {
                    current.next.size = newGroupSize;
                }
            }
        }
    }
    
    /**
     * @param {number} roomNumber 
     */
    removeAll(roomNumber) {
        this.remove(roomNumber, -1);
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

    #spotsLeft() {
        return this.#maxOccupancy - this.occupancy();
    }
    
    printList() {
        let current = this.#head;
        while (current) {
        console.log(`Room ${current.roomNumber}, Group Size: ${current.groupSize}`);
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