import {assert} from "chai";
import {liveService} from "./live-service.js";
import {assertSubset} from "../test-utils.js";
import {maggie,  maggieCredentials, testUsers} from "../fixtures.js";
import {db} from "../../src/models/db.js";


const users = new Array(testUsers.length);

suite("User API tests", () => {
    setup(async () => {
        liveService.clearAuth();

        await liveService.createUser(maggie);
        await liveService.authenticate(maggieCredentials);
        await liveService.deleteAllUsers();
        for (let i = 0; i < testUsers.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            users[0] = await liveService.createUser(testUsers[i]);
        }
        await liveService.createUser(maggie);
        await liveService.authenticate(maggieCredentials);
    });
    teardown(async () => {
    });


    test("create a user", async () => {
        const newUser = await liveService.createUser(maggie);
        assertSubset(maggie, newUser);
        assert.isDefined(newUser._id);
    });

    test("delete all user", async () => {
        let returnedUsers = await liveService.getAllUsers();
        assert.equal(returnedUsers.length, 4);
        await liveService.deleteAllUsers();
        await liveService.createUser(maggie);
        await liveService.authenticate(maggieCredentials);
        returnedUsers = await liveService.getAllUsers();
        assert.equal(returnedUsers.length, 1);
    });


    test("get a user", async () => {
        const returnedUser = await liveService.getUser(users[0]._id);
        assert.deepEqual(users[0], returnedUser);
    });

    test("get a user - bad id", async () => {
        try {
            const returnedUser = await liveService.getUser("1234");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            assert.equal(error.response.data.statusCode, 503);
        }
    });


    test("get a user - deleted user", async () => {
        await liveService.deleteAllUsers();
        await liveService.createUser(maggie);
        await liveService.authenticate(maggieCredentials);
        try {
            const returnedUser = await liveService.getUser(users[0]._id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No User with this id");
            assert.equal(error.response.data.statusCode, 404);
        }
    });
});


