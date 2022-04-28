import react, { useEffect, useState } from 'react';
import CompaniesDetails from './CompanyDetails';
function CompaniesList(props) {
  const [companyData, setCompanyData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        let res = await fetch("http://localhost:52682/api/Companies",
          { method: "GET", headers: { "Content-Type": "application/json" } }
        )
        if(res.loggedIn)
        {
          alert("bvbnm")
        }
        let response = await res.json();
        setCompanyData(response);
        console.log('body :>> ', response);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [])
  
  let companyList = companyData.map(obj => <CompaniesDetails type={"companies"} user={props.user} loggedIn={props.loggedIn} key={obj.id} company={obj} />)
 
  return <div className="container">
    <h1>Companies List</h1>
    
    <div style={{ "flexWrap": "wrap", "margin": "10px" }} className="d-flex">
      
      {companyList}
    </div>
  </div>

}

export default CompaniesList;