import { afterAll, beforeAll, describe, expect, test } from "vitest";
import mongoose from "mongoose";
import type { ObjectId } from "mongoose";

import { connectDatabase } from "../../../../server/db/index";
import { createUser } from "../../../../server/db/user/create";
import { deleteUserByMail, deleteUserById } from "../../../../server/db/user/delete";
import { changePassword } from "../../../../server/db/user/update";
import { getUserByMail, getUserById } from "../../../../server/db/user/read";
import { validatePassword } from "../../../../server/db/user/utils";
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
        expect(newUser, "User already exists").toBe(null);

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
        userCreated = await createUser(userTest.email, userTest.password);
        expect(userCreated, "User not created").not.toBe(null);
        expect(userCreated!._id).not.toBe(null);
        userTest._id = userCreated!._id;
    });

    test("get user by id", async () => {
        const userFound = await getUserById(userTest._id);
        expect(userFound, "User not found").not.toBe(null);
        expect(userFound!._id).toEqual(userTest._id);
        expect(userFound!.email).toEqual(userTest.email);
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

describe("Change the password of a user", () => {
    const newPassword = userTest.password + "new";
    let database: typeof mongoose | null = null;
    let userCreated: IUserCompleteSave | null = null;

    beforeAll(async () => {
        database = await connectDatabase();
        userCreated = await createUser(userTest.email, userTest.password);
        userTest._id = userCreated!._id;
    });
    afterAll(async () => {
        if (userCreated) await deleteUserById(userCreated!._id);
    });

    test("change the password", async () => {
        const changed = await changePassword({ email: userTest.email, password: userTest.password }, newPassword);
        expect(changed, "Password not changed").toBe(true);

        const validationOldPassword = await validatePassword(userCreated!, userTest.password);
        const validationNewPassword = await validatePassword(userCreated!, newPassword);

        expect(validationOldPassword, "Old password still valid").toBe(false);
        expect(validationNewPassword, "New password not valid").toBe(true);
    });
});

describe("Wrong getter and setter for user", () => {
    const newPassword = userTest.password + "new";
    let database: typeof mongoose | null = null;
    let userCreated: IUserCompleteSave | null = null;

    beforeAll(async () => {
        database = await connectDatabase();
        userCreated = await createUser(userTest.email, userTest.password);
        userTest._id = userCreated!._id;
    });
    afterAll(async () => {
        if (userCreated) await deleteUserById(userCreated!._id);
    });

    test("get user by wrong id", async () => {
        const userFound = await getUserById("wrong_id" as unknown as ObjectId);
        expect(userFound, "User found").toBe(null);
    });

    test("get user by wrong mail", async () => {
        const userFound = await getUserByMail("wrong_mail");
        expect(userFound, "User found").toBe(null);
    });

    test("change the password with wrong user", async () => {
        const changed = await changePassword({ email: userTest.email, password: newPassword }, newPassword);
        expect(changed, "Password changed").toBe(false);
    });

    test("validate password with wrong user", async () => {
        const validation = await validatePassword(
            {
                _id: new mongoose.Types.ObjectId() as unknown as ObjectId,
                email: userCreated!.email + "wrong_mail",
                games: userCreated!.games,
            },
            newPassword
        );
        expect(validation, "Password validated").toBe(false);
    });

    test("delete user by wrong id", async () => {
        const deleted = await deleteUserById("wrong_id" as unknown as ObjectId);
        expect(deleted, "User deleted").toBe(false);
    });

    test("delete user by wrong mail", async () => {
        const deleted = await deleteUserByMail(userCreated!.email + "wrong_mail");
        expect(deleted, "User deleted").toBe(false);
    });

    test("update the password of a wrong user", async () => {
        const updated = await changePassword(
            { email: userCreated!.email + "wrong_mail", password: userTest.password },
            newPassword
        );
        expect(updated, "Password updated").toBe(false);
    });
});
