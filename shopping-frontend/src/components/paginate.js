import React from 'react';
import {Pagination} from "react-bootstrap";
import {useHistory} from 'react-router-dom';


export default function Paginate(props) {
    const {totalPage, page, keyword, admin = false} = props;
    const history = useHistory()
    const handleClick = (num) => {
        if (keyword) {
            history.push(`/search/${keyword}/page/${num}`)
        } else {
            if (admin) {
                history.push(`/productlist/page/${num}`)
            } else {
                history.push(`/page/${num}`)
            }
        }
    }
    return (
        totalPage > 1 && <Pagination>
            {
                [...Array(totalPage).keys()].map((number, index) => {
                    return <Pagination.Item key={number + 1} active={number + 1 === page}
                                            onClick={() => handleClick(number + 1)}>
                        {number + 1}
                    </Pagination.Item>
                })
            }
        </Pagination>
    )
}