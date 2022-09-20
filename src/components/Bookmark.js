import React from 'react'

const Bookmark = () => {
    const bkData = localStorage.getItem("BookmarkData");
    if(bkData) {
        var bookmarkData= JSON.parse(bkData);
    }
    
  return (
   <>
   
   <div className='container mt-4'>
                <div className='row d-flex justify-content-center'>
                    {
                        bookmarkData?.length ? bookmarkData.map((items, index) => {
                            return (
                                <>

                                    <div className="col-md-4 col-12 d-flex " type="button" style={{width:"26rem"}} key={index}>
                                        <div className='card border-0 py-2 my-3 shadow'>
                                            <div className='d-flex justify-content-between mb-3 my-4'>
                                                <div>{items.urlToImage ? <img className='mx-2' src={items.urlToImage} alt='...' style={{ width: "1.5rem", borderRadius: "50%", height: "1.5rem" }} /> : ''}
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
                                                <div>
                                                    <a className="" data-bs-toggle="collapse" href={`#id_${index}`}
                                                        role="button" aria-expanded="false" aria-controls="collapseExample">
                                                        Read More
                                                    </a>
                                                    <div className="collapse" id={`id_${index}`}>
                                                        <div className="mt-2">
                                                            {items.content}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='d-flex justify-content-between mx-2'>
                                                <span><i className="fa-solid fa-clock"></i>{items.publishedAt}</span>
                                                <span><i className="fa-regular fa-bookmark" style={{background:'#ffff007a'}}></i></span>
                                            </div>
                                        </div>

                                    </div>



                                </>
                            )
                        }) : ""
                    }

                </div>
              
            </div>
   </>
  )
}

export default Bookmark