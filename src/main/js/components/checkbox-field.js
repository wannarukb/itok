import React from 'react'

const CheckboxField = ({input}) => {
    return (

        <div className="checkbox abc-checkbox abc-checkbox-primary">
            <input id={input.name} type="checkbox" {...input} checked={input.value}/>
            <label htmlFor={input.name}>
                เป็นตัวแทนสมาชิกประจำหมู่บ้าน
            </label>
        </div>
    );
}
export default CheckboxField
