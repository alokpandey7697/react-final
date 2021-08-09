
import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
function Welcome(props) {
    return (
        <div class="p-3 mb-2 bg-light border rounded border-success text-center">
            <h1>Welcome to CLAIM MANAGEMENT SYSTEM</h1>
            <h5 class="text-primary">{props.Username}</h5>

        </div>
    );
}

export default Welcome;