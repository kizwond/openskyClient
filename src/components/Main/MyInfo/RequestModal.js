import React, { Component } from 'react';
import {Form, Modal, Input,InputNumber } from 'antd';
import axios from 'axios'
import DefaultButton from '../../../styledComponents/defaultButton'


const { TextArea } = Input;

class RequestModal extends Component {
    constructor(props) {
        super(props);
        this.state = { 
         }
    }

    onFinish = values => {
        console.log(values);
        console.log(this.props.book_id)
        values.book_id = this.props.book_id;
        console.log(values)
        axios.post('api/bookstore/req-book-sell',{
          book_id: values,
        }).then(res => {
          console.log(res.data)
        })
        this.props.showCandiBookList()
        this.props.handleOk()
        
      };
      //permit-book-sell
    
    render() { 
        return (
            <>
                <DefaultButton size="small" onClick={this.props.showModal} >판매요청</DefaultButton>
                <Modal footer={null} title="책 판매 등록" visible={this.props.isModalVisible} onOk={this.props.handleOk} onCancel={this.props.handleCancel}>
                    <Form
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        >
                    <div>
                        <ul>
                            <li style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <span style={{width:"100px"}}>썸네일</span>
                                <Input type="file"></Input>
                            </li>
                            <li style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <span style={{width:"100px"}}>책소개</span>
                                <span>
                                    <Form.Item name="book_info">
                                        <TextArea rows={4} />
                                    </Form.Item>
                                </span>
                            </li>
                            <li style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <span style={{width:"100px"}}>저자소개</span>
                                <span>
                                    <Form.Item name="profile">
                                        <TextArea rows={4} />
                                    </Form.Item>
                                </span>
                            </li>
                            <li style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <span style={{width:"100px"}}>목차</span>
                                <span>
                                    <Form.Item name="index">
                                        <TextArea rows={4} />
                                    </Form.Item>
                                </span>
                            </li>
                            <li style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <span style={{width:"100px"}}>희망가격</span>
                                <Form.Item name="price">
                                        <InputNumber></InputNumber>
                                </Form.Item>
                            </li>
                            <li style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <span><DefaultButton width="100px" type="primary" size="small">임시저장</DefaultButton></span>
                                <span>
                                    <Form.Item>
                                            <DefaultButton width="100px" type="primary" htmlType="submit" size="small" >등록</DefaultButton>
                                    </Form.Item>
                                </span>
                                <span><DefaultButton width="100px" type="primary" size="small" onClick={this.props.handleOk}>취소</DefaultButton></span>
                            </li>
                        </ul>
                    </div>
                    </Form>
                </Modal>
            </>
          );
    }
}
 
export default RequestModal;

