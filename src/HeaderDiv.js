import { useState, useEffect } from "react"

export function HeaderDiv() {
    const [api, setApi] = useState([]);
    const [stat, setStat] = useState({});
    var data = {};
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticcount?fromdate=2022-07-01&todate=2022-07-14")
            .then(function (response) {
                return response.json()
            })
            .then(function (product) {
                setApi(product.data)
                console.log(product.data)
                data = product.data;
                setDataLoaded(true)
            })
    }
    return (
        dataLoaded ?
            <div className="container-fluid">

                <table className="table table-hover">
                    <thead>
                        <tr >
                            <th>totalInstall</th>
                            <th>totaluninstall</th>
                            <th>activeinstall</th>
                            <th>aliveappusers</th>
                            <th>churn</th>
                            <th>alivechurn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            <tr>
                                <td>{api.totalInstall}</td>
                                <td>{api.totaluninstall}</td>
                                <td>{api.activeinstall}</td>
                                <td>{api.aliveappusers}</td>
                                <td>{api.churn}</td>
                                <td>{api.alivechurn}</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div> : <div> </div>
    )
}