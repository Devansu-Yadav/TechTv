import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to User account are present here.
 * These are private routes.
 * Client needs to add "authorization" header with JWT token in it to access it.
 * */

/**
 * This handler handles fetching the user's account data.
 * send GET Request at /api/user/account
 * */

export const getUserProfileData = function (schema, request) {
    const user = requiresAuth.call(this, request);
    if (!user) {
        return new Response(
          404,
          {},
          {
            errors: ["The email you entered is not Registered. Not Found error"],
          }
        );
    }
    const userProfileData = user;
    return new Response(200, {}, { userData: userProfileData });
};
