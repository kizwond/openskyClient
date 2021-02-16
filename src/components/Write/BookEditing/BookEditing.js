import React, { Component } from 'react'
import axios from 'axios'
import LeftDrawer from './BookWritingLeftDrawer'
import './BookWriting.css'
import { Select,Modal,Space, Divider,Spin } from 'antd';
import SettingTabs from './SettingTabs'
import EditorTry from './EditorTry'
import {StarTwoTone} from '@ant-design/icons';

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
import ImportModal from './ImportModal'
import DefaultButton from '../../../styledComponents/defaultButton'

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
       left_drawer_toggle:true,
       card_type:[],
       card_add:false,
       contents:[],
       card_selected:'',
       arrayForEditor:[],
       current_card:{},
       current_card_type:'',
       card_type_name:'',
       card_selected_detailsetting:'',
       index_id:'',
       file:'',
       menu_position:10,
       loading:false,
       card_selected_id:'',
       locationY:'',
       scrollTop: 0,
       child_card_add:false,
       current_card_name:'',
       parent_card_id:''
    }
    this.onSelect = this.onSelect.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    this.getIndexList()
    this.getCardTypeList()
    
  }

  handleScroll = (e) => {
    const scrollTop = ('scroll', e.srcElement.scrollingElement.scrollTop);
      this.setState({
        scrollTop
      })
  }

  getIndexList = () => {
    const value = sessionStorage.getItem("book_id")
    axios.post('api/index/get-indexlist',{
      book_id:value
    })
      .then(res => {
        console.log("Index List Received : ", res.data.indexList)
        sessionStorage.setItem('firstIndex', res.data.indexList[0]._id)
        this.setState({ 
          table_of_contents:res.data.indexList,
        });
        const getfirstIndex = sessionStorage.getItem('firstIndex')
        const value = {node:{index_id :getfirstIndex}}
        this.onSelect([0], value)
      })
  }
  getCardTypeList = () => {
    const value = sessionStorage.getItem("book_id")
    axios.post('api/cardtype/get-cardtype',{
      book_id:value
    })
      .then(res => {
        console.log("Cardtype list Received:", res.data.cardtypes)
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

  updateCardSelectedState = (key) => {
    if(this.state.index_id){
      this.setState({
        card_selected: key
      })
      this.addCardHandler(key)
    } else {
      alert("목차를 선택후 카드추가를 시작하세요!!!")
    }
   
  }

  addCardHandler = (key) => {
    console.log('------------------->',key)
    console.log("check 1", this.state.card_type)
    const contentsList = this.state.card_type.map((content)=>{
      console.log(content.name)
      if(content.name === key){
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
              current_card_type:content._id,
              card_type_name:content.type
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
                current_card_type:content._id,
                card_type_name:content.type
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
                current_card_type:content._id,
                card_type_name:content.type
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
              current_card_type:content._id,
              card_type_name:content.type
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
              current_card_type:content._id,
              card_type_name:content.type
            })
            return face_array
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

  cardAddStateHandler = () => {
    this.setState({
      card_add: false,
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
    
    const sortValue = value.slice()
    sortValue.sort(function(a, b) { 
      return a.time_created > b.time_created ? -1 : a.time_created < b.time_created ? 1 : 0;
    });
    console.log("after sort:", sortValue[0])
    const card_id = sortValue[0]._id
    const seq = sortValue[0].seq_in_index
    this.onClickCardHandler(card_id, seq)
  }
  updateContentsListState = () => {
    this.setState({ 
      contents:[],
    });
    axios.post('api/card/get-cardlist',{
      index_id: this.state.index_id
    })
      .then(res => {
        console.log('what', res.data)
        this.setState({ 
          contents:res.data.cardlist,
        });
      })
  }
  
  onCardChangeHandler = (value) => {
    console.log('onCardChangeHandler : ',value)
    this.setState({
      card_selected_detailsetting:value
    })
  }

  async onSelect(selectedKeys, info){
    console.log('selectedKeys', selectedKeys)
    console.log('info',info)
    this.setState({
      index_id: info.node.index_id,
      loading : true,
      card_selected_id:''
    })
    await axios.post('api/card/get-cardlist',{
      index_id: info.node.index_id
    })
      .then(res => {
        console.log('Index Clicked!! & Get Crdlist Data: ', res.data.cardlist)
        this.setState({ 
          contents:res.data.cardlist,
          loading : false
        });
      })
  };
  
  onClickCardHandler = (value, seq) => {
    console.log(value, seq)
    var elemClass = document.getElementsByClassName("card_class");
    var elemBtnsClass = document.getElementsByClassName("card_edit_btns");
    
    for(var i = 0; i<elemClass.length; i++){
      elemClass[i].style.transform = "none";
      elemClass[i].style.transition = "all ease 0.7s";
      elemClass[i].style.border = "none";
      elemClass[i].style.borderRadius = "0px";
      elemClass[i].style.boxShadow ="none";
    }

    for( i = 0; i<elemClass.length; i++){
      elemBtnsClass[i].style.display = "none";
    }


    var elem = document.getElementById(value);
    var elem_btn = document.getElementById(value+"_btn");
    elem.style.transform = "scale( 1.01 )";
    elem.style.transition = "all ease 0.7s";
    elem.style.border = "1px solid lightgrey";
    elem.style.borderRadius = "10px";
    elem.style.boxShadow = "5px 5px 5px -3px rgba(112,112,112,1)";

    elem_btn.style.display = "flex";
    elem_btn.style.flexDirection = "row";
    elem_btn.style.justifyContent = "space-between";


    let offsetTop  = elem.getBoundingClientRect().top;
    this.setState({
      menu_position:offsetTop+this.state.scrollTop -95,
      selected_card_seq:seq,
      card_selected_id:value
    })
  }
   onMouseOverCardHandler = (value, seq) => {
    // var elem = document.getElementById(value);
    // var elem_btn = document.getElementById(value+"_btn");
    // elem.style.transform = "scale( 1.01 )";
    // elem.style.transition = "all ease 0.7s";
    // elem.style.border = "1px solid lightgrey";
    // elem.style.borderRadius = "10px";
    // elem.style.boxShadow = "5px 5px 5px -3px rgba(112,112,112,1)";

    // elem_btn.style.display = "flex";
    // elem_btn.style.flexDirection = "row";
    // elem_btn.style.justifyContent = "space-between";

    // let offsetTop  = elem.getBoundingClientRect().top;
    // this.setState({
    //   menu_position:offsetTop-95,
    //   selected_card_seq:seq
    // })
  }
  onLeaveCardHandler = (value) => {
    // var elem = document.getElementById(value);
    // var elem_btn = document.getElementById(value+"_btn");
    // elem.style.transform = "none";
    // elem.style.transition = "all ease 0.7s";
    // elem.style.border = "none";
    // elem.style.borderRadius = "0px";
    // elem.style.boxShadow ="none";

    // elem_btn.style.display = "none";
  }
  addChildCard = () => {
    console.log("add ChildCard Clicked!!!")
    this.setState({
      child_card_add : true,
      card_add:true,
      parent_card_id:this.state.card_selected_id
    })
    this.addCardHandler(this.state.current_card_name)
  }
  addSiblingCard = (parent) => {
    console.log("add SiblingCard Clicked!!!")
    console.log(parent)
    this.setState({
      child_card_add : true,
      card_add:true,
      parent_card_id:parent
    })
    this.addCardHandler(this.state.current_card_name)
  }

  handleShareChildAddChange = (value) => {
    console.log(`selected ${value}`);
    this.setState({
      current_card_name:value,
    })
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
      var contentsList = this.state.contents.map((content)=>{
        console.log('----------------',content)
        const flag_column_num = content.cardtype_id.num_of_row.maker_flag;
        const face1_column_num = content.cardtype_id.num_of_row.face1;
        const selection_column_num = content.cardtype_id.num_of_row.selection;
        const face2_column_num = content.cardtype_id.num_of_row.face2;
        const annot_column_num = content.cardtype_id.num_of_row.annotation;
        const none_column_num = content.cardtype_id.num_of_row.none;
        const share_column_num = content.cardtype_id.num_of_row.share;

        const direction = content.cardtype_id.card_style.card_direction;
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
          <DefaultButton size="small" onClick={() => this.updateCardSelectedState(type.name)} style={{cursor:"pointer", marginBottom:"5px", fontSize:"10px"}} key={type._id} > {type.name}</DefaultButton>
      ))
      var optionShareList = this.state.card_type.map((type, index)=>{
        if(type.type === "flip-normal"){
          return <Option size="small" style={{ fontSize:"10px"}} key={index} value={type.name}> {type.name}</Option>
        } 
      })
    }

    if(contentsList){
      var list = contentsList.map((content)=>{
        console.log("why?1111111111111111111111",content[0])
        const borderTopType = content[0].content.cardtype_id.card_style.border.package.type
        const borderTopThickness = content[0].content.cardtype_id.card_style.border.package.thickness
        const borderTopColor = content[0].content.cardtype_id.card_style.border.package.color

          if(content[0].flag == "1"){
            var star = <StarTwoTone />
          } else if(content[0].flag == "2"){
            star = <><StarTwoTone /><StarTwoTone /></>
          } else if(content[0].flag == "3"){
            star = <><StarTwoTone /><StarTwoTone /><StarTwoTone /></>
          } else if(content[0].flag == "4"){
            star = <><StarTwoTone /><StarTwoTone /><StarTwoTone /><StarTwoTone /></>
          } else if(content[0].flag == "5"){
            star = <><StarTwoTone /><StarTwoTone /><StarTwoTone /><StarTwoTone /><StarTwoTone /></>
          } else {
            star = ''
          }
          if(content[0].content.parent_card_id) {
            var childStyle = {cursor:"pointer", backgroundColor:"white", padding:"5px", border:"1px dashed green"}
          } else {
            childStyle = {cursor:"pointer", backgroundColor:"white", padding:"5px"}
          }
          if(content[0].type === 'read'){
            console.log(content[0].content.cardtype_id.name)
            return <> <div style={{cursor:"pointer", backgroundColor:"white", padding:"5px", border:`${borderTopType} ${borderTopThickness}px ${borderTopColor}`}} 
                        id={content[0].card_id} 
                        className="card_class"
                        onClick={() => this.onClickCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                    <div style={{fontSize:'11px', color:"blue"}}>참고 : {content[0].content.cardtype_id.name}</div>
                    <div>{star}</div>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div>{content[0].face1}</div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} className="card_edit_btns" style={{display:"none"}}>
                      <div><DefaultButton 
                                  onClick={() => this.addCardHandler(content[0].content.cardtype_id.name)} 
                                  size="small" 
                                  >다음카드추가</DefaultButton>
                      </div> 
                      <div>  
                      <Space>
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     updateContentsListState={this.updateContentsListState}
                                     index_id={this.state.index_id}
                                     card_type={content[0].type}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div>
                    </div>
                  </div>
                   {this.state.card_add === true && this.state.card_selected_id === content[0].card_id ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                   selected_card_seq={this.state.selected_card_seq}
                   handleSubmit={this.handleSubmit}
                   cardAddStateHandler={this.cardAddStateHandler}
                   card_type_name={this.state.card_type_name}
                   updateContentsState={this.updateContentsState}
                   current_card_type={this.state.current_card_type}
                   contents={this.state.contents}
                   index_id={this.state.index_id}
                   current_card={this.state.current_card}
                   /> : ''}</>
          } else if(content[0].type === 'flip-normal'&& !content[0].selection_contents && content[0].direction === "left-right"){
            return <><div style={childStyle} 
                        id={content[0].card_id} 
                        className="card_class"
                        onClick={() => this.onClickCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                           <div style={{fontSize:'11px', color:"blue"}}>참고 : {content[0].content.cardtype_id.name}</div>
                    <div>{star}</div>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div>{content[0].face1}</div>
                      <div>{content[0].face2}</div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} className="card_edit_btns" style={{display:"none"}}>
                    <div><DefaultButton 
                                  onClick={() => this.addCardHandler(content[0].content.cardtype_id.name)} 
                                  size="small" 
                                  >다음카드추가</DefaultButton>
                      </div> 
                      <div>
                      {content[0].content.parent_card_id && <>
                        <Select size="small" defaultValue="default" width="120px" onChange={this.handleShareChildAddChange}>
                          <Option value="default">카드타입선택</Option>
                          {optionShareList}
                        </Select>
                        <DefaultButton size="small" onClick={()=>this.addSiblingCard(content[0].content.parent_card_id)}>형제카드추가</DefaultButton></>}</div> 
                      <div> 
                      <Space>   
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     updateContentsListState={this.updateContentsListState}
                                     index_id={this.state.index_id}
                                     card_type={content[0].type}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div> 
                    </div>
                  </div>
                   {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === false ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                   selected_card_seq={this.state.selected_card_seq}
                   handleSubmit={this.handleSubmit}
                   cardAddStateHandler={this.cardAddStateHandler}
                   card_type_name={this.state.card_type_name}
                   updateContentsState={this.updateContentsState}
                   current_card_type={this.state.current_card_type}
                   contents={this.state.contents}
                   index_id={this.state.index_id}
                   current_card={this.state.current_card}
                   /> : ''}
                   {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === true ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                   selected_card_seq={this.state.selected_card_seq}
                   handleSubmit={this.handleSubmit}
                   cardAddStateHandler={this.cardAddStateHandler}
                   card_type_name={this.state.card_type_name}
                   updateContentsState={this.updateContentsState}
                   current_card_type={this.state.current_card_type}
                   contents={this.state.contents}
                   index_id={this.state.index_id}
                   current_card={this.state.current_card}
                   child_card_add={this.state.child_card_add}
                   parent_card_id={this.state.parent_card_id}
                   /> : ''}</>
          } else if(content[0].type === 'flip-normal' && content[0].selection_contents && content[0].direction === "left-right"){
            return <><div style={childStyle} 
                        id={content[0].card_id} 
                        className="card_class"
                        onClick={() => this.onClickCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                           <div style={{fontSize:'11px', color:"blue"}}>참고 : {content[0].content.cardtype_id.name}</div>
                    <div>{star}</div>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}> 
                        <div>{content[0].face1}</div>
                        <div>{content[0].selection_contents}</div>
                      </div>
                      <div>{content[0].face2}</div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} className="card_edit_btns" style={{display:"none"}}>
                    <div><DefaultButton 
                                  onClick={() => this.addCardHandler(content[0].content.cardtype_id.name)} 
                                  size="small" 
                                  >다음카드추가</DefaultButton>
                      </div> 
                      <div>
                      {content[0].content.parent_card_id && <>
                        <Select size="small" defaultValue="default" width="120px" onChange={this.handleShareChildAddChange}>
                          <Option value="default">카드타입선택</Option>
                          {optionShareList}
                        </Select>
                        <DefaultButton size="small" style={{fontSize:'10px'}} onClick={()=>this.addSiblingCard(content[0].content.parent_card_id)}>형제카드추가</DefaultButton></>}
                      </div>
                      <div>
                      <Space>
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     updateContentsListState={this.updateContentsListState}
                                     index_id={this.state.index_id}
                                     card_type={content[0].type}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div>
                    </div>
                  </div>
                   {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === false ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                   selected_card_seq={this.state.selected_card_seq}
                   handleSubmit={this.handleSubmit}
                   cardAddStateHandler={this.cardAddStateHandler}
                   card_type_name={this.state.card_type_name}
                   updateContentsState={this.updateContentsState}
                   current_card_type={this.state.current_card_type}
                   contents={this.state.contents}
                   index_id={this.state.index_id}
                   current_card={this.state.current_card}
                   /> : ''}
                   {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === true ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                   selected_card_seq={this.state.selected_card_seq}
                   handleSubmit={this.handleSubmit}
                   cardAddStateHandler={this.cardAddStateHandler}
                   card_type_name={this.state.card_type_name}
                   updateContentsState={this.updateContentsState}
                   current_card_type={this.state.current_card_type}
                   contents={this.state.contents}
                   index_id={this.state.index_id}
                   current_card={this.state.current_card}
                   child_card_add={this.state.child_card_add}
                   parent_card_id={this.state.parent_card_id}
                   /> : ''}</>
          } else if(content[0].type === 'flip-normal' && !content[0].selection_contents && content[0].direction === "top-bottom"){
            return <><div style={childStyle} 
                        id={content[0].card_id} 
                        className="card_class"
                        onClick={() => this.onClickCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                           <div style={{fontSize:'11px', color:"blue"}}>참고 : {content[0].content.cardtype_id.name}</div>
                    <div>{star}</div>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div style={{marginBottom:'5px', display:'flex', flexDirection:'column'}}>
                        <div>{content[0].face1}</div>
                        <div>{content[0].face2}</div>
                      </div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} className="card_edit_btns" style={{display:"none"}}>
                      <div><DefaultButton 
                                  onClick={() => this.addCardHandler(content[0].content.cardtype_id.name)} 
                                  size="small" 
                                  >다음카드추가</DefaultButton>
                      </div> 
                      <div>
                        {content[0].content.parent_card_id && <>
                        <Select size="small" defaultValue="default" width="120px" onChange={this.handleShareChildAddChange}>
                          <Option value="default">카드타입선택</Option>
                          {optionShareList}
                        </Select>
                        <DefaultButton size="small" style={{fontSize:'10px'}} onClick={()=>this.addSiblingCard(content[0].content.parent_card_id)}>형제카드추가</DefaultButton></>}
                      </div>
                      <div>
                      <Space>
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     updateContentsListState={this.updateContentsListState}
                                     index_id={this.state.index_id}
                                     card_type={content[0].type}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div>
                    </div>
                  </div>
                   {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === false ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                   selected_card_seq={this.state.selected_card_seq}
                   handleSubmit={this.handleSubmit}
                   cardAddStateHandler={this.cardAddStateHandler}
                   card_type_name={this.state.card_type_name}
                   updateContentsState={this.updateContentsState}
                   current_card_type={this.state.current_card_type}
                   contents={this.state.contents}
                   index_id={this.state.index_id}
                   current_card={this.state.current_card}
                   /> : ''}
                   {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === true ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                   selected_card_seq={this.state.selected_card_seq}
                   handleSubmit={this.handleSubmit}
                   cardAddStateHandler={this.cardAddStateHandler}
                   card_type_name={this.state.card_type_name}
                   updateContentsState={this.updateContentsState}
                   current_card_type={this.state.current_card_type}
                   contents={this.state.contents}
                   index_id={this.state.index_id}
                   current_card={this.state.current_card}
                   child_card_add={this.state.child_card_add}
                   parent_card_id={this.state.parent_card_id}
                   /> : ''}</>
          } else if(content[0].type === 'flip-normal' && content[0].selection_contents && content[0].direction === "top-bottom"){
            return <><div style={childStyle} 
                        id={content[0].card_id} 
                        className="card_class"
                        onClick={() => this.onClickCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                           <div style={{fontSize:'11px', color:"blue"}}>참고 : {content[0].content.cardtype_id.name}</div>
                    <div>{star}</div>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div style={{marginBottom:'5px', display:'flex', flexDirection:'column'}}>
                        <div>{content[0].face1}</div>
                        <div>{content[0].selection_contents}</div>
                        <div>{content[0].face2}</div>
                      </div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} className="card_edit_btns" style={{display:"none"}}>
                    <div><DefaultButton 
                                  onClick={() => this.addCardHandler(content[0].content.cardtype_id.name)} 
                                  size="small" 
                                  >다음카드추가</DefaultButton>
                      </div> 
                      <div>
                      {content[0].content.parent_card_id && <>
                        <Select size="small" defaultValue="default" width="120px" onChange={this.handleShareChildAddChange}>
                          <Option value="default">카드타입선택</Option>
                          {optionShareList}
                        </Select>
                        <DefaultButton size="small" style={{fontSize:'10px'}} onClick={()=>this.addSiblingCard(content[0].content.parent_card_id)}>형제카드추가</DefaultButton></>}
                      </div>
                      <div>
                      <Space>
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     updateContentsListState={this.updateContentsListState}
                                     index_id={this.state.index_id}
                                     card_type={content[0].type}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div>
                    </div>
                  </div>
                   {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === false ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                   selected_card_seq={this.state.selected_card_seq}
                   handleSubmit={this.handleSubmit}
                   cardAddStateHandler={this.cardAddStateHandler}
                   card_type_name={this.state.card_type_name}
                   updateContentsState={this.updateContentsState}
                   current_card_type={this.state.current_card_type}
                   contents={this.state.contents}
                   index_id={this.state.index_id}
                   current_card={this.state.current_card}
                   /> : ''}
                   {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === true ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                   selected_card_seq={this.state.selected_card_seq}
                   handleSubmit={this.handleSubmit}
                   cardAddStateHandler={this.cardAddStateHandler}
                   card_type_name={this.state.card_type_name}
                   updateContentsState={this.updateContentsState}
                   current_card_type={this.state.current_card_type}
                   contents={this.state.contents}
                   index_id={this.state.index_id}
                   current_card={this.state.current_card}
                   child_card_add={this.state.child_card_add}
                   parent_card_id={this.state.parent_card_id}
                   /> : ''}</>
          } else  if(content[0].type === 'none'){
            return <><div style={{cursor:"pointer", backgroundColor:"white", padding:"5px"}} 
                        id={content[0].card_id} 
                        className="card_class"
                        onClick={() => this.onClickCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                           <div style={{fontSize:'11px', color:"blue"}}>참고 : {content[0].content.cardtype_id.name}</div>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div>{content[0].none}</div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} className="card_edit_btns" style={{display:"none"}}>
                    <div><DefaultButton 
                                  onClick={() => this.addCardHandler(content[0].content.cardtype_id.name)} 
                                  size="small" 
                                  >다음카드추가</DefaultButton>
                      </div> 
                      <div>
                      <Space>
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     updateContentsListState={this.updateContentsListState}
                                     index_id={this.state.index_id}
                                     card_type={content[0].type}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div>
                    </div>
                  </div>
                   {this.state.card_add === true && this.state.card_selected_id === content[0].card_id ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                   selected_card_seq={this.state.selected_card_seq}
                   handleSubmit={this.handleSubmit}
                   cardAddStateHandler={this.cardAddStateHandler}
                   card_type_name={this.state.card_type_name}
                   updateContentsState={this.updateContentsState}
                   current_card_type={this.state.current_card_type}
                   contents={this.state.contents}
                   index_id={this.state.index_id}
                   current_card={this.state.current_card}
                   /> : ''}</>
          } else  if(content[0].type === 'share'){
            return <><div style={{cursor:"pointer", backgroundColor:"white", padding:"5px", border:"1px solid green"}} 
                        id={content[0].card_id} 
                        className="card_class"
                        onClick={() => this.onClickCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseOver={() => this.onMouseOverCardHandler(content[0].card_id,content[0].seq_in_index)} 
                        onMouseLeave={() => this.onLeaveCardHandler(content[0].card_id)} >
                           <div style={{fontSize:'11px', color:"blue"}}>참고 : {content[0].content.cardtype_id.name}</div>
                    <div style={{marginBottom:'5px', display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                      <div>{content[0].share}</div>
                      <div>{content[0].annotation_contents}</div>
                    </div>
                    <div id={content[0].card_id+"_btn"} className="card_edit_btns" style={{display:"none"}}>
                    <div><DefaultButton 
                                  onClick={() => this.addCardHandler(content[0].content.cardtype_id.name)} 
                                  size="small" 
                                  >다음카드추가</DefaultButton>
                      </div> 
                      <div>
                      <Select size="small" defaultValue="default" style={{ width: 120, fontSize:"11px" }} onChange={this.handleShareChildAddChange}>
                        <Option value="default">카드타입선택</Option>
                        {optionShareList}
                      </Select>
                      <DefaultButton size="small"onClick={this.addChildCard}>자식카드추가</DefaultButton>
                      </div>
                      <div>
                      <Space>
                        <CardEditing arrayForEditor={this.state.arrayForEditor}
                                     updateContentsListState={this.updateContentsListState}
                                     index_id={this.state.index_id}
                                     card_type={content[0].type}
                                     card_id={content[0].card_id}
                                     content={content[0].content}
                                     handleSubmit={this.handleSubmit}
                                     updateContentsState={this.updateContentsState} />
                        {/* <DefaultButton size="small" icon={<DeleteOutlined />}>카드 삭제</DefaultButton> */}
                        <CardDelete updateCardListState={this.updateCardListState} card_id={content[0].card_id} index_id={this.state.index_id} seq_in_index={content[0].seq_in_index} />
                      </Space>
                      </div>
                    </div>
                  </div>
                   {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === false ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                   selected_card_seq={this.state.selected_card_seq}
                   handleSubmit={this.handleSubmit}
                   cardAddStateHandler={this.cardAddStateHandler}
                   card_type_name={this.state.card_type_name}
                   updateContentsState={this.updateContentsState}
                   current_card_type={this.state.current_card_type}
                   contents={this.state.contents}
                   index_id={this.state.index_id}
                   current_card={this.state.current_card}
                   /> : ''}
                   {this.state.card_add === true && this.state.card_selected_id === content[0].card_id && this.state.child_card_add === true ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                   selected_card_seq={this.state.selected_card_seq}
                   handleSubmit={this.handleSubmit}
                   cardAddStateHandler={this.cardAddStateHandler}
                   card_type_name={this.state.card_type_name}
                   updateContentsState={this.updateContentsState}
                   current_card_type={this.state.current_card_type}
                   contents={this.state.contents}
                   index_id={this.state.index_id}
                   current_card={this.state.current_card}
                   child_card_add={this.state.child_card_add}
                   parent_card_id={this.state.parent_card_id}
                   /> : ''}</>
          }
      })
    }
    
    return (
      <>
      <div className="book_writing_container" style={{overflowY:"hidden"}}>
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
                <DefaultButton size='small' onClick={this.showModal}>카드 이동/삭제</DefaultButton>
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
          </div>
          <div className="editor_panel" id="editor_panel" onScroll={this.handleScroll} style={{position:"relative"}}>
            <div style={{border:"1px solid lightgrey", 
                         borderRadius:"5px",
                         backgroundColor:"white",
                         width:"120px", 
                         padding:"10px",
                        //  height:"100px", 
                         position:"absolute", 
                         right:"-130px", 
                         fontSize:'11px',
                         top:`${this.state.menu_position}px`,
                         boxShadow : "3px 2px 4px -2px rgba(138,138,138,1)",
                         transition:"all ease 0.4s"}}> 
              <Space direction="vertical">        
              <h3>카드추가</h3>
              <ul style={{marginLeft:"10px", display:"flex", flexDirection:"column"}}>
                {optionList}
              </ul>
              </Space>
              <Divider style={{margin:"5px 0"}}/>
              <ImportModal index_id={this.state.index_id}/>
            </div>
            {/* 카드 뿌려지는 영역 */}
            {list ? list : ''}
            {this.state.loading && <div style={{position:"absolute", top:"50%", left:"50%", transform:"(50%,50%)"}}><Spin tip="Loading..."/></div>}
            
            
            <div className="a4">
              {this.state.card_add === true && this.state.card_selected_id === '' ? <EditorTry arrayForEditor={this.state.arrayForEditor}
                                                         selected_card_seq={this.state.selected_card_seq}
                                                         handleSubmit={this.handleSubmit}
                                                         cardAddStateHandler={this.cardAddStateHandler}
                                                         card_type_name={this.state.card_type_name}
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
