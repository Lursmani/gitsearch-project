import React  from 'react'

import {Redirect} from "react-router-dom"

export default function RedirectTo() {
    return (
        <div>
            <Redirect to="/users" />
        </div>
    )
}


