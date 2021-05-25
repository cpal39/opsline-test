/**
 * simple card to display information for each data item
 * props.data contains the properties of the objects in data.json
 * if the value for a property is too long, a "read more" option will appear and a modal can be displayed to show the rest of the information
 */
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
                    <span className="bold">Application: </span>
                    {props.data.application}
                </li>
                <li className="list-group-item">
                    <span className="bold">Description: </span>
                    {props.data.description.length > 50 ?
                        <div>{props.data.description.substring(0, 50) + "... "}
                            <span className="text-primary link" data-bs-toggle="modal" data-bs-target={"#_" + props.data.id + "_desc"}>read more</span>
                        </div> :
                        props.data.description}
                </li>
                <li className="list-group-item">
                    <span className="bold">Soution: </span>
                    {props.data.solution.length > 50 ?
                        <div>{props.data.solution.substring(0, 50) + "... "}
                            <span className="text-primary link" data-bs-toggle="modal" data-bs-target={"#_" + props.data.id + "_sol"}>read more</span>
                        </div> :
                        props.data.solution}
                </li>
                <li className="list-group-item">
                    <span className="bold">Evidence: </span>
                    {props.data.evidence.length > 50 ?
                        <div>{props.data.evidence.substring(0, 50) + "... "}
                            <span className="text-primary link" data-bs-toggle="modal" data-bs-target={"#_" + props.data.id + "_evid"}>read more</span>
                        </div> :
                        props.data.evidence}
                </li>
            </ul>
        </div>
    );
}