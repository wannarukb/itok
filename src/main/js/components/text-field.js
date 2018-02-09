import React from 'react'
const TextField = ({input, description, required}) => {
    let requiredStar = null;
    if (required)
        requiredStar = <span className="red">*</span>;
    return (
        <div className={'form-group row'}
             data-th-class="${'form-group row' + (valid ? '' : ' has-error')}">
            <label className="col-md-4 form-control-label text-md-right"><span>{description}</span>
                &nbsp;{requiredStar}</label>
            <div className="col-md-7">
                <input className="form-control" type="text" {...input}/>
                {/*<span className="help-inline">Error</span>*/}

            </div>
        </div>
    );
};
export default TextField