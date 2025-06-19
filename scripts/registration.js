import Registration from "./models/Registration.js";
import Storage from './models/LocalStorage.js';
import {test} from './models/Registration.js';

const myRegistry = new Registration(new Storage('registration'));

function main(params) {
    test();
    generateRoomOptions()
    handleSubmitBtn();
}

function generateRoomOptions() {
    let optionsHTML = '';
    const lowFlr = 2, hiFlr = 7, maxRm = 21;
    
    for (let f = lowFlr; f <= hiFlr; f++) {
        for (let rm = 1; rm <= 9; rm++) {
            optionsHTML += /*html*/`<option value="${f}0${rm}">`;
        }
        for (let rm = 10; rm <= maxRm; rm++) {
            optionsHTML += /*html*/`<option value="${f}${rm}">`;
        }
    }
    
    document.getElementById('room-options').innerHTML = optionsHTML;
}

function handleSubmitBtn() {
    document.addEventListener("DOMContentLoaded", () => {
        const form = document.getElementById("groupForm");
      
        form.addEventListener("submit", function (event) {
          event.preventDefault(); // prevent page reload
      
          // Get the values from the inputs
          const roomNumber = document.getElementById("roomNumber").value;
          const lastName = document.getElementById("lastName").value;
          const phoneNumber = document.getElementById("phoneNumber").value;
          
          myRegistry.add(roomNumber, lastName, phoneNumber);
          localStorage.setItem('user-room', roomNumber);
        });
      });
}

main();