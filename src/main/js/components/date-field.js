import React from 'react'
import DateTime from 'react-datetime'

const DateField = ({input, description, required}) => {
    let requiredStar = null;
    if (required) requiredStar = <span data-th-if="${required}" style={{color: 'red'}}>*</span>;
    return (

        <div className="form-group row">
            <label className="col-md-4 control-label text-md-right" data-th-for="${name}"><span
                data-th-text="${label}">{description}</span>&nbsp;
                {requiredStar}</label>
            <div className="col-md-7">
                {/*<input  type="text" className="form-control datepicker" {...input}/>*/}
                <DateTime {...input} dateFormat={'DD/MM/YYYY'} timeFormat={false} />
            </div>
        </div>
    );
};
export default DateField