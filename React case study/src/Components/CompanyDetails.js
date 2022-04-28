import react from 'react';

function CompanyDetails(props) {

    async function onClick() {
        if (props.type == "companies") {
            let body = { "CompanyCode": props.company.CompanyCode, "UserId": props.user.UserId }
            try {
                console.log("Body=>", body)
                let res = await fetch("http://localhost:52682/api/WatchList",
                    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
                )
                if (res.status!=409)
                {
                alert("Succesfully added to the watch list")
                }console.log(res)
                if (res.status == 400) alert("Invalid company or user");
                else if (res.status == 409) alert("Already present in watch list");
                let response = res.json();
            } catch (error) {
                console.log('Error', error)
                alert("Unable to add to list");
            }
        } else {
            try {
                let res = await fetch(`http://localhost:52682/api/WatchList?userId=${props.user.UserId}&companyCode=${props.company.CompanyCode}`,
                    { method: "DELETE", headers: { "Content-Type": "application/json" } }
                )
                alert("Removed Succesfully added to the watch list")
                props.fetchData();
            } catch (error) {
                console.log('Error', error)
                alert("Unable to remove from list");
            }
        }
    }

    let button = props.loggedIn ? <button style={{ backgroundColor: props.type == "companies" ? "green" : "red" }} onClick={onClick}>{props.type == "companies" ? "watch" : "remove"}</button> : "";
    return <div className="card " style={{ width: "18rem", margin: "10px" }}>
        <div className="card-body">
            <h5 className="card-title text-center">{props.company.CompanyName}</h5>
            <h6 className="card-subtitle mb-2 text-muted"> {props.company.BriefDesc}</h6>
            <h6 className="card-subtitle mb-2 text-bold card-footer text-center">${props.company.CurrentStockPrice}</h6>
            {button}
        </div>
    </div>
}

export default CompanyDetails;