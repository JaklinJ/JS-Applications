import { api } from "./api.js"



const dataEndpoints = {
    getAll: 'data/motorcycles?sortBy=_createdOn%20desc',
    singleMotor: 'data/motorcycles/',
}

async function getAllMotors() {
    return api.get(dataEndpoints.getAll)
}

async function getSingleMotor(id) {
    return api.get(dataEndpoints.singleMotor + id)
}

async function createMotor (data) {
    return api.post(dataEndpoints.singleMotor + data);
}

async function editMotor(id, data) {
    return api.put(dataEndpoints.singleMotor + id, data);
}

async function delMotor(id) {
    return api.del(dataEndpoints.singleMotor + id);
}

export const dataService = {
    getAllMotors,
    getSingleMotor,
    createMotor,
    editMotor,
    delMotor
}