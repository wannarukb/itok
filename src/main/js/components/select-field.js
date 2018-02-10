import React from 'react'

const SelectField = ({input, description, itemList}) => {
    let list = null;
    if (itemList) {
        list = itemList.map((it, index) => {
            return <option value={it.id} key={index}>
                {it.name}
            </option>
        })
    }
    return (

        <div className="form-group row">
            <label className="col-md-4 control-label text-md-right" htmlFor="default-select" data-th-text="${label}">
                {description}</label>
            <div className="col-md-7">

                <select data-placeholder="Which galaxy is closest to Milky Way?" {...input}
                        data-th-placeholder="#{choose} + ' - ' + ${label}" data-width="auto"
                        data-minimum-results-for-search={10} tabIndex={-1} data-th-name="${name}"
                        className="select2 form-control" id="default-select">
                    {list}

                </select>
            </div>
        </div>
    );
};
export default SelectField