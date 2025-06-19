import Storage from "./Interface/StorageHandler.js";

export default class LocalStorageMap extends Storage {
    /**@type {string} */
    #localStorageKey;
    /**@type {Map} */
    collectionAddr;
    
    constructor(localStorageKey) {
        super();
        this.#localStorageKey = localStorageKey;
    }
    
    load() {
        try {
            const stored = localStorage.getItem(this.#localStorageKey);
            if (stored) {
                const mapArray = JSON.parse(stored);
                this.collectionAddr.clear();
                for (const [key, value] of mapArray) {
                    this.collectionAddr.set(key, value);
                }
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            this.collectionAddr.clear();
        }
    }
    
    save() {
        try {
            const mapArray = Array.from(this.collectionAddr.entries());
            localStorage.setItem(this.#localStorageKey, JSON.stringify(mapArray));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }
}