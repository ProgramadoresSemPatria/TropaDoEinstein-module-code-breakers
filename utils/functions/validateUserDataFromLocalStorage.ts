import { UserDataFromDBType } from "../Types/types";

export const validateUserDataFromDBType = (data: unknown): data is UserDataFromDBType[] => {
    return Array.isArray(data) && data.every(item =>
        typeof item.id === 'number' &&
        typeof item.isStarChecked === 'boolean' &&
        typeof item.isStatusChecked === 'boolean'
    );
};