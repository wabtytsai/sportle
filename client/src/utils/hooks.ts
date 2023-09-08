import { useState, useEffect } from 'react';

export const useFetch = (url: string) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchUrl() {      
            const response = await fetch(url);
            const json = await response.json();
    
            setData(json);
        }
        fetchUrl();
    }, [url]);

    return data;
}