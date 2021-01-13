import React, { Component } from 'react';
import { Radio, Button,Switch,Form, Space, DatePicker, InputNumber } from 'antd';
import './StudyModeTab.css'
import AdvancedFilterModal from './AdvancedFilterModal'

const { RangePicker } = DatePicker;


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
              sort_option: "standard",
              read_card:true,
              flip_card:true,
              yet:true,
              ing:true,
              completed:true,
              hold:true,
              collect_criteria:"all",
              advanced_filter_mode:false,
              study_quantity_use_switch:true,
              yet_card_num:1,
              ing_card_num:1,
              completed_card_num:1,
              hold_card_num:1,
              
            }}
            onFinish={this.props.onFinish}
            size="small"
            className="read_setting"
          >
            <div style={{border:"1px solid lightgrey", background:"white", borderRadius:"5px", padding:"5px", textAlign:"left", display:"column", justifyContent:"start"}}>
              <Form.Item
                name="sort_option"
              >
                <Radio.Group style={{display:"flex", flexDirection:"column"}}>
                  <Radio value="standard" style={{fontSize:"11px"}}>
                    원본 그대로
                  </Radio>
                  <Radio value="time" style={{fontSize:"11px"}}>
                    복습시점 빠른 순으로 정렬
                  </Radio>
                  <Radio value="random" style={{fontSize:"11px"}}>
                    랜덤하게 섞기
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div style={{fontSize:"13px", fontWeight:"700"}}>필터 설정</div>
            <div style={{border:"1px solid lightgrey", background:"white", borderRadius:"5px", padding:"5px", textAlign:"left"}}>
              <div style={{fontSize:"13px", fontWeight:"700"}}>카드종류</div>
              <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
              <span  style={{fontSize:"11px", marginLeft:"20px"}}>읽기카드 </span> 
                <Form.Item
                  name="read_card"
                  valuePropName="checked"
                >
                  <Switch size="small" />
                </Form.Item>
              </div>
              <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
              <span  style={{fontSize:"11px", marginLeft:"20px"}}>뒤집기카드 </span> 
                <Form.Item
                  name="flip_card"
                  valuePropName="checked"
                >
                  <Switch size="small" />
                </Form.Item>
              </div>
              <div style={{fontSize:"13px", fontWeight:"700"}}>학습상태</div>
              <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
              <span style={{fontSize:"11px", marginLeft:"20px"}}>미학습카드 </span>
                <Form.Item
                  name="yet"
                  valuePropName="checked"
                >
                   <Switch size="small" />
                </Form.Item>
              </div>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
              <span style={{fontSize:"11px", marginLeft:"20px"}}>학습중카드 </span> 
                <Form.Item
                  name="ing"
                  valuePropName="checked"
                >
                  <Switch size="small" />
                </Form.Item>
              </div>

              <div style={{background:"white", padding:"5px"}}>
                <Form.Item
                  name="collect_criteria"
                >
                  <Radio.Group style={{marginLeft:"30px", display:"flex", flexDirection:"column"}}>
                    <Radio value="all" style={{fontSize:"11px"}}>
                      전체카드
                    </Radio>
                    <Radio value="by_now" style={{fontSize:"11px"}}>
                      금일자정이전 복습필요 카드만
                    </Radio>
                    <Radio value="by_today" style={{fontSize:"11px"}}>
                      현재시간이전 복습필요 카드만
                    </Radio>
                    <Radio value="custom" style={{fontSize:"11px"}}>
                      복습시점 직접설정
                    </Radio>
                  </Radio.Group>
                  
                </Form.Item>
                <Form.Item name="ing_card_self_setting" >
                  <RangePicker />
                </Form.Item>

              </div>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
              <span style={{fontSize:"11px", marginLeft:"20px"}}>학습완료카드 </span>
                <Form.Item
                  name="completed"
                  valuePropName="checked"
                >
                   <Switch size="small" />
                </Form.Item>
              </div>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
              <span style={{fontSize:"11px", marginLeft:"20px"}}>학습보류카드 </span>
                <Form.Item
                  name="hold"
                  valuePropName="checked"
                >
                   <Switch size="small" />
                </Form.Item>
              </div>
              <div style={{textAlign:"right"}}> <span><Button size="small" style={{fontSize:"11px"}} onClick={this.showModal}>고급필터</Button></span>
              <Form.Item
                  name="advanced_filter_mode"
                  valuePropName="checked"
                >
                   <Switch size="small" />
                </Form.Item></div>
              <AdvancedFilterModal modalVisible={this.state.modalVisible} handleOk={this.handleOk} handleCancel={this.handleCancel}/>
            </div>
            <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
            <span style={{fontSize:"13px", fontWeight:"700"}}>학습량 설정 </span> 
              <Form.Item
                  name="study_quantity_use_switch"
                  valuePropName="checked"
                >
                  <Switch size="small" />
              </Form.Item>
            </div>
            <div style={{border:"1px solid lightgrey", background:"white", borderRadius:"5px", padding:"5px", textAlign:"left"}}>
              <Form.Item
                    name="yet_card_num"
                    label="미학습카드"
                  >
                    <InputNumber></InputNumber>
              </Form.Item>
              <Form.Item
                    name="ing_card_num"
                    label="학습중카드"
                  >
                    <InputNumber></InputNumber>
              </Form.Item>
              <Form.Item
                    name="completed_card_num"
                    label="학습완료카드"
                  >
                    <InputNumber></InputNumber>
              </Form.Item>
              <Form.Item
                    name="hold_card_num"
                    label="학습보류카드"
                  >
                    <InputNumber></InputNumber>
              </Form.Item>
            </div>
            <Form.Item>
            <div style={{height:"100px", backgroundColor:"#dfecf6", lineHeight:"100px", marginTop:"10px", textAlign:"center"}}>
              <Button htmlType="submit" onClick={this.startStudy} style={{color:"white", fontWeight:"700", background:"#69d316", width:"200px", height:"50px"}}>세션 시작하기</Button>
            </div>
          </Form.Item>
        </Form>
      </>
    );
  }
}

export default ReadModeTab;