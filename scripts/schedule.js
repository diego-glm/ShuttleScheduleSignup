import { dualParser as parser } from "./utils/DataParser.js";
import Time from "./utils/Time.js";
import { myRegistry } from "./models/RegistrationLocal.js";

const userRoom = Number(localStorage.getItem('user-room'));
let departure = [];

function main(params) {
    let timesDepartures = parser(`
        15:30,DownTown
        16:30,DownTown
        17:30,DownTown
        18:30,Opry Mills
        19:30,DownTown
        22:00,DownTown
        23:00,DownTown
        24:00,DownTown
    `);
    let timesReturns = parser(`
        15:00,DownTown
        16:00,DownTown
        17:00,DownTown
        18:00,DownTown
        19:00,Opry Mills
        22:30,DownTown
        23:30,DownTown
        24:30,DownTown
    `);
    
    timesDepartures.forEach(e => {
        departure.push(new Time({time:e.first, location: e.second}));
    });
    
    renderSignUpTables();
    
    
}


function renderSignUpTables() {
    let signupHTML = '';
    
    for (let t = 0; t < departure.length; t++) {
        signupHTML += /*html*/`
        <form action="/action.php" method="post" class="container">
        <h2>Departure Time: ${departure[t].standardTimeString()} To ${departure[t].location}</h2>
        <table class="table-seating">
            <thead><tr>
                <th>Seat</th>
                <th>Room Number</th>
                <th>Last Name</th>
            </tr></thead>
            <tbody>       
                ${generateSignUpRow(departure[t])}
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
    for (let i = 1; i <= 10; i++) {
        rowsHTML += /*html*/`
        <tr>
            <td>
                ${i}
            </td>
            <td>
                <input type="checkbox" id="checkmark-${time.time}-Seat${i}">
            </td>
            <td>
                
            </td>
        </tr>`;
    }
    return rowsHTML;
}

main();