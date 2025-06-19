export default class Time {
    #time;
    
    /**
     * @param {string} militaryTimeStr 
     */
    constructor(militaryTimeStr) {
        this.#time = this.#militaryTimeStrToInt(militaryTimeStr);
    }
    
    int() {
        return this.#time;
    }
    
    standardTimeString() {
        const hours24 = Math.floor(this.#time / 100);
        const minutes = this.#time % 100;
        
        const hours12 = hours24 % 12 || 12;// 0 or 12 becomes 12 in 12-hour time
        const ampm = hours24 >= 12 ? 'PM' : 'AM';
        
        return `${this.#pad(hours12)}:${this.#pad(minutes)} ${ampm}`;
    }
    
    militaryTimeString() {
        const hours = Math.floor(this.#time / 100);
        const minutes = this.#time % 100;
    
        return `${this.#pad(hours)}:${this.#pad(minutes)}`;
    }
    
    /**
     * Converts a "HH:MM" time string to a number
     * 
     * @param {string} timeStr - Time in 24-hour format as "HH:MM", e.g., "14:30"
     * @returns {number} Military time as an integer, e.g., 1430
     */
    #militaryTimeStrToInt(timeStr) {
        if (!/^\d{2}:\d{2}$/.test(timeStr)) throw new Error(`Invalid time format. Expected "HH:MM", got "${timeStr}"`);
        
        const [hours, minutes] = timeStr.split(":").map(Number);
        return hours * 100 + minutes;
    }
    
    #pad(n) {
        return n.toString().padStart(2, "0");
    }
}