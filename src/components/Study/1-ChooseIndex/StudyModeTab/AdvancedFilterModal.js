import React, { Component } from 'react';
import { Modal, Button, DatePicker, Select, Input, InputNumber, Space, Radio} from 'antd'

const { RangePicker } = DatePicker;
const { Option } = Select;

class AdvancedFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <Modal title="고급필터" className="advanced_filter_modal" visible={this.props.modalVisible} onOk={this.props.handleOk} onCancel={this.props.handleCancel}>
          <div className="advanced_filter_container" style={{fontSize:"12px"}}>
            <ul style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"600px"}}>
              <li>
                <span>필터계산</span>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", minHeight:"30px", backgroundColor:"white"}}>

                </div>
              </li>
              <li>
                <span>사용자플래그</span>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white", display:"flex", justifyContent:"space-between"}}>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>플래그없음</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>플래그1</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>플래그2</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>플래그3</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>플래그4</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>플래그5</Button>
                </div>
              </li>
              <li>
                <span>제작제플래그</span>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white", display:"flex", justifyContent:"space-between"}}>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>플래그없음</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>X1</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>X2</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>X3</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>X4</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>X5</Button>
                </div>
              </li>
              <li>
                <span>최근학습시점</span>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white"}}>
                  <RangePicker />
                </div>
              </li>
              <li>
                <span>카드레벨</span>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white"}}>
                  <Input.Group compact>
                    <Space size="small" direction="horizontal" style={{display:"flex"}}>
                    <InputNumber style={{ width: 100, textAlign: 'center' }} />
                    ~
                    <InputNumber style={{ width: 100, textAlign: 'center' }}  />
                    </Space>
                  </Input.Group>
                </div>
              </li>
              <li>
                <span>학습횟수</span>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white"}}>
                <Input.Group compact>
                  <Space size="small" direction="horizontal" style={{display:"flex"}}>
                  <InputNumber style={{ width: 100, textAlign: 'center' }} />
                  ~
                  <InputNumber style={{ width: 100, textAlign: 'center' }}  />
                  </Space>
                </Input.Group>
                </div>
              </li>
              <li>
                <span>최근선택한난이도</span>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white", display:"flex", justifyContent:"space-between"}}>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>결과없음</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>모름</Button>
                  <Button size="small" style={{fontSize:"11px"}}>거의모르겠음</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>애매함</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>거의알겠음</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>알겠음</Button>
                </div>
              </li>
              <li>
                <span>최근시험결과</span>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white"}}>
                  <Button size="small" style={{fontSize:"11px", width:"70px", marginRight:"4px"}}>결과없음</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px", marginRight:"4px"}}>맞음</Button>
                  <Button size="small" style={{fontSize:"11px", width:"70px"}}>틀림</Button>
                </div>
              </li>
              <li>
                <span>다음학습에도 설정한 고급필터 사용하기(해당 책의 학습설정에 저장됩니다.)</span>
              </li>
            </ul>
          </div>
        </Modal>
      </>
    )
  }
}

export default AdvancedFilterModal;