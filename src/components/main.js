import ContentCard from './contentCard';
import Details from './details'
import { useState, useEffect } from 'react';
import localData from '../localData/data.json';
const axios = require("axios");

export default function Main() {
    //to hold all non-filtered data from data.json
    const [allData, setAllData] = useState([]);
    //data from data.json (can be filtered through search)
    const [data, setData] = useState([]);
    //property to search by
    const [searchBy, setSearchBy] = useState("name");
    //search param for data
    const [searchTerm, setSearchTerm] = useState("");
    //current parameter to sort by
    const [sortBy, setSortBy] = useState("severity_level");
    //current order data is displayed in, ascending or descending
    const [orderBy, setOrderBy] = useState("des");
    //api endpoint to request the data
    const url = "http://localhost:5000/api/data";
    //update what to search by
    const updateSearchBy = (event) => {
        setSearchBy(event.target.value);
    }
    //update search term when user types in a new term
    const updateSearchTerm = (event) => {
        setSearchTerm(event.target.value);
    }
    //update what to sort by 
    const updateSortBy = (event) => {
        setSortBy(event.target.value);
    }
    //update what to order by
    const updateOrderBy = (event) => {
        setOrderBy(event.target.value);
    }
    /**
     * start with allData and then filter it out based on the search term to get the data to display
     * filter based on if searchBy includes the search term
     * if no search term was provided, revert back to showing all data
     */
    const doSearch = () => {
        if (searchTerm !== "") {
            let newData = [...allData];
            if (searchBy === "id" || searchBy === "severity_level") {
                newData = newData.filter(e => e[searchBy] === parseInt(searchTerm));
            }
            else {
                let lowerSearchTerm = searchTerm.toLowerCase();
                newData = newData.filter(e => e[searchBy].toLowerCase().includes(lowerSearchTerm));
            }
            setData(newData);
        }
        else {
            setData(allData);
        }
    }
    //use the value from sort dropdown to sort data accordingly
    const doSort = () => {
        let newData = [...data];
        newData.sort(function (a, b) {
            if (sortBy === "id" || sortBy === "severity_level") {
                return a[sortBy] - b[sortBy];
            }
            else {
                var aVal = a[sortBy].toUpperCase();
                var bVal = b[sortBy].toUpperCase();
                if (aVal < bVal) {
                    return -1;
                }
                if (aVal > bVal) {
                    return 1;
                }
                return 0;
            }
        });
        if (orderBy === "des") {
            newData = newData.reverse();
        }
        setData(newData);
    }
    //retrieve the data from the endpoint, if there's an error, use local data.json file instead
    useEffect(() => {
        async function getData(url) {
            try {
                const response = await axios.get(url);
                const remoteData = response.data;
                setData(remoteData);
                setAllData(remoteData);
            }
            catch (e) {
                console.log(`error ${e}. Using local data instead...`);
                setData(localData);
                setAllData(localData);
            }
        }
        getData(url);
    }, []);
    return (
        <div>
            <div className="searchRow">
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    Search by:
                                </div>
                                <div className="col-md-4">
                                    <select id="searchBy" onChange={updateSearchBy} className="form-select form-select-md mb-3 searchBy" aria-label=".form-select-md" defaultValue="name">
                                        <option value="name">Name</option>
                                        <option value="id">ID</option>
                                        <option value="alert">Alert</option>
                                        <option value="severity_level">Severity level</option>
                                        <option value="application">Application</option>
                                        <option value="description">Description</option>
                                        <option value="solution">Solution</option>
                                        <option value="evidence">Evidence</option>
                                    </select>
                                </div>
                                <div className="col-md-4 searchBar">
                                    <input type="text" className="form-control" placeholder="Enter search term" onChange={updateSearchTerm} />
                                </div>
                                <div className="col-md-4 buttonDiv">
                                    <button className="btn btn-primary" onClick={doSearch}>Search</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-sm-12">
                                    Sort by:
                                </div>
                                <div className="col-md-4">
                                    <select onChange={updateSortBy} className="form-select form-select-md mb-3" aria-label=".form-select-md" defaultValue="severity_level">
                                        <option value="name">Name</option>
                                        <option value="id">ID</option>
                                        <option value="alert">Alert</option>
                                        <option value="severity_level">Severity level</option>
                                        <option value="application">Application</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <select onChange={updateOrderBy} className="form-select form-select-md mb-3" aria-label=".form-select-md" defaultValue="des">
                                        <option value="asc">Ascending</option>
                                        <option value="des">Descending</option>
                                    </select>
                                </div>
                                <div className="col-md-4 buttonDiv">
                                    <button className="btn btn-primary" onClick={doSort}>Sort</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row contentRow">
                    {/**
                     * for each item, create its content card and modals for description, solution, and evidence
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
        </div >
    )
}