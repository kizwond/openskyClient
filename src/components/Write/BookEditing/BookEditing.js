import React, { Component } from 'react'
import axios from 'axios'
import LeftDrawer from './BookWritingLeftDrawer'
import './BookWriting.css'
import {Button, Select,Modal,Space } from 'antd';
import SettingTabs from './SettingTabs'
import EditorTry from './EditorTry'
import {StarTwoTone,DeleteOutlined,EditOutlined} from '@ant-design/icons';

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
import CardDelete from './CardDelete'
import CardEditing from './CardEditing'
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
  updateCardListState = (value) => {
    this.setState({ 
      contents:value,
    });
  };

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
          const selectionLength = content.num_of_row.selection
          console.log(cardType)
          if (cardType === 'read') {
            const faceLength_1 = content.num_of_row.face1
            const annotLength = content.num_of_row.annotation
            const face_array = []
            for ( var i = 1; i < faceLength_1+1; i++) {
              face_array.push('1면'+i+'행')
            }
            for ( i = 1; i < annotLength+1; i++) {
              face_array.push('주석')
            }
            console.log(face_array)
            this.setState({
              current_card: {'face1':faceLength_1,'annot':annotLength},
              current_card_type:content._id
            })
            return face_array
          } else if (cardType === 'flip-normal') {
            if(selectionLength > 0){
              const faceLength_1 = content.num_of_row.face1
              const faceLength_2 = content.num_of_row.face2
              const annotLength = content.num_of_row.annotation
              const face_array = []
              for ( i = 1; i < faceLength_1+1; i++) {
                face_array.push('1면'+i+'행')
              }
              for ( i = 1; i < selectionLength+1; i++) {
                face_array.push('보기'+i+'행')
              }
              for ( i = 1; i < faceLength_2+1; i++) {
                face_array.push('2면'+i+'행')
              }
              for ( i = 1; i < annotLength+1; i++) {
                face_array.push('주석')
              }
              console.log(face_array)
              this.setState({
                current_card: {'face1':faceLength_1,'selection':selectionLength,'face2':faceLength_2,'annot':annotLength},
                current_card_type:content._id
              })
              return face_array

            }else {
              const faceLength_1 = content.num_of_row.face1
              const faceLength_2 = content.num_of_row.face2
              const annotLength = content.num_of_row.annotation
              const face_array = []
              for ( i = 1; i < faceLength_1+1; i++) {
                face_array.push('1면'+i+'행')
              }
              for ( i = 1; i < faceLength_2+1; i++) {
                face_array.push('2면'+i+'행')
              }
              for ( i = 1; i < annotLength+1; i++) {
                face_array.push('주석')
              }
              console.log(face_array)
              this.setState({
                current_card: {'face1':faceLength_1,'face2':faceLength_2,'annot':annotLength},
                current_card_type:content._id
              })
              return face_array
            }
            
          } else if (cardType === 'share') {
            const shareLength = content.num_of_row.share
            const annotLength = content.num_of_row.annotation
            const face_array = []
            for ( i = 1; i < shareLength+1; i++) {
              face_array.push('공통'+i+'행')
            }
            for ( i = 1; i < annotLength+1; i++) {
              face_array.push('주석')
            }
            console.log(face_array)
            this.setState({
              current_card: {'share':shareLength,'annot':annotLength},
              current_card_type:content._id
            })
            return face_array

          } else if (cardType === 'none') {
            const noneLength = content.num_of_row.none
            const annotLength = content.num_of_row.annotation
            const face_array = []
            for ( i = 1; i < noneLength+1; i++) {
              face_array.push('비학습카드')
            }
            for ( i = 1; i < annotLength+1; i++) {
              face_array.push('주석')
            }
            console.log(face_array)
            this.setState({
              current_card: {'none':noneLength,'annot':annotLength},
              current_card_type:content._id
            })
            return face_array
          }

        }
      })

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
 
  updateContentsState = (value) => {
    console.log('updateContentsState', value)
    this.setState({
      contents:value,
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
    this.setState({card_add:false})
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
    const value = sessionStorage.getItem("book_id")
    console.log(this.state.file)
    const data = new FormData();
    data.append("file", this.state.file)
    data.append("index_id", this.state.index_id)
    data.append("book_id", value)

    axios.post('api/card/create-card-by-excel', data)
      .then(res => {alert(res.data.msg); 
        this.setState({
        file:''
      })})
      .catch(err => console.log(err))
  }
  
  onClickCardHandler = (value) => {
    console.log(value)
    var elem = document.getElementById(value);
    var elem_btn = document.getElementById(value+"_btn");
    elem.style.transform = "scale( 1.01 )";
    elem.style.transition = "all ease 0.2s";
    elem.style.border = "1px solid lightgrey";
    elem.style.borderRadius = "10px";
    elem.style.boxShadow = "5px 5px 5px -3px rgba(112,112,112,1)";

    elem_btn.style.display = "flex";
    elem_btn.style.flexDirection = "row";
    elem_btn.style.justifyContent = "space-between";
  }
  onLeaveCardHandler = (value) => {
    console.log(value)
    var elem = document.getElementById(value);
    var elem_btn = document.getElementById(value+"_btn");
    elem.style.transform = "none";
    elem.style.transition = "all ease 0s";
    elem.style.border = "none";
    elem.style.borderRadius = "0px";
    elem.style.boxShadow ="none";

    elem_btn.style.display = "none";
  }
  // transform: scale( 1.5 )
  // transition: all ease 1s;
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
        const flag_column_num = content.cardtype_id.num_of_row.maker_flag;
        const face1_column_num = content.cardtype_id.num_of_row.face1;
        const selection_column_num = content.cardtype_id.num_of_row.selection;
        const face2_column_num = content.cardtype_id.num_of_row.face2;
        const annot_column_num = content.cardtype_id.num_of_row.annotation;
        const none_column_num = content.cardtype_id.num_of_row.none;
        const share_column_num = content.cardtype_id.num_of_row.share;

        const direction = content.cardtype_id.card_direction;
        // const annotation_on = content.cardtype_id.annotation;

        // 읽기카드
        if (content.cardtype_id.type === "read"){
            const flag = []
            for( var i = 0; i <flag_column_num; i++){
              flag.push(content.contents.maker_flag[i]) 
            }
            const face1 = []
            for( i = 0; i <face1_column_num; i++){
              face1.push(<FroalaEditorView model={content.contents.face1[i]}/>) 
            }
            const annotation_contents = [];
            for( i = 0; i <annot_column_num; i++){
              annotation_contents.push(<FroalaEditorView model={content.contents.annotation[i]}/>)
            }
            const total = []
            total.push({'content':content,'face1':face1,'annotation_contents':annotation_contents,'type':content.cardtype_id.type, 'flag':flag, 'card_id':content._id, seq_in_index:content.seq_in_index})
            return total

        } else if(content.cardtype_id.type === "flip-normal"){
          if(selection_column_num > 0){
            const flag = []
            for( i = 0; i <flag_column_num; i++){
              flag.push(content.contents.maker_flag[i]) 
            }
            const face1 = []
            for( i = 0; i <face1_column_num; i++){
              face1.push(<FroalaEditorView model={content.contents.face1[i]}/>) 
            }
            const selection_contents = [];
              for( i = 0; i <selection_column_num; i++){
                selection_contents.push(<FroalaEditorView model={content.contents.selection[i]}/>)
              }
            const face2 = []
            for( i = 0; i <face2_column_num; i++){
              face2.push(<FroalaEditorView model={content.contents.face2[i]}/>) 
            }
            const annotation_contents = [];
            for( i = 0; i <annot_column_num; i++){
              annotation_contents.push(<FroalaEditorView model={content.contents.annotation[i]}/>)
            }
            const total = []
            total.push({'content':content,'face1':face1,'selection_contents':selection_contents,'face2':face2,'annotation_contents':annotation_contents,'type':content.cardtype_id.type,'direction':direction, 'flag':flag, 'card_id':content._id, seq_in_index:content.seq_in_index})
            return total
          } else {
            const flag = []
            for( i = 0; i <flag_column_num; i++){
              flag.push(content.contents.maker_flag[i]) 
            }
            const face1 = []
            for( i = 0; i <face1_column_num; i++){
              face1.push(<FroalaEditorView model={content.contents.face1[i]}/>) 
            }
            const face2 = []
            for( i = 0; i <face2_column_num; i++){
              face2.push(<FroalaEditorView model={content.contents.face2[i]}/>) 
            }
            const annotation_contents = [];
            for( i = 0; i <annot_column_num; i++){
              annotation_contents.push(<FroalaEditorView model={content.contents.annotation[i]}/>)
            }
            const total = []
            total.push({'content':content,'face1':face1,'face2':face2,'annotation_contents':annotation_contents,'type':content.cardtype_id.type,'direction':direction, 'flag':flag, 'card_id':content._id, seq_in_index:content.seq_in_index})
            return total
          }

        } else if (content.cardtype_id.type === "none"){
          const none = []
          for( i = 0; i <none_column_num; i++){
            none.push(<FroalaEditorView model={content.contents.none[i]}/>) 
          }
          const annotation_contents = [];
          for( i = 0; i <annot_column_num; i++){
            annotation_contents.push(<FroalaEditorView model={content.contents.annotation[i]}/>)
          }
          const total = []
          total.push({'content':content,'none':none,'annotation_contents':annotation_contents,'type':content.cardtype_id.type, 'card_id':content._id, seq_in_index:content.seq_in_index})
          return total

        } else if (content.cardtype_id.type === "share"){
          const share = []
          for( i = 0; i <share_column_num; i++){
            share.push(<FroalaEditorView model={content.contents.share[i]}/>) 
          }
          const annotation_contents = [];
          for( i = 0; i <annot_column_num; i++){
            annotation_contents.push(<FroalaEditorView model={content.contents.annotation[i]}/>)
          }
          const total = []
          total.push({'content':content,'share':share,'annotation_contents':annotation_contents,'type':content.cardtype_id.type, 'card_id':content._id, seq_in_index:content.seq_in_index})
          return total
        }

      })
    }

    if(this.state.card_type){
      var optionList = this.state.card_type.map((type)=>(
          <Option key={type._id} value={type.name}>{type.name}</Option>
      ))
    }

    console.log('contentsList : ',contentsList)
    if(contentsList){
      console.log('hello',contentsList)
      var list = contentsList.map((content)=>{

          if(content[0].flag == "1"){
            var star = <StarTwoTone />
          } else if(content[0].flag == "2"){
            star = <><StarTwoTone /><StarTwoTone /></>
          } else if(content[0].flag == "3"){
            star = <><StarTwoTone /><StarTwoTone /><StarTwoTone /></>
          } else if(content[0].flag == "4"){
            console.log('4')
            star = <><StarTwoTone /><StarTwoTone /><StarTwoTone /><StarTwoTone /></>
          } else if(content[0].flag == "5"){
            star = <><StarTwoTone /><StarTwoTone /><StarTwoTone /><StarTwoTone /><StarTwoTone /></>
          } else {
            star = ''
          }
          if(content[0].type === 'read'){
            return <div style={{cursor:"pointer", backgroundColor:"white", padding:"5px"}} id={content[0].card_id} onMouseOver={() => this.onClickCardHandler(content[0].card_id)} onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                    <div>{star}</div>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div>{content[0].face1}</div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} style={{display:"none"}}>
                      <div></div> 
                      <div>  
                      <Space>
                        <Button size="small" style={{fontSize:'10px'}} icon={<EditOutlined />}>내용 편집</Button>
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div>
                    </div>
                  </div>
          } else if(content[0].type === 'flip-normal'&& !content[0].selection_contents && content[0].direction === "left-right"){
            return <div style={{cursor:"pointer", backgroundColor:"white", padding:"5px"}} id={content[0].card_id} onMouseOver={() => this.onClickCardHandler(content[0].card_id)} onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                    <div>{star}</div>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div>{content[0].face1}</div>
                      <div>{content[0].face2}</div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} style={{display:"none"}}>
                      <div></div> 
                      <div> 
                      <Space>   
                        <Button size="small" style={{fontSize:'10px'}} icon={<EditOutlined />}>내용 편집</Button>
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div> 
                    </div>
                  </div>
          } else if(content[0].type === 'flip-normal' && content[0].selection_contents && content[0].direction === "left-right"){
            return <div style={{cursor:"pointer", backgroundColor:"white", padding:"5px"}} id={content[0].card_id} onMouseOver={() => this.onClickCardHandler(content[0].card_id)} onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                    <div>{star}</div>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}> 
                        <div>{content[0].face1}</div>
                        <div>{content[0].selection_contents}</div>
                      </div>
                      <div>{content[0].face2}</div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} style={{display:"none"}}>
                      <div></div>
                      <div>
                      <Space>
                        <Button size="small" style={{fontSize:'10px'}} icon={<EditOutlined />}>내용 편집</Button>
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div>
                    </div>
                  </div>
          } else if(content[0].type === 'flip-normal' && !content[0].selection_contents && content[0].direction === "top-bottom"){
            return <div style={{cursor:"pointer", backgroundColor:"white", padding:"5px"}} id={content[0].card_id} onMouseOver={() => this.onClickCardHandler(content[0].card_id)} onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                    <div>{star}</div>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div style={{marginBottom:'5px', display:'flex', flexDirection:'column'}}>
                        <div>{content[0].face1}</div>
                        <div>{content[0].face2}</div>
                      </div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} style={{display:"none"}}>
                      <div></div>
                      <div>
                      <Space>
                        <Button size="small" style={{fontSize:'10px'}} icon={<EditOutlined />}>내용 편집</Button>
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div>
                    </div>
                  </div>
          } else if(content[0].type === 'flip-normal' && content[0].selection_contents && content[0].direction === "top-bottom"){
            return <div style={{cursor:"pointer", backgroundColor:"white", padding:"5px"}} id={content[0].card_id} onMouseOver={() => this.onClickCardHandler(content[0].card_id)} onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                    <div>{star}</div>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div style={{marginBottom:'5px', display:'flex', flexDirection:'column'}}>
                        <div>{content[0].face1}</div>
                        <div>{content[0].selection_contents}</div>
                        <div>{content[0].face2}</div>
                      </div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} style={{display:"none"}}>
                      <div></div>
                      <div>
                      <Space>
                        <Button size="small" style={{fontSize:'10px'}} icon={<EditOutlined />}>내용 편집</Button>
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div>
                    </div>
                  </div>
          } else  if(content[0].type === 'none'){
            return <div style={{cursor:"pointer", backgroundColor:"white", padding:"5px"}} id={content[0].card_id} onMouseOver={() => this.onClickCardHandler(content[0].card_id)} onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div>{content[0].none}</div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} style={{display:"none"}}>
                      <div></div>
                      <div>
                      <Space>
                        <Button size="small" style={{fontSize:'10px'}} icon={<EditOutlined />}>내용 편집</Button>
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div>
                    </div>
                  </div>
          } else  if(content[0].type === 'share'){
            return <div style={{cursor:"pointer", backgroundColor:"white", padding:"5px"}} id={content[0].card_id} onMouseOver={() => this.onClickCardHandler(content[0].card_id)} onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div>{content[0].share}</div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} style={{display:"none"}}>
                      <div>
                      <Button size="small" style={{fontSize:'10px'}}>하위카드추가</Button>
                      </div>
                      <div>
                      <Space>
                        <Button size="small" style={{fontSize:'10px'}} icon={<EditOutlined />}>내용 편집</Button>
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        {/* <Button size="small" style={{fontSize:'10px'}} icon={<DeleteOutlined />}>카드 삭제</Button> */}
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div>
                    </div>
                  </div>
          }
      })
    }
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
            
            
            <div className="a4">
              {this.state.card_add === true ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                                                         handleSubmit={this.handleSubmit}
                                                         updateContentsState={this.updateContentsState}
                                                         current_card_type={this.state.current_card_type}
                                                         contents={this.state.contents}
                                                         index_id={this.state.index_id}
                                                         current_card={this.state.current_card}
                                                         /> : ''}
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
