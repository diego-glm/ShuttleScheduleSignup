import GroupList from "./GroupList.js";
import Storage from "./LocalStorageMap.js";
import Time from "../utils/Time.js";
import { parser } from "../utils/DataParser.js";

class trip {
    /** @type {string} */
    location = 'Name';
    /** @type {GroupList} */
    group;
    
    constructor(location, group) {
        this.location = location;
        this.group = group;
        
    }
}

class TripScheduler {
    #trips = new Map(); // number:time -> GroupList

    /**
     * @param {string} times Times followed by 
     */
    constructor(tripsStr) {
        tripsArr = parser(tripsStr);
        tripsArr.forEach(e => {
            const time = new Time(e.first);
            this.#trips.set(time.int(), new trip(e.second, new GroupList( 10, time.int())));
        });
    }
    
    load() {
        
    }
    
    save() {
        
    }
    
    add(time, group) {
        
    }
    
    get(tripTime) {
        
    }
}