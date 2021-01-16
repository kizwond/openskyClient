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

      value_for_difficulty:[]
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
      { label: '플래그1', value: 'flag1' },
      { label: '플래그2', value: 'flag2' },
      { label: '플래그3', value: 'flag3' },
      { label: '플래그4', value: 'flag4' },
      { label: '플래그5', value: 'flag5' },
        ]
    const maker_flag_option = [
      { label: '플래그없음', value: 'maker_flag_none' },
      { label: 'X1', value: 'flag1' },
      { label: 'X2', value: 'flag2' },
      { label: 'X3', value: 'flag3' },
      { label: 'X4', value: 'flag4' },
      { label: 'X5', value: 'flag5' },
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
      { label: '맞음', value: 'right' },
      { label: '틀림', value: 'wrong' },
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
    if(this.state.difficultyGroupOnchange){
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
      console.log("고급필터:", this.props.advanced_filter)
      var options = this.props.advanced_filter

      if(options.recent_study_time.on_off === "on"){
        var recent_study_time_on_off = true
      } else {
        recent_study_time_on_off = false
      }
      if(options.recent_study_time.group === "on"){
        var recent_study_time_group_on_off = true
      } else {
        recent_study_time_group_on_off = false
      }
      
      if(options.user_flag.on_off === "on"){
        var user_flag_on_off = true
      } else {
        user_flag_on_off = false
      }
      if(options.user_flag.group === "on"){
        var user_flag_group_on_off = true
      } else {
        user_flag_group_on_off = false
      }
      
      var user_flags = []
      if(options.user_flag.none === "on"){
        user_flags.push('user_flag_none')
      } 
      if(options.user_flag.flag1 === "on"){
        user_flags.push('flag1')
      }
      if(options.user_flag.flag2 === "on"){
        user_flags.push('flag2')
      }
      if(options.user_flag.flag3 === "on"){
        user_flags.push('flag3')
      } 
      if(options.user_flag.flag4 === "on"){
        user_flags.push('flag4')
      } 
      if(options.user_flag.flag5 === "on"){
        user_flags.push('flag5')
      } 

      if(options.maker_flag.on_off === "on"){
        var maker_flag_on_off = true
      } else {
        maker_flag_on_off = false
      }
      if(options.maker_flag.group === "on"){
        var maker_flag_group_on_off = true
      } else {
        maker_flag_group_on_off = false
      }
      
      var maker_flags = []
      if(options.maker_flag.none === "on"){
        maker_flags.push('maker_flag_none')
      } 
      if(options.maker_flag.flag1 === "on"){
        maker_flags.push('flag1')
      }
      if(options.maker_flag.flag2 === "on"){
        maker_flags.push('flag2')
      }
      if(options.maker_flag.flag3 === "on"){
        maker_flags.push('flag3')
      } 
      if(options.maker_flag.flag4 === "on"){
        maker_flags.push('flag4')
      } 
      if(options.maker_flag.flag5 === "on"){
        maker_flags.push('flag5')
      } 


      if(options.difficulty.on_off === "on"){
        var diffi_on_off = true
      } else {
        diffi_on_off = false
      }
      if(options.difficulty.group === "on"){
        var diffi_group_on_off = true
      } else {
        diffi_group_on_off = false
      }
      
      var diff = []
      if(options.difficulty.none === "on"){
        diff.push('difficulty_none')
      } 
      if(options.difficulty.diffi1 === "on"){
        diff.push('모르겠음')
      }
      if(options.difficulty.diffi2 === "on"){
        diff.push('거의모르겠음')
      }
      if(options.difficulty.diffi3 === "on"){
        diff.push('애매함')
      } 
      if(options.difficulty.diffi4 === "on"){
        diff.push('거의알겠음')
      } 
      if(options.difficulty.diffi5 === "on"){
        diff.push('알겠음')
      } 

      if(options.level.on_off === "on"){
        var level_on_off = true
      } else {
        level_on_off = false
      }
      if(options.level.group === "on"){
        var level_group_on_off = true
      } else {
        level_group_on_off = false
      }

      if(options.study_times.on_off === "on"){
        var study_times_on_off = true
      } else {
        study_times_on_off = false
      }
      if(options.study_times.group === "on"){
        var study_times_group_on_off = true
      } else {
        study_times_group_on_off = false
      }

      if(options.test_result.on_off === "on"){
        var test_result_on_off = true
      } else {
        test_result_on_off = false
      }
      if(options.test_result.group === "on"){
        var test_result_group_on_off = true
      } else {
        test_result_group_on_off = false
      }
      
      var results = []
      if(options.test_result.none === "on"){
        results.push('result_none')
      } 
      if(options.test_result.right === "on"){
        results.push('right')
      }
      if(options.test_result.wrong === "on"){
        results.push('wrong')
      }


      var and_or_mode = options.mode
      var user_flag_switch =  user_flag_on_off
      var user_flag_filtering_group = user_flag_group_on_off
      var user_flag = user_flags
      var maker_flag_switch =  maker_flag_on_off
      var maker_flag_filtering_group = maker_flag_group_on_off
      var maker_flag = maker_flags
      var recent_study_switch = recent_study_time_on_off
      var recent_study_filtering_group = recent_study_time_group_on_off
      var recent_study_time = ''
      var card_level_switch = level_on_off
      var card_level_filtering_group = level_group_on_off
      var level_from = options.level.low
      var level_to = options.level.high
      var study_times_switch = study_times_on_off
      var study_times_filtering_group = study_times_group_on_off
      var study_times_from = options.study_times.low
      var study_times_to = options.study_times.high
      var recent_difficulty_switch = diffi_on_off
      var recent_difficulty_filtering_group = diffi_group_on_off
      var difficulty = diff
      var recent_exam_switch = test_result_on_off
      var recent_exam_filtering_group = test_result_group_on_off
      var exam_result = results
      var setting_save = ''
    } 
    
    return (
      <>
        <Modal title="고급필터" width={650} className="advanced_filter_modal" visible={this.props.modalVisible} onOk={this.props.handleOk} onCancel={this.props.handleCancel}>

      {/* {this.props.advanced_filter && <> */}
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
    {/* </>} */}
    </Modal>
      </>
    )
  }
}

export default AdvancedFilterModal;