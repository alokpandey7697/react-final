
import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
function Welcome(props) {
    return (
        <div class="p-2 ms-5 me-5 bg-light border rounded border-success text-center">
            <h1>Welcome to CLAIM MANAGEMENT SYSTEM</h1>
            <h5 class="text-primary">{props.Username}</h5>

        </div>
    );
}

export default Welcome;