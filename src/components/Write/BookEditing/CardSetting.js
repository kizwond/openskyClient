import React, { Component } from 'react';
import { Affix, Collapse, Form, Switch, Select, Input } from 'antd';
import { BoldOutlined,ItalicOutlined,UnderlineOutlined,AlignCenterOutlined,AlignLeftOutlined,AlignRightOutlined } from '@ant-design/icons';
import DefaultButton from '../../../styledComponents/defaultButton'

const { Panel } = Collapse;
const { Option } = Select;

class CardSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }

  genExtra = () => (
    <Switch size="small"
      onClick={event => {
        event.stopPropagation();
      }}
    />
  );
  onFinish = (values) => {
    console.log(values)
  }
  render() {
    const direction = []
    const margin = []
    console.log(this.props.card_selected)
    if(this.props.card_selected){
      this.props.cardType.map((value)=>{
        if(value._id === this.props.card_selected){
          direction.push(value.card_direction)
          margin.push(value.outer_margin)
        }
      })
    }

    if(margin.length > 0){
      var top = margin[0].top
      var bottom = margin[0].bottom
      var left = margin[0].left
      var right = margin[0].right
    } else {
      top = ''
      bottom = ''
      left = ''
      right = ''
    }

    var initialValues = {
      card_direction: direction[0],
      outer_margin:{
        top,
        right,
        left,
        bottom
      }
    }
    
    console.log( direction[0])
    console.log(top, bottom, left, right)
    
    return (
      <div className="page_setting_container">
        <Form
          name="settings"
          initialValues={initialValues}
          onFinish={this.onFinish}
          size="small"
        >
          <Collapse defaultActiveKey={['1','2','3','4','5','6','7']} >
            <Panel header="템플릿 선택" key="1" className="data_collapse_panel"> 
              <SelectTemplete card_selected={this.props.card_selected} cardType={this.props.cardType} onCardChangeHandler={this.props.onCardChangeHandler} />
            </Panel>
            <Panel header="레이아웃" key="2" className="data_collapse_panel">
              <div className="layout_container">
                <div className='select_mode_container'>
                  <div>방향</div>
                  <div>
                    <Form.Item name='card_direction'>
                      <Select size='small'>
                        <Option value="left-right">좌우</Option>
                        <Option value="top-bottom">상하</Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>
                <div className='select_mode_container'>
                  <div></div>
                  <div className='layout_example_img'>
                    <img src="img/leftright.png" width='90px' alt="좌우"/>
                    <img src="img/updown.png" width='90px'  alt="상하"/>
                  </div>
                </div>
                <div className='select_mode_container'>
                  <div>면간 비율</div>
                  <div className='layout_ratio'>
                    <div>
                    <Form.Item name={['left_right_ratio', 'face1']}>
                      <Input size='small' style={{ width: 100,fontSize:10 }} prefix='1면' suffix='%' type="number"/>
                    </Form.Item>
                      
                    </div>
                    <div>
                    <Form.Item name={['left_right_ratio', 'face2']}>
                      <Input size='small' style={{ width: 100,fontSize:10 }} prefix='2면' suffix='%' type="text"/>
                    </Form.Item>
                    </div>
                    {/* <div>
                    <Form.Item name={['left_right_ratio', 'face1']}>
                      <Input size='small' style={{ width: 100,fontSize:10 }} prefix='주석' suffix='%' type="text"/>
                    </Form.Item>
                    </div> */}
                  </div>
                </div>
              </div>
            </Panel>
            <Panel header="카드 배경색" key="3" className="data_collapse_panel">
              <div className="select_card_bg_color_container">
                <div className="select_card_bg_color">
                  <div>배경색</div>
                  <div className="select_card_bg_color_right">
                    <div>
                      <Form.Item name='background_color'>
                        <Input type="color" size='small' style={{ width: 125 }} type="color"/>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
            <Panel header="카드 테두리 바깥쪽 여백" key="4" className="data_collapse_panel">
              <div className="select_card_margin">
                <div className="card_margin_top">
                  <Form.Item name={['outer_margin', 'top']}>
                    <Input size='small' style={{ width: 70,fontSize:10 }} prefix='상' suffix='px' type="number"/>
                  </Form.Item>
                </div>
                <div className="card_margin_mid_container">
                  <div>
                    <Form.Item name={['outer_margin', 'left']}>
                      <Input size='small' style={{ width: 70,fontSize:10 }} prefix='좌' suffix='px' type="number"/>
                    </Form.Item>
                  </div>
                  <div className="">
                    <img src="img/cardmargin.png" width="100" alt="cardmargin_img"/>
                  </div>
                  <div>
                    <Form.Item name={['outer_margin', 'right']}>
                      <Input size='small' style={{ width: 70,fontSize:10 }}prefix='우' suffix='px' type="number"/>
                    </Form.Item>
                  </div>
                </div>
                <div className="card_margin_bottom">
                  <Form.Item name={['outer_margin', 'bottom']}>
                    <Input size='small' style={{ width: 70,fontSize:10 }} prefix='하' suffix='px' type="number"/>
                  </Form.Item>
                </div>
              </div>
            </Panel>
            <Panel header="카드 테두리 안쪽 여백" key="5" className="data_collapse_panel_numbering">
              <CardPadding card_selected={this.props.card_selected} cardType={this.props.cardType} />
            </Panel>
            <Panel header="카드 테두리" key="6" className="data_collapse_panel_page_top">
              <Switch size="small" className="page_top_toggle" />
              <CardBorder card_selected={this.props.card_selected} cardType={this.props.cardType} />
            </Panel>
            <Panel header="폰트 일괄 변경" key="7" className="data_collapse_panel_page_bottom">
              <Switch size="small" className="page_bottom_toggle" />
              <FontChange card_selected={this.props.card_selected} cardType={this.props.cardType} />
            </Panel>
          </Collapse>
          <Affix offsetBottom={0}>
            <div className="save_page_setting">
            <Form.Item>
              <DefaultButton htmlType="submit" type="primary" shape="round" size="small">적용</DefaultButton>
            </Form.Item>
              <DefaultButton type="primary" shape="round" size="small">취소</DefaultButton>
              <DefaultButton type="primary" shape="round" size="small">설정초기화</DefaultButton>
            </div>
          </Affix>
        </Form>
      </div>
    );
  }
}

