import React , {useState} from 'react'

import {Redirect} from "react-router-dom"

export default function RedirectTo() {
    const [redirect, setRedirect] = useState(true)
    return (
        <div>
            <Redirect to="/users" />
        </div>
    )
}


