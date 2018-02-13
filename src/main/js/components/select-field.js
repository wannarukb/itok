import React from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const SelectField = ({input, description, itemList}) => {
    // let list = null;
    // if (itemList) {
    //     list = itemList.map((it, index) => {
    //         return <option value={it.id} key={index}>
    //             {it.name}
    //         </option>
    //     })
    // }
    let list2 = [];
    if (itemList)
        list2 = itemList.map(it => ({'value': it.id, 'label': it.name}));

    const valueChange = (it) => {
        if (it != null)
            input.onChange(it.value);
        else input.onChange('');

    };

    return (

        <div className="form-group row">
            <label className="col-md-4 control-label text-md-right" htmlFor="default-select" data-th-text="${label}">
                {description}</label>
            <div className="col-md-7">
                <Select
                    placeholder={'เลือก...'}
                    name={input.name}
                    onChange={valueChange}
                    value={input.value}
                    options={list2}
                />

                {/*<select  {...input}*/}
                {/*className="select2 form-control">*/}
                {/*{list}*/}

                {/*</select>*/}
            </div>
        </div>
    );
};
export default SelectField