import { db } from "../models/db.js";

export const dashboardController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const venues = await db.venueStore.getUserVenues(loggedInUser._id);
      const viewData = {
        title: "Detail Dashboard",
        user: loggedInUser,  // from signup / login
        venues: venues,
      };
      return h.view("dashboard-view", viewData);
    },
  },

  addVenue: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const newVenue = {
        userid: loggedInUser._id, // user from signup / login
        title: request.payload.title,  // input in add-venue view
        vtype: request.payload.venue, // in list-venues view
        description: request.payload.description, // in list-venues view

      };
      await db.venueStore.addVenue(newVenue);
      return h.redirect("/dashboard"); // display dashboard
    },
  },
  deleteVenue: {
    handler: async function (request, h) {
      const venue = await db.venueStore.getVenueById(request.params.id);
      await db.venueStore.deleteVenueById(venue._id);
      return h.redirect("/dashboard");
    },
  },
};
