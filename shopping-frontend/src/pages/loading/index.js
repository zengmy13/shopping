import React from 'react';
import {Spinner} from "react-bootstrap";

export default function LoadingPage() {
    return (
        <>
            <Spinner animation='border' style={{
                width: "100px", height: "100px", margin: "100px auto", display: "block"
            }}>
                <span className="sr-only">Loading....</span>
            </Spinner>
        </>
    )

}