import GroupList from "./GroupList.js";
import Storage from "./LocalStorage.js";
import Time from "../utils/Time.js";
import { dualParser as parser } from "../utils/DataParser.js";

const MAX_OCC = 10;

class Trip {
    /** @type {Time} */
    time;
    /** @type {string} */
    location;
    /** @type {GroupList} */
    group;
    
    /**
     * @param {Time} time 
     * @param {string} location 
     * @param {GroupList} group 
     */
    constructor(time, location, group) {
        this.time = time;
        this.location = location;
        this.group = group;
        
    }
}

export default class TripScheduler {
    #trips = new Map(); // number:time -> GroupList

    /**
     * @param {string} timeLoc Times followed by 
     */
    constructor(timeLoc) {
        let timeLocArr = parser(timeLoc);
        timeLocArr.forEach(e => {
            const time = new Time(e.first);
            const location = e.second;
            const group = new GroupList(MAX_OCC, new Storage(`${time.int()}-${e.second}`));
            this.#trips.set(
                time.int(), 
                new Trip(time, location, group)
            );
        });
    }
    
    /**
     * @param {number} time 
     * @param {number} room 
     * @param {number} numOfppl 
     */
    add(time, room, numOfppl) {
        this.getGuestList(time).add(room, numOfppl);
    }
    
    /**
     * @param {number} time 
     * @param {number} room 
     * @param {number} numOfppl 
     */
    remove(time, room, numOfppl) {
        this.getGuestList(time).remove(room, numOfppl);
    }
    
    /**
     * @param {number} time
     * @return {GroupList} */
    getGuestList(time) {
        return this.#trips.get(time).group;
    }
    
    /** @returns {Array<{time: Time, location: string}>} */
    getTimesLocations() {
        let array = [];
        for (const [time, trip] of this.#trips.entries()) {
            array.push({time: trip.time, location: trip.location});
        }
        
        return array;
    }
}