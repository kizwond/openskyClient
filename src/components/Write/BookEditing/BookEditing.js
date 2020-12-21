import React, { Component } from 'react'
import axios from 'axios'
import LeftDrawer from './BookWritingLeftDrawer'
import './BookWriting.css'
import {Button, Select,Modal,Space } from 'antd';
import SettingTabs from './SettingTabs'
import EditorTry from './EditorTry'


import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/plugins.pkgd.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/languages/ko'
import 'froala-editor//css/themes/gray.min.css'


// import FroalaEditorComponent from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

import BookRelocate from './BookRelocate'
import NewCardTemplete from './NewCardTemplete';
import NewPageTemplete from './NewPageTemplete';
import CardTempleteEditing from './CardTempleteEditing'

// import FroalaEditor from 'react-froala-wysiwyg';



const { Option } = Select;

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
       file:'',
    }
  }

  componentDidMount() {
    this.getIndexList()
    this.getCardTypeList()
  }

  getIndexList = () => {
    const value = sessionStorage.getItem("book_id")
    console.log('req start!!!!!!!!!!')
    axios.post('api/index/get-indexlist',{
      book_id:value
    })
      .then(res => {
        this.setState({ 
          table_of_contents:res.data.indexList,
        });
      })
  }
  getCardTypeList = () => {
    const value = sessionStorage.getItem("book_id")
    axios.post('api/cardtype/get-cardtype',{
      book_id:value
    })
      .then(res => {
        console.log(res.data)
        console.log("get cardtype list :", res.data)
        this.setState({ 
          card_type:res.data.cardtypes
        });
      })
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

  updateContentsTable = (value) => {
    console.log('updateContentsTable :', value)
    this.setState({
      table_of_contents:value
    })
  }

  updateCardTypeState = (value) => {
    console.log('cardtype update state', value)
    this.setState({
      card_type:value
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
    console.log('card_selected : ', this.state.card_selected)
    const contentsList = this.state.card_type.map((content)=>{
          if(content.name === this.state.card_selected){
            console.log('here', content)
              const cardType = content.type
              const annotation = content.annotation
              console.log(cardType)
              if (cardType === 'read') {

                  const faceLength_1 = content.num_of_row.face1
                  const face_array = []
                  for ( var i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  console.log(face_array)
                  this.setState({
                    current_card: {'face1':faceLength_1},
                    current_card_type:content._id
                  })
                  return face_array
                  
              } else if (cardType === 'flip-normal') {
                if(annotation === true){
                  const faceLength_1 = content.num_column.face1
                  const faceLength_2 = content.num_column.face2
                  const annotLength = content.num_column.annot
                  const face_array = []
                  for ( i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  for ( i = 1; i < faceLength_2+1; i++) {
                    face_array.push('2면'+i+'행')
                  }
                  for ( i = 1; i < annotLength+1; i++) {
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
                  for ( i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  for ( i = 1; i < faceLength_2+1; i++) {
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
                  for ( i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  for ( i = 1; i < faceLength_2+1; i++) {
                    face_array.push('2면'+i+'행')
                  }
                  for ( i = 1; i < faceLength_3+1; i++) {
                    face_array.push('3면'+i+'행')
                  }
                  for ( i = 1; i < annotLength+1; i++) {
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
                  for ( i = 1; i < faceLength_1+1; i++) {
                    face_array.push('1면'+i+'행')
                  }
                  for ( i = 1; i < faceLength_2+1; i++) {
                    face_array.push('2면'+i+'행')
                  }
                  for ( i = 1; i < faceLength_3+1; i++) {
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
    console.log('finalArray: ',finalArray)
      this.setState({
        card_add: true,
        arrayForEditor:finalArray
      })
  }
  handleSubmit = () => {
    console.log('111:',this.state.current_card)
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
      for ( i = 1; i < face1+1; i++) {
        first_face.push(this.state['editor'+i])
      }
      if(annot){
        for ( i = face1+1; i < face1+annot+1; i++) {
          annotation.push(this.state['editor'+i])
        }
      }
    }

    if (face1 && face2 && !face3 && !annot){
      for ( i = 1; i < face1+1; i++) {
        first_face.push(this.state['editor'+i])
      }
      if(face2){
        for ( i = face1+1; i < face1+face2+1; i++) {
          second_face.push(this.state['editor'+i])
        }
      }
    }

    if (face1 && face2 && !face3 &&annot){
      for ( i = 1; i < face1+1; i++) {
        first_face.push(this.state['editor'+i])
      }
      if(face2){
        for ( i = face1+1; i < face1+face2+1; i++) {
          second_face.push(this.state['editor'+i])
        }
        if(annot){
          for ( i = face1+face2+1; i < face1+face2+annot+1; i++) {
            annotation.push(this.state['editor'+i])
          }
        }
      }
    }

    if (face1 && face2 && face3 && !annot){
      for ( i = 1; i < face1+1; i++) {
        first_face.push(this.state['editor'+i])
      }
      if(face2){
        for ( i = face1+1; i < face1+face2+1; i++) {
          second_face.push(this.state['editor'+i])
        }
      }
      if(face3){
        for ( i = face1+face2+1; i < face1+face2+face3+1; i++) {
          third_face.push(this.state['editor'+i])
        }
      }
    }

    if (face1 && face2 && face3 && annot){
      for ( i = 1; i < face1+1; i++) {
        first_face.push(this.state['editor'+i])
      }
      if(face2){
        for ( i = face1+1; i < face1+face2+1; i++) {
          second_face.push(this.state['editor'+i])
        }
      }
      if(face3){
        for ( i = face1+face2+1; i < face1+face2+face3+1; i++) {
          third_face.push(this.state['editor'+i])
        }
      }
      if(annot){
        for ( i = face1+face2+face3+1; i < face1+face2+face3+annot+1; i++) {
          annotation.push(this.state['editor'+i])
        }
      }
    }
    
    console.log("here?")
    console.log(this.state.contents)
    const seq_in_index = this.state.contents[0].seq_in_index 
    console.log('seq_in_index',seq_in_index)
    axios.post('api/card/create-card', {
      cardtype_id:this.state.current_card_type,
      index_id:this.state.index_id,
      first_face : first_face,
      second_face : second_face,
      third_face : third_face,
      annotation : annotation,
      seq_in_index: seq_in_index
    })
    .then(res => {
      console.log('after submit:', res.data)
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
        console.log('what', res.data)
        this.setState({ 
          contents:res.data.cardlist,
        });
      })
  };
  uplodeFile = event =>{
    console.log(this.state.file)
    const data = new FormData();
    data.append("file", this.state.file)
    data.append("index_id", this.state.index_id)

    axios.post('api/card/create-card-by-excel', data)
      .then(res => {alert(res.data.msg); this.setState({
        file:''
      })})
      .catch(err => console.log(err))
  }
  
  render() {
    if (this.state.hide_show_toggle === false){
      var toggle = '-308px' 
      var main = '0px'
    } else {
      toggle = '0px' 
      main = '-308px'
    }
    if (this.state.left_drawer_toggle === false){
      var toggleLeft = '-31px' 
    } else {
      toggleLeft = '0px' 
    }

    if(this.state.contents){
      console.log('original data:',this.state.contents)
      var contentsList = this.state.contents.map((content)=>{
        console.log(content)
        const face1_column_num = content.cardtype_id.num_column.face1;
        const face2_column_num = content.cardtype_id.num_column.face2;
        const annot_column_num = content.cardtype_id.num_column.annot;
        const direction = content.cardtype_id.direction;
        const annotation_on = content.cardtype_id.annotation;

        if (content.cardtype_id.type === "face1"){
          if(annotation_on === true){
            const face1 = []
            for(var i = 0; i <face1_column_num; i++){
              face1.push(<FroalaEditorView model={content.content_of_first_face[i]}/>) 
            }
            const annotation_contents = [];
            for( i = 0; i <annot_column_num; i++){
              annotation_contents.push(<FroalaEditorView model={content.content_of_annot[i]}/>)
            }
            const total = []
            total.push({'face1':face1,'annotation_contents':annotation_contents,'type':content.cardtype_id.type,'annotation_on':annotation_on})
            return total
          } else {
            const face1 = []
            for( i = 0; i <face1_column_num; i++){
              face1.push(<FroalaEditorView model={content.content_of_first_face[i]}/>) 
            }
            const total=[]
            total.push({'face1':face1,'type':content.cardtype_id.type,'annotation_on':annotation_on})
            return total
          }
        } else if(content.cardtype_id.type === "face2"){
          if(annotation_on === true){
            const face1 = []
            for( i = 0; i <face1_column_num; i++){
              console.log('i', i)
              face1.push(<FroalaEditorView model={content.content_of_first_face[i]}/>) 
            }
            const face2 = []
            for( i = 0; i <face2_column_num; i++){
              face2.push(<FroalaEditorView model={content.content_of_second_face[i]}/>) 
            }
            const annotation_contents = [];
            for( i = 0; i <annot_column_num; i++){
              annotation_contents.push(<FroalaEditorView model={content.content_of_annot[i]}/>)
            }
            const total = []
            total.push({'face1':face1,'face2':face2,'annotation_contents':annotation_contents,'type':content.cardtype_id.type,'annotation_on':annotation_on,'direction':direction})
            return total
          } else {
            const face1 = []
            for( i = 0; i <face1_column_num; i++){
              face1.push(<FroalaEditorView model={content.content_of_first_face[i]}/>) 
            }
            const face2 = []
            for( i = 0; i <face2_column_num; i++){
              face2.push(<FroalaEditorView model={content.content_of_second_face[i]}/>) 
            }
            const total = []
            total.push({'face1':face1,'face2':face2,'type':content.cardtype_id.type,'annotation_on':annotation_on,'direction':direction})
            return total
          }
        }

      })
    }
    if(this.state.card_type){
      console.log('why?:', this.state.card_type)
      var optionList = this.state.card_type.map((type)=>(
          <Option key={type._id} value={type.name}>{type.name}</Option>
      ))
    }
    console.log(contentsList)
    if(contentsList){
      console.log('hello',contentsList)
      var list = contentsList.map((content)=>{
          console.log(content)
          console.log(content[0].face1)
          if(content[0].type === 'face1' && content[0].annotation_on === true){
            return <>
                    <div className="test" style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div>{content[0].face1}</div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <Button size="small" style={{fontSize:'10px'}}>수정</Button><Button size="small" style={{fontSize:'10px'}}>삭제</Button>
                  </>
          } else if(content[0].type === 'face1' && content[0].annotation_on === false){
            return <>
                    <div style={{marginBottom:'5px'}}>
                      <div>{content[0].face1}</div>
                    </div>
                    <Button size="small" style={{fontSize:'10px'}}>수정</Button><Button size="small" style={{fontSize:'10px'}}>삭제</Button>
                  </>
          } else if(content[0].type === 'face2' && content[0].annotation_on === true && content[0].direction === "left_right"){
            return <>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div>{content[0].face1}</div>
                      <div>{content[0].face2}</div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <Button size="small" style={{fontSize:'10px'}}>수정</Button><Button size="small" style={{fontSize:'10px'}}>삭제</Button>
                  </>
          } else if(content[0].type === 'face2' && content[0].annotation_on === false && content[0].direction === "left_right"){
            return <>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div>{content[0].face1}</div>
                      <div>{content[0].face2}</div>
                    </div>
                    <Button size="small" style={{fontSize:'10px'}}>수정</Button><Button size="small" style={{fontSize:'10px'}}>삭제</Button>
                  </>
          } else if(content[0].type === 'face2' && content[0].annotation_on === true && content[0].direction === "up_down"){
            return <>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div style={{marginBottom:'5px', display:'flex', flexDirection:'column'}}>
                        <div>{content[0].face1}</div>
                        <div>{content[0].face2}</div>
                      </div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <Button size="small" style={{fontSize:'10px'}}>수정</Button><Button size="small" style={{fontSize:'10px'}}>삭제</Button>
                  </>
          } else if(content[0].type === 'face2' && content[0].annotation_on === false && content[0].direction === "up_down"){
            return <>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'column'}}>
                      <div>{content[0].face1}</div>
                      <div>{content[0].face2}</div>
                    </div>
                    <Button size="small" style={{fontSize:'10px'}}>수정</Button><Button size="small" style={{fontSize:'10px'}}>삭제</Button>
                  </>
          }

      })
    }
    console.log(this.state.table_of_contents)
    return (
      <>
      <div className="book_writing_container">
        <div className="left_side_container" style={{marginLeft:toggleLeft}}>
        <LeftDrawer updateContentsTable={this.updateContentsTable} 
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
            <div style={{display:'flex', alignItems:'center'}}>
              <Space>
                <NewPageTemplete updateCardTypeState={this.updateCardTypeState}/>
                <NewCardTemplete updateCardTypeState={this.updateCardTypeState}/>
                <CardTempleteEditing updateCardTypeState={this.updateCardTypeState} card_type={this.state.card_type}/>
                <Button size='small' style={{fontSize:"11px"}} onClick={this.showModal}>카드 이동/삭제</Button>
              </Space>
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
              <form action="#">
                <input type="file" name="import_file" onChange={(event)=>{
                  const file = event.target.files[0];
                  this.setState({
                    file:file
                  })
                }}/>
              </form>
              <Button size='small' onClick={this.uplodeFile}>파일업로드</Button>
              
            </div>
          </div>
          <div className="editor_panel">
            {/* 카드 뿌려지는 영역 */}
            {list ? list : ''}
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
          <SettingTabs card_selected={this.state.card_selected_detailsetting} onCardChangeHandler={this.onCardChangeHandler} cardType={this.state.card_type} toggle={this.state.hide_show_toggle} onClick={this.handleClick}/>
        </div>
      </div>
      </>
    )
  }
}

export default BookWriting
