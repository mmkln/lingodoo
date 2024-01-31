// Save data to Local Storage
export const setLocalStorageItem = (key: string, value: any): void => {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error saving to Local Storage:', error);
    }
};

// Get data from Local Storage
export const getLocalStorageItem = <T>(key: string): T | null => {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    } catch (error) {
        console.error('Error retrieving from Local Storage:', error);
        return null;
    }
};

// Remove data from Local Storage
export const removeLocalStorageItem = (key: string): void => {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing from Local Storage:', error);
    }
};
