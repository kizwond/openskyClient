import React, { Component } from 'react';
import { Modal, Button, DatePicker, Select, Space, InputNumber, Switch, Form,Checkbox,Radio} from 'antd'
import './AdvancedFilterModal.css'
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
    
    if(this.state.userFlagGroupOnchange){
      var selectedCss = "#1890ff"
      var fontColor = "white"
      var fontWeight = "700"
    } else {
      selectedCss = "white"
      fontColor = "black"
      fontWeight = "400"
    }
    if(this.state.makerFlagGroupOnchange){
      var selectedCss2 = "#1890ff"
      var fontColor2 = "white"
      var fontWeight2 = "700"
    } else {
      selectedCss2 = "white"
      fontColor2 = "black"
      fontWeight2 = "400"
    }
    if(this.state.recentStudyGroupOnchange){
      var selectedCss3 = "#1890ff"
      var fontColor3 = "white"
      var fontWeight3 = "700"
    } else {
      selectedCss3 = "white"
      fontColor3 = "black"
      fontWeight3 = "400"
    }
    if(this.state.cardLevelGroupOnchange){
      var selectedCss4 = "#1890ff"
      var fontColor4 = "white"
      var fontWeight4 = "700"
    } else {
      selectedCss4 = "white"
      fontColor4 = "black"
      fontWeight4 = "400"
    }
    if(this.state.studyTimesGroupOnchange){
      var selectedCss5 = "#1890ff"
      var fontColor5 = "white"
      var fontWeight5 = "700"
    } else {
      selectedCss5 = "white"
      fontColor5 = "black"
      fontWeight5 = "400"
    }
    if(this.state.recentDiffcultyGroupOnchange){
      var selectedCss6 = "#1890ff"
      var fontColor6 = "white"
      var fontWeight6 = "700"
    } else {
      selectedCss6 = "white"
      fontColor6 = "black"
      fontWeight6 = "400"
    }
    if(this.state.examResultGroupOnchange){
      var selectedCss7 = "#1890ff"
      var fontColor7 = "white"
      var fontWeight7 = "700"
    } else {
      selectedCss7 = "white"
      fontColor7 = "black"
      fontWeight7 = "400"
    }
    
    if(this.props.advanced_filter){
      console.log(this.props.advanced_filter)
      var options = this.props.advanced_filter
     
      var and_or_mode = "and"
      var user_flag_switch =  ''
      var user_flag_filtering_group = ''
      var user_flag = ''
      var maker_flag_switch =  ''
      var maker_flag_filtering_group = ''
      var maker_flag = ''
      var recent_study_switch = ''
      var recent_study_filtering_group = ''
      var recent_study_time = ''
      var card_level_switch = ''
      var card_level_filtering_group = ''
      var level_from = ''
      var level_to = ''
      var study_times_switch = ''
      var study_times_filtering_group = ''
      var study_times_from = ''
      var study_times_to = ''
      var recent_difficulty_switch = ''
      var recent_difficulty_filtering_group = ''
      var difficulty = ''
      var recent_exam_switch = ''
      var recent_exam_filtering_group = ''
      var exam_result = ''
      var setting_save = ''
    } else {
      and_or_mode = "and"
      user_flag_switch =  ''
      user_flag_filtering_group = ''
      user_flag = ''
      maker_flag_switch =  ''
      maker_flag_filtering_group = ''
      maker_flag = ''
      recent_study_switch = ''
      recent_study_filtering_group = ''
      recent_study_time = ''
      card_level_switch = ''
      card_level_filtering_group = ''
      level_from = ''
      level_to = ''
      study_times_switch = ''
      study_times_filtering_group = ''
      study_times_from = ''
      study_times_to = ''
      recent_difficulty_switch = ''
      recent_difficulty_filtering_group = ''
      difficulty = ''
      recent_exam_switch = ''
      recent_exam_filtering_group = ''
      exam_result = ''
      setting_save = ''
    }
    
    return (
      <>
        <Modal title="고급필터" width={650} className="advanced_filter_modal" visible={this.props.modalVisible} onOk={this.props.handleOk} onCancel={this.props.handleCancel}>
          <div className="advanced_filter_container" style={{fontSize:"12px"}}>
            <ul style={{display:"flex", flexDirection:"column", justifyContent:"space-between", height:"100%"}}>
            <Form
            name="advanced_settings"
            initialValues={{
              and_or_mode,
              user_flag_switch,
              user_flag_filtering_group,
              user_flag,
              maker_flag_switch,
              maker_flag_filtering_group,
              maker_flag,
              recent_study_switch,
              recent_study_filtering_group,
              recent_study_time,
              card_level_switch,
              card_level_filtering_group,
              level_from,
              level_to,
              study_times_switch,
              study_times_filtering_group,
              study_times_from,
              study_times_to,
              recent_difficulty_switch,
              recent_difficulty_filtering_group,
              difficulty,
              recent_exam_switch,
              recent_exam_filtering_group,
              exam_result,
              setting_save
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
                      <Checkbox className="advanced_filter_checkbox" onChange={this.userFlagGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss}`, color:`${fontColor}`, fontWeight:`${fontWeight}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
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
                      <Checkbox className="advanced_filter_checkbox" onChange={this.makerFlagGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss2}`, color:`${fontColor2}`, fontWeight:`${fontWeight2}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
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
                      <Checkbox className="advanced_filter_checkbox" onChange={this.recentStudyGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss3}`, color:`${fontColor3}`, fontWeight:`${fontWeight3}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
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
                      <Checkbox className="advanced_filter_checkbox" onChange={this.cardLevelGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss4}`, color:`${fontColor4}`, fontWeight:`${fontWeight4}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
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
                      <Checkbox className="advanced_filter_checkbox" onChange={this.studyTimesGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss5}`, color:`${fontColor5}`, fontWeight:`${fontWeight5}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
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
                      <Checkbox className="advanced_filter_checkbox" onChange={this.difficultyGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss6}`, color:`${fontColor6}`, fontWeight:`${fontWeight6}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
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
                      <Checkbox className="advanced_filter_checkbox" onChange={this.examResultGroupOnchange}><span style={{border:"1px solid lightgrey", borderRadius:"3px", fontSize:"10px", backgroundColor:`${selectedCss7}`, color:`${fontColor7}`, fontWeight:`${fontWeight7}`, display:"inline-block", width:"50px", textAlign:"center"}}>{andOr}</span></Checkbox>
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