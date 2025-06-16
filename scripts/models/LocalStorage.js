import Storage from "./Interface/StorageHandler.js";

export default class LocalStorage extends Storage {
    #localStorageKey;
    
    constructor(localStorageKey = 'localStorage', map) {
        super();
        this.#localStorageKey = localStorageKey;
    }
    
    load() {
        try {
            const stored = localStorage.getItem(this.#localStorageKey);
            if (stored) {
                const mapArray = JSON.parse(stored);
                this.mapAddr.clear(); // optional, depends if you want to reset
                for (const [key, value] of mapArray) {
                    this.mapAddr.set(key, value);
                }
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            this.mapAddr.clear();
        }
    }
    
    save() {
        try {
            const mapArray = Array.from(this.mapAddr.entries());
            localStorage.setItem(this.#localStorageKey, JSON.stringify(mapArray));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }
}