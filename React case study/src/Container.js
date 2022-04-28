import react from 'react';
import Login from './Components/Login';
import CompaniesList from './Components/CompaniesList';
import WatchList from './Components/WatchList';
import ComparePerformance from './Components/ComparePerformance';

function Container(props) {
    let currentPage = props.currentPage;

    let component = null;

    switch (currentPage) {
        case "Login": component = <Login login={props.login} />; break;
        case "Companies": component = <CompaniesList loggedIn={props.loggedIn} user={props.user} />; break;
        case "Watch List": component = <WatchList loggedIn={props.loggedIn} user={props.user} />; break;
        case "Compare Performance": component = <ComparePerformance />; break;
    }

    return <div className="container">
        <div className="row">
            <div className="col-md-12">
                {component}
            </div>
        </div>
    </div>
}

export default Container;