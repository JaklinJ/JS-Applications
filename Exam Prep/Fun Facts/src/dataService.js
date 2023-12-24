import { api } from "./api.js"



const dataEndpoints = {
    getAll: 'data/fruits?sortBy=_createdOn%20desc',
    SingleFact: 'data/facts/',
}

async function getAllFruits() {
    return api.get(dataEndpoints.getAll)
}

async function getSingleFact(id) {
    return api.get(dataEndpoints.SingleFact + id)
}

async function createFact (data) {
    return api.post(dataEndpoints.SingleFact + data);
}

async function editFact(id, data) {
    return api.put(dataEndpoints.SingleFact + id, data);
}

async function delFact(id) {
    return api.del(dataEndpoints.SingleFact + id);
}

export const dataService = {
    getAllFruits,
    getSingleFact,
    createFact,
    editFact,
    delFact
}