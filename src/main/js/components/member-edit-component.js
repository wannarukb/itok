import React from 'react'
import {connect} from "react-redux";
import TextField from './text-field'
import SelectField from './select-field'
import DateField from './date-field'
import Address from './address'
import {Field, reduxForm} from "redux-form";
import CheckboxField from "./checkbox-field";
import {saveOrUpdate, selectMember} from "../duck/member";
import onEnter from 'react-router-enter'
import {Link} from "react-router-dom";

const NewComponent = ({
                          handleSubmit, titles, status, maritalStatus, educationDegrees, yearJoin, specialties,
                          memberTypes, organizationTypes, jobTypes
                      }) => {
    return (
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
                    <Link to={'/member'} type="button" className="btn btn-inverse"
                            data-th-onclick="'window.location=\'' + @{/member} + '\''">
                        <i className="fa fa-times" aria-hidden="true"/> ยกเลิก
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3">
                    <section className="widget">
                        <div className="widget-body clearfix">
                            <span className>หมายเลขสมาชิก</span><br/>
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
                                                                       itemList={titles}
                                                                       description={'คำนำหน้าชื่อ'}/>

                                                                <Field component={TextField} name={'firstName'}
                                                                       description={'ชื่อ'}/>
                                                                <Field component={TextField} name={'lastName'}
                                                                       description={'นามสกุล'}/>
                                                                <Field component={TextField} name={'nickname'}
                                                                       description={'ชื่อเล่น'}/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/TextField :: input (#{firstName}, 'firstName', true)"/>*/}
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/TextField :: input (#{lastName}, 'lastName', true)"/>*/}
                                                            </div>
                                                            <div className="col-sm-6">
                                                                {/*<input data-th-if="*{id} != null" data-th-replace="fragments/FileField :: file (#{image}, 'file[]', false)"/>*/}
                                                                <Field component={SelectField} name={'status'}
                                                                       itemList={status}
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
                                                                       itemList={maritalStatus}
                                                                       name={'maritalStatus'}/>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <Field component={SelectField} name={'educationDegrees'}
                                                                       itemList={educationDegrees}
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
                                                        <legend className="section-title"


                                                        >
                                                            {/*<strong data-th-text="#{member}">Horizontal</strong> */}
                                                            <span data-th-text="#{memberDetail}">
                                                                รายละเอียดการเป็นสมาชิก
                                                            </span>
                                                        </legend>
                                                        <input type="hidden" data-th-field="*{membershipTemp.id}"/>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <Field component={TextField}
                                                                       description={'หมายเลขสมาชิก'}
                                                                       name={'membershipTemp.membershipId'}/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/TextField :: input (#{membershipId}, 'membershipTemp.membershipId', false)"/>*/}
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <Field component={SelectField}
                                                                       description={'ปีที่เข้าร่วม'}
                                                                       name={'membershipTemp.yearJoin'}
                                                                       itemList={yearJoin}/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/SelectField :: select (#{yearJoin}, 'membershipTemp.yearJoin', ${yearJoin}, false)"/>*/}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <div className="row form-group">
                                                                    <label
                                                                        className="col-md-4 form-control-label text-md-right"/>
                                                                    <div className="col-md-7">
                                                                        <Field component={CheckboxField}
                                                                               name={'membershipTemp.isThing'}/>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <Field component={SelectField}
                                                                       description={'รูปแบบเครือข่าย'}
                                                                       name={'membershipTemp.type'}
                                                                       itemList={memberTypes}/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/SelectField :: select (#{membershipType}, 'membershipTemp.type', ${memberTypes}, false)"/>*/}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <Field component={SelectField} description={'อาชีพหลัก'}
                                                                       name={'membershipTemp.mainJob'}
                                                                       itemList={jobTypes}/>
                                                                <Field component={SelectField}
                                                                       description={'อาชีพเสริม'}
                                                                       name={'membershipTemp.secondJob'}
                                                                       itemList={jobTypes}/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/SelectField :: select (#{mainJob}, 'membershipTemp.mainJob', ${jobTypes}, false)"/>*/}
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/SelectField :: select (#{secondJob}, 'membershipTemp.secondJob', ${jobTypes}, false)"/>*/}
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <Field component={SelectField} description={'อาชีพเดิม'}
                                                                       name={'membershipTemp.previousJob'}
                                                                       itemList={jobTypes}/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/SelectField :: select (#{previousJob}, 'membershipTemp.previousJob', ${jobTypes}, false)"/>*/}
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-sm-6">
                                                                <Field component={SelectField}
                                                                       description={'ความเป็นสมาชิกภาพองค์กรหรือสมาคม'}
                                                                       name={'membershipTemp.typeOrganization'}
                                                                       itemList={organizationTypes}/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/SelectField :: select (#{typeOrganization}, 'membershipTemp.typeOrganization', ${organizationTypes}, false)"/>*/}
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <Field component={SelectField}
                                                                       description={'ความเชี่ยวชาญพิเศษด้านการเกษตร'}
                                                                       name={'membershipTemp.agricultureSpecialty'}
                                                                       itemList={specialties}/>
                                                                {/*<div className="form-group row">*/}
                                                                {/*<label*/}
                                                                {/*className="col-md-4 control-label text-md-right">ความเชี่ยวชาญพิเศษ<br/>ด้านเกษตร</label>*/}
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/SelectFieldMultiple :: selectMultiple(#{agricultureSpecialty}, 'membershipTemp.agricultureSpecialty', ${specialties}, false)"/>*/}
                                                                {/*</div>*/}
                                                            </div>
                                                            <div className="col-sm-6">
                                                                {/*<div className="form-group row">*/}
                                                                <Field component={SelectField}
                                                                       description={'ความสนใจพิเศษด้านเกษตร'}
                                                                       name={'membershipTemp.agricultureInterest'}
                                                                       itemList={specialties}
                                                                />
                                                                {/*<label*/}
                                                                {/*className="col-md-4 control-label text-md-right">ความสนใจพิเศษ<br/>ด้านเกษตร</label>*/}
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/SelectFieldMultiple :: selectMultiple(#{agricultureInterest}, 'membershipTemp.agricultureInterest', ${specialties}, false)"/>*/}
                                                                {/*</div>*/}
                                                            </div>
                                                            <div className="col-sm-6">
                                                                <Field component={TextField}
                                                                       name={'membershipTemp.associate'}
                                                                       description={'ชื่อสกุลของเครือข่ายที่ทำงานร่วมกัน'}/>
                                                                {/*<input*/}
                                                                {/*data-th-replace="fragments/TextField :: input (#{associate}, 'membershipTemp.associate', false)"/>*/}
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
};


function mapStateToProp(state, ownProps) {
    return {
        id: ownProps.match.params.id,
        titles: state.member.titles,
        status: state.member.status,
        maritalStatus: state.member.maritalStatus,
        educationDegrees: state.member.educationDegrees,
        yearJoin: state.member.yearJoin,
        jobTypes: state.member.jobTypes,
        organizationTypes: state.member.organizationTypes,
        specialties: state.member.specialties,
        memberTypes: state.member.memberTypes,
        initialValues: state.member.currentMember
    }
}


function mapDispatchToProp(dispatch) {
    return {
        selectMember: (id) => dispatch(selectMember(id))
    }
}


function fetchThings(props) {
    return new Promise((resolve) => {
        //enter App 10s later
        // setTimeout(resolve, 10000);
        if (props.id) {
            props.selectMember(props.id)
        }
        resolve()

    });
}

export default connect(mapStateToProp, mapDispatchToProp)(reduxForm({
    form: 'member-edit-form',
    enableReinitialize: true,
    onSubmit: (value, dispatch) => {
        dispatch(saveOrUpdate(value))
    }
})(onEnter(fetchThings)(NewComponent)))