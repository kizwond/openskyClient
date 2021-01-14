import React, { Component } from 'react';
import { Modal, Button, DatePicker, Select, Space, InputNumber, Switch, Form,Checkbox,Radio} from 'antd'

const { RangePicker } = DatePicker;
const { Option } = Select;

class AdvancedFilterModal extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      andOr : true,
      userFlagOnchange : false,
      makerFlagOnchange : false,
      recentStudyOnchange : false,
      cardLevelOnchange : false,
      studyTimesOnchange : false,
      difficultyOnchange : false,
      examResultOnchange : false,

      userFlagGroupOnchange : false,
      makerFlagGroupOnchange : false,
      recentStudyGroupOnchange : false,
      cardLevelGroupOnchange : false,
      studyTimesGroupOnchange : false,
      difficultyGroupOnchange : false,
      examResultGroupOnchange : false,
     };
  }
  onFinish = (values) => {
    this.props.handleOk(values)
  }
  andOrChange = () =>{
    this.setState((prevState)=>({
      andOr:!prevState.andOr
    }))
  }
  userFlagOnchange = () =>{
    this.setState((prevState)=>({
      userFlagOnchange:!prevState.userFlagOnchange
    }))
  }
  makerFlagOnchange = () =>{
    this.setState((prevState)=>({
      makerFlagOnchange:!prevState.makerFlagOnchange
    }))
  }
  recentStudyOnchange = () =>{
    this.setState((prevState)=>({
      recentStudyOnchange:!prevState.recentStudyOnchange
    }))
  }
  cardLevelOnchange = () =>{
    this.setState((prevState)=>({
      cardLevelOnchange:!prevState.cardLevelOnchange
    }))
  }
  studyTimesOnchange = () =>{
    this.setState((prevState)=>({
      studyTimesOnchange:!prevState.studyTimesOnchange
    }))
  }
  difficultyOnchange = () =>{
    this.setState((prevState)=>({
      difficultyOnchange:!prevState.difficultyOnchange
    }))
  }
  examResultOnchange = () =>{
    this.setState((prevState)=>({
      examResultOnchange:!prevState.examResultOnchange
    }))
  }

  userFlagGroupOnchange = () =>{
    console.log(this.state.userFlagGroupOnchange)
    this.setState((prevState)=>({
      userFlagGroupOnchange:!prevState.userFlagGroupOnchange
    }))
  }
  makerFlagGroupOnchange = () =>{
    this.setState((prevState)=>({
      makerFlagGroupOnchange:!prevState.makerFlagGroupOnchange
    }))
  }
  recentStudyGroupOnchange = () =>{
    this.setState((prevState)=>({
      recentStudyGroupOnchange:!prevState.recentStudyGroupOnchange
    }))
  }
  cardLevelGroupOnchange = () =>{
    this.setState((prevState)=>({
      cardLevelGroupOnchange:!prevState.cardLevelGroupOnchange
    }))
  }
  studyTimesGroupOnchange = () =>{
    this.setState((prevState)=>({
      studyTimesGroupOnchange:!prevState.studyTimesGroupOnchange
    }))
  }
  difficultyGroupOnchange = () =>{
    this.setState((prevState)=>({
      difficultyGroupOnchange:!prevState.difficultyGroupOnchange
    }))
  }
  examResultGroupOnchange = () =>{
    this.setState((prevState)=>({
      examResultGroupOnchange:!prevState.examResultGroupOnchange
    }))
  }
  render() {
    if(this.state.andOr === true){
      var andOr = "Or그룹"
    } else {
      andOr = "And그룹"
    }
    const user_flag_option = [
      { label: '플래그없음', value: 'user_flag_none' },
      { label: '플래그1', value: '플래그1' },
      { label: '플래그2', value: '플래그2' },
      { label: '플래그3', value: '플래그3' },
      { label: '플래그4', value: '플래그4' },
      { label: '플래그5', value: '플래그5' },
        ]
    const maker_flag_option = [
      { label: '플래그없음', value: 'maker_flag_none' },
      { label: 'X1', value: 'X1' },
      { label: 'X2', value: 'X2' },
      { label: 'X3', value: 'X3' },
      { label: 'X4', value: 'X4' },
      { label: 'X5', value: 'X5' },
        ]
    const difficulty_option = [
      { label: '결과없음', value: 'difficulty_none' },
      { label: '모르겠음', value: '모르겠음' },
      { label: '거의모르겠음', value: '거의모르겠음' },
      { label: '애매함', value: '애매함' },
      { label: '거의알겠음', value: '거의알겠음' },
      { label: '알겠음', value: '알겠음' },
        ]
    const exam_option = [
      { label: '결과없음', value: 'result_none' },
      { label: '맞음', value: '맞음' },
      { label: '틀림', value: '틀림' },
        ]
    
    if(this.state.userFlagGroupOnchange || this.state.makerFlagGroupOnchange){
      var selectedCss = "#1890ff"
      var fontColor = "white"
      var fontWeight = "700"
    } else {
      selectedCss = "white"
      fontColor = "black"
      fontWeight = "400"
    }
    
    
    return (
      <>
        <Modal title="고급필터" width={650} className="advanced_filter_modal" visible={this.props.modalVisible} onOk={this.props.handleOk} onCancel={this.props.handleCancel}>
          <div className="advanced_filter_container" style={{fontSize:"12px"}}>
            <ul style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%"}}>
            <Form
            name="advanced_settings"
            initialValues={{
              and_or_mode:"and"
            }}
            onFinish={this.onFinish}
            size="small"
          >
              <li>
                <span>필터계산</span>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", minHeight:"30px", backgroundColor:"white"}}>
                  {/* And ON & Or Grouping */}
                  {this.state.andOr ? <span style={{color:"blue"}}>({this.state.userFlagOnchange ? <>{this.state.userFlagGroupOnchange && <span> 사용자플래그 or </span>}</>:''}
                                        {this.state.makerFlagOnchange ? <>{this.state.makerFlagGroupOnchange && <span> 제작자플래그 or </span>}</>:''}
                                        {this.state.recentStudyOnchange ? <>{this.state.recentStudyGroupOnchange && <span> 최근학습시점 or </span>}</>:''}
                                        {this.state.cardLevelOnchange ? <>{this.state.cardLevelGroupOnchange && <span> 카드레벨 or </span>}</>:''}
                                        {this.state.studyTimesOnchange ? <>{this.state.studyTimesGroupOnchange && <span> 학습횟수 or </span>}</>:''}
                                        {this.state.difficultyOnchange ? <>{this.state.difficultyGroupOnchange && <span> 최근선택한난이도 or </span>}</>:''}
                                        {this.state.examResultOnchange ? <>{this.state.examResultGroupOnchange && <span> 최근시험결과</span>}</>:''}) and
                                        </span>:''}
                  {/* And ON & Or Not Grouping */}
                  {this.state.andOr ? <span style={{color:"red"}}>{this.state.userFlagOnchange ? <>{!this.state.userFlagGroupOnchange && <span> 사용자플래그 and </span>}</>:''}
                                        {this.state.makerFlagOnchange ? <>{!this.state.makerFlagGroupOnchange && <span> 제작자플래그 and </span>}</>:''}
                                        {this.state.recentStudyOnchange ? <>{!this.state.recentStudyGroupOnchange && <span> 최근학습시점 and </span>}</>:''}
                                        {this.state.cardLevelOnchange ? <>{!this.state.cardLevelGroupOnchange && <span> 카드레벨 and </span>}</>:''}
                                        {this.state.studyTimesOnchange ? <>{!this.state.studyTimesGroupOnchange && <span> 학습횟수 and </span>}</>:''}
                                        {this.state.difficultyOnchange ? <>{!this.state.difficultyGroupOnchange && <span> 최근선택한난이도 and </span>}</>:''}
                                        {this.state.examResultOnchange ? <>{!this.state.examResultGroupOnchange && <span> 최근시험결과</span>}</>:''}
                                        </span>:''}

                  {/* And ON & Or Grouping */}
                  {this.state.andOr === false ? <span style={{color:"blue"}}>({this.state.userFlagOnchange ? <>{this.state.userFlagGroupOnchange && <span> 사용자플래그 and </span>}</>:''}
                                        {this.state.makerFlagOnchange ? <>{this.state.makerFlagGroupOnchange && <span> 제작자플래그 and </span>}</>:''}
                                        {this.state.recentStudyOnchange ? <>{this.state.recentStudyGroupOnchange && <span> 최근학습시점 and </span>}</>:''}
                                        {this.state.cardLevelOnchange ? <>{this.state.cardLevelGroupOnchange && <span> 카드레벨 and </span>}</>:''}
                                        {this.state.studyTimesOnchange ? <>{this.state.studyTimesGroupOnchange && <span> 학습횟수 and </span>}</>:''}
                                        {this.state.difficultyOnchange ? <>{this.state.difficultyGroupOnchange && <span> 최근선택한난이도 and </span>}</>:''}
                                        {this.state.examResultOnchange ? <>{this.state.examResultGroupOnchange && <span> 최근시험결과</span>}</>:''}) or
                                        </span>:''}
                  {/* And ON & Or Not Grouping */}
                  {this.state.andOr === false ? <span style={{color:"red"}}>{this.state.userFlagOnchange ? <>{!this.state.userFlagGroupOnchange && <span> 사용자플래그 or </span>}</>:''}
                                        {this.state.makerFlagOnchange ? <>{!this.state.makerFlagGroupOnchange && <span> 제작자플래그 or </span>}</>:''}
                                        {this.state.recentStudyOnchange ? <>{!this.state.recentStudyGroupOnchange && <span> 최근학습시점 or </span>}</>:''}
                                        {this.state.cardLevelOnchange ? <>{!this.state.cardLevelGroupOnchange && <span> 카드레벨 or </span>}</>:''}
                                        {this.state.studyTimesOnchange ? <>{!this.state.studyTimesGroupOnchange && <span> 학습횟수 or </span>}</>:''}
                                        {this.state.difficultyOnchange ? <>{!this.state.difficultyGroupOnchange && <span> 최근선택한난이도 or </span>}</>:''}
                                        {this.state.examResultOnchange ? <>{!this.state.examResultGroupOnchange && <span> 최근시험결과</span>}</>:''}
                                        </span>:''}
                  
                </div>
                <span>설명</span>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", minHeight:"30px", backgroundColor:"white"}}>
                </div>
              </li>
              <li>
                <Form.Item
                  name="and_or_mode"
                  valuePropName="checked"
                >
                  <Radio.Group defaultValue="and" size="small" onChange={this.andOrChange} style={{ marginTop: 16 }}>
                    <Radio.Button value="and">AND</Radio.Button>
                    <Radio.Button value="or">OR</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              
              </li>
              <li>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
                  <Space>
                    <span>사용자플래그</span> 
                    <Form.Item
                      name="user_flag_switch"
                      valuePropName="checked"
                    >
                      <Switch size="small" onChange={this.userFlagOnchange}/>
                    </Form.Item>
                    {this.state.userFlagOnchange && <Form.Item
                      name="user_flag_filtering_group"
                      valuePropName="checked"
                    >            
                      <Checkbox onChange={this.userFlagGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss}`, color:`${fontColor}`, fontWeight:`${fontWeight}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                    </Form.Item>}
                    
                  </Space>
                </div>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white", display:"flex", justifyContent:"space-between"}}>
                  <Form.Item
                    name="user_flag"
                    valuePropName="checked"
                  >            
                    <Checkbox.Group options={user_flag_option} />
                  </Form.Item>
                </div>
              </li>
              <li>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
                  <Space>
                    <span>제작자플래그</span> 
                    <Form.Item
                      name="maker_flag_switch"
                      valuePropName="checked"
                    >
                      <Switch size="small"  onChange={this.makerFlagOnchange}/>
                    </Form.Item>
                    {this.state.makerFlagOnchange && <Form.Item
                      name="maker_flag_filtering_group"
                      valuePropName="checked"
                    >            
                      <Checkbox onChange={this.makerFlagGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss}`, color:`${fontColor}`, fontWeight:`${fontWeight}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                    </Form.Item>}
                    
                  </Space>
                </div>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white", display:"flex", justifyContent:"space-between"}}>
                  <Form.Item
                    name="maker_flag"
                    valuePropName="checked"
                  >            
                    <Checkbox.Group options={maker_flag_option} />
                  </Form.Item>
                </div>
              </li>
              <li>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
                  <Space>
                    <span>최근학습시점</span> 
                    <Form.Item
                      name="recent_study_switch"
                      valuePropName="checked"
                    >
                      <Switch size="small" onChange={this.recentStudyOnchange}/>
                    </Form.Item>
                    {this.state.recentStudyOnchange && <Form.Item
                      name="recent_study_filtering_group"
                      valuePropName="checked"
                    >            
                      <Checkbox onChange={this.recentStudyGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss}`, color:`${fontColor}`, fontWeight:`${fontWeight}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                    </Form.Item>}
                    
                  </Space>
                </div>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white"}}>
                <Form.Item name="recent_study_time" >
                  <RangePicker />
                </Form.Item>
                </div>
              </li>
              <li>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
                <Space>
                    <span>카드레벨</span> 
                    <Form.Item
                      name="card_level_switch"
                      valuePropName="checked"
                    >
                      <Switch size="small" onChange={this.cardLevelOnchange}/>
                    </Form.Item>
                    {this.state.cardLevelOnchange && <Form.Item
                      name="card_level_filtering_group"
                      valuePropName="checked"
                    >            
                      <Checkbox onChange={this.cardLevelGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss}`, color:`${fontColor}`, fontWeight:`${fontWeight}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                    </Form.Item>}
                  </Space>
                </div>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white", display:"flex"}}>
                  <Form.Item name="level_from" >
                    <InputNumber style={{ width: 100, textAlign: 'center' }} />
                  </Form.Item>
                  ~
                  <Form.Item name="level_to" >
                    <InputNumber style={{ width: 100, textAlign: 'center' }}  />
                  </Form.Item>
                </div>
              </li>
              <li>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
                <Space>
                    <span>학습횟수</span> 
                    <Form.Item
                      name="study_times_switch"
                      valuePropName="checked"
                    >
                      <Switch size="small" onChange={this.studyTimesOnchange}/>
                    </Form.Item>
                    {this.state.studyTimesOnchange && <Form.Item
                      name="study_times_filtering_group"
                      valuePropName="checked"
                    >            
                      <Checkbox onChange={this.studyTimesGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss}`, color:`${fontColor}`, fontWeight:`${fontWeight}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                    </Form.Item>}
                    
                  </Space>
                </div>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white", display:"flex"}}>
                  <Form.Item name="study_times_from" >
                    <InputNumber style={{ width: 100, textAlign: 'center' }} />
                  </Form.Item>
                  ~
                  <Form.Item name="study_times_to" >
                    <InputNumber style={{ width: 100, textAlign: 'center' }}  />
                  </Form.Item>
                </div>
              </li>
              <li>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
                <Space>
                    <span>최근선택한난이도</span> 
                    <Form.Item
                      name="recent_difficulty_switch"
                      valuePropName="checked"
                    >
                      <Switch size="small" onChange={this.difficultyOnchange}/>
                    </Form.Item>
                    {this.state.difficultyOnchange && <Form.Item
                      name="recent_difficulty_filtering_group"
                      valuePropName="checked"
                    >            
                      <Checkbox onChange={this.difficultyGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss}`, color:`${fontColor}`, fontWeight:`${fontWeight}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                    </Form.Item>}
                    
                  </Space>
                </div>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white", display:"flex", justifyContent:"space-between"}}>
                <Form.Item
                    name="difficulty"
                    valuePropName="checked"
                  >            
                    <Checkbox.Group options={difficulty_option} />
                  </Form.Item>
                </div>
              </li>
              <li>
                <div style={{display:"flex", flexDirection:"row", alignItems:"center", fontSize:"11px"}}>
                <Space>
                    <span>최근시험결과</span> 
                    <Form.Item
                      name="recent_exam_switch"
                      valuePropName="checked"
                    >
                      <Switch size="small" onChange={this.examResultOnchange}/>
                    </Form.Item>
                    {this.state.examResultOnchange && <Form.Item
                      name="recent_exam_filtering_group"
                      valuePropName="checked"
                    >            
                      <Checkbox onChange={this.examResultGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss}`, color:`${fontColor}`, fontWeight:`${fontWeight}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
                    </Form.Item>}
                    
                  </Space>
                </div>
                <div style={{border:"1px solid none", fontSize:"11px", borderRadius:"5px", width:"100%", padding:"10px", minHeight:"20px", backgroundColor:"white"}}>
                <Form.Item
                    name="exam_result"
                    valuePropName="checked"
                  >            
                    <Checkbox.Group options={exam_option} />
                  </Form.Item>
                </div>
              </li>
              <li>
                <Form.Item
                    name="setting_save"
                    valuePropName="checked"
                  >            
                    <Checkbox>다음학습에도 설정한 고급필터 사용하기(해당 책의 학습설정에 저장됩니다.)</Checkbox>
                  </Form.Item>
              </li>
              <Button htmlType="submit" style={{color:"white", fontWeight:"700", background:"#69d316", width:"200px", height:"50px"}}>적용</Button>
            
            </Form>
            </ul>
          </div>
        </Modal>
      </>
    )
  }
}

export default AdvancedFilterModal;