
import React from 'react';
import { useFetch } from '../utils/hooks';

function List() {

    const data = useFetch(
        'http://localhost:8000/api/getList'
    );

    return (
        <div>
            <h1>List from server{"\n"}</h1>
            {data.map((item) => {
                return (
                    <div>
                        {item}
                    </div>
                )
            })}
        </div>
    );
}

export default List;