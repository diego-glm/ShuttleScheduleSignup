import Registration from "./Interface/Registration.js";

export class RegistrationLocal extends Registration {
    #localStorageKey;
    
    /**
     * @param {string} localStorageLocation 
     */
    constructor(localStorageLocation = 'registryLocal') {
        super();
        this.#localStorageKey = localStorageLocation;
        this.#load();
    }
    
    #load() {
        try {
            const stored = localStorage.getItem(this.#localStorageKey);
            if (stored) {
              const mapArray = JSON.parse(stored);
              this.registry = new Map(mapArray);
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
            this.registry = new Map(); // Reset to empty registry on error
        }
    }
    
    #save() {
        try {
            const mapArray = Array.from(this.registry.entries());
            localStorage.setItem(this.#localStorageKey, JSON.stringify(mapArray));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    }
    
    clear() {
        super.clear();
        this.saveToStorage();
    }
    
    add(room, name, phone) {
        super.add(room, name, phone);
        this.#save();
    }
    
    delete(room) {
        super.delete(room);
        this.#save();
    }
    
    update(room, name, phone) {
        super.update(room, name, phone);
        this.#save()
    }
    
    get(room) {
        super.get(room);
    }
}


export const myRegistry = new RegistrationLocal('registry');
