import React from "react"

interface Props {
    source: string
}

export default function TeamLogo({ source }: Props) {
    return (
        <th>
            <img src={source}/>
        </th>
    )
}