import Vision from "@hapi/vision";
import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import Joi from "joi";
import HapiSwagger from "hapi-swagger";
import path from "path";
import {fileURLToPath} from "url";
import Handlebars from "handlebars";
import Inert from "@hapi/inert";
import dotenv from "dotenv";
import jwt from "hapi-auth-jwt2";
import {apiRoutes} from "./api-routes.js";
import {webRoutes} from "./web-routes.js";
import {db} from "./models/db.js";
import {accountsController} from "./controllers/accounts-controller.js";
import {validate} from "./api/jwt-utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const swaggerOptions = {
    info: {
        title: "Playtime API",
        version: "0.1"
    },
    securityDefinitions: { // allow authorization using api key
        jwt: {
            type: "apiKey",
            name: "Authorization",
            in: "header"
        }
    },
    security: [{jwt: []}]
};

const result = dotenv.config();
if (result.error) {
    console.log(result.error.message);
    process.exit(1);
}

async function init() {
    const server = Hapi.server({
        port: 3000,
        host: "localhost",
    });

    await server.register(Vision);
    await server.register(Cookie);
    await server.register(Inert);
    await server.register(jwt);
    server.validator(Joi);

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions,
        },
    ]);

    server.views({
        engines: {
            hbs: Handlebars,
        },
        relativeTo: __dirname,
        path: "./views",
        layoutPath: "./views/layouts",
        partialsPath: "./views/partials",
        layout: true,
        isCached: false,
    });

    server.auth.strategy("session", "cookie", {
        cookie: {
            name: process.env.cookie_name,
            password: process.env.cookie_password,
            isSecure: false,
        },
        redirectTo: "/", // back to login
        validateFunc: accountsController.validate,
    });
    server.auth.default("session");

    server.auth.strategy("jwt", "jwt", {
        key: process.env.cookie_password,
        validate: validate,
        verifyOptions: {algorithms: ["HS256"]}
    });

    db.init("mongo");
    server.route(webRoutes);
    server.route(apiRoutes);
    await server.start();
    console.log("Server running on %s", server.info.uri);
}


process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
});

init();
