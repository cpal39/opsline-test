/**
 * simple modal to display the information that was too long to be shown in the card
 * modal title will include object name and the property name being displayed
 */
export default function Details(props) {
    return (
        <div className="modal fade" id={"_" + props.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{props.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {props.body}
      </div>
                </div>
            </div>
        </div>
    )
}