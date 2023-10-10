import { UserWithoutPassword } from '~/types/IUser';
import { defineAuthenticatedEventHandler } from '../utils/defineAuthenticatedEventHandler';

export default defineAuthenticatedEventHandler((_, user) => {
    return {_id: user._id, email: user.email} as UserWithoutPassword;
});
