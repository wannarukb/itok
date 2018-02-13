import React from 'react'

const TextField = ({input, description, required, full}) => {
    let requiredStar = null;
    if (required)
        requiredStar = <span className="red">*</span>;

    let full2 = null;
    if (!full) {
        full2 = false;
    }
    else full2 = true
    return (
        <div className={'form-group row'}
             data-th-class="${'form-group row' + (valid ? '' : ' has-error')}">
            <label className={((full2) ? 'col-md-2' : 'col-md-4') + " form-control-label text-md-right"}><span>{description}</span>
                &nbsp;{requiredStar}</label>
            <div className={(full2) ? 'col-md-10' : 'col-md-8'}>
                <input className="form-control" type="text" {...input}/>
                {/*<span className="help-inline">Error</span>*/}

            </div>
        </div>
    );
};
export default TextField