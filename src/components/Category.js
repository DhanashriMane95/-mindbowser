import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Category = () => {
  const [business, setBusinessData] = useState([]);
  const [entertainment, setEntertainment] = useState([]);
  const [general, setGeneral] = useState([]);
  const [health, setHealth] = useState([]);
  const [science, setScience] = useState([]);
  const [sports, setSports] = useState([]);
  const [technology, setTechnology] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [allData, setAllData] = useState([]);
  
  useEffect(() => {
    fetchApi();
  }, []);

  const fetchApi = async () => {

    const request1 = axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=business&apikey=0d8ba95d3a974991876e0b2ff70b164c`);
    const request2 = axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apikey=0d8ba95d3a974991876e0b2ff70b164c`);
    const request3 = axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=general&apikey=0d8ba95d3a974991876e0b2ff70b164c`);
    const request4 = axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=health&apikey=0d8ba95d3a974991876e0b2ff70b164c`);
    const request5 = axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=science&apikey=0d8ba95d3a974991876e0b2ff70b164c`);
    const request6 = axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=sports&apikey=0d8ba95d3a974991876e0b2ff70b164c`);
    const request7 = axios.get(`https://newsapi.org/v2/top-headlines?country=in&category=technology&apikey=0d8ba95d3a974991876e0b2ff70b164c`);

    await axios.all([request1, request2,request3,request4,request5,request6,request7 ]).then(axios.spread((...responses) => {
      setBusinessData(responses[0].data.articles);
      setEntertainment(responses[1].data.articles);
      setGeneral(responses[2].data.articles);
      setHealth(responses[3].data.articles);
      setScience(responses[4].data.articles);
      setSports(responses[5].data.articles)
      setTechnology(responses[6].data.articles);

      let allContent = [...business, ...entertainment, ...general, ...health, ...science, ...sports, ...technology, ...categoryData];
      setCategoryData(allContent);
    }))
    .catch(errors => {
      // react on errors.
      console.log("Data not found");
    })
   
  }
  const handleClick = (categoryName) => {
    setCategoryData(categoryName);
  }


  return (
    <div className='container mt-4'>
      <div className=''>
        <button className='btn border-none btn_cust' onClick={() => handleClick(general)}>general</button>
        <button className='btn border-none btn_cust' onClick={() => handleClick(business)}>business</button>
        <button className='btn border-none btn_cust' onClick={() => handleClick(entertainment)}>entertainment</button>
        <button className='btn border-none btn_cust' onClick={() => handleClick(health)}>health</button>
        <button className='btn border-none btn_cust' onClick={() => handleClick(science)}>science</button>
        <button className='btn border-none btn_cust' onClick={() => handleClick(sports)}>sports</button>
        <button className='btn border-none btn_cust' onClick={() => handleClick(technology)}>technology</button>
      </div>
      <div className='mt-4'>
        <div className='row '>
          {
            categoryData?.length ? categoryData.map((items, index) => {
              return (
                <>

                  <div className="col-md-4 col-12 d-flex justify-content-around" type="button" style={{ width: "26rem" }} key={index}>
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
                      </div>
                    </div>

                  </div>
                </>
              )
            }) : "data not found"
          }

        </div>

      </div>
    </div>

  )
}

export default Category