import { api } from "./api.js"
import { userHelper } from "./userHelper.js";


const dataEndpoints = {
    getAll: 'data/cars?sortBy=_createdOn%20desc',
    getSingle: 'data/cars/',
    
}

async function getAllCars() {
    return api.get(dataEndpoints.getAll)
}

async function getSingleCar(id) {
    return api.get(dataEndpoints.getSingle + id)
}

async function createCar (data) {
    return api.post(dataEndpoints.getSingle + data);
}

async function editCar (id, data) {
    return api.put(dataEndpoints.getSingle + id, data);
}

async function searchCar (query) {
    return api.get(`data/cars?where=model%20LIKE%20%22${query}%22`)
}
async function delCar (id) {
    return api.del(dataEndpoints.getSingle + id);
}

export const dataService = {
    getAllCars,
    getSingleCar,
    createCar,
    editCar,
    delCar,
    searchCar
}