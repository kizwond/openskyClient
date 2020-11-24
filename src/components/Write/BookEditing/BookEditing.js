import React, { Component } from 'react'
import axios from 'axios'
import LeftDrawer from './BookWritingLeftDrawer'
import './BookWriting.css'
import {Button, Select,Modal } from 'antd';
import SettingTabs from './SettingTabs'
import EditorTry from './EditorTry'


import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/plugins.pkgd.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/languages/ko'
import 'froala-editor//css/themes/gray.min.css'


import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

import BookRelocate from './BookRelocate'



const { Option } = Select;
var userId = localStorage.getItem('userId')

export class BookWriting extends Component {
  constructor(props) {
    super(props)
    this.state = {
       visible: false,
       bookTitle:'',
       bookId:'',
       category:'',
       userEmail:'',
       user : '',
       table_of_contents:[],
       hide_show_toggle:false,
       left_drawer_toggle:false,
       card_type:[],
       card_add:false,
       editor1: '',
       editor2: '',
       editor3: '',
       editor4: '',
       editor5: '',
       editor6: '',
       editor7: '',
       editor8: '',
       editor9: '',
       editor10: '',
       editor11: '',
       editor12: '',
       editor13: '',
       editor14: '',
       editor15: '',
       contents:[],
       card_selected:'',
       arrayForEditor:[],
       current_card:{},
       current_card_type:'',
       card_selected_detailsetting:'',
       index_id:'',
    }
  }


  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  getIndexList = () => {
    console.log('req start!!!!!!!!!!')
    axios.post('api/index/get-indexlist',{
      book_id: this.props.location.book_id
    })
      .then(res => {
        this.setState({ 
          table_of_contents:res.data.indexList,
        });
      })
  }
  getCardTypeList = () => {
    axios.get('api/cardtype/get-cardtypelist')
      .then(res => {
        console.log('cardtypelist:',res)
        this.setState({ 
          card_type:res.data.cardtypes
        });
      })
  }
  componentDidMount() {
    this.getIndexList()
    this.getCardTypeList()
  }
  addTable =(value) => {
    console.log(value)
    axios.post('api/index/create-index',{
      book_id : this.props.location.book_id,
      level : value.prevTableLevel,
      seq : value.prevTableOrder,
      name : value.value.newTable,
    }).then(res => {
      console.log(res.data)
      const contentsTable = res.data.indexList
      this.setState({
        table_of_contents:contentsTable,
      })
    })
  }

  addCardType =(value) => {
    console.log(value)
    axios.post('api/cardtype/create-cardtype',{
      type: value.card_type,
      nick: value.card_nick,
      importance: value.card_star,
      face1: value.face_1,
      face2: value.face_2,
      face3: value.face_3,
      annotation: value.annotation,
      annot: 3,
    }).then(res => {
      console.log(res.data)
      this.setState({
        card_type:res.data.cardtypes
      })
    })
  }

  
  changeTableNameHandler = (value) => {
    console.log(value)
    axios.post('api/index/change-index-name',{
      index_id : value.tableId,
      name : value.value.newName
    })
    .then(res => {
      console.log('name change : ',res.data)
      const contentsTable = res.data.indexList
      this.setState({
        table_of_contents:contentsTable,
      })
    })
  }

