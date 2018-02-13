import React from 'react'
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const SelectFieldMultiple = ({input, description, itemList, multiple}) => {
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
    if (!multiple) {
        multiple = false;
    } else {
        console.log('multiple true')
    }
    const valueChange = (it) => {
        if (it != null)
            input.onChange(it.map(k => k.value));
        else input.onChange([]);

    };

    return (

        <div className="form-group row">
            <label className="col-md-4 control-label text-md-right" htmlFor="default-select" data-th-text="${label}">
                {description}</label>
            <div className="col-md-7">
                <Select
                    placeholder={'เลือก...'}
                    multi={true}
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
export default SelectFieldMultiple