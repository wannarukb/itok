import React from 'react'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {searchMember} from "../duck/member";
import {Field, reduxForm} from "redux-form";

const TextField = ({input, description}) =>
    (
        <div>
            <p className="text-desc">{description}</p>
            <input type="text" className="form-control" {...input}/>
        </div>
    );

const NewComponent = ({list, search, handleSubmit}) =>
    (
        <div style={{padding: "20px 20px 42px"}}>
            <div className="row">
                <div className="col-md-12 font-supermarket">
                    <h2>ค้นหาข้อมูลสมาชิก</h2>
                </div>
            </div>
            <div className="row margin-bottom-xs">
                <form action={'#'} onSubmit={handleSubmit}>
                    <div className="col-md-3">
                        <Field name={'nameSearch'} component={TextField} description={'ชื่อสมาชิก'}/>
                    </div>
                    <div className="col-md-3">

                        <Field name={'telSearch'} component={TextField} description={'เบอร์โทรศัพท์'}/>

                    </div>
                    <div className="col-md-3">

                        <Field name={'provinceSearch'} component={TextField} description={'จังหวัด'}/>

                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-primary btn-full-width button-search" type={'submit'}>
                            <i className="fa fa-search"/> ค้นหา
                        </button>
                    </div>
                    <div className="col-md-2 ">
                        <p className=" text-right">
                            <button className="btn btn-success btn-full-width button-search">
                                <i className="fa fa-plus"/> เพิ่มสมาชิกใหม่
                            </button>
                            {/*<a data-th-href="@{/member/new}" class="btn btn-success btn-full-width button-search" >*/}
                            {/*<i class="fa fa-plus"></i> สร้างเครือข่ายใหม่*/}
                            {/*</a>*/}
                        </p>
                    </div>
                </form>
            </div>
            <div className="row" id="farmPanel">
                <div className="col-md-12">
                    <div className="panel-group mb-lg" id="accordion" data-toggle="collapse"
                         data-th-remove="all-but-first">
                        {
                            list.map((it, index) =>
                                <div className="panel panel-default" key={it.id}>
                                    <div className="panel-heading panel-heading-white collapsed">
                                        <h5 className="panel-title">
                                            <div className="row">
                                                <a className="collapsed" data-toggle="collapse"
                                                   href={'#collapse' + index}
                                                   data-th-href="'#collapse' + ${lStat.index}">
                                                    <div className="col-sm-1 text-center ">
                                                        {/*<i className="fa fa-user" aria-hidden="true"*/}
                                                        {/*style={{fontSize: '2.5em'}} data-th-if="${l.image == null}"/>*/}
                                                        <span className={'icon-farmer'}
                                                              style={{fontSize: '4em', color: '#779543'}}/>
                                                        <img data-th-src="${l.image.imageUrl} + '=s50-c'"
                                                             data-th-if="${l.image} != null" className=" img-circle"/>
                                                    </div>
                                                    <div className="col-sm-3">
                                                        <Link to={'/member/view/' + it.id}
                                                              className="color-green"><strong
                                                            data-th-text="*{firstName} + ' ' + *{lastName}">{it.name}</strong></Link>
                                                        <p className="font-medium color-dark"
                                                           data-th-text="*{nickname}">{it.totalField}
                                                            Farms</p>
                                                        {/*<p class="font-xs-small color-grey"*/}
                                                        {/*data-th-text="${#lists.size(#object.memberLands)} + ' Farms'">2 Farms</p>*/}
                                                    </div>
                                                    <div className="col-sm-4">
                                                        {/*<p data-th-text="*{mobile}" class="font-medium color-dark"></p>*/}
                                                        {/*<p data-th-text="*{address}" class="font-medium color-dark"></p>*/}
                                                        <p className="font-medium color-dark">{it.province}</p>
                                                        <span className="font-xs-small color-grey"
                                                              data-th-text="${#lists.size(#object.memberLands)} + ' Fields - ' + ${@memberLandServiceImpl.getTotalSize(#object.memberLandsTemp)}">
                                                            {it.totalField} ไร่ เนื้อที่รวม {it.totalArea} ไร่</span>
                                                    </div>
                                                    <div className="col-sm-2">
                                                        <p data-th-text="*{membershipTemp.type}"
                                                           className="font-medium color-dark"/>
                                                        {/*<p data-th-text="*{membershipTemp.typeOrganization}"*/}
                                                        {/*class="font-medium"></p>*/}
                                                    </div>
                                                </a>
                                                <div className="col-sm-2 text-right">
                                                    <button className=" btn btn-primary btn-sm"
                                                            data-th-onclick="'window.location=\'' + @{/member/{id}(id=${l.id})} + '\''">
                                                        <i className="icon-farmer"
                                                           style={{
                                                               fontSize: '1em',
                                                               color: '#FFF !important'
                                                           }}/> ดูข้อมูลสมาชิก
                                                    </button>
                                                    {/*<a class="btn btn-primary btn-full-width"  data-th-onclick="'window.location=\'' + @{/member/{id}(id=${l.id})} + '\''">*/}
                                                    {/*<i class="fa fa-user"></i>*/}
                                                    {/*ดูข้อมูลสมาชิก*/}
                                                    {/*</a>*/}
                                                    {/*</a>*/}
                                                </div>
                                            </div>
                                        </h5>
                                    </div>
                                    <div id={'collapse' + index} className="panel-collapse collapse"
                                         data-th-id="'collapse' + ${lStat.index}">
                                        <table className="table table-striped text-center"
                                               style={{width: '97%', margin: '20px auto', border: '1px solid #ddd'}}>
                                            <thead>
                                            <tr>
                                                <th className="text-center"/>
                                                <th className="text-center">ชื่อแปลงที่ดิน</th>
                                                <th className="text-center">ชื่อสมาชิก</th>
                                                <th className="text-center">ขนาด (ไร่. วา. ตร.วา.)</th>
                                                <th className="text-center">จังหวัด</th>
                                                <th className="text-center">ลุ่มน้ำ</th>
                                                <th className="text-center"/>
                                            </tr>
                                            </thead>
                                            <tbody data-th-remove="all-but-first" data-th-each="k : *{memberLandsTemp}">

                                            {it.memberListArea.map((it2, index2) => <tr>
                                                    <td>
                                                        <div className="color-dark-blue font-icon-box">
                                                            <span className="icon-farm"/>
                                                        </div>

                                                    </td>
                                                    <td><span><strong data-th-text="${k.name}">{it2.name}</strong></span>
                                                    </td>
                                                    <td><span
                                                        data-th-text="*{firstName} + ' ' + *{lastName}">{it2.ownerName}</span>
                                                    </td>
                                                    <td><span data-th-text="${k.getSize()}">{it2.areaText}</span></td>
                                                    <td><strong data-th-text="${k.address.province}">{it.province}</strong></td>
                                                    <td><span>{it.basin}</span></td>
                                                    <td>
                                                        <button className=" btn btn-danger btn-sm"
                                                                data-th-onclick="'window.location=\'' + @{/land/{id}(id=${k.id})} + '\''">
                                                            <i className="icon-barn2"/> ดูข้อมูลแปลงที่ดิน
                                                        </button>
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                    </div>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-sm-12 text-center"
                     data-th-replace="fragments/Paging :: paging(${page}, ${totalPages})">
                    <ul className="pagination">
                        <li><a href="#">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">3</a></li>
                        <li><a href="#">4</a></li>
                        <li><a href="#">5</a></li>
                        <li><a href="#">...</a></li>
                        <li><a href="#">12</a></li>
                        <li><a href="#">ต่อไป &gt;</a></li>
                    </ul>
                </div>
            </div>
            {/* The Loader. Is shown when pjax happens */}
            <div className="loader-wrap hiding hide">
                <i className="fa fa-circle-o-notch fa-spin-fast"/>
            </div>
        </div>
    );

NewComponent.PropTypes = {
    list: PropTypes.array.isRequired,
};

function mapStateToProp(state) {
    return {
        list: state.member.members
    }
}

function mapDispatchToProp(dispatch) {
    return {search: () => dispatch(searchMember())}
}

export default reduxForm({
    form: 'searchMember',
    onSubmit: (value, dispatch) => {
        let query = '';
        if (value.nameSearch && value.nameSearch.length !== 0) query += 'name="' + value.nameSearch + '" ';
        if (value.telSearch && value.telSearch.length !== 0) query += 'tel="' + value.telSearch + '" ';
        if (value.provinceSearch && value.provinceSearch.length !== 0) query += 'province="' + value.provinceSearch + '" ';
        dispatch(searchMember(query))
    }
})(connect(mapStateToProp, mapDispatchToProp)(NewComponent))