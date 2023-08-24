import { useState, useEffect } from 'react';

export const useFetch = (url, setIsLoading) => {

    const [data, setData] = useState([]);

    async function fetchUrl() {
        if (!!setIsLoading) {
            setIsLoading(true);
        }
        
        const response = await fetch(url);
        const json = await response.json();

        setData(json);

        if (!!setIsLoading) {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchUrl();
    }, []);

    return data;
}