class SelectTemplete extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      card_selected:''
     };
  }
  onCardChangeHandler = (value) => {
    console.log(value)
    this.setState({
      card_selected:value
    })
  }
  render() {
    if(this.props.cardType){
      console.log(this.props.cardType)
    }

    const cardTypeListOption = this.props.cardType.map((card_type)=>(
      <Option key={card_type._id} value={card_type._id}>{card_type.name} - ({card_type.type} 카드)</Option>
    ))
    const cardFaceListOption = this.props.cardType.map((card_type)=>{
      console.log(this.props.card_selected)
      if(card_type._id === this.props.card_selected){
        console.log("-------------here--------------",card_type)
        if(card_type.type === 'read'){
          return <><Option key={1} value='1면'>1면</Option></>
        } else if(card_type.type === 'flip-normal'){
          return <><Option key={1} value='1면'>1면</Option><Option key={2} value='2면'>2면</Option></>
        } else if(card_type.type === '3면'){
          return <><Option key={1} value='1면'>1면</Option><Option key={2} value='2면'>2면</Option><Option key={3} value='3면'>3면</Option></>
        }
      }
      return null
    })
    return (
      <>
        <div className="select_card_templete">
          <div className='select_page_size_div'>
              <div>카드</div>
              <div>
                <Select defaultValue="카드선택" size='small' onChange={this.props.onCardChangeHandler} style={{ width: 195 }}>
                  <Option value="카드선택">카드선택</Option>
                  {cardTypeListOption}
                </Select>
              </div>
          </div>
          <div className='select_page_size_div'>
              <div>면</div>
              <div>
                <Select defaultValue="면선택" size='small' style={{ width: 195 }}>
                  <Option value="면선택">면선택</Option>
                  {cardFaceListOption}
                </Select>
              </div>
          </div>
          <div className='select_page_size_div'>
              <div>행</div>
              <div>
                <Select defaultValue="행선택" size='small' style={{ width: 195 }}>
                  <Option value="행선택">행선택</Option>
                </Select>
              </div>
          </div>
        </div>
      </>
    );
  }
}

class LayoutSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  // card_selected={this.props.card_selected} cardType={this.props.cardType} 
  render() {
    const direction = []
    const layoutSettingValue = this.props.cardType.map((value)=>{
        if(value._id === this.props.card_selected){
          direction.push(value.direction)
        }
        return null
    })
    console.log(layoutSettingValue)
    console.log(direction[0])
    return (
      <>
        <div className="layout_container">
          <div className='select_mode_container'>
            <div>방향</div>
            <div>
              <Select size='small' value={direction[0]} style={{ width: 195 }}>
                <Option value="left_right">좌우</Option>
                <Option value="up_down">상하</Option>
              </Select>
            </div>
          </div>
          <div className='select_mode_container'>
            <div></div>
            <div className='layout_example_img'>
              <img src="img/leftright.png" width='90px' alt="좌우"/>
              <img src="img/updown.png" width='90px'  alt="상하"/>
            </div>
          </div>
          <div className='select_mode_container'>
            <div>면간 비율</div>
            <div className='layout_ratio'>
              <div>
                <Input size='small' style={{ width: 62,fontSize:10 }} prefix='1면' suffix='%' type="text"/>
              </div>
              <div>
                <Input size='small' style={{ width: 62,fontSize:10 }} prefix='2면' suffix='%' type="text"/>
              </div>
              <div>
                <Input size='small' style={{ width: 62,fontSize:10 }} prefix='주석' suffix='%' type="text"/>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

class CardBackgroundColor extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {

    return (
      <>
        <div className="select_card_bg_color_container">
          <div className="select_card_bg_color">
            <div>배경색</div>
            <div className="select_card_bg_color_right">
              <div><input type="color"/></div>
              <div><Input size='small' style={{ width: 125 }} type="text"/></div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
class CardMargin extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const margin = []
    const layoutSettingValue = this.props.cardType.map((value)=>{
        if(value._id === this.props.card_selected){
          console.log(value.outer_margin)
          margin.push(value.outer_margin)
        }
        return null
    })
    console.log(layoutSettingValue)

    if(margin.length > 0){
      var top = margin[0].top
      var bottom = margin[0].bottom
      var left = margin[0].left
      var right = margin[0].right
    } else {
      top = ''
      bottom = ''
      left = ''
      right = ''
    }
    

    return (
      <>
        <div className="select_card_margin">
            <div className="card_margin_top"><Input size='small' value={top} style={{ width: 70,fontSize:10 }} prefix='상' suffix='px' type="number"/></div>
            <div className="card_margin_mid_container">
              <div><Input size='small' style={{ width: 70,fontSize:10 }} value={left} prefix='좌' suffix='px' type="number"/></div>
              <div className="">
                <img src="img/cardmargin.png" width="100" alt="cardmargin_img"/>
              </div>
              <div><Input size='small' style={{ width: 70,fontSize:10 }} value={right} prefix='우' suffix='px' type="number"/></div>
            </div>
            <div className="card_margin_bottom"><Input size='small' style={{ width: 70,fontSize:10 }} value={bottom} prefix='하' suffix='px' type="number"/></div>
        </div>
      </>
    );
  }
}
class CardPadding extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const padding = []
    const layoutSettingValue = this.props.cardType.map((value)=>{
        if(value._id === this.props.card_selected){
          padding.push(value.inner_padding)
        }
        return null
    })
    if(padding.length > 0){
      var top = padding[0].top
      var bottom = padding[0].bottom
      var left = padding[0].left
      var right = padding[0].right
    } else {
      top = ''
      bottom = ''
      left = ''
      right = ''
    }
    return (
      <>
        <div className="select_card_margin">
            <div className="card_margin_top"><Input size='small' style={{ width: 70,fontSize:10 }} value={top} prefix='상' suffix='px' type="number"/></div>
            <div className="card_margin_mid_container">
              <div><Input size='small' style={{ width: 70,fontSize:10 }} value={left} prefix='좌' suffix='px' type="number"/></div>
              <div className="">
                <img src="img/cardpadding.png" width="100" alt="cardpadding_img"/>
              </div>
              <div><Input size='small' style={{ width: 70,fontSize:10 }} value={right} prefix='우' suffix='px' type="number"/></div>
            </div>
            <div className="card_margin_bottom"><Input size='small' style={{ width: 70,fontSize:10 }} value={bottom} prefix='하' suffix='px' type="number"/></div>
        </div>
      </>
    );
  }
}
class CardBorder extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    // const props = {
    //   name: 'file',
    //   action: '',
    //   headers: {
    //     authorization: 'authorization-text',
    //   },
    //   onChange(info) {
    //     if (info.file.status !== 'uploading') {
    //       console.log(info.file, info.fileList);
    //     }
    //     if (info.file.status === 'done') {
    //       message.success(`${info.file.name} file uploaded successfully`);
    //     } else if (info.file.status === 'error') {
    //       message.error(`${info.file.name} file upload failed.`);
    //     }
    //   },
    // };
    return (
      <>
        <div className="card_border_container">
          <div className="select_card_bg_color">
            <div>전체테두리</div>
            <div className="card_border_total">
              <div>
                <Select size='small' style={{ width: 50 }}>
                  <Option value="선택">선택</Option>
                  <Option value="선택">선택</Option>
                </Select>
              </div>
              <div><Input size='small' type="color" style={{width:20}}/></div>
              <div><Input size='small' style={{ width: 60 }} type="text"/></div>
              <div>
                <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
              </div>
            </div>
          </div>
          <div style={{paddingLeft:50}}>
            <Collapse className="border_detail" >
              <Panel header="테두리 상세 설정" key="1" className="data_collapse_panel"> 
                <div className="select_card_bg_color">
                  <div>상</div>
                  <div className="card_border_total">
                    <div>
                      <Select size='small' style={{ width: 50 }}>
                        <Option value="선택">선택</Option>
                        <Option value="선택">선택</Option>
                      </Select>
                    </div>
                    <div><Input size='small' type="color" style={{width:20}}/></div>
                    <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                    <div>
                      <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                    </div>
                  </div>
                </div>
                <div className="select_card_bg_color">
                  <div>하</div>
                  <div className="card_border_total">
                    <div>
                      <Select size='small' style={{ width: 50 }}>
                        <Option value="선택">선택</Option>
                        <Option value="선택">선택</Option>
                      </Select>
                    </div>
                    <div><Input size='small' type="color" style={{width:20}}/></div>
                    <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                    <div>
                      <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                    </div>
                  </div>
                </div>
                <div className="select_card_bg_color">
                  <div>좌</div>
                  <div className="card_border_total">
                    <div>
                      <Select size='small' style={{ width: 50 }}>
                        <Option value="선택">선택</Option>
                        <Option value="선택">선택</Option>
                      </Select>
                    </div>
                    <div><Input size='small' type="color" style={{width:20}}/></div>
                    <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                    <div>
                      <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                    </div>
                  </div>
                </div>
                <div className="select_card_bg_color">
                  <div>우</div>
                  <div className="card_border_total">
                    <div>
                      <Select size='small' style={{ width: 50 }}>
                        <Option value="선택">선택</Option>
                        <Option value="선택">선택</Option>
                      </Select>
                    </div>
                    <div><Input size='small' type="color" style={{width:20}}/></div>
                    <div><Input size='small' style={{ width: 60 }} type="text"/></div>
                    <div>
                      <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/>
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
          <div className="card_border_radius_container">
            <div>라운드</div>
            <div className="card_border_radius">
              <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/> 
            </div>
          </div>
          <div className="card_border_radius_container">
            <div>그림자</div>
            <div className="card_border_radius">
              <Input size='small' style={{ width: 60,fontSize:10, lineHeight: '22px' }} suffix='px' type="number"/> 
            </div>
          </div>
        </div>
      </>
    );
  }
}
class FontChange extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <>
        <div className="card_font_container">
          <div className="card_border_radius_container">
              <div>라운드</div>
              <div className="text_align">
                <AlignLeftOutlined />
                <AlignCenterOutlined />
                <AlignRightOutlined />
              </div>
          </div>
          <div className="card_border_radius_container">
            <div>폰트</div>
            <div>
              <Select size='small' style={{ width: 90 }}>
                <Option value="맑은고딕">맑은고딕</Option>
              </Select>
            </div>
            <div>
              <Input size='small' style={{ width: 60,fontSize: 10 }} suffix='px' type="number"/>
              </div>
            <div>
              <BoldOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey' }}/>
            </div>
            <div>
              <ItalicOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey'  }}/>
            </div>
            <div>
            <UnderlineOutlined style={{ marginTop:4,fontSize: 14, border:'1px solid grey'  }}/>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default CardSetting;