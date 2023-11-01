function solve() {

    const baseURI = 'http://localhost:3030/jsonstore/bus/schedule/';
    const InfoFieldRef = document.querySelector('.info');
    const departBtn = document.getElementById('depart');
    const arriveBtn = document.getElementById('arrive');
    let nextStop = 'depot';
    let currentStop = 'depot'


    async function depart() {
        try{
            const responce = await fetch(baseURI + nextStop);
            const data = await responce.json();
    
            InfoFieldRef.textContent = `Next stop ${data.name}`
            nextStop = data.next;
            departBtn.disabled = true;
            arriveBtn.disabled = false;
        }
        catch(e) {
          return  errorMsg();
        }
        
    }

    async function arrive() {
        try{
            const responce = await fetch(baseURI + currentStop);
            const data = await responce.json();
    
            InfoFieldRef.textContent = `Arriving at ${data.name}`;
            currentStop = data.next;
    
            departBtn.disabled = false;
            arriveBtn.disabled = true;
        }
        catch(e) {
            return errorMsg()
        }
    
    }
        function errorMsg() {
            InfoFieldRef.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    return {
        depart,
        arrive
    };
}

let result = solve();