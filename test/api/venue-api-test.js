import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { liveService } from "./live-service.js";
import {maggie, club, testVenues, maggieCredentials,} from "../fixtures.js";

suite("Venue API tests", () => {
    let user = null;

    setup(async () => {
        liveService.clearAuth();
        user = await liveService.createUser(maggie);
        await liveService.authenticate(maggieCredentials);
        await liveService.deleteAllVenues();
        await liveService.deleteAllUsers();
        user = await liveService.createUser(maggie);
        await liveService.authenticate(maggieCredentials);
        club.userid = user._id;
    });
    teardown(async () => {});

     test("create venue", async () => {
        const returnedVenue = await liveService.createVenue();
        assert.isNotNull(returnedVenue);
        assertSubset(club, returnedVenue);
    });



  /*  test("delete a venue", async () => {
        const venue = await liveService.createVenue(club);
        const response = await liveService.deleteVenue(venue._id);
        assert.equal(response.status, 204);
        try {
            const returnedVenue = await liveService.getVenue(venue.id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Venue with this id", "Incorrect Response Message");
        }
    });

   */

   /* test("create multiple venues", async () => {
        for (let i = 0; i < testVenues.length; i += 1) {
            testVenues[i].userid = user._id;
            // eslint-disable-next-line no-await-in-loop
            await liveService.createVenue(testVenues[i]);
        }
        let returnedLists = await liveService.getAllVenues();
        assert.equal(returnedLists.length, testVenues.length);
        await liveService.deleteAllVenues();
        returnedLists = await liveService.getAllVenues();
        assert.equal(returnedLists.length, 0);
    });

    */

    test("remove non-existent venue", async () => {
        try {
            const response = await liveService.deleteVenue("not an id");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Venue with this id", "Incorrect Response Message");
        }
    });
    });



