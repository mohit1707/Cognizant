import React, { useState, useEffect } from "react";

const Compare = () => {
  const [compnee, setCompnee] = useState([]);
  const [compareCompany, setCompareCompany] = useState([]);
  const getCompnies = async () => {
    const res = await fetch("http://localhost:52682/api/Companies");
    const data = await res.json();
    setCompnee(data);
  };
  useEffect(() => {
    getCompnies();
  }, []);
  const [formData, setFormData] = useState({
    firstCompany: "1",
    secondCompany: "1",
    startDate: "",
    toDate: "",
  });
  let { firstCompany, secondCompany, startDate, toDate } = formData;
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getCompareCompany();
    console.log(formData);
  };

  const getCompareCompany = async(e)=>{
    try {
      const response = await fetch(`http://localhost:52682/api/Stocks?companyCode1=${parseInt(firstCompany)}&companyCode2=${parseInt(secondCompany)}&fromDate=${startDate}&toDate=${toDate}`);
      const data = await response.json();
      setCompareCompany(data);
      console.log(data);
     
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-3">
      <h2 className="text-center mb-3">
        Compare Companies & Make a Smart Decision
      </h2>
      <div className="row">
        <div className="offset-md-2 col-md-8">
          <form onSubmit={onSubmit}>
            <div className="card shadow p-3 mb-5 bg-body rounded">
              <div className="row">
                <div className="col-md-5">
                  <div className="form-group">
                    <label for="exampleSelect1" className="form-label mt-4">
                      First Company
                    </label>
                    <select onChange={onChange} value={firstCompany} className="form-select" id="firstCompany">
                      {compnee.map((company) => {
                        return (
                          <option
                            
                            value={company.CompanyCode}
                          >
                            {company.CompanyName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div class="form-group">
                    <label for="exampleSelect1" class="form-label mt-4">
                      Second Company
                    </label>
                    <select onChange={onChange}  value={secondCompany} class="form-select" id="secondCompany">
                      {compnee.map((company) => {
                        return (
                          <option
                            
                            value={company.CompanyCode}
                          >
                            {company.CompanyName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <label for="startDate">Start Date</label>
                  <input
                    id="startDate"
                    class="form-control"
                    type="date"
                    value={startDate}
                    onChange={onChange}
                  />
                </div>

                <div className="col-md-5">
                  <label for="toDate">To Date</label>
                  <input
                    id="toDate"
                    class="form-control"
                    type="date"
                    value={toDate}
                    onChange={onChange}
                  />
                </div>
              </div>
              <button className="btn btn-success mt-2">Fetch Details</button>
            </div>
          </form>
        </div>
      </div>

      <div className="tb">
      <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Company Name</th>
      <th scope="col">Stock Price</th>
      
    </tr>
  </thead>
  <tbody>
    
      {compareCompany.map((company) => {
        return compareCompany.length===0 ? <h3>No Data Found</h3> : (
          <tr>
          <td>{(company.Date)}</td>
      <td>{company.CompanyName}</td>
      <td>{company.StockPrice}</td>
      </tr>
        );
        })}
      
   
    </tbody>                  
  </table>
      </div>
    </div>
  );
};

export default Compare;
