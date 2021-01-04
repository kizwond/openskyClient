import React, { Component } from 'react';
import { Radio, Button,Switch,Form, Divider, InputNumber } from 'antd';
import './StudyModeTab.css'
import AdvancedFilterModal from './AdvancedFilterModal'
class FlipModeTab extends Component {
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
        <div>보기순서 정렬</div>
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
            <div>필터 설정</div>
            <div style={{border:"1px solid lightgrey", background:"white", borderRadius:"5px", padding:"5px", textAlign:"left"}}>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="read_card"
                  valuePropName="checked"
                >
                  <span  style={{fontSize:"13px", fontWeight:"700"}}>읽기카드 </span> <Switch size="small" />
                </Form.Item>
              </div>

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
                  </Radio.Group>
                </Form.Item>
              </div>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="read_completed_card"
                  valuePropName="checked"
                >
                  <span style={{fontSize:"11px", marginLeft:"20px"}}>학습완료카드 </span> 
                </Form.Item>
              </div>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="read_suspend_card"
                  valuePropName="checked"
                >
                  <span style={{fontSize:"11px", marginLeft:"20px"}}>학습보류카드 </span> 
                </Form.Item>
              </div>

              <Divider style={{margin:"0"}}/>
              {/* 뒤집기카드 */}
              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="flip_card"
                  valuePropName="checked"
                >
                  <span  style={{fontSize:"13px", fontWeight:"700"}}>뒤집기카드 </span> <Switch size="small" />
                </Form.Item>
              </div>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="flip_yet_card"
                  valuePropName="checked"
                >
                  <span style={{fontSize:"11px", marginLeft:"20px"}}>미학습카드 </span> <Switch size="small" />
                </Form.Item>
              </div>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="flip_ing_card"
                  valuePropName="checked"
                >
                  <span style={{fontSize:"11px", marginLeft:"20px"}}>학습중카드 </span> <Switch size="small" />
                </Form.Item>
              </div>

              <div style={{ background:"white", padding:"5px", textAlign:"left"}}>
                <Form.Item
                  name="flip_ing_card_detail"
                >
                  <Radio.Group onChange={this.onChangeMode} value={this.state.mode} style={{marginLeft:"30px", display:"flex", flexDirection:"column", textAlign:"left"}}>
                    <Radio value="flip_ing_all" style={{fontSize:"11px"}}>
                      전체카드
                    </Radio>
                    <Radio value="flip_limit_now" style={{fontSize:"11px"}}>
                      금일자정이전 복습필요카드만
                    </Radio>
                    <Radio value="flip_limit_today" style={{fontSize:"11px"}}>
                      현재시간이전 복습필요카드만
                    </Radio>
                  </Radio.Group>
                </Form.Item>
              </div>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="flip_completed_card"
                  valuePropName="checked"
                >
                  <span style={{fontSize:"11px", marginLeft:"20px"}}>학습완료카드 </span> 
                </Form.Item>
              </div>

              <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"space-between", fontSize:"11px"}}>
                <Form.Item
                  name="flip_suspend_card"
                  valuePropName="checked"
                >
                  <span style={{fontSize:"11px", marginLeft:"20px"}}>학습보류카드 </span>
                </Form.Item>
              </div>
              <div style={{textAlign:"right"}}><Button size="small" style={{fontSize:"11px"}} onClick={this.showModal}>고급필터</Button> <Switch size="small" /></div>
              <AdvancedFilterModal modalVisible={this.state.modalVisible} handleOk={this.handleOk} handleCancel={this.handleCancel}/>
            </div>
            <div>학습량 설정 <Switch size="small" /></div>
            <div style={{border:"1px solid lightgrey", background:"white", borderRadius:"5px", padding:"5px", textAlign:"left"}}>
                <ul style={{display:"flex", flexDirection:"row", justifyContent:"space-between", fontSize:"11px"}}>
                  <li>공부할 카드 수</li>
                  <li>
                  <Form.Item
                    name="flip_suspend_card"
                    valuePropName="checked"
                  >
                    <span style={{fontSize:"11px", marginLeft:"20px"}}>미학습카드 </span><InputNumber size="small"/>
                  </Form.Item></li>
                  <li><Form.Item
                    name="flip_suspend_card"
                    valuePropName="checked"
                  >
                    <span style={{fontSize:"11px", marginLeft:"20px"}}>학습중카드 </span><InputNumber size="small"/>
                  </Form.Item></li>
                </ul>
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

export default FlipModeTab;