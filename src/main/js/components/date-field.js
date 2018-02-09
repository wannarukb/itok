import React from 'react'

const DateField = ({input, description, required}) => {
    let requiredStar = null;
    if (required) requiredStar = <span data-th-if="${required}" style={{color: 'red'}}>*</span>;
    return (

        <div className="form-group row">
            <label className="col-md-4 control-label text-md-right" data-th-for="${name}"><span
                data-th-text="${label}">{description}</span>&nbsp;
                {requiredStar}</label>
            <div className="col-md-7">
                <input data-th-field="*{__${name}__}" type="text" className="form-control datepicker"/>
            </div>
        </div>
    );
};
export default DateField