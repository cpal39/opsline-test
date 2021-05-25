import ContentCard from './contentCard';
import Details from './details'
import { useState, useEffect } from 'react';
import localData from '../localData/data.json';
const axios = require("axios");

export default function Main() {
    //data from data.json
    const [data, setData] = useState([]);
    //current order data is displayed in, ascending or descending
    const [curOrder, setOrder] = useState("des");
    //api endpoint to request the data
    const url = "http://localhost:5000/api/data";
    //retrieve the value from sort drop down and sort data accordingly
    const sortBy = (event) => {
        const sortParam = event.target.value;
        const newData = [...data];
        console.log(sortParam);
        newData.sort(function (a, b) {
            if (sortParam === "id" || sortParam === "severity_level") {
                return a[sortParam] - b[sortParam];
            }
            var aVal = a[sortParam].toUpperCase();
            var bVal = b[sortParam].toUpperCase();
            if (aVal < bVal) {
                return -1;
            }
            if (aVal > bVal) {
                return 1;
            }
            return 0;
        });
        if (curOrder === "des") {
            newData.reverse();
        }
        setData(newData);
    }
    //compare selected order with current order and reverse data if necessary
    const orderBy = (event) => {
        const orderParam = event.target.value;
        const newData = [...data];
        if (orderParam !== curOrder) {
            setOrder(orderParam)
            setData(newData.reverse());
        }
    }
    //retrieve the data from the endpoint, if there's an error, use local data.json file instead
    useEffect(() => {
        async function getData(url) {
            try {
                const response = await axios.get(url);
                const remoteData = response.data;
                setData(remoteData);
            }
            catch (e) {
                console.log(`error ${e}. Using local data instead...`);
                setData(localData);
            }
        }
        getData(url);
    }, []);
    return (
        <div>
            <div className="sortRow">
                <div className="container">
                    <div className="row ">
                        <div className="col-md-4"></div>
                        <div className="col-md-4 col-sm-12">
                            <select onChange={sortBy} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" defaultValue="severity_level">
                                <option value="name">Name</option>
                                <option value="id">ID</option>
                                <option value="alert">Alert</option>
                                <option value="severity_level">Severity level</option>
                                <option value="application">Application</option>
                            </select>
                        </div>
                        <div className="col-md-4 col-sm-12">
                            <select onChange={orderBy} className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" defaultValue="des">
                                <option value="asc">Ascending</option>
                                <option value="des">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row contentRow">
                    {/**
                     * for each item, create its content card and modal for description, solution, and evidence
                     */ 
                    }
                    {data.map((item, id) => {
                        return <div key={id} className="col-lg-4 col-md-6 col-sm-12 cardDiv">
                            <ContentCard data={item} />
                            <Details id={item.id + "_desc"} title={item.name + " Description"} body={item.description} />
                            <Details id={item.id + "_sol"} title={item.name + " Solution"} body={item.solution} />
                            <Details id={item.id + "_evid"} title={item.name + " Evidence"} body={item.evidence} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}