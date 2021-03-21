import React from "react";
import {Helmet} from "react-helmet";


export default function HelmetComponent(props) {
    const {title, description = "the most cheapest products in the world",
        keywords = "cheap,efficient,product,online,electronics"} = props;
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keywords}/>
        </Helmet>

    )
}



