export const useLocalStorage = () => {
    const appName: string = "event-calendar";

    const getData = (key: string) => {
        return localStorage.getItem(`${appName}/${key}`);
    };
    const setData = (key: string, data: string) => {
        localStorage.setItem(`${appName}/${key}`, data);
    };
    return { getData, setData };
};
