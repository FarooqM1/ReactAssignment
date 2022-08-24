import { useState, useEffect } from "react"

export function Assignment() {
    const [api, setApi] = useState([]);
    const [stat, setStat] = useState({});
    var data = {};

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        fetch("https://admindevapi.wowtalent.live/api/admin/dashboard/installstatasticlist?fromdate=2022-06-01&todate=2022-07-01")
            .then(function (response) {
                return response.json()
            })
            .then(function (product) {
                setApi(product.data)
                console.log(product.data)
                data = product.data;
                console.log("sadsa::" + data[0].android_uninstall)
            })
    }


    return (
        <div className="container-fluid">

            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Day Install</th>
                        <th>platform</th>
                        <th>Day Uninstall</th>
                        <th>Plateform</th>
                        <th>Churn Rate</th>
                        <th>Churn Plateform</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        api.map(item =>
                            <tr>
                                <td>{item.created_At}</td>
                                <td>{item.totalinstall}</td>
                                <td>
                                    <div>{item.ios_install}</div>
                                    <div>{item.android_install}</div>
                                </td>
                                <td>{item.totaluninstall}</td>
                                <td>
                                    <div><span className="bi bi-person-fill"></span>{item.ios_uninstall}</div>
                                    <div><span className="bi bi-cart">{item.android_uninstall}</span></div>
                                </td>
                                <td>{item.totalchurn}</td>
                                <td>
                                    <div>{item.ios_churn}</div>
                                    <div>{item.android_churn}</div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}