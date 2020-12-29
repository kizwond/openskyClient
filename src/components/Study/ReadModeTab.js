import React, { Component } from 'react';
import { Radio,Row, Col,Button,Switch,Tabs,Form, Input, Checkbox, InputNumber   } from 'antd';

class ReadModeTab extends Component {
  constructor(props) {
    super(props);
    this.state = { 

     };
  }
  render() {
    return (
      <>
      <div>정렬</div>
                <Form
                    name="settings"
                    initialValues={{
                      read_card: true,
                      study_all_read_card:false,
                      yet_card:false
                    }}
                    onFinish={this.props.onFinish}
                  >
                    <Form.Item
                      name="sort_value"
                    >
                     <div style={{border:"1px solid lightgrey", background:"white", borderRadius:"5px", padding:"5px", textAlign:"left"}}>
                        <Radio.Group onChange={this.onChangeMode} value={this.state.mode}>
                          <Radio value="normal" style={{fontSize:"11px"}}>
                            기본(순서대로)
                          </Radio>
                          <Radio value="review" style={{fontSize:"11px"}}>
                            복습시점 빠른 순
                          </Radio>
                          <Radio value="random" style={{fontSize:"11px"}}>
                            랜덤하게
                          </Radio>
                        </Radio.Group>
                      </div>
                    </Form.Item>
                    <div>필터</div>
                    <div style={{border:"1px solid lightgrey", background:"white", borderRadius:"5px", padding:"5px", textAlign:"left"}}>

                      <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                        <Form.Item
                          name="read_card"
                          valuePropName="checked"
                        >
                          <span  style={{fontSize:"11px"}}>읽기카드 </span> <Switch size="small" />
                        </Form.Item>
                        <Form.Item
                          name="study_all_read_card"
                          valuePropName="checked"
                        >
                          <Checkbox style={{fontSize:"11px"}}>
                            모든카드 다보기
                          </Checkbox>
                        </Form.Item>
                      </div>

                      <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                        <Form.Item
                          name="yet_card"
                          valuePropName="checked"
                        >
                          <span style={{fontSize:"11px"}}>미학습카드 </span> <Switch size="small" />
                        </Form.Item>
                        <Form.Item
                          name="yet_card_num"
                          noStyle
                        >
                          <InputNumber size="small" defaultValue={0} style={{fontSize:"11px"}} /> <Button style={{fontSize:"11px"}} size="small">All</Button>
                        </Form.Item>
                      </div>

                      <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                        <Form.Item
                          name="ing_card"
                          valuePropName="checked"
                        >
                          <span style={{fontSize:"11px"}}>학습중카드 </span> <Switch size="small" />
                        </Form.Item>
                        <Form.Item
                          name="ing_card_num"
                          noStyle
                        >
                          <InputNumber size="small" defaultValue={0} style={{fontSize:"11px"}} /> <Button style={{fontSize:"11px"}} size="small">All</Button>
                        </Form.Item>
                      </div>

                      <div style={{border:"1px solid lightgrey", background:"white", borderRadius:"5px", padding:"5px", textAlign:"left"}}>
                        <Form.Item
                          name="ing_card_detail"
                        >
                          <Radio.Group onChange={this.onChangeMode} value={this.state.mode}>
                            <Radio value="ing_all" style={{fontSize:"11px"}}>
                              모든학습중카드
                            </Radio>
                            <Radio value="limit_now" style={{fontSize:"11px"}}>
                              현시간기준 복습필요카드만
                            </Radio>
                            <Radio value="limit_today" style={{fontSize:"11px"}}>
                              오늘까지 복습필요카드만
                            </Radio>
                          </Radio.Group>
                        </Form.Item>
                      </div>

                      <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                        <Form.Item
                          name="completed_card"
                          valuePropName="checked"
                        >
                          <span style={{fontSize:"11px"}}>학습완료카드 </span> <Switch size="small" />
                        </Form.Item>
                        <Form.Item
                          name="completed_card_num"
                          noStyle
                        >
                          <InputNumber size="small" defaultValue={0} style={{fontSize:"11px"}} /> <Button style={{fontSize:"11px"}} size="small">All</Button>
                        </Form.Item>
                      </div>

                      <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                        <Form.Item
                          name="suspend_card"
                          valuePropName="checked"
                        >
                          <span style={{fontSize:"11px"}}>학습보류카드 </span> <Switch size="small" />
                        </Form.Item>
                        <Form.Item
                          name="suspend_card_num"
                          noStyle
                        >
                          <InputNumber size="small" defaultValue={0} style={{fontSize:"11px"}} /> <Button style={{fontSize:"11px"}} size="small">All</Button>
                        </Form.Item>
                      </div>


                    </div>


                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                  </>
    );
  }
}

export default ReadModeTab;