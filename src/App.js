import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const [pageCount, setpageCount] = useState(0);

  let limit = 10;

  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=${limit}`
      );
      const data = await res.json();
      const total = 500;
      setpageCount(Math.ceil(total / limit));
      setItems(data);
    };

    getComments();
  }, [limit]);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    const commentsFormServer = await fetchComments(currentPage);

    setItems(commentsFormServer);
  
    window.scrollTo(0, 0)
  };
  return (
    <div className="container">
      <div className="row m-4">
        {items.map((item) => {
          return (
            <div key={item.id} className=" col-4">
              <div className="card w-100 m-2" style={{ minHeight: 225 }}>
                <div className="card-body">
                  <h4 className="card-title text-start">Id :{item.id} </h4>
                  <h5 className="card-subtitle mb-2 text-muted text-center">
                    {item.email}
                  </h5>
                  <h5 className="card-subtitle mb-2 text-muted text-center">
                    {item.name}
                  </h5>
                  <p className="card-text">{item.body}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ReactPaginate
        previousLabel={"previous"}
        nextLabel={"next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
