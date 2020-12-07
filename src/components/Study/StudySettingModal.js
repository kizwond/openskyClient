import React, { Component } from 'react';
import { Modal, Button, Input, Switch,Select } from 'antd';
const { Option } = Select;

class StudySettingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  onChange = (checked) => {
    console.log(`switch to ${checked}`);
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  render() {
    const title = `학습설정 - ${this.props.info.book_title}`
    const style = {
      width:"700px",
      display:"flex",
      flexDirection:"row",
      justifyContent:"space-between"
    }
    return (
      <>
      <Modal
        title={title}
        width={800}
        visible={this.props.isModalVisible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        footer={[
          <Button key="back" onClick={this.props.handleCancel}>
            취소
          </Button>,
          <Button key="submit" type="primary"onClick={this.props.handleOk}>
            적용
          </Button>,
        ]}
      >
        <div className="study_setting_container" style={{width:"800px"}}>
          <ul>
            <li>
              <div>경험치 획득설정</div>
              <div>알겠음 블라블라........</div>
            </li>
            <li style={{display:"flex", flexDirection:"column"}}>
              이전 경험치 획득 후 .... 블라블라
              <div>알겠음 한방에<Input size="small" style={{width:"80px"}}type="number"/></div>
              <div>알겠음 2방에<Input size="small" style={{width:"80px"}}type="number"/></div>
              <div>알겠음 3방에<Input size="small" style={{width:"80px"}}type="number"/></div>
              <div>알겠음 4방이상<Input size="small" style={{width:"80px"}}type="number"/></div>
            </li>
            <li>

              <div>
                <ul style={style}>
                  <li style={{width:"100px", fontSize:"11px"}}>난이도버튼</li>
                  <li style={{width:"30px", fontSize:"11px"}}>사용</li>
                  <li style={{width:"120px", fontSize:"11px"}}>별칭</li>
                  <li style={{width:"50px", fontSize:"11px"}}>단축키</li>
                  <li style={{width:"50px", fontSize:"11px"}}>화살표</li>
                  <li style={{width:"200px", fontSize:"11px"}}>다음복습까지 시간</li>
                </ul>
              </div>

              <div>
                <ul style={style}>
                  <li><Button style={{width:"100px", fontSize:"11px"}} size="small">모르겠음</Button></li>
                  <li style={{width:"30px"}}></li>
                  <li><Input size="small" style={{width:"120px"}} /></li>
                  <li><Input size="small" style={{width:"50px"}} /></li>
                  <li style={{width:"50px"}}>화살표</li>
                  <li style={{width:"200px"}}><Input size="small" style={{width:"50px"}} type="number"/> 
                  <Select defaultValue="min" size="small" style={{ width: 80, fontSize:"11px" }} onChange={this.handleChange}>
                    <Option value="min">분</Option>
                    <Option value="hour">시간</Option>
                  </Select>
                  후 복습
                  </li>
                </ul>
              </div>

              <div>
                <ul style={style}>
                  <li><Button style={{width:"100px", fontSize:"11px"}} size="small">거의모르겠음</Button></li>
                  <li style={{width:"30px"}}><Switch size="small" defaultChecked onChange={this.onChange} /></li>
                  <li><Input size="small" style={{width:"120px"}} /></li>
                  <li><Input size="small" style={{width:"50px"}} /></li>
                  <li style={{width:"50px"}}>화살표</li>
                  <li style={{width:"200px"}}><Input size="small" style={{width:"50px"}} type="number"/> 
                  <Select defaultValue="min" size="small" style={{ width: 80, fontSize:"11px"  }} onChange={this.handleChange}>
                    <Option value="min">분</Option>
                    <Option value="hour">시간</Option>
                  </Select>
                  후 복습
                  </li>
                </ul>
              </div>

              <div>
                <ul style={style}>
                  <li><Button style={{width:"100px", fontSize:"11px"}} size="small">애매함</Button></li>
                  <li style={{width:"30px"}}><Switch size="small" defaultChecked onChange={this.onChange} /></li>
                  <li><Input size="small" style={{width:"120px"}} /></li>
                  <li><Input size="small" style={{width:"50px"}} /></li>
                  <li style={{width:"50px"}}>화살표</li>
                  <li style={{width:"200px"}}><Input size="small" style={{width:"50px"}} type="number"/> 
                  <Select defaultValue="min" size="small" style={{ width: 80, fontSize:"11px"  }} onChange={this.handleChange}>
                    <Option value="min">분</Option>
                    <Option value="hour">시간</Option>
                  </Select>
                  후 복습
                  </li>
                </ul>
              </div>

              <div>
                <ul style={style}>
                  <li><Button style={{width:"100px", fontSize:"11px"}} size="small">거의알겠음</Button></li>
                  <li style={{width:"30px"}}><Switch size="small" defaultChecked onChange={this.onChange} /></li>
                  <li><Input size="small" style={{width:"120px"}} /></li>
                  <li><Input size="small" style={{width:"50px"}} /></li>
                  <li style={{width:"50px"}}>화살표</li>
                  <li style={{width:"200px"}}><Input size="small" style={{width:"50px"}} type="number"/> 
                  <Select defaultValue="min" size="small" style={{ width: 80, fontSize:"11px"  }} onChange={this.handleChange}>
                    <Option value="min">분</Option>
                    <Option value="hour">시간</Option>
                  </Select>
                  후 복습
                  </li>
                </ul>
              </div>

              <div>
                <ul style={style}>
                  <li><Button style={{width:"100px", fontSize:"11px"}} size="small">알겠음</Button></li>
                  <li style={{width:"30px"}}></li>
                  <li><Input size="small" style={{width:"120px"}} /></li>
                  <li><Input size="small" style={{width:"50px"}} /></li>
                  <li style={{width:"50px"}}>화살표</li>
                  <li style={{width:"200px"}}><Input size="small" style={{width:"50px"}} type="number"/> 
                  <Select defaultValue="min" size="small" style={{ width: 80, fontSize:"11px"  }} onChange={this.handleChange}>
                    <Option value="min">분</Option>
                    <Option value="hour">시간</Option>
                  </Select>
                  후 복습
                  </li>
                </ul>
              </div>

            </li>
            <li>
              <div>레벨업 및 다음 복습까지 대기 기간 설정</div>
              <table>
                <tr>
                    <td>레벨</td><td>레벨업 경험치</td><td>복습대기</td>           
                </tr>
                <tr>
                    <td>1</td><td>1000Exp</td><td><Input size="small" style={{width:"100px"}}/></td>
                </tr>
                <tr>
                    <td>2</td><td>1000Exp</td><td><Input size="small" style={{width:"100px"}}/></td>
                </tr>
                <tr>
                    <td>3</td><td>1000Exp</td><td><Input size="small" style={{width:"100px"}}/></td>
                </tr>
                <tr>
                    <td>4</td><td>1000Exp</td><td><Input size="small" style={{width:"100px"}}/></td>
                </tr>
                <tr>
                    <td>5</td><td>1000Exp</td><td><Input size="small" style={{width:"100px"}}/></td>
                </tr>
                <tr>
                    <td>6</td><td>1000Exp</td><td><Input size="small" style={{width:"100px"}}/></td>
                </tr>
                <tr>
                    <td>7</td><td>1000Exp</td><td><Input size="small" style={{width:"100px"}}/></td>
                </tr>
                <tr>
                    <td>8</td><td>1000Exp</td><td><Input size="small" style={{width:"100px"}}/></td>
                </tr>
                <tr>
                    <td>9</td><td>1000Exp</td><td><Input size="small" style={{width:"100px"}}/></td>
                </tr>
                <tr>
                    <td>10</td><td>1000Exp</td><td><Input size="small" style={{width:"100px"}}/></td>
                </tr>
            </table>
            </li>
          </ul>
        </div>
      </Modal>
      </>
    );
  }
}

export default StudySettingModal;