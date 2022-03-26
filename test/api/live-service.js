
import axios from "axios";

import { serviceUrl } from "../fixtures.js";

export const liveService = {
    playtimeUrl: serviceUrl,

    async createUser(user) {
        const res = await axios.post(`${this.playtimeUrl}/api/users`, user);
        return res.data;
    },

    async getUser(id) {
        const res = await axios.get(`${this.playtimeUrl}/api/users/${id}`);
        return res.data;
    },
    async getAllUsers() {
        const res = await axios.get(`${this.playtimeUrl}/api/users`);
        return res.data;
    },
    async deleteAllUsers() {
        const res = await axios.delete(`${this.playtimeUrl}/api/users`);
        return res.data;
    },

    async createVenue(venue) {
        const res = await axios.post(`${this.playtimeUrl}/api/venues`, venue);
        return res.data;
    },

    async deleteAllVenues() {
        const response = await axios.delete(`${this.playtimeUrl}/api/venues`);
        return response.data;
    },

    async deleteVenue(id) {
        const response = await axios.delete(`${this.playtimeUrl}/api/venues/${id}`);
        return response;
    },

    async getAllVenues() {
        const res = await axios.get(`${this.playtimeUrl}/api/venues`);
        return res.data;
    },

    async getVenue(id) {
        const res = await axios.get(`${this.playtimeUrl}/api/venues/${id}`);
        return res.data;

    },

    async authenticate(user) {
        const response = await axios.post(`${this.playtimeUrl}/api/users/authenticate`, user);
        axios.defaults.headers.common.Authorization = `Bearer ${  response.data.token}`;
        return response.data;
    },

    async clearAuth() {
        axios.defaults.headers.common.Authorization = "";
    }
};
