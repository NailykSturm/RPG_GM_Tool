import { beforeAll, describe, expect, test } from "vitest";
import type mongoose from "mongoose";

import { connectDatabase } from "../../../../server/db/index";
import { createUser } from "../../../../server/db/user/create";
import { deleteUserByMail, deleteUserById } from "../../../../server/db/user/delete";
import { getUserByMail, getUserById } from "../../../../server/db/user/read";
import type { IUserCompleteSave } from "../../../../types/User/IUser";
import { userTest } from "../test_utils";

describe("databases user tests with mail", () => {
    let database: typeof mongoose | null = null;
    let userCreated: IUserCompleteSave | null = null;

    beforeAll(async () => {
        database = await connectDatabase();
    });

    test("crate a new user", async () => {
        let newUser = await getUserByMail(userTest.email);
        expect.soft(newUser, "User already exists").toBe(null);

        userCreated = await createUser(userTest.email, userTest.password);
        expect(userCreated, "User not created").not.toBe(null);
        expect(userCreated!._id).not.toBe(null);
        userTest._id = userCreated!._id;

        newUser = await getUserByMail(userTest.email);
        expect(newUser, "User not found").not.toBe(null);
        expect(newUser!._id, "Wrong user retreive (Maye be, multiple user with the same mail is allowd ?)").toEqual(
            userCreated!._id
        );
    });

    test("get user by mail", async () => {
        const userFound = await getUserByMail(userTest.email);
        expect(userFound, "User not found").not.toBe(null);
        expect(userFound!._id).toEqual(userTest._id);
        expect(userFound!.email).toEqual(userTest.email);
    });

    test("create a user with the same mail", async () => {
        const newUser = await createUser(userTest.email, userTest.password);
        expect(newUser, "User not exists").toBe(null);
    });

    test("delete user by mail", async () => {
        const userFoundBeforeDeletion = await getUserByMail(userTest.email);
        expect(userFoundBeforeDeletion, "User not found").not.toBe(null);

        const deleted = await deleteUserByMail(userTest.email);
        expect(deleted, "User not deleted").toBe(true);

        const userFoundAfterDeletion = await getUserByMail(userTest.email);
        expect(userFoundAfterDeletion, "User found after deletion").toBe(null);
    });
});

describe("databases user tests with id", () => {
    let database: typeof mongoose | null = null;
    let userCreated: IUserCompleteSave | null = null;

    beforeAll(async () => {
        database = await connectDatabase();
    });

    test("crate a new user", async () => {
        let newUser = await getUserByMail(userTest.email);
        expect.soft(newUser, "User already exists").toBe(null);

        userCreated = await createUser(userTest.email, userTest.password);
        expect(userCreated, "User not created").not.toBe(null);
        expect(userCreated!._id).not.toBe(null);
        userTest._id = userCreated!._id;

        newUser = await getUserById(userTest._id);
        expect(newUser, "User not found").not.toBe(null);
        expect(newUser!._id, "Wrong user retreive (Maye be, multiple user with the same mail is allowd ?)").toEqual(
            userCreated!._id
        );
    });

    test("get user by id", async () => {
        const userFound = await getUserById(userTest._id);
        expect(userFound, "User not found").not.toBe(null);
        expect(userFound!._id).toEqual(userTest._id);
        expect(userFound!.email).toEqual(userTest.email);
    });

    test("create a user with the same mail", async () => {
        const newUser = await createUser(userTest.email, userTest.password);
        expect(newUser, "User not exists").toBe(null);
    });

    test("delete user by id", async () => {
        const userFoundBeforeDeletion = await getUserById(userTest._id);
        expect(userFoundBeforeDeletion, "User not found").not.toBe(null);

        const deleted = await deleteUserById(userTest._id);
        expect(deleted, "User not deleted").toBe(true);

        const userFoundAfterDeletion = await getUserById(userTest._id);
        expect(userFoundAfterDeletion, "User found after deletion").toBe(null);
    });
});
