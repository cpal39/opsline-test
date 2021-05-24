import ContentCard from './contentCard';
import Details from './details'
import { useState, useEffect } from 'react';
import localData from '../localData/data.json';
const axios=require("axios");

export default function Main() {
    const [data, setData] = useState([]);
    const url="http://localhost:5000/api/data";
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
    });
    return (
        <div>
            <div className="container">
                <div className="row">
                    {data.map((item, id) => {
                        return <div key={id} className="col-lg-3 col-md-6 col-sm-12 cardDiv">
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