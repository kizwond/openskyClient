import React, { Component } from 'react';
import { Modal, Button,Input } from 'antd';

class RequestModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }
    
    render() { 
        return (
            <>
                <Button size="small" onClick={this.props.showModal} style={{fontSize:"12px"}}>판매요청</Button>
                <Modal title="책 판매 등록" visible={this.props.isModalVisible} onOk={this.props.handleOk} onCancel={this.props.handleCancel}>
                   <div>
                       <ul>
                           <li style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                               <span style={{width:"100px"}}>썸네일</span>
                               <Input type="file"></Input>
                           </li>
                           <li style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <span style={{width:"100px"}}>책소개</span>
                                <span><textarea name="index" id="index"></textarea></span>
                           </li>
                           <li style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <span style={{width:"100px"}}>저자소개</span>
                                <span><textarea name="index" id="index"></textarea></span>
                           </li>
                           <li style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                               <span style={{width:"100px"}}>목차</span>
                               <span><textarea name="index" id="index"></textarea></span>
                           </li>
                           <li style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                               <span style={{width:"100px"}}>희망가격</span>
                               <span><Input></Input></span>
                           </li>
                           <li style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <span><Button size="small" style={{fontSize:"12px"}}>임시저장</Button></span>
                            <span><Button size="small" style={{fontSize:"12px"}}>등록</Button></span>
                            <span><Button size="small" style={{fontSize:"12px"}}>취소</Button></span>
                           </li>
                       </ul>
                   </div>
                </Modal>
            </>
          );
    }
}
 
export default RequestModal;

