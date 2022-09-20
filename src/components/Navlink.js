import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Search from './Search';
import {  NavLink, Link, useLocation } from 'react-router-dom';

const Navlink = () => {
 

    const [filterData, setFilterData] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [textInput, setTextInput] = useState('');


    const getSearchNews = (inputVal) => {
        const searchApi = `https://newsapi.org/v2/everything?q=${inputVal}&apiKey=0d8ba95d3a974991876e0b2ff70b164c&language=en`;
        axios.get(searchApi)
            .then((res) => setFilterData(res.data.articles));

        localStorage.setItem('searchedPostData', JSON.stringify(filterData));
    }


    useEffect(() => {
        let inVal = (inputValue) ? inputValue : 'in';
        getSearchNews(inVal);
    }, []);

    const onChangeInput = e => {
        setInputValue(e.target.value);
    };

    const handleTextInputChange = (e) => {
        // e.preventDefault();
        let inputVal = document.querySelector('#search').value;        
        setTextInput(inputVal);
        
        getSearchNews(inputVal);
        
    }

    return (
        <>            
            <div className='container '>
                <div className='col-12 d-flex justify-content-between mt-4'>
                <div>
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/category'}>Category</Link>
                        </li>                    
                        <li className="nav-item">
                            <Link className="nav-link" to={'/bookmark'}>Bookmark</Link>
                        </li>
                    </ul>

                </div>
                <div >
                    <input type="text" value={inputValue} onChange={onChangeInput} placeholder="Search" id="search"/>
                    <NavLink to={'/search'} className="btn sr-btn" type="button" onClick={() => handleTextInputChange()}><i className="fa fa-search"></i></NavLink>
                </div>
                </div>

            </div>
        </>
    )
}

export default Navlink