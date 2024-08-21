import React, { useState } from 'react'

const Homepage = ({info, setInfo, returned_info}) => {
    return (
        <div>
            <h1>Welcome {returned_info.first_name} {returned_info.last_name}</h1>
        </div>
    )
}

export default Homepage