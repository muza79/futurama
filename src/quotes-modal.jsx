import React from 'react';
import './quotes-modal.css';

const QuotesModal = (props) => {

    const handleRenderQuotes = () => {
        return(
            props.quotes.map((quote) => {
                return(
                    <p key={quote}>{quote}</p>
                );
            })
        );
    }
    return(
        <div className={props.modalOpen ? "modal modal-active" : "modal"} id="myModal">
            <span className="close" onClick={() => props.handleModalToggle()}>&times;</span>
            <div className="modal-content">
                {handleRenderQuotes()}
            </div>
        </div>  
    );
}

export default QuotesModal;