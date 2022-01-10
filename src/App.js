import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tourData, setTourData] = useState([]);
  const [btnTog, setBtnTog] = useState(false);

  const getTourData = async () => {
    const fetchData = await fetch(url);
    if (fetchData.status >= 200 && fetchData.status <= 299) {
      const data = await fetchData.json();
      setIsLoading(false);
      setTourData(data);
    } else {
      setIsLoading(false);
      console.log("Error");
    }
  };

  useEffect(() => {
    getTourData();
  }, []);
  console.log(tourData);
  if (isLoading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tourData.length === 0) {
    return (
      <main className="title">
        <h2>No more Tours left</h2>
        <button className="btn delete-btn" onClick={() => getTourData()}>
          Refresh
        </button>
      </main>
    );
  }

  const removeId = (id) => {
    setTourData(tourData.filter((Datas) => Datas.id !== id));
  };

  return (
    <main>
      <div>
        <div className="title">
          <h2>Our Tour</h2>
          <div className="underline"></div>
        </div>

        {tourData.map(({ id, image, price, name, info }) => {
          return (
            <div key={id} className="single-tour">
              <img src={image} alt={name} />
              <footer>
                <div className="tour-info">
                  <h4>{name}</h4>
                  <h4 className="tour-price">${price}</h4>
                </div>
                <p>
                  {btnTog ? info : `${info.substring(0, 200)}...`}
                  <button onClick={() => setBtnTog(!btnTog)}>
                    {btnTog ? "Collapse" : "Read More"}
                  </button>
                </p>
                <button className="btn delete-btn" onClick={() => removeId(id)}>
                  Not Interested
                </button>
              </footer>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default App;
