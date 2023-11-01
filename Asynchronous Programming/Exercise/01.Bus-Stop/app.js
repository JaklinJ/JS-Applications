async function getInfo() {
    const baseURI = 'http://localhost:3030/jsonstore/bus/businfo/';

    const stopIdRef = document.getElementById('stopId');
    const busNumber = stopIdRef.value;
    const stopName = document.getElementById('stopName');
    const busses = document.getElementById('buses');
    try {
        const responce = await fetch(baseURI + busNumber);
    stopIdRef.value = '';
    busses.replaceChildren();

    const data = await responce.json();

    stopName.textContent = data.name;
    for (const [busId, time] of Object.entries(data.buses)) {
        const li = document.createElement('li');
        li.textContent = `Bus ${busId} arrives in ${time} minutes`
        busses.appendChild(li);
    }
    } catch(e) {
        errorMessage();
    }
    
    function errorMessage() {
        stopIdRef.value = '';
        busses.replaceChildren();
        stopName.textContent = 'Error';
    }
    
}