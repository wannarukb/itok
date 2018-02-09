import React from 'react'
import TextField from './text-field'
import {Field} from "redux-form";

const Address = ({}) => {

    return (

        <div className="form-group row">
            {/*<label class="col-md-2 control-label text-md-right" for="default-select" data-th-text="${label}">Default*/}
            {/*select</label>*/}
            <div className="col-md-12" style={{padding: '0px 25px'}}>
                <div className="row">
                    <div className="col-md-4" style={{paddingRight: 30}}>
                        <Field component={TextField} name={'address.number'} description={'เลขที่'}/>
                        {/*<input data-th-replace="fragments/TextField2 :: input (#{number}, 'address.number', false)"/>*/}
                    </div>
                    <div className="col-md-4">
                        <Field component={TextField} name={'address.moo'} description={'หมู่'}/>
                        {/*<input data-th-replace="fragments/TextField2 :: input (#{moo}, 'address.moo', false)"/>*/}
                    </div>
                    <div className="col-md-4" style={{paddingLeft: 30}}>
                        <Field component={TextField} name={'address.village'} description={'หมู่บ้าน'}/>
                        {/*<input data-th-replace="fragments/TextField2 :: input (#{village}, 'address.village', false)"/>*/}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" style={{paddingRight: 30}}>
                        <Field component={TextField} name={'address.alley'} description={'ซอย'}/>
                        {/*<input data-th-replace="fragments/TextField2 :: input (#{alley}, 'address.alley', false)"/>*/}
                    </div>
                    <div className="col-md-4">
                        <Field component={TextField} name={'address.road'} description={'ถนน'}/>
                        {/*<input data-th-replace="fragments/TextField2 :: input (#{road}, 'address.road', false)"/>*/}
                    </div>
                    <div className="col-md-4" style={{paddingLeft: 30}}>
                        <Field component={TextField} name={'address.province'} description={'จังหวัด'}/>
                        {/*<input data-th-replace="fragments/TextField2 :: input (#{province}, 'address.province', true)"/>*/}
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4" style={{paddingRight: 30}}>
                        <Field component={TextField} name={'address.district'} description={'อำเภอ'}/>
                        {/*<input*/}
                        {/*data-th-replace="fragments/TextField2 :: input (#{district}, 'address.district', false)"/>*/}
                    </div>
                    <div className="col-md-4">
                        <Field component={TextField} name={'address.subdistrict'} description={'ตำบล'}/>
                        {/*<input*/}
                        {/*data-th-replace="fragments/TextField2 :: input (#{subdistrict}, 'address.subdistrict', false)"/>*/}
                    </div>
                    <div className="col-md-4" style={{paddingLeft: 30}}>
                        <Field component={TextField} name={'address.postalCode'} description={'รหัสไปรษณีย์'}/>
                        {/*<input*/}
                        {/*data-th-replace="fragments/TextField2 :: input (#{postalCode}, 'address.postalCode', false)"/>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Address