import TripScheduler from './models/TripScheduler.js';
import Registration from "./models/Registration.js";
import Storage from './models/LocalStorage.js';

const DEPARTURE_TIMES = `
        15:30,DownTown
        16:30,DownTown
        17:30,DownTown
        18:30,Opry Mills
        19:30,DownTown
        22:00,DownTown
        23:00,DownTown
        24:00,DownTown`;
const RETURN_TIMES = `
        15:00,DownTown
        16:00,DownTown
        17:00,DownTown
        18:00,DownTown
        19:00,Opry Mills
        22:30,DownTown
        23:30,DownTown
        24:30,DownTown`;

const myRegistry = new Registration(new Storage('registration'));
myRegistry.clear();
myRegistry.add(401, 'Bob 1', '615');
myRegistry.add(402, 'Bob 2', '615');
myRegistry.add(403, 'Bob 3', '615');
//myRegistry.print();
const tripHandler = new TripScheduler(DEPARTURE_TIMES);
tripHandler.add(1630, 401, 1); // one sign up
tripHandler.add(1630, 402, 2); // more than one in the group
tripHandler.add(1730, 402, 1); // group split in different times
tripHandler.add(1730, 403, 2);

const userRoom = Number(localStorage.getItem('user-room'));

function main(params) {
    renderSignUpTables();
}

function renderSignUpTables() {
    let signupHTML = '';
    let departureTimes = tripHandler.getTimesLocations();
    
    for (let t = 0; t < departureTimes.length; t++) {
        signupHTML += /*html*/`
        <form action="/action.php" method="post" class="container">
        <h2>Departure Time: ${departureTimes[t].time.standardTimeString()} To ${departureTimes[t].location}</h2>
        <table class="table-seating">
            <thead><tr>
                <th>Seat</th>
                <th>Room Number</th>
                <th>Last Name</th>
            </tr></thead>
            <tbody>       
                ${generateSignUpRow(departureTimes[t].time)}
            </tbody>
        </table>
        </form>`;
    }
    
    document.getElementById('signup-container').innerHTML = signupHTML;
}

/**
 * @param {Time} time 
 * @returns {string}
 */
function generateSignUpRow(time) {
    let rowsHTML = '';
    let group = tripHandler.getGuestList(time.int());
    let current;
    let room, name;
    let sizeTracker, next = true;
    
    for (let i = 1; i <= 10; i++) {
        // if (current === null) {
        //     room = '';
        //     name = '';
        // } else {
        //     if (next) {
        //         room = current.room;
        //         name = myRegistry.get(room).name;
        //         sizeTracker = current.groupSize;
        //         next = false;
        //     } 
        // }
        current = group.getStream();
        room = current.room;
        
        rowsHTML += /*html*/`
        <tr>
            <td>
                ${i}
            </td>
            <td>
                ${current === null?'<input type="checkbox" id="checkmark-${time.int()}-Seat${i}">':''} <span>${room}</span>
            </td>
            <td>
                <p>${name}</p>
            </td>
        </tr>`;
        
        // if (!next && --sizeTracker === 0) {
        //     current = current.next;
        //     next = true;
        // }
    }
    return rowsHTML;
}

main();