import axios from "apis/axios";
import { useEffect, useState } from "react";

export default function SubdivisionStats() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get("/dashboard/get-subdivision-stats")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="card card-shadow">
      <div className="card-header">
        <h6 className="fw-bold mb-0">Government Subdivisions and Lots</h6>
      </div>
      <div className="card-body">
        {data &&
          data.map((item, index) => (
            <div className="row" key={index}>
              <div className="col fw-semibold">{item.location}</div>
              <div className="col">{item.count}</div>
              <div className="col">
                <div
                  style={{
                    width: `
                      ${
                        (item.count /
                          Math.max(...data.map((item) => item.count))) *
                        100
                      }%`,
                  }}
                  className="progress bg-blue"
                ></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
