import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Search from './Search';
import {  NavLink, Link } from 'react-router-dom';

const Navlink = () => {
 

    const [serachNews, setSearchNews] = useState([]);
    const [search, setSearch] = useState('');
    const [filterData, setFilterData] = useState([]);

    useEffect(() => {
        getSearchNews();
    }, [])
    
    //To search News
    const getSearchNews = () => {
        axios.get(`https://newsapi.org/v2/everything?q=in&apikey=9aec0480ed104314b4ae313eaf02cce0`)
            .then((response) => {
                console.log(response.data.articles);
                setSearchNews(response.data.articles);
            })
            .catch((error) => console.log(error));
    }
    const handleSearch = () => {
        const newSearchPost = serachNews.filter((post) => (post.title).toUpperCase().includes(search.toUpperCase()));
        setFilterData(newSearchPost);
    }
    // sessionStorage.setItem('searchedPostData', JSON.stringify(filterData));


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
                    <input type="text"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"/>
                    <NavLink to={'/search'} className="btn sr-btn" type="button" onClick={() => handleSearch()}><i className="fa fa-search"></i></NavLink>
                </div>
                </div>

            </div>
        <Search data={filterData} />
        </>
    )
}

export default Navlink