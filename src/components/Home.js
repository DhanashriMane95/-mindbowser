import React, { useEffect, useState } from 'react'
import axios from 'axios';
import _ from 'lodash';
import Bookmark from './Bookmark';

const pageSize = 6;
const Home = () => {

    const [newsData, setNewsData] = useState([]);
    const [paginated, setPaginated] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookmarkData, setBookmarkData] = useState([]);

    useEffect(() => {
        getTreadingNews();
    }, [])
  
    //get trending news Api
    const getTreadingNews = async() => {
        await axios.get(`https://newsapi.org/v2/top-headlines?country=in&apikey=9aec0480ed104314b4ae313eaf02cce0`)
            .then((response) => {
                // console.log(response.data.articles)
                setNewsData(response.data.articles)
                setPaginated(_(response.data.articles).slice(0).take(pageSize).value())
            })
            .catch((error) => console.log(error));
    }


    const pageCount = newsData ? Math.ceil(newsData.length / pageSize) : 0;
    if (pageCount === 1) return null;
    const pages = _.range(1, pageCount + 1);

    const pagination = (pageNo) => {
        setCurrentPage(pageNo);
        const startIndex = (pageNo - 1) * pageSize;
        const paginated = _(newsData).slice(startIndex).take(pageSize).value();
        setPaginated(paginated);
    }

    const BookmarkStore = (data) => {
        setBookmarkData(data);
        let newState = [...bookmarkData];
        newState.push(data);
        setBookmarkData(newState);
    }
    sessionStorage.setItem('dhanu', JSON.stringify(bookmarkData));

    return (
        <>
            <div className='d-none'>
                <Bookmark data={bookmarkData} />
            </div>

            <div className='container mt-4'>
                <div className='row justify-content-between'>
                    {
                        paginated?.length ? paginated.map((items, index) => {
                            return (
                                <>

                                    <div className="col-4 d-flex justify-content-around" type="button" style={{ width: "26rem" }}>
                                        <div className='card border-0 py-2 my-3 shadow'>
                                            <div className='d-flex justify-content-between mb-3 my-4'>
                                                <div key={items.id}>{items.urlToImage ? <img className='mx-2' src={items.urlToImage} alt='...' style={{ width: "1.5rem", borderRadius: "50%", height: "1.5rem" }} /> : ''}
                                                    <small>{items.author} </small>
                                                </div>
                                                <div>
                                                    <button className='rounded-pill me-2' style={{ fontSize: "0.8rem", width: "4rem" }}>share</button>
                                                    <button className='rounded-pill btn-dark' style={{ fontSize: "0.8rem", width: "4rem" }}>collect</button>
                                                    <span><i className="fa-regular fa-heart mx-2 fs-5 text-danger"></i></span>
                                                </div>
                                            </div>

                                            {items.urlToImage ? <img src={items.urlToImage} className="card-img-top" alt="..." /> : ''}

                                            <div className="card-body">
                                                <h4 className='card-title'>{items.title}</h4>
                                                <p className="card-text">{items.description}</p>
                                                {
                                                    items.content ? <div>
                                                        <a className="" data-bs-toggle="collapse" href={`#id_${index}`}
                                                            role="button" aria-expanded="false" aria-controls="collapseExample">
                                                            Read More
                                                        </a>
                                                        <div className="collapse" id={`id_${index}`}>
                                                            <div className="mt-2">
                                                                {items.content}
                                                            </div>
                                                        </div>
                                                    </div> : <div>deatails not available</div>
                                                }
                                            </div>
                                            <div className='d-flex justify-content-between mx-2'>
                                                <span><i className="fa-solid fa-clock"></i>{items.publishedAt}</span>
                                                <button onClick={() => BookmarkStore(items)} className='border-0'><i className="fa-regular fa-bookmark"></i></button>
                                            </div>
                                        </div>

                                    </div>



                                </>
                            )
                        }) : "data not found"
                    }

                </div>
                <nav className='d-flex justify-content-center'>
                    <ul className='pagination px-4'>
                        {
                            pages.map((page) => {
                                return (
                                    <li className={
                                        page === currentPage ? "page-item active" : "page-item"
                                    }>
                                        <p className="page-link" onClick={() => pagination(page)}>{page}
                                        </p>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </nav>
            </div>


        </>
    )
}

export default Home