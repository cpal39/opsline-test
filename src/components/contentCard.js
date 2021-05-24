export default function ContentCard(props) {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.data.name}</h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">
                    <span className="bold">ID: </span>
                    {props.data.id}
                </li>
                <li className="list-group-item">
                    <span className="bold">Alert: </span>
                    {props.data.alert}
                </li>
                <li className="list-group-item">
                    <span className="bold">Severity Level: </span>
                    {props.data.severity_level}
                </li>
                <li className="list-group-item">
                    <span className="bold">Description: </span>
                    {props.data.description.length > 50 ?
                        <div>{props.data.description.substring(0, 50) + "..."}
                            <a href="#" className="text-primary" data-bs-toggle="modal" data-bs-target={"#_" + props.data.id + "_desc"}>Read more</a>
                        </div> :
                        props.data.description}
                </li>
                <li className="list-group-item">
                    <span className="bold">Soution: </span>
                    {props.data.solution.length > 50 ?
                        <div>{props.data.solution.substring(0, 50) + "..."}
                            <a href="#" className="text-primary" data-bs-toggle="modal" data-bs-target={"#_" + props.data.id + "_sol"}>Read more</a>
                        </div> :
                        props.data.solution}
                </li>
                <li className="list-group-item">
                    <span className="bold">Evidence: </span>
                    {props.data.evidence.length > 50 ?
                        <div>{props.data.evidence.substring(0, 50) + "..."}
                            <a href="#" className="text-primary" data-bs-toggle="modal" data-bs-target={"#_" + props.data.id + "_evid"}>Read more</a>
                        </div> :
                        props.data.evidence}
                </li>
            </ul>
        </div>
    );
}