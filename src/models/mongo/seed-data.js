
 export const seedData = {
  users: {
    _model: "User",
    homer: {
      firstName: "Homer",
      lastName: "Simpson",
      email: "homer@simpson.com",
      password: "secret"
    },
    marge: {
      firstName: "Marge",
      lastName: "Simpson",
      email: "marge@simpson.com",
      password: "secret"
    },
    bart: {
      firstName: "Bart",
      lastName: "Simpson",
      email: "bart@simpson.com",
      password: "secret"
    },
    abe: {
      firstName: "Abe",
      lastName: "Simpson",
      email: "abe@simpson.com",
      password: "secret"
    }
  },
   venue_type: {
     _model: "Venue",
     indoor: {
       name:"indoor",
     },
     outdoor: {
      name:"outdoor",
    },
    hybrid: {
      name:"hubrid",
    },
  },
  venues: {
    _model: "Venue",
    smyths: {
      name: "Smyths",
      location: {
        lat: 27873872,
        lng: 27873872,
      },
      category: "->venues.indoor",
      description:"This trendy hotspot showcases only the very best in live Irish bands, drawing the crowds in their droves to rock through the night and sing and dance along to all the favourites of rock and pop.",
    },

    murphs: {
      name: "Smyths",
      location: {
        lat: 27873872,
        lng: 27873872,
      },
      category: "->venues.indoor",
      description:"This trendy hotspot showcases only the very best in live Irish bands, drawing the crowds in their droves to rock through the night and sing and dance along to all the favourites of rock and pop.",
    },
  },
};
