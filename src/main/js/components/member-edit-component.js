import React from 'react'
import {connect} from "react-redux";
import TextField from './text-field'
import SelectField from './select-field'
import DateField from './date-field'
import Address from './address'
import {Field, reduxForm} from "redux-form";

const NewComponent = ({handleSubmit}) =>

    (
        <form method="post" action={'#'} onSubmit={handleSubmit} className={'content'}>
            <div className="row">
                <div className="col-md-6">
                    <h1 className="page-title font-supermarket">
                        {/*data-th-text="#{new}"*/}
                        <span>เพิ่ม / แก้ไข</span> -
                        <span className="fw-semi-bold" data-th-text="#{member}">สมาชิกเครือข่าย</span>
                    </h1>
                </div>
                <div className="col-md-6 text-right">
                    <button type="submit" className="btn btn-primary">
                        <i className="fa fa-check" aria-hidden="true"/> บันทึก
                    </button>
                    <button type="button" className="btn btn-inverse"
                            data-th-onclick="'window.location=\'' + @{/member} + '\''">
                        <i className="fa fa-times" aria-hidden="true"/> ยกเลิก
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <section className="widget">
                        <div className="widget-body clearfix">
                            <span className>รหัสสมาชิก</span><br/>
                            <span className="widget-label">X00000001</span>
                        </div>
                    </section>
                    <section className="widget">
                        <div className="widget-body clearfix">
                            <div className="form-group">
                  <span>
                    รูปประจำตัว
                  </span><br/>
                                <div className="fileinput fileinput-new" data-provides="fileinput"
                                     style={{width: '100%', marginBottom: 0}}>
                                    <div className="fileinput-new thumbnail" style={{width: '100%', height: 150}}>
                                        <img data-th-if="*{image} == null" data-src="holder.js/100%x100%" alt="..."
                                             src/>
                                        <img data-th-if="*{image} != null" data-th-src="*{image.imageUrl}"
                                             className="img-responsive"/>
                                    </div>
                                    <div className="fileinput-preview fileinput-exists thumbnail"
                                         style={{maxWidth: '100%', maxHeight: 150}}/>
                                    <br/>
                                    <div>
                      <span className="btn btn-default btn-file">
                        <i className="fa fa-image" aria-hidden="true"/>
                        <span className="fileinput-new"> เลือกรูปภาพ</span>
                        <span className="fileinput-exists"> เปลี่ยนรูปภาพ</span>
                        <input type="file" name="file[]"/>
                      </span>
                                        <a href="#" className="btn btn-danger fileinput-exists"
                                           data-dismiss="fileinput">
                                            <i className="fa fa-trash" aria-hidden="true"/> ลบรูปภาพ</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
                <div className="col-md-9">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="clearfix">
                                <ul id="tabs1" className="nav nav-tabs pull-left">
                                    <li className="active">
                                        <a data-target="#tab1" data-toggle="tab"
                                           aria-expanded="true">ข้อมูลส่วนบุคคล</a>
                                    </li>
                                    <li className><a data-target="#tab2" data-toggle="tab"
                                                     aria-expanded="false">ข้อมูลการเป็นสมาชิก</a>
                                    </li>
                                </ul>
                            </div>
                            <div id="tabs1c" className="tab-content mb-lg">
                                <div className="tab-pane clearfix active" id="tab1">
                                    <div className="col-lg-12">
                                        <section className="widget widget-custom-padding">
                                            <div className="widget-body">
                                                <div className="form-horizontal" role="form">
                                                    <fieldset>
                                                        <legend className="section-title">
                                                            {/*<strong data-th-text="#{member}">Horizontal</strong>*/}
                                                            {/*<span data-th-text="#{personalDetail}"></span>*/}
                                                            <span>ข้อมูลประวัติ</span>
                                                        </legend>
                                                        <br/>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                {/*<input data-th-replace="fragments/TextField :: input (#{memberId}, 'memberId', false)"/>*/}
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/SelectField :: select (#{title}, 'title', ${titles}, false)"/>*/}
                                                                <Field component={SelectField} name={'title'}
                                                                       description={'คำนำหน้าชื่อ'}/>
                                                                <Field component={TextField} name={'firstName'}
                                                                       description={'ชื่อ'}/>
                                                                <Field component={TextField} name={'lastName'}
                                                                       description={'นามสกุล'}/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/TextField :: input (#{firstName}, 'firstName', true)"/>*/}
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/TextField :: input (#{lastName}, 'lastName', true)"/>*/}
                                                            </div>
                                                            <div className="col-sm-6">
                                                                {/*<input data-th-if="*{id} != null" data-th-replace="fragments/FileField :: file (#{image}, 'file[]', false)"/>*/}
                                                                <Field component={SelectField} name={'status'}
                                                                       description={'สถานะการเป็นสมาชิก'}/>
                                                                <Field component={DateField} name={'birthday'}
                                                                       description={'วันเกิด'}/>
                                                                <Field component={TextField} name={'citizenId'}
                                                                       description={'หมายเลขบัตรประชาชน'}/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/SelectField :: select (#{status}, 'status', ${status}, false)"/>*/}
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/DateSelect :: dateSelect (#{birthday}, 'birthday', false)"/>*/}
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/TextField :: input (#{citizenId}, 'citizenId', false)"/>*/}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/SelectField :: select (#{maritalStatus}, 'maritalStatus', ${maritalStatus}, false)"/>*/}
                                                                <Field component={SelectField}
                                                                       description={'สถานภาพการสมรส'}
                                                                       name={'maritalStatus'}/>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <Field component={SelectField} name={'educationDegrees'}
                                                                       description={'ระดับการศึกษา'}/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/SelectField :: select (#{educationDegrees}, 'educationDegree', ${educationDegrees}, false)"/>*/}
                                                            </div>
                                                        </div>
                                                        <br/>
                                                        <legend className="section-title">
                                                            {/*<strong data-th-text="#{member}">Horizontal</strong>*/}
                                                            <span>ข้อมูลการติดต่อ</span>
                                                        </legend>
                                                        <br/>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <Field component={TextField} name={'mobile'}
                                                                       description={'เบอร์โทรศัพท์มือถือ'}/>
                                                                <Field
                                                                    component={TextField} name={'email'}
                                                                    description={'อีเมลล์'}/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/TextField :: input (#{mobile}, 'mobile', true)"/>*/}
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/TextField :: input (#{email}, 'email', false)"/>*/}
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <Field
                                                                    component={TextField} name={'facebook'}
                                                                    description={'เฟซบุ๊ค'}/>
                                                                <Field
                                                                    component={TextField} name={'line'}
                                                                    description={'ไอดีไลน์'}/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/TextField :: input (#{facebook}, 'facebook', false)"/>*/}
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/TextField :: input (#{line}, 'line', false)"/>*/}
                                                            </div>
                                                        </div>
                                                        <br/>
                                                        <legend className="section-title">
                                                            {/*<strong data-th-text="#{member}">Horizontal</strong>*/}
                                                            <span>ข้อมูลที่อยู่อาศัย</span>
                                                        </legend>
                                                        <br/>
                                                        <div className="row">
                                                            <div className="col-sm-12">
                                                                <Address/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/Address :: address (#{address}, 'address')"/>*/}
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                                <div className="tab-pane" id="tab2">
                                    <div className="col-lg-12">
                                        <section className="widget widget-custom-padding">
                                            <div className="widget-body">
                                                <div className="form-horizontal" role="form">
                                                    <fieldset>
                                                        <legend className="section-title">
                                                            {/*<strong data-th-text="#{member}">Horizontal</strong> */}
                                                            <span data-th-text="#{memberDetail}"/>
                                                        </legend>
                                                        <input type="hidden" data-th-field="*{membershipTemp.id}"/>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <input
                                                                    data-th-replace="fragments/TextField :: input (#{membershipId}, 'membershipTemp.membershipId', false)"/>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input
                                                                    data-th-replace="fragments/SelectField :: select (#{yearJoin}, 'membershipTemp.yearJoin', ${yearJoin}, false)"/>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="row form-group">
                                                                    <label
                                                                        className="col-md-4 form-control-label text-md-right"/>
                                                                    <div className="col-md-7">
                                                                        <div
                                                                            className="checkbox abc-checkbox abc-checkbox-primary">
                                                                            <input id="checkbox2" type="checkbox"
                                                                                   defaultChecked/>
                                                                            <label htmlFor="checkbox2">
                                                                                เป็นตัวแทนสมาชิกประจำหมู่บ้าน
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input
                                                                    data-th-replace="fragments/SelectField :: select (#{membershipType}, 'membershipTemp.type', ${memberTypes}, false)"/>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <input
                                                                    data-th-replace="fragments/SelectField :: select (#{mainJob}, 'membershipTemp.mainJob', ${jobTypes}, false)"/>
                                                                <input
                                                                    data-th-replace="fragments/SelectField :: select (#{secondJob}, 'membershipTemp.secondJob', ${jobTypes}, false)"/>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input
                                                                    data-th-replace="fragments/SelectField :: select (#{previousJob}, 'membershipTemp.previousJob', ${jobTypes}, false)"/>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <input
                                                                    data-th-replace="fragments/SelectField :: select (#{typeOrganization}, 'membershipTemp.typeOrganization', ${organizationTypes}, false)"/>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="form-group row">
                                                                    <label
                                                                        className="col-md-4 control-label text-md-right">ความเชี่ยวชาญพิเศษ<br/>ด้านเกษตร</label>
                                                                    <input
                                                                        data-th-replace="fragments/SelectFieldMultiple :: selectMultiple(#{agricultureSpecialty}, 'membershipTemp.agricultureSpecialty', ${specialties}, false)"/>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <div className="form-group row">
                                                                    <label
                                                                        className="col-md-4 control-label text-md-right">ความสนใจพิเศษ<br/>ด้านเกษตร</label>
                                                                    <input
                                                                        data-th-replace="fragments/SelectFieldMultiple :: selectMultiple(#{agricultureInterest}, 'membershipTemp.agricultureInterest', ${specialties}, false)"/>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <input
                                                                    data-th-replace="fragments/TextField :: input (#{associate}, 'membershipTemp.associate', false)"/>
                                                            </div>
                                                        </div>
                                                    </fieldset>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );


function mapStateToProp(state) {
    return {}
}

function mapDispatchToProp(dispatch) {
    return {}
}

export default reduxForm({form: 'member-edit-form'})(connect(mapStateToProp, mapDispatchToProp)(NewComponent))