  tableLevelHandler = (value) => {
    console.log(value)
    axios.post('api/index/change-index-level',{
      book_id : this.props.location.book_id,
      index_id : value.tableId,
      level : value.presentLevel,
      seq: value.seq,
      action: value.action
    })
    .then(res => {
      console.log(res.data)
      if(res.data.msg === "이동불가") {
        alert(res.data.msg)
      } else {
        const contentsTable = res.data.indexList
        this.setState({
          table_of_contents:contentsTable,
        })
      }
    })
  }
  tableOrderlHandler = (value) => {
    console.log(value)
    axios.post('api/index/change-index-order',{
      index_id : value.tableId,
      book_id : this.props.location.book_id,
      action : value.action,
      seq :value.presentOrder
    })
    .then(res => {
      console.log(res.data)
      const contentsTable = res.data.indexList
      this.setState({
        table_of_contents:contentsTable,
      })
    })
  }
  tableDeleteHandler = (value) => {
    console.log('index delete:', value)
    axios.post('api/index/delete-index',{
      index_id : value.tableId,
      book_id : this.props.location.book_id,
      seq:value.seq,
      level:value.level,
    }).then(res => {
      console.log(res.data)
      const contentsTable = res.data.indexList
      this.setState({
        table_of_contents:contentsTable,
      })
    })
  }
  handleClick = (key) => {
    if(key === '1' ){
      this.setState({
        hide_show_toggle : true
      })
    } else if(key === '2' ){
      this.setState({
        hide_show_toggle : true
      })
    } else if(key === '3' ){
      this.setState({
        hide_show_toggle : true
      })
    } else if(key === '4' ){
      this.setState({
        hide_show_toggle : true
      })
    } else if(key === '0' ){
      this.setState({
        hide_show_toggle : false
      })
    }
  }
  leftDrawerHandleClick = (key) => {
    if(key === 'none' ){
      this.setState({
        left_drawer_toggle : false
      })
    } else if(key === '목차' ){
      this.setState({
        left_drawer_toggle : true
      })
    }
  }
  selectCardTypeHandler = (key) => {
    console.log(key)
    if(key === '카드선택') {
      this.setState({
        card_selected: 'none'
      })
    } else {
      this.setState({
        card_selected: key
      })
    }
  }
  addCardHandler = () => {
    console.log(this.state.card_selected)
    const contentsList = this.state.card_type.map((content)=>{
          if(content.nick === this.state.card_selected){
            console.log(content)
              const cardType = content.type
              const annotation = content.annotation
              console.log(cardType)
              if (cardType === 'face1') {
                if(annotation === true){
                  const faceLength_1 = content.num_column.face1
                  const annotLength = content.num_column.annot
                  const face_array = []
                  for (var i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  for (var i = 1; i < annotLength+1; i++) {
                    face_array.push('주석'+i+'행')
                  }
                  console.log(face_array)
                  this.setState({
                    current_card: {'face1':faceLength_1,'annot':annotLength},
                    current_card_type:content._id
                  })
                  return face_array
                } else {
                  const faceLength_1 = content.num_column.face1
                  const face_array = []
                  for (var i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  console.log(face_array)
                  this.setState({
                    current_card: {'face1':faceLength_1},
                    current_card_type:content._id
                  })
                  return face_array
                }
                  
              } else if (cardType === 'face2') {
                if(annotation === true){
                  const faceLength_1 = content.num_column.face1
                  const faceLength_2 = content.num_column.face2
                  const annotLength = content.num_column.annot
                  const face_array = []
                  for (var i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  for (var i = 1; i < faceLength_2+1; i++) {
                    face_array.push('2면'+i+'행')
                  }
                  for (var i = 1; i < annotLength+1; i++) {
                    face_array.push('주석'+i+'행')
                  }
                  console.log(face_array)
                  this.setState({
                    current_card: {'face1':faceLength_1,'face2':faceLength_2,'annot':annotLength},
                    current_card_type:content._id
                  })
                  return face_array
                }else {
                  const faceLength_1 = content.num_column.face1
                  const faceLength_2 = content.num_column.face2
                  const face_array = []
                  for (var i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  for (var i = 1; i < faceLength_2+1; i++) {
                    face_array.push('2면'+i+'행')
                  }
                  console.log(face_array)
                  this.setState({
                    current_card: {'face1':faceLength_1,'face2':faceLength_2},
                    current_card_type:content._id
                  })
                  return face_array
                }
                  
              } else if (cardType === 'face3') {
                if(annotation === true){
                  const faceLength_1 = content.num_column.face1
                  const faceLength_2 = content.num_column.face2
                  const faceLength_3 = content.num_column.face3
                  const annotLength = content.num_column.annot
                  const face_array = []
                  for (var i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  for (var i = 1; i < faceLength_2+1; i++) {
                    face_array.push('2면'+i+'행')
                  }
                  for (var i = 1; i < faceLength_3+1; i++) {
                    face_array.push('3면'+i+'행')
                  }
                  for (var i = 1; i < annotLength+1; i++) {
                    face_array.push('주석'+i+'행')
                  }
                  console.log(face_array)
                  this.setState({
                    current_card: {'face1':faceLength_1,'face2':faceLength_2,'face3':faceLength_3,'annot':annotLength},
                    current_card_type:content._id
                  })
                  return face_array
                }else {
                  const faceLength_1 = content.num_column.face1
                  const faceLength_2 = content.num_column.face2
                  const faceLength_3 = content.num_column.face3
                  const face_array = []
                  for (var i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  for (var i = 1; i < faceLength_2+1; i++) {
                    face_array.push('2면'+i+'행')
                  }
                  for (var i = 1; i < faceLength_3+1; i++) {
                    face_array.push('3면'+i+'행')
                  }
                  console.log(face_array)
                  this.setState({
                    current_card: {'face1':faceLength_1,'face2':faceLength_2,'face3':faceLength_3},
                    current_card_type:content._id
                  })
                  return face_array
                }
                  
            }
          }
      }
    )
    var filtered = contentsList.filter(function(x) {
      return x !== undefined;
    });
    const finalArray = filtered[0]
    console.log(finalArray)
      this.setState({
        card_add: true,
        arrayForEditor:finalArray
      })
  }
  handleSubmit = () => {
    // this.state.current_card
    const current = this.state.current_card
    if(current){
      var face1 = current.face1
      if(current.face2){
        var face2 = current.face2
      }
      if(current.face3){
        var face3 = current.face3
      }
      if(current.annot){
        var annot = current.annot
      }
      console.log(face1, face2, face3, annot)
    }
    const first_face =[];
    const second_face = [];
    const third_face = [];
    const annotation = [];
    if (face1 && !face2 && !face3 && !annot){
      for (var i = 1; i < face1+1; i++) {
        first_face.push(this.state['editor'+i])
      }
    }
    if (face1 && annot && !face3 && !face2){
      for (var i = 1; i < face1+1; i++) {
        first_face.push(this.state['editor'+i])
      }
      if(annot){
        for (var i = face1+1; i < face1+annot+1; i++) {
          annotation.push(this.state['editor'+i])
        }
      }
    }

    if (face1 && face2 && !face3 && !annot){
      for (var i = 1; i < face1+1; i++) {
        first_face.push(this.state['editor'+i])
      }
      if(face2){
        for (var i = face1+1; i < face1+face2+1; i++) {
          second_face.push(this.state['editor'+i])
        }
      }
    }

    if (face1 && face2 && !face3 &&annot){
      for (var i = 1; i < face1+1; i++) {
        first_face.push(this.state['editor'+i])
      }
      if(face2){
        for (var i = face1+1; i < face1+face2+1; i++) {
          second_face.push(this.state['editor'+i])
        }
        if(annot){
          for (var i = face1+face2+1; i < face1+face2+annot+1; i++) {
            annotation.push(this.state['editor'+i])
          }
        }
      }
    }

    if (face1 && face2 && face3 && !annot){
      for (var i = 1; i < face1+1; i++) {
        first_face.push(this.state['editor'+i])
      }
      if(face2){
        for (var i = face1+1; i < face1+face2+1; i++) {
          second_face.push(this.state['editor'+i])
        }
      }
      if(face3){
        for (var i = face1+face2+1; i < face1+face2+face3+1; i++) {
          third_face.push(this.state['editor'+i])
        }
      }
    }

    if (face1 && face2 && face3 && annot){
      for (var i = 1; i < face1+1; i++) {
        first_face.push(this.state['editor'+i])
      }
      if(face2){
        for (var i = face1+1; i < face1+face2+1; i++) {
          second_face.push(this.state['editor'+i])
        }
      }
      if(face3){
        for (var i = face1+face2+1; i < face1+face2+face3+1; i++) {
          third_face.push(this.state['editor'+i])
        }
      }
      if(annot){
        for (var i = face1+face2+face3+1; i < face1+face2+face3+annot+1; i++) {
          annotation.push(this.state['editor'+i])
        }
      }
    }

    axios.post('api/card/create-card', {
      cardtype_id:this.state.current_card_type,
      index_id:this.state.index_id,
      first_face : first_face,
      second_face : second_face,
      third_face : third_face,
      annotation : annotation,
      // editor1: this.state.editor1,
      // editor2: this.state.editor2,
      // editor3: this.state.editor3,
      // editor4: this.state.editor4,
      // editor5: this.state.editor5,
      // editor6: this.state.editor6,
      // editor7: this.state.editor7,
      // editor8: this.state.editor8,
      // editor9: this.state.editor9,
      // editor10: this.state.editor10,
      // editor11: this.state.editor11,
      // editor12: this.state.editor12,
      // editor13: this.state.editor13,
      // editor14: this.state.editor14,
      // editor15: this.state.editor15,
    })
    .then(res => {
      console.log(res.data)
      this.setState({
        contents:res.data.cardlist,
        editor1: '',
        editor2: '',
        editor3: '',
        editor4: '',
        editor5: '',
        editor6: '',
        editor7: '',
        editor8: '',
        editor9: '',
        editor10: '',
        editor11: '',
        editor12: '',
        editor13: '',
        editor14: '',
        editor15: '',
      })
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({card_add:false})
  }

  handleModelChangeEditor1 = (model) => {
    console.log(model)
    this.setState({
      editor1: model
    })
  }
  handleModelChangeEditor2 = (model) => {
    console.log(model)
    this.setState({
      editor2: model
    })
  }
  handleModelChangeEditor3 = (model) => {
    console.log(model)
    this.setState({
      editor3: model
    })
  }
  handleModelChangeEditor4 = (model) => {
    console.log(model)
    this.setState({
      editor4: model
    })
  }

  handleModelChangeEditor5 = (model) => {
    console.log(model)
    this.setState({
      editor5: model
    })
  }

  handleModelChangeEditor6 = (model) => {
    console.log(model)
    this.setState({
      editor6: model
    })
  }

  handleModelChangeEditor7 = (model) => {
    console.log(model)
    this.setState({
      editor7: model
    })
  }

  handleModelChangeEditor8 = (model) => {
    console.log(model)
    this.setState({
      editor8: model
    })
  }

  handleModelChangeEditor9 = (model) => {
    console.log(model)
    this.setState({
      editor9: model
    })
  }

  handleModelChangeEditor10 = (model) => {
    console.log(model)
    this.setState({
      editor10: model
    })
  }

  handleModelChangeEditor11 = (model) => {
    console.log(model)
    this.setState({
      editor11: model
    })
  }

  handleModelChangeEditor12 = (model) => {
    console.log(model)
    this.setState({
      editor12: model
    })
  }

  handleModelChangeEditor13 = (model) => {
    console.log(model)
    this.setState({
      editor13: model
    })
  }

  handleModelChangeEditor14 = (model) => {
    console.log(model)
    this.setState({
      editor14: model
    })
  }

  handleModelChangeEditor15 = (model) => {
    console.log(model)
    this.setState({
      editor15: model
    })
  }


  onCardChangeHandler = (value) => {
    console.log('onCardChangeHandler : ',value)
    this.setState({
      card_selected_detailsetting:value
    })
  }
  onSelect = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    this.setState({
      index_id:info.node.index_id
    })
    axios.post('api/card/get-cardlist',{
      index_id: info.node.index_id
    })
      .then(res => {
        this.setState({ 
          contents:res.data.cardlist,
        });
      })
  };

  render() {
    if (this.state.hide_show_toggle === false){
      var toggle = '-308px' 
      var main = '0px'
    } else {
      var toggle = '0px' 
      var main = '-308px'
    }
    if (this.state.left_drawer_toggle === false){
      var toggleLeft = '-31px' 
    } else {
      var toggleLeft = '0px' 
    }
    if(this.state.current_card){
      console.log(this.state.current_card)
    }
    if(this.state.contents){
      console.log(this.state.contents)
      var contentsList = this.state.contents.map((content)=>(
        <>
          <div>1면 : <FroalaEditorView model={content.content_id.first_face}/></div>
          <div>2면 : <FroalaEditorView model={content.content_id.second_face}/></div>
          <div>3면 : <FroalaEditorView model={content.content_id.third_face}/></div>
          <div>주석 : <FroalaEditorView model={content.content_id.annotation}/></div>
          <hr/>
        </>
      ))
    }
    if(this.state.card_type){
      var optionList = this.state.card_type.map((card_type)=>(
          <Option value={card_type.nick}>{card_type.nick}</Option>
      ))
    }
    return (
      <>
      <div className="book_writing_container">
        <div className="left_side_container" style={{marginLeft:toggleLeft}}>
        <LeftDrawer addTable={this.addTable} 
                    tableDeleteHandler={this.tableDeleteHandler} 
                    tableOrderlHandler={this.tableOrderlHandler} 
                    tableLevelHandler={this.tableLevelHandler} 
                    changeTableNameHandler={this.changeTableNameHandler} 
                    table_of_contents={this.state.table_of_contents} 
                    toggle={this.state.left_drawer_toggle} 
                    onClick={this.leftDrawerHandleClick}
                    onSelect={this.onSelect}/>
        </div>
        <div className="editor_container" style={{marginRight:main}}>
          <div className="editor_container_templete"></div>
        </div>
        <div className="editor_container_templete_position_absolute">
          <div className="editor_top_menu">
            <div>
              <Button size='small' onClick={this.showModal}>카드 이동/삭제</Button><span className="book_title">책 제목 : {this.state.bookTitle}</span>
              <Modal
                title="카드 이동 및 삭제"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <BookRelocate/>
              </Modal>
            </div>
            <div>
              <Select size='small' defaultValue={'카드선택'} style={{width:'150px'}} onChange={this.selectCardTypeHandler}>
                <Option value="카드선택">카드선택</Option>
                {optionList}
              </Select>
              <Button size='small' onClick={this.addCardHandler}>카드추가</Button>
            </div>
          </div>
          <div className="editor_panel">
            {contentsList}
            <div id="toolbarContainer"></div>
            
            <div className="a4">
              {this.state.card_add === true ? <EditorTry editor1={this.state.editor1}
                                                         editor2={this.state.editor2}
                                                         editor3={this.state.editor3}
                                                         arrayForEditor={this.state.arrayForEditor}
                                                         handleSubmit={this.handleSubmit}
                                                         handleModelChangeEditor1={this.handleModelChangeEditor1}
                                                         handleModelChangeEditor2={this.handleModelChangeEditor2}
                                                         handleModelChangeEditor3={this.handleModelChangeEditor3}
                                                         handleModelChangeEditor4={this.handleModelChangeEditor4}
                                                         handleModelChangeEditor5={this.handleModelChangeEditor5}
                                                         handleModelChangeEditor6={this.handleModelChangeEditor6}
                                                         handleModelChangeEditor7={this.handleModelChangeEditor7}
                                                         handleModelChangeEditor8={this.handleModelChangeEditor8}
                                                         handleModelChangeEditor9={this.handleModelChangeEditor9}
                                                         handleModelChangeEditor10={this.handleModelChangeEditor10}
                                                         handleModelChangeEditor11={this.handleModelChangeEditor11}
                                                         handleModelChangeEditor12={this.handleModelChangeEditor12}
                                                         handleModelChangeEditor13={this.handleModelChangeEditor13}
                                                         handleModelChangeEditor14={this.handleModelChangeEditor14}
                                                         handleModelChangeEditor15={this.handleModelChangeEditor15}/> : ''}
            </div>
          </div>
        </div>
        <div className="right_side_container" style={{marginRight:toggle}}>
          <SettingTabs card_selected={this.state.card_selected_detailsetting} onCardChangeHandler={this.onCardChangeHandler} cardType={this.state.card_type} addCardType={this.addCardType} toggle={this.state.hide_show_toggle} onClick={this.handleClick}/>
        </div>
      </div>
      </>
    )
  }
}

export default BookWriting
