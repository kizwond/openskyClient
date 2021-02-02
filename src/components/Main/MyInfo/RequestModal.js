import React, { Component } from 'react';
import {Form, Modal, Button,Input,InputNumber } from 'antd';
import axios from 'axios'

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
      };
      //permit-book-sell
    
    render() { 
        return (
            <>
                <Button size="small" onClick={this.props.showModal} style={{fontSize:"12px"}}>판매요청</Button>
                <Modal title="책 판매 등록" visible={this.props.isModalVisible} onOk={this.props.handleOk} onCancel={this.props.handleCancel}>
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
                                <span><Button size="small" style={{fontSize:"12px"}}>임시저장</Button></span>
                                <span>
                                    <Form.Item>
                                            <Button htmlType="submit" size="small" style={{fontSize:"12px"}} >등록</Button>
                                    </Form.Item>
                                </span>
                                <span><Button size="small" style={{fontSize:"12px"}}>취소</Button></span>
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

