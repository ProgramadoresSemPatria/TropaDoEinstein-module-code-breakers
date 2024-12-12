import { UserDataFromDBType, UserDataFromStorageType } from "../Types/types";

export const validateUserDataFromDBType = (data: unknown): data is UserDataFromDBType[] => {
    return Array.isArray(data) && data.every(item =>
        typeof item.problemId === 'number' &&
        typeof item.nodeId === 'number' &&
        typeof item.progressBarValue === 'number' &&
        typeof item.totalStatusChecked === 'number' &&
        typeof item.isStarChecked === 'boolean' &&
        typeof item.isStatusChecked === 'boolean'
    );
};
export const validateUserDataFromStorageType = (data: unknown): data is UserDataFromStorageType => {
    return Array.isArray(data) && data.every(item =>
        typeof item.problemId === 'number' &&
        typeof item.nodeId === 'number' &&
        typeof item.progressBarValue === 'number' &&
        typeof item.totalStatusChecked === 'number' &&
        typeof item.isStarChecked === 'boolean' &&
        typeof item.isStatusChecked === 'boolean'
    );
};