import React from 'react'
import {Link} from "react-router-dom";


var NewComponent = ({match}) => {
    const id = match.params.id
    return (
        <div style={{padding: "0px !important"}}>
            <div className="cover" style={{background: 'url("/image/bg-image.jpeg")'}}/>
            <div className="cover-footer"/>
            <div style={{marginTop: '-140px', padding: '0px 20px 42px'}}>
                <div className="row">
                    <div className="col-md-2">
                        {/*<h2 class="page-title font-supermarket">ข้อมูลสมาชิก <span class="fw-semi-bold">สมชาย ใจดี</span></h2>*/}
                        <div className="fileinput-new thumbnail" style={{width: '100%', marginBottom: 10}}>
                            {/*<img data-src="holder.js/100%x100%" alt="..." src="">*/}
                            <img src="/image/profile.png" data-th-if="*{image} == null"/>

                        </div>
                    </div>
                    <div className="col-md-10 " style={{paddingTop: 50}}>
                        <div className="row ">
                            <div className="col-sm-6 text-left color-white">
                                <h3 style={{marginBottom: 0, marginTop: 17}} data-th-text="*{displayName}">นาย สมชาย
                                    ใจดี</h3>
                            </div>
                            <div className="col-sm-6 text-right">
                                <Link to={'/member/edit/' + id} className="btn btn-primary"
                                      data-th-href="@{/member/{id}/edit(id=${member.id})}">
                                    <i className="fa fa-pencil"/> แก้ไขข้อมูลสมาชิก
                                </Link>
                            </div>
                        </div>
                        <div className="tab-style-custom tab-profile" style={{marginTop: 10}}>
                            <div className="clearfix tab-header">
                                <ul id="tabs-bar" className="nav nav-tabs pull-left">
                                    <li className="active">
                                        <a data-target="#tab1" data-toggle="tab" aria-expanded="true">รายงานสรุป</a>
                                    </li>
                                    <li>
                                        <a data-target="#tab2" data-toggle="tab"
                                           aria-expanded="true">ข้อมูลสมาชิก</a>
                                    </li>
                                    <li className>
                                        <a data-target="#tab3" data-toggle="tab"
                                           aria-expanded="false">แปลงที่ดิน</a>
                                    </li>
                                    <li className>
                                        <a data-target="#tab4" data-toggle="tab"
                                           aria-expanded="false">รายรับ/จ่ายภาคเกษตร</a>
                                    </li>
                                    <li className>
                                        <a data-target="#tab5" data-toggle="tab"
                                           aria-expanded="false">การฝึกอบรม</a>
                                    </li>
                                    <li className>
                                        <a data-target="#tab6" data-toggle="tab"
                                           aria-expanded="false">การร่วมกิจกรรม</a>
                                    </li>
                                    <li className>
                                        <a data-target="#tab7" data-toggle="tab"
                                           aria-expanded="false">อุปกรณ์ที่ยืม</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12  tab-style-custom tab-profile">
                        <div id="tabs1c" className="tab-content mb-lg">
                            <div className="tab-pane clearfix active" id="tab1">
                                <div className="col-md-12">
                                    <div className="row box-icon-member">
                                        <div className="col-sm-3">
                                            <section className="widget box-icon-widget">
                                                <div className="widget-body">
                                                    <div className="stats-row">
                                                        <div className="stat-item item-col-icon font-icon-box">
                                                            <span className="icon-fields"/>
                                                        </div>
                                                        <div className="stat-item item-col-block">
                                                            <h6 className="name">จำนวนแปลงที่ดิน</h6>
                                                            <p className="value font-bold text-right font-big"
                                                               data-th-text="${#lists.size(#object.memberLands)}">3</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div className="col-sm-3">
                                            <section className="widget box-icon-widget">
                                                <div className="widget-body">
                                                    <div className="stats-row">
                                                        <div className="stat-item item-col-icon font-icon-box">
                                                            <span className="icon-presentation"/>
                                                        </div>
                                                        <div className="stat-item item-col-block">
                                                            <h6 className="name">จำนวนหลักสูตรที่อบรม</h6>
                                                            <p className="value font-bold text-right font-big"
                                                               data-th-text="${#lists.size(#object.courses)}">7</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div className="col-sm-3">
                                            <section className="widget box-icon-widget">
                                                <div className="widget-body">
                                                    <div className="stats-row">
                                                        <div className="stat-item item-col-icon font-icon-box">
                                                            <span className="icon-scarecrow"/>
                                                        </div>
                                                        <div className="stat-item item-col-block">
                                                            <h6 className="name">จำนวนกิจกรรมที่เข้าร่วม</h6>
                                                            <p className="value font-bold text-right font-big"
                                                               data-th-text="${#lists.size(#object.activities)}">4</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div className="col-sm-3">
                                            <section className="widget box-icon-widget">
                                                <div className="widget-body">
                                                    <div className="stats-row">
                                                        <div
                                                            className="stat-item item-col-icon font-icon-box color-darkred">
                                                            <span className="icon-shovel"/>
                                                        </div>
                                                        <div className="stat-item item-col-block">
                                                            <h6 className="name">จำนวนอุปกรณ์ที่ยืมใช้งาน</h6>
                                                            <p className="value font-bold text-right font-big"
                                                               data-th-text="${#lists.size(#object.equipments)}">1</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <section className="widget">
                                                <header>
                                                    <h4><strong>สรุปผลผลิตต่อปีของทุกที่ดิน</strong></h4>
                                                </header>
                                                <div className="widget-body">
                                                    <div className="row">
                                                        <div className="col-md-12 text-right">
                                                            <p className="font-small">แก้ไขล่าสุด 24/10/2560
                                                                14:32</p>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div id="nvd32">
                                                                <svg/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <div className="row">
                                                        <h4><strong>ผลผลิตล่าสุดในปีนี้ของทุกที่ดิน</strong></h4>
                                                        <div className="stats-row">
                                                            <div className="stat-item col-xs-4">
                                                                <h6 className="name">ผลผลิตข้าวต่อปี (ก.ก.)</h6>
                                                                <p className="value">205</p>
                                                            </div>
                                                            <div className="stat-item  col-xs-4">
                                                                <h6 className="name">ผลผลิตพืชไร่ต่อปี (ก.ก.)</h6>
                                                                <p className="value">108</p>
                                                            </div>
                                                            <div className="stat-item  col-xs-4">
                                                                <h6 className="name">ผลผลิตพืชผักต่อปี (ก.ก.)</h6>
                                                                <p className="value">300</p>
                                                            </div>
                                                        </div>
                                                        <br/>
                                                        <div className="stats-row">
                                                            <div className="stat-item col-xs-4"
                                                                 style={{marginTop: 5}}>
                                                                <h6 className="name">ผลผลิตไม้ผลต่อปี (ก.ก.)</h6>
                                                                <p className="value">205</p>
                                                            </div>
                                                            <div className="stat-item  col-xs-4"
                                                                 style={{marginTop: 5}}>
                                                                <h6 className="name">ผลผลิตไม้ยืนต้นต่อปี
                                                                    (ลบ.ม.)</h6>
                                                                <p className="value">119</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <br/>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <section className="widget" style={{
                                                                background: '#f7f7f7',
                                                                padding: '5px 10px'
                                                            }}>
                                                                <div className="widget-body">
                                                                    <div className="row">
                                                                        <div
                                                                            className="col-xs-3 item-col-icon font-icon-box"
                                                                            style={{
                                                                                fontSize: '3.5em',
                                                                                padding: '0px 5px'
                                                                            }}>
                                                                            <span className="fa fa-child"/>
                                                                        </div>
                                                                        <div
                                                                            className="col-xs-9 item-col-block no-border">
                                                                            <h6 className="name">สมาชิกในครอบครัว</h6>
                                                                            <p className="value font-bold text-right font-big">
                                                                                7</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <section className="widget" style={{
                                                                background: '#f7f7f7',
                                                                padding: '5px 10px'
                                                            }}>
                                                                <div className="widget-body">
                                                                    <div className="row">
                                                                        <div
                                                                            className="col-xs-3 item-col-icon font-icon-box"
                                                                            style={{fontSize: '3.5em', padding: 0}}>
                                                                            <span className="icon-cereal"/>
                                                                        </div>
                                                                        <div
                                                                            className="col-xs-9 item-col-block no-border">
                                                                            <h6 className="name">ความต้องการข้าวสาร</h6>
                                                                            <p className="value text-right"><span
                                                                                className="font-big font-bold "> 100</span>
                                                                                <small>(ก.ก./ปี)</small>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                        <div className="col-md-4">
                                                            <section className="widget" style={{
                                                                background: '#f7f7f7',
                                                                padding: '5px 10px'
                                                            }}>
                                                                <div className="widget-body">
                                                                    <div className="row">
                                                                        <div
                                                                            className="col-xs-3 item-col-icon font-icon-box"
                                                                            style={{fontSize: '3.5em', padding: 0}}>
                                                                            <span className="icon-wheat-1"/>
                                                                        </div>
                                                                        <div
                                                                            className="col-xs-9 item-col-block no-border">
                                                                            <h6 className="name">ความพอเพียงของข้าว</h6>
                                                                            <p className="value text-right"><span
                                                                                className="font-big font-bold "> พอเพียง</span>
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </section>
                                                        </div>
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                        <div className="col-sm-4" style={{paddingRight: 0}}>
                                            <div className="row">
                                                <div className="col-xs-12">
                                                    <section className="widget box-icon-widget">
                                                        <header>
                                                            <h4>
                                                                    <span
                                                                        className="fw-semi-bold">สรุปรายจ่ายภาคเกษตร</span>
                                                            </h4>
                                                        </header>
                                                        <br/>
                                                        <div className="widget-body">
                                                            <div id="sparkline2"
                                                                 className="chart-overflow-bottom mb-0 text-xs-center"/>
                                                            <br/><br/>
                                                            <div className="row font-small">
                                                                <div className="col-sm-12">
                                                                        <span><i className="fa fa-circle"
                                                                                 aria-hidden="true"
                                                                                 style={{color: '#FFD566'}}/> ค่าแรง</span><br/>
                                                                    <span><i className="fa fa-circle"
                                                                             aria-hidden="true"
                                                                             style={{color: '#FF886A'}}/> ค่าวัสดุการเกษตร</span><br/>
                                                                    <span><i className="fa fa-circle"
                                                                             aria-hidden="true"
                                                                             style={{color: '#84DE83'}}/> ค่าอุปกรณ์การเกษตร</span><br/>
                                                                    <span><i className="fa fa-circle"
                                                                             aria-hidden="true"
                                                                             style={{color: '#7AC1FF'}}/> อื่นๆ</span><br/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-xs-12">
                                                    <section className="widget">
                                                        <header>
                                                            <h5><span className="label label-danger">New</span>
                                                                คำแนะนำจากเจ้าหน้าที่</h5>
                                                            <div className="widget-controls">
                                                                <a href="#"><i className="fa fa-refresh"/></a>
                                                                <a href="#" data-widgster="close"><i
                                                                    className="glyphicon glyphicon-remove"/></a>
                                                            </div>
                                                        </header>
                                                        <div className="widget-body no-padding">
                                                            <div className="list-group list-group-lg">
                                                                <a className="list-group-item" href="#">
                                                                    <h5 className="no-margin">Jamey Brownlow</h5>
                                                                    <p className="help-block text-ellipsis no-margin">Good
                                                                        news
                                                                        coming tonight. Seems they agreed to
                                                                        proceed</p>
                                                                </a>
                                                                <a className="list-group-item" href="#">
                                                                    <h5 className="no-margin">Jamey Brownlow</h5>
                                                                    <p className="help-block text-ellipsis no-margin">Good
                                                                        news
                                                                        coming tonight. Seems they agreed to
                                                                        proceed</p>
                                                                </a>
                                                                <a className="list-group-item" href="#">
                                                                    <h5 className="no-margin">Jamey Brownlow</h5>
                                                                    <p className="help-block text-ellipsis no-margin">Good
                                                                        news
                                                                        coming tonight. Seems they agreed to
                                                                        proceed</p>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <footer className="bg-body-light">
                                                            <input type="search" className="form-control input-sm"
                                                                   placeholder="Search"/>
                                                        </footer>
                                                    </section>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane " id="tab2">
                                <div className="row">
                                    <div className="col-md-9">
                                        <section className="widget">
                                            <div className="widget-body">
                                                <div className="row">
                                                    <div className="col-md-12 text-right">
                                                        <p className="font-small">แก้ไขล่าสุด 24/10/2560 14:32</p>
                                                    </div>
                                                </div>
                                                <div className="section-title font-bold no-margin margin-bottom-20">
                                                    <span>ข้อมูลส่วนบุคคล</span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <div className="text-element">
                                                            <span className="element-label">ชื่อ-นามสกุล</span>
                                                            <p className="element-value">นาย สมชาย ใจดี</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="text-element">
                                                            <span className="element-label">ชื่อเล่น</span>
                                                            <p className="element-value">ชาย</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="text-element">
                                                            <span className="element-label">เลขบัตรประชาชน</span>
                                                            <p className="element-value">1100322031234</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="text-element">
                                                            <span className="element-label">วันเกิด</span>
                                                            <p className="element-value">03/10/2560</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className="row">
                                                    <div className="col-sm-3">
                                                        <div className="text-element">
                                                            <span className="element-label">เพศ</span>
                                                            <p className="element-value">ชาย</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="text-element">
                                                            <span className="element-label">สถานภาพ</span>
                                                            <p className="element-value">โสด</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <div className="text-element">
                                                            <span className="element-label">ระดับการศึกษา</span>
                                                            <p className="element-value">ปริญญาเอก</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className="section-title font-bold no-margin margin-bottom-20">
                                                    <span>ข้อมูลการเป็นสมาชิก</span>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="text-element">
                                                                <span
                                                                    className="element-label">ปีแรกที่เริ่มเป็นสมาชิก</span>
                                                            <p className="element-value">2559</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="text-element">
                                                                <span
                                                                    className="element-label">ตัวแทนสมาชิกเครือข่ายประจำหมู่บ้าน</span>
                                                            <p className="element-value">ใช่</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="text-element">
                                                            <span className="element-label">รูปแบบเครือข่าย</span>
                                                            <p className="element-value">ชุมชน</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className="row">
                                                    <div className="col-sm-4">
                                                        <div className="text-element">
                                                            <span className="element-label">อาชีพหลัก</span>
                                                            <p className="element-value">วิศวกร</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="text-element">
                                                            <span className="element-label">อาชีพเสริม</span>
                                                            <p className="element-value">เกษตรกร</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-4">
                                                        <div className="text-element">
                                                            <span className="element-label">อาชีพเดิม</span>
                                                            <p className="element-value">วิศวกร</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="text-element">
                                                                <span
                                                                    className="element-label">ความเป็นสมาชิกภาพขององค์กรหรือสมาคม</span>
                                                            <p className="element-value">กลุ่มเกษตรกร</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="text-element">
                                                                <span
                                                                    className="element-label">ชื่อสกุลของเครือข่ายปัจจุบันที่ทำงานร่วมกัน</span>
                                                            <p className="element-value">กลุ่มเกษตรกรบ้านน้ำมูล</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <div className="text-element">
                                                                <span
                                                                    className="element-label">ความเชี่ยวชาญพิเศษด้านการเกษตร</span>
                                                            <p className="element-value">การบำบัดน้ำเสีย</p>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <div className="text-element">
                                                                <span
                                                                    className="element-label"> ความสนใจพิเศษด้านเกษตร</span>
                                                            <p className="element-value">เกษตรทฤษฎีใหม่</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br/>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="col-md-3">
                                        <section className="widget " style={{paddingLeft: 10}}>
                                            <div className="widget-body">
                                                <div className="row">
                                                    <div className="col-sm-2 text-center">
                                                        <span className="icon-light-bulb font-icon-box"/>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <div className="text-element">
                                                            <span className="element-label">หมายเลขสมาชิก</span>
                                                            <p className="element-value">X0001</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-2 text-center">
                                                            <span className="font-icon-box"><i className="fa fa-mobile "
                                                                                               aria-hidden="true"/></span>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <div className="text-element">
                                                            <span className="element-label">เบอร์โทรศัพท์</span>
                                                            <p className="element-value">08754323421</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-2 text-center">
                                                            <span className="font-icon-box font-size-big"><i
                                                                className="fa fa-envelope " aria-hidden="true"/></span>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <div className="text-element">
                                                            <span className="element-label">Email</span>
                                                            <p className="element-value">somchaiJaiDee@mail.com</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-2 text-center">
                                                            <span className="font-icon-box font-size-big"><i
                                                                className="fa fa-facebook-square"
                                                                aria-hidden="true"/></span>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <div className="text-element">
                                                            <span className="element-label">Facebook</span>
                                                            <p className="element-value">SomchaiJaiDee</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-2 text-center">
                                                            <span
                                                                className="icon-line-logo font-icon-box font-size-big"/>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <div className="text-element">
                                                            <span className="element-label">Line ID</span>
                                                            <p className="element-value">SomchaiJaiDee1985</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-2 text-center">
                                                            <span className="font-icon-box font-size-big"><i
                                                                className="fa fa-home " aria-hidden="true"/></span>
                                                    </div>
                                                    <div className="col-sm-10">
                                                        <div className="text-element">
                                                            <span className="element-label">ที่อยู่</span>
                                                            <p className="element-value">102 หมู่ 1 ต.หนองสาหร่าย
                                                                อ.ปากช่อง
                                                                จ.นครราชสีมา 30130</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane background-white" id="tab3">
                                <section className="widget widget-custom-padding">
                                    <div className="row">
                                        <div className="col-md-12 text-right">
                                            <button type="button" className="btn btn-success"><i
                                                className="fa fa-plus"/>
                                                เพิ่มแปลงที่ดิน
                                            </button>
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="widget-body">
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <table className="table table-striped text-center">
                                                    <thead>
                                                    <tr>
                                                        <th className="text-center">รูปภาพ</th>
                                                        <th className="text-center">ชื่อแปลงที่ดิน</th>
                                                        <th className="text-center">ชื่อสมาชิก</th>
                                                        <th className="text-center">ขนาด (ไร่. งาน. ตร.วา.)</th>
                                                        <th className="text-center">จังหวัด</th>
                                                        <th className="text-center">ลุ่มน้ำ</th>
                                                        <th className="text-center"/>
                                                    </tr>
                                                    </thead>
                                                    {/*data-th-remove="all-but-first" data-th-each="l : ${member.memberLandsTemp}"*/}
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="color-dark-blue font-icon-box">
                                                                <span className="icon-fields"/>
                                                            </div>
                                                        </td>
                                                        <td><span>บ้านดินดี</span></td>
                                                        <td><span>สมชาย ใจดี</span></td>
                                                        <td><span>320.3</span></td>
                                                        <td><span>นครราชสีมา</span></td>
                                                        <td><span>ลุ่มน้ำมูล</span></td>
                                                        <td style={{width: '10%'}}>
                                                            <a href="#" data-th-href="@{/page/member-land-view}"
                                                               className="btn btn-danger">
                                                                <i className="icon-barn2"/> ดูข้อมูลแปลงที่ดิน
                                                            </a>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="tab-pane" id="tab4">
                                <div className="row">
                                    <div className="col-md-3">
                                        <section className="widget">
                                            <div className="widget-body">
                                                <div className="form-group">
                                                    <label htmlFor="datetimepicker1">วันที่ทำรายการ</label>
                                                    <div id="datetimepicker1" className="input-group">
                                                        <input id="datepicker2i" type="text"
                                                               className="form-control"/>
                                                        <span className="input-group-addon">
                                <span className="fa fa-calendar"/>
                              </span>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">หมวดรายการ</label>
                                                    <select data-width="auto" data-minimum-results-for-search={10}
                                                            tabIndex={-1} className="select2 form-control">
                                                        <option value="value01">รายรับ</option>
                                                        <option value="value02">รายจ่าย</option>
                                                        <option value="value03">หนี้สิน</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">กลุ่มรายการ</label>
                                                    <select data-width="auto" data-minimum-results-for-search={10}
                                                            tabIndex={-1} className="select2 form-control">
                                                        <option value="value01">ภาคการเกษตร</option>
                                                        <option value="value02">ภาคนอกการเกษตร</option>
                                                    </select>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">จำนวนเงิน</label>
                                                    <input type="number" className="form-control"/>
                                                </div>
                                                <div className="form-group">
                                                    <label className="control-label">คำอธิบาย</label>
                                                    <input type="text" className="form-control"/>
                                                </div>
                                                <div className="form-actions" style={{background: 'none'}}>
                                                    <div className="row">
                                                        <div className="col-md-12 text-center">
                                                            <button type="submit" className="btn btn-primary"><i
                                                                className="fa fa-check" aria-hidden="true"/> บันทึก
                                                            </button>
                                                            <button type="button" className="btn btn-inverse"><i
                                                                className="fa fa-times" aria-hidden="true"/> ล้าง
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <section className="widget box-icon-widget">
                                                    <div className="widget-body">
                                                        <div className="stats-row">
                                                            <div className="stat-item item-col-icon font-icon-box">
                                                                <span className="icon-payment-method"/>
                                                            </div>
                                                            <div className="stat-item item-col-block">
                                                                <h6 className="name">รายรับ</h6>
                                                                <p className="value font-bold text-right font-big">8,000.00</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                            <div className="col-sm-4">
                                                <section className="widget box-icon-widget">
                                                    <div className="widget-body">
                                                        <div className="stats-row">
                                                            <div className="stat-item item-col-icon font-icon-box">
                                                                <span className="icon-money"/>
                                                            </div>
                                                            <div className="stat-item item-col-block">
                                                                <h6 className="name">รายจ่ายทั้งหมด</h6>
                                                                <p className="value font-bold text-right font-big">0.00</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                            <div className="col-sm-4">
                                                <section className="widget box-icon-widget">
                                                    <div className="widget-body">
                                                        <div className="stats-row">
                                                            <div className="stat-item item-col-icon font-icon-box">
                                                                <span className="icon-piggy-bank"/>
                                                            </div>
                                                            <div className="stat-item item-col-block">
                                                                <h6 className="name">เงินคงเหลือ</h6>
                                                                <p className="value font-bold text-right font-big">8,000.00</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>
                                            </div>
                                        </div>
                                        <section className="widget">
                                            <div className="widget-body">
                                                <table className="table table-striped">
                                                    <thead>
                                                    <tr>
                                                        <th className="text-center">วันที่ทำรายการ</th>
                                                        <th className="text-center">หมวดรายการ</th>
                                                        <th className="text-center">กลุ่มรายการ</th>
                                                        <th className="text-center">จำนวนเงิน</th>
                                                        <th className="text-center">คำอธิบาย</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td className="text-center">23/10/2560</td>
                                                        <td className="text-center">รายรับ</td>
                                                        <td className="text-center">ภาคการเกษตร</td>
                                                        <td className="text-center">4,000.00</td>
                                                        <td>ขายผัก</td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center">23/10/2560</td>
                                                        <td className="text-center">รายรับ</td>
                                                        <td className="text-center">ภาคการเกษตร</td>
                                                        <td className="text-center">4,000.00</td>
                                                        <td>ขายผัก</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane background-white" id="tab5">
                                <section className="widget widget-custom-padding">
                                    <div className="widget-body">
                                        <div className="row">
                                            <div className="col-md-9 col-lg-8"
                                                 style={{padding: '10px 20px 10px 10px'}}>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <h3 className="page-title"
                                                            id="calender-current-date">Calendar</h3>
                                                    </div>
                                                    <div className="col-sm-6 text-right">
                                                        <div className="calendar-controls">
                                                            <div className="btn-group">
                                                                <button className="btn btn-default"
                                                                        id="calender-prev"><i
                                                                    className="fa fa-angle-left"/></button>
                                                                <button className="btn btn-default"
                                                                        id="calender-next"><i
                                                                    className="fa fa-angle-right"/></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="calendar" className="calendar"/>
                                            </div>
                                            <div className="col-md-3 col-lg-4">
                                                <div className="row">
                                                    <div className="col-md-12 text-right">
                                                        <button type="button" className="btn btn-info"><i
                                                            className="fa fa-plus"/> เพิ่มการฝึกอบรม
                                                        </button>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className="section-title font-bold no-margin">
                                                    <span>ข้อมูลการอบรม</span>
                                                </div>
                                                <div className="calendar-external-events no-margin"
                                                     id="external-events">
                                                    <div id="preValue" className="text-center"
                                                         style={{padding: '100px 20px', color: '#D8DDE6'}}>
                                                        <i className="icon-presentation" aria-hidden="true"
                                                           style={{fontSize: '6em'}}/>
                                                        <h5>กรุณาเลือกการอบรม</h5>
                                                    </div>
                                                    <div id="myModal" style={{display: 'none'}}>
                                                        <div className="modal-body">
                                                            <div className="text-element">
                                                                <p id="event-name"
                                                                   className="element-value">value</p>
                                                            </div>
                                                            <br/>
                                                            <div className="text-element">
                                                                <span className="element-label">วันที่เริ่ม</span>
                                                                <p id="event-start"
                                                                   className="element-value">value</p>
                                                            </div>
                                                            <br/>
                                                            <div className="text-element">
                                                                <span className="element-label">วันที่สิ้นสุด</span>
                                                                <p id="event-end"
                                                                   className="element-value">value</p>
                                                            </div>
                                                            <br/>
                                                            <div className="text-element">
                                                                <span className="element-label">รุ่นที่</span>
                                                                <p id="event-generation"
                                                                   className="element-value">value</p>
                                                            </div>
                                                            <br/>
                                                            <div className="text-element">
                                                                <span className="element-label">สถานที่</span>
                                                                <p id="event-place"
                                                                   className="element-value">value</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="section-title font-bold">
                                                    <span>ประวัติการอบรม</span>
                                                </div>
                                                <table className="table table-striped text-center">
                                                    <thead>
                                                    <tr>
                                                        <th className="text-center">สูตรฝึกอบรม</th>
                                                        <th className="text-center">รุ่นที่</th>
                                                        <th className="text-center">วันที่เริ่ม</th>
                                                        <th className="text-center">วันที่สิ้นสุด</th>
                                                        <th className="text-center">สถานที่อบรม</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td className="text-center">
                                                            <a href="#"
                                                               className="btn btn-link">AB101-เกษตรทฤษฎีใหม่</a>
                                                        </td>
                                                        <td className="text-center">10</td>
                                                        <td className="text-center"><span>23/10/2559 08:00</span>
                                                        </td>
                                                        <td className="text-center"><span>23/10/2559 18:00</span>
                                                        </td>
                                                        <td className="text-center">
                                                            <span>ศูนย์ประชุมแห่งชาติสิริกิติ์</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="tab-pane background-white" id="tab6">
                                <section className="widget widget-custom-padding">
                                    <div className="widget-body">
                                        <div className="row">
                                            <div className="col-md-9 col-lg-8"
                                                 style={{padding: '10px 20px 10px 10px'}}>
                                                <div className="row">
                                                    <div className="col-sm-6">
                                                        <h3 className="page-title"
                                                            id="calender-activity-current-date">
                                                            Calendar</h3>
                                                    </div>
                                                    <div className="col-sm-6 text-right">
                                                        <div className="calendar-controls">
                                                            <div className="btn-group">
                                                                <button className="btn btn-default"
                                                                        id="calender-activity-prev">
                                                                    <i className="fa fa-angle-left"/></button>
                                                                <button className="btn btn-default"
                                                                        id="calender-activity-next">
                                                                    <i className="fa fa-angle-right"/></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="calendar-activity" className="calendar"/>
                                            </div>
                                            <div className="col-md-3 col-lg-4">
                                                <div className="row">
                                                    <div className="col-md-12 text-right">
                                                        <button type="button" className="btn btn-info"><i
                                                            className="fa fa-plus"/> เพิ่มกิจกรรม
                                                        </button>
                                                    </div>
                                                </div>
                                                <br/>
                                                <div className="section-title font-bold no-margin">
                                                    <span>ข้อมูลกิจกรรม</span>
                                                </div>
                                                <div className="calendar-external-events no-margin"
                                                     id="external-events">
                                                    <div id="preValue-activity" className="text-center"
                                                         style={{padding: '100px 20px', color: '#D8DDE6'}}>
                                                        <i className="fa fa-trophy" aria-hidden="true"
                                                           style={{fontSize: '6em'}}/>
                                                        <h5>กรุณาเลือกกิจกรรม</h5>
                                                    </div>
                                                    <div id="myModal-activity" style={{display: 'none'}}>
                                                        <div className="modal-body">
                                                            <div className="text-element">
                                                                <p id="event-name"
                                                                   className="element-value">value</p>
                                                            </div>
                                                            <br/>
                                                            <div className="text-element">
                                                                <span className="element-label">วันที่เริ่ม</span>
                                                                <p id="event-start"
                                                                   className="element-value">value</p>
                                                            </div>
                                                            <br/>
                                                            <div className="text-element">
                                                                <span className="element-label">วันที่สิ้นสุด</span>
                                                                <p id="event-end"
                                                                   className="element-value">value</p>
                                                            </div>
                                                            <br/>
                                                            <div className="text-element">
                                                                    <span
                                                                        className="element-label">พื้นที่ทำกิจกรรม</span>
                                                                <p id="event-where"
                                                                   className="element-value">value</p>
                                                            </div>
                                                            <br/>
                                                            <div className="text-element">
                                                                <span className="element-label">สถานที่</span>
                                                                <p id="event-place"
                                                                   className="element-value">value</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="section-title font-bold">
                                                    <span>ประวัติการอบรม</span>
                                                </div>
                                                <table className="table table-striped text-center">
                                                    <thead>
                                                    <tr>
                                                        <th className="text-center">สูตรฝึกอบรม</th>
                                                        <th className="text-center">รุ่นที่</th>
                                                        <th className="text-center">วันที่เริ่ม</th>
                                                        <th className="text-center">วันที่สิ้นสุด</th>
                                                        <th className="text-center">สถานที่อบรม</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td className="text-center">
                                                            <a href="#"
                                                               className="btn btn-link">AB101-เกษตรทฤษฎีใหม่</a>
                                                        </td>
                                                        <td className="text-center">10</td>
                                                        <td className="text-center"><span>23/10/2559 08:00</span>
                                                        </td>
                                                        <td className="text-center"><span>23/10/2559 18:00</span>
                                                        </td>
                                                        <td className="text-center">
                                                            <span>ศูนย์ประชุมแห่งชาติสิริกิติ์</span>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="tab-pane" id="tab7">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <section className="widget box-icon-widget">
                                            <div className="widget-body">
                                                <div className="stats-row">
                                                    <div className="stat-item item-col-icon font-icon-box">
                                                        <span className="icon-payment-method"/>
                                                    </div>
                                                    <div className="stat-item item-col-block">
                                                        <h6 className="name">อุปกรณ์ที่เคยยืมทั้งหมด</h6>
                                                        <p className="value font-bold text-right font-big">3</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="col-sm-4">
                                        <section className="widget box-icon-widget">
                                            <div className="widget-body">
                                                <div className="stats-row">
                                                    <div className="stat-item item-col-icon font-icon-box">
                                                        <span className="icon-money"/>
                                                    </div>
                                                    <div className="stat-item item-col-block">
                                                        <h6 className="name">อุปกรณ์ที่คืนแล้ว</h6>
                                                        <p className="value font-bold text-right font-big">2</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="col-sm-4">
                                        <section className="widget box-icon-widget">
                                            <div className="widget-body">
                                                <div className="stats-row">
                                                    <div className="stat-item item-col-icon font-icon-box">
                                                        <span className="icon-piggy-bank"/>
                                                    </div>
                                                    <div className="stat-item item-col-block">
                                                        <h6 className="name">อุปกรณ์ที่อยู่ระหว่างการ</h6>
                                                        <p className="value font-bold text-right font-big">1</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                                <section className="widget">
                                    <div className="widget-body">
                                        <div className="section-title font-bold">
                                            <span>อุปกรณ์ที่อยู่ในระหว่างการยืม</span>
                                        </div>
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th className="text-center">อุปกรณ์</th>
                                                <th className="text-center">สถานะ</th>
                                                <th className="text-center">วันที่ยืมอุปกรณ์</th>
                                                <th className="text-center">ผู้ยืมและหน่วยงาน</th>
                                                <th className="text-center">สถานที่ใช้งาน</th>
                                                <th className="text-center">คำอธิบาย</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td><strong>A0001 - อุปกรณ์ A</strong><br/>
                                                    รุ่น : A01<br/>
                                                    ยี่ห้อ : YAMAHA
                                                </td>
                                                <td className="text-center"><span
                                                    className="badge badge-danger">ยืม</span></td>
                                                <td className="text-center">23/10/2560</td>
                                                <td className="text-center">นายสวัสดี - สหกรณ์การเกษตรบ้านน้ำมูล
                                                </td>
                                                <td className="text-center">ไร่บ้านดินดี</td>
                                                <td>-</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <br/>
                                        <div className="section-title font-bold">
                                            <span>ประวัติการยืมอุปกรณ์ทั้งหมด</span>
                                        </div>
                                        <table className="table table-striped">
                                            <thead>
                                            <tr>
                                                <th className="text-center">อุปกรณ์</th>
                                                <th className="text-center">สถานะ</th>
                                                <th className="text-center">วันที่ยืมอุปกรณ์</th>
                                                <th className="text-center">วันที่คืนอุปกรณ์</th>
                                                <th className="text-center">ผู้ยืมและหน่วยงาน</th>
                                                <th className="text-center">ผู้คืนและหน่วยงาน</th>
                                                <th className="text-center">สถานที่ใช้งาน</th>
                                                <th className="text-center">คำอธิบาย</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td><strong>A0001 - อุปกรณ์ A</strong><br/>
                                                    รุ่น : A01<br/>
                                                    ยี่ห้อ : YAMAHA
                                                </td>
                                                <td className="text-center"><span className="badge">คืน</span></td>
                                                <td className="text-center">23/10/2560</td>
                                                <td className="text-center">26/10/2560</td>
                                                <td className="text-center">นายสวัสดี - สหกรณ์การเกษตรบ้านน้ำมูล
                                                </td>
                                                <td className="text-center">นายสวัสดี - สหกรณ์การเกษตรบ้านน้ำมูล
                                                </td>
                                                <td className="text-center">ไร่บ้านดินดี</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td><strong>A0001 - อุปกรณ์ A</strong><br/>
                                                    รุ่น : A01<br/>
                                                    ยี่ห้อ : YAMAHA
                                                </td>
                                                <td className="text-center"><span className="badge">คืน</span></td>
                                                <td className="text-center">23/10/2560</td>
                                                <td className="text-center">26/10/2560</td>
                                                <td className="text-center">นายสวัสดี - สหกรณ์การเกษตรบ้านน้ำมูล
                                                </td>
                                                <td className="text-center">นายสวัสดี - สหกรณ์การเกษตรบ้านน้ำมูล
                                                </td>
                                                <td className="text-center">ไร่บ้านดินดี</td>
                                                <td>-</td>
                                            </tr>
                                            <tr>
                                                <td><strong>A0001 - อุปกรณ์ A</strong><br/>
                                                    รุ่น : A01<br/>
                                                    ยี่ห้อ : YAMAHA
                                                </td>
                                                <td className="text-center"><span
                                                    className="badge badge-danger">ยืม</span></td>
                                                <td className="text-center">23/10/2560</td>
                                                <td className="text-center">-</td>
                                                <td className="text-center">นายสวัสดี - สหกรณ์การเกษตรบ้านน้ำมูล
                                                </td>
                                                <td className="text-center">นายสวัสดี - สหกรณ์การเกษตรบ้านน้ำมูล
                                                </td>
                                                <td className="text-center">ไร่บ้านดินดี</td>
                                                <td>-</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default NewComponent