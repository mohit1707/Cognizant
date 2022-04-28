import React, { useEffect, useState } from 'react';
import CompaniesDetails from './CompanyDetails'

function WatchList(props) {
    const [watchList, setWatchList] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        try {
            let res = await fetch(`http://localhost:52682/api/watchlist/${props.user.UserId}`,
                { method: "GET", headers: { "Content-Type": "application/json" } }
            )
            let response = await res.json();
            setWatchList(response);
            console.log('body :>> ', response);
        } catch (e) {
            console.log(e);
        }
    }
    
    let companyList = watchList.map(obj => <CompaniesDetails fetchData={fetchData} type={"watchList"} user={props.user} loggedIn={props.loggedIn} key={obj.id} company={obj} />)

    return <div className="container">
        <h1>Companies List</h1>
        <div style={{ "flexWrap": "wrap", "margin": "10px" }} className="d-flex">
            {companyList}
        </div>
    </div>
}

export default WatchList