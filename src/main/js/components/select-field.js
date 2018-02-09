import React from 'react'
const SelectField=({input, description}) => {

    return (

        <div className="form-group row">
            <label className="col-md-4 control-label text-md-right" htmlFor="default-select" data-th-text="${label}">
                {description}</label>
            <div className="col-md-7">

                <select data-placeholder="Which galaxy is closest to Milky Way?" {...input}
                        data-th-placeholder="#{choose} + ' - ' + ${label}" data-width="auto"
                        data-minimum-results-for-search={10} tabIndex={-1} data-th-name="${name}"
                        className="select2 form-control" id="default-select">
                    <option value="Magellanic" data-th-each="l : ${list}" data-th-text="${l.name}"
                            data-th-value="${l.id}" data-th-selected="${l.name} == *{__${name}__}">
                        Large Magellanic Cloud
                    </option>
                </select>
            </div>
        </div>
    );
};
export default SelectField