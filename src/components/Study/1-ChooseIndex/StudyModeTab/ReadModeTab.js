import React, { Component } from 'react';
import { Radio, Button,Switch,Form, Space, Input, InputNumber } from 'antd';
import './StudyModeTab.css'
import AdvancedFilterModal from './AdvancedFilterModal'
class ReadModeTab extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      modalVisible:false,
     };
  }
  showModal = () => {
    this.setState({
      modalVisible:true
    });
  };

  handleOk = () => {
    this.setState({
      modalVisible:false
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible:false
    });
  };


  render() {
    return (
      <>
        <div style={{fontSize:"13px", fontWeight:"700"}}>보기순서 정렬</div>
        <Form
            name="settings"
            initialValues={{
              read_card: true,
              study_all_read_card:false,
              yet_card:false
            }}
            onFinish={this.props.onFinish}
            size="small"
            className="read_setting"
          >
            <Form.Item
              name="sort_value"
            >
              <div style={{border:"1px solid lightgrey", background:"white", borderRadius:"5px", padding:"5px", textAlign:"left"}}>
                <Radio.Group onChange={this.onChangeMode} value={this.state.mode} style={{display:"flex", flexDirection:"column"}}>
                  <Radio value="normal" style={{fontSize:"11px"}}>
                    원본 그대로
                  </Radio>
                  <Radio value="review" style={{fontSize:"11px"}}>
                    복습시점 빠른 순으로 정렬
                  </Radio>
                  <Radio value="random" style={{fontSize:"11px"}}>
                    랜덤하게 섞기
                  </Radio>
                </Radio.Group>
              </div>
            </Form.Item>
            <div style={{fontSize:"13px", fontWeight:"700"}}>필터 설정</div>
            <div style={{border:"1px solid lightgrey", background:"white", borderRadius:"5px", padding:"5px", textAlign:"left"}}>
              <div style={{fontSize:"13px", fontWeight:"700"}}>카드종류</div>
              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="read_card"
                  valuePropName="checked"
                >
                  <span  style={{fontSize:"11px", marginLeft:"20px"}}>읽기카드 </span> <Switch size="small" />
                </Form.Item>
              </div>
              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="flip_card"
                  valuePropName="checked"
                >
                  <span  style={{fontSize:"11px", marginLeft:"20px"}}>뒤집기카드 </span> <Switch size="small" />
                </Form.Item>
              </div>
              <div style={{fontSize:"13px", fontWeight:"700"}}>학습상태</div>
              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="read_yet_card"
                  valuePropName="checked"
                >
                  <span style={{fontSize:"11px", marginLeft:"20px"}}>미학습카드 </span> <Switch size="small" />
                </Form.Item>
              </div>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="read_ing_card"
                  valuePropName="checked"
                >
                  <span style={{fontSize:"11px", marginLeft:"20px"}}>학습중카드 </span> <Switch size="small" />
                </Form.Item>
              </div>

              <div style={{background:"white", padding:"5px", textAlign:"left"}}>
                <Form.Item
                  name="read_ing_card_detail"
                >
                  <Radio.Group onChange={this.onChangeMode} value={this.state.mode} style={{marginLeft:"30px", display:"flex", flexDirection:"column", textAlign:"left"}}>
                    <Radio value="ing_all" style={{fontSize:"11px"}}>
                      전체카드
                    </Radio>
                    <Radio value="limit_now" style={{fontSize:"11px"}}>
                      금일자정이전 복습필요 카드만
                    </Radio>
                    <Radio value="limit_today" style={{fontSize:"11px"}}>
                      현재시간이전 복습필요 카드만
                    </Radio>
                    <Radio value="self_setting" style={{fontSize:"11px"}}>
                      복습시점 직접설정
                    </Radio>
                  </Radio.Group>
                  <Input.Group compact>
                    <Space size="small" direction="horizontal" style={{display:"flex"}}>
                    <InputNumber style={{ width: 100, textAlign: 'center' }} />
                    ~
                    <InputNumber style={{ width: 100, textAlign: 'center' }}  />
                    </Space>
                  </Input.Group>
                </Form.Item>
              </div>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="read_completed_card"
                  valuePropName="checked"
                >
                  <span style={{fontSize:"11px", marginLeft:"20px"}}>학습완료카드 </span> <Switch size="small" />
                </Form.Item>
              </div>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="read_suspend_card"
                  valuePropName="checked"
                >
                  <span style={{fontSize:"11px", marginLeft:"20px"}}>학습보류카드 </span> <Switch size="small" />
                </Form.Item>
              </div>
              <div style={{textAlign:"right"}}><Button size="small" style={{fontSize:"11px"}} onClick={this.showModal}>고급필터</Button> <Switch size="small" /></div>
              <AdvancedFilterModal modalVisible={this.state.modalVisible} handleOk={this.handleOk} handleCancel={this.handleCancel}/>
            </div>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
              <Form.Item
                  name="read_suspend_card"
                  valuePropName="checked"
                >
                  <span style={{fontSize:"13px", fontWeight:"700"}}>학습량 설정 </span> <Switch size="small" />
              </Form.Item>
            </div>
            <div style={{border:"1px solid lightgrey", background:"white", borderRadius:"5px", padding:"5px", textAlign:"left"}}>
              <Form.Item
                    name="read_completed_card"
                    valuePropName="checked"
                    label="미학습카드"
                  >
                    <InputNumber></InputNumber>
              </Form.Item>
              <Form.Item
                    name="read_completed_card"
                    valuePropName="checked"
                    label="학습중카드"
                  >
                    <InputNumber></InputNumber>
              </Form.Item>
              <Form.Item
                    name="read_completed_card"
                    valuePropName="checked"
                    label="학습완료카드"
                  >
                    <InputNumber></InputNumber>
              </Form.Item>
              <Form.Item
                    name="read_completed_card"
                    valuePropName="checked"
                    label="학습보류카드"
                  >
                    <InputNumber></InputNumber>
              </Form.Item>
            </div>
            <Form.Item>
            <div style={{height:"100px", backgroundColor:"#dfecf6", lineHeight:"100px", marginTop:"10px"}}>
              <Button htmlType="submit" onClick={this.startStudy} style={{color:"white", fontWeight:"700", background:"#69d316", width:"200px", height:"50px"}}>세션 시작하기</Button>
            </div>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default ReadModeTab;