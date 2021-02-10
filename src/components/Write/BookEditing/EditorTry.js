import React, { Component } from 'react'
import './EditorTry.css'
import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/plugins.pkgd.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/languages/ko'
import 'froala-editor//css/themes/gray.min.css'

import FroalaEditorComponent from 'react-froala-wysiwyg';

import axios from 'axios'
import DefaultButton from '../../../styledComponents/defaultButton'

// import { InputNumber } from 'antd'

export class EditorTry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      flag:'',
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
      editor16: '',
    }
  }

  handleModelChangeFlag = (e) => {
    console.log(e.target.value)
    if(e.target.value > 5){
      var value = 5
    } else {
      value = e.target.value
    }
    this.setState({
      flag: value
    })
  }

  handleModelChangeEditor1 = (model) => {
    console.log('editor1:',model)
    this.setState({
      editor1: model
    })
  }
  handleModelChangeEditor2 = (model) => {
    console.log('editor2:',model)
    this.setState({
      editor2: model
    })
  }
  handleModelChangeEditor3 = (model) => {
    console.log('editor3:',model)
    this.setState({
      editor3: model
    })
  }
  handleModelChangeEditor4 = (model) => {
    console.log('editor4:',model)
    this.setState({
      editor4: model
    })
  }

  handleModelChangeEditor5 = (model) => {
    console.log('editor5:',model)
    this.setState({
      editor5: model
    })
  }

  handleModelChangeEditor6 = (model) => {
    console.log('editor6:',model)
    this.setState({
      editor6: model
    })
  }

  handleModelChangeEditor7 = (model) => {
    console.log('editor7:',model)
    this.setState({
      editor7: model
    })
  }

  handleModelChangeEditor8 = (model) => {
    console.log('editor8:',model)
    this.setState({
      editor8: model
    })
  }

  handleModelChangeEditor9 = (model) => {
    console.log('editor9:',model)
    this.setState({
      editor9: model
    })
  }

  handleModelChangeEditor10 = (model) => {
    console.log('editor10:',model)
    this.setState({
      editor10: model
    })
  }

  handleModelChangeEditor11 = (model) => {
    console.log('editor11:',model)
    this.setState({
      editor11: model
    })
  }

  handleModelChangeEditor12 = (model) => {
    console.log('editor12:',model)
    this.setState({
      editor12: model
    })
  }

  handleModelChangeEditor13 = (model) => {
    console.log('editor13:',model)
    this.setState({
      editor13: model
    })
  }

  handleModelChangeEditor14 = (model) => {
    console.log('editor14:',model)
    this.setState({
      editor14: model
    })
  }

  handleModelChangeEditor15 = (model) => {
    console.log('editor15:',model)
    this.setState({
      editor15: model
    })
  }
  handleModelChangeEditor16 = (model) => {
    console.log('editor16:',model)
    this.setState({
      editor16: model
    })
  }


  handleSubmit = () => {
    console.log('111:',this.props.current_card)
    const current = this.props.current_card
    console.log(current)
    if(current){
      if(current.face1){
        var face1 = current.face1
      }
      if(current.selection){
        var selection = current.selection
      }
      if(current.face2){
        var face2 = current.face2
      }
      if(current.share){
        var share = current.share
      }
      if(current.annot){
        var annot = current.annot
      }
      if(current.none){
        var none = current.none
      }
    }
    const face1_array = [];
    const selection_array = [];
    const face2_array = [];
    const share_array = [];
    const annotation_array = [];
    const none_array = [];

    //읽기카드만 있을때
    if (face1 && !face2 && !annot && !selection && !share && !none){
      for (var i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
    }
    
    //읽기카드랑 주석이 있을때
    if (face1 && annot && !face2 && !selection && !share && !none){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(annot){
        for ( i = face1+1; i < face1+annot+1; i++) {
          annotation_array.push(this.state['editor'+i])
        }
      }
    }
    
    //뒤집기카드만 있을때
    if (face1 && face2 && !annot && !selection && !share && !none){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(face2){
        for ( i = face1+1; i < face1+face2+1; i++) {
          face2_array.push(this.state['editor'+i])
        }
      }
    }

    //뒤집기카드랑 주석이 있을때
    if (face1 && face2 && annot && !selection && !share && !none){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(face2){
        for ( i = face1+1; i < face1+face2+1; i++) {
          face2_array.push(this.state['editor'+i])
        }
      }
      if(annot){
        for ( i = face1+face2+1; i < face1+face2+annot+1; i++) {
          annotation_array.push(this.state['editor'+i])
        }
      }
    }
    //뒤집기카드랑 보기가 있을때
    if (face1 && face2 && !annot && selection && !share && !none){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(selection){
        for ( i = face1+1; i < face1+selection+1; i++) {
          selection_array.push(this.state['editor'+i])
        }
      }
      if(face2){
        for ( i = face1+selection+1; i < face1+selection+face2+1; i++) {
          face2_array.push(this.state['editor'+i])
        }
      }
    }

    //뒤집기카드랑 보기랑 주석이 있을때
    if (face1 && face2 && annot && selection && !share && !none){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(selection){
        for ( i = face1+1; i < face1+selection+1; i++) {
          selection_array.push(this.state['editor'+i])
        }
      }
      if(face2){
        for ( i = face1+selection+1; i < face1+selection+face2+1; i++) {
          face2_array.push(this.state['editor'+i])
        }
      }
      if(annot){
        for ( i = face1+selection+face2+1; i < face1+selection+face2+annot+1; i++) {
          annotation_array.push(this.state['editor'+i])
        }
      }
    }

    //공통지문카드만 있을때
    if (share && !face1 && !face2 && !annot && !selection && !none){
      for ( i = 1; i < share+1; i++) {
        share_array.push(this.state['editor'+i])
      }
    }

    //공통지문카드와 주석이 있을때
    if (share && !face1 && !face2 && annot && !selection && !none){
      for ( i = 1; i < share+1; i++) {
        share_array.push(this.state['editor'+i])
      }
      if(annot){
        for ( i = share+1; i < share+annot+1; i++) {
          annotation_array.push(this.state['editor'+i])
        }
      }
    }

    //비학습카드만 있을때
    if (none && !share && !face1 && !face2 && !annot && !selection){
      for ( i = 1; i < none+1; i++) {
        none_array.push(this.state['editor'+i])
      }
    }

    //비학습카드와 주석이 있을때
    if (none && !share && !face1 && !face2 && annot && !selection){
      for ( i = 1; i < none+1; i++) {
        none_array.push(this.state['editor'+i])
      }
      if(annot){
        for ( i = none+1; i < none+annot+1; i++) {
          annotation_array.push(this.state['editor'+i])
        }
      }
    }


    console.log('seq_in_index',this.props.selected_card_seq)
    
    if(this.props.selected_card_seq === undefined){
      var selected_card_seq = 0
    } else {
      selected_card_seq = this.props.selected_card_seq
    }

    if(this.props.parent_card_id === undefined){
      var parent_card_id = null
    } else {
      parent_card_id = this.props.parent_card_id
    }

    const book_id = sessionStorage.getItem('book_id')
    console.log('type :', this.props.card_type_name)
    console.log('this.state.flag',this.state.flag)
    axios.post('api/card/create-card', {
      book_id : book_id,
      cardtype_id:this.props.current_card_type,
      parent_card_id : parent_card_id,
      index_id:this.props.index_id,
      flag_of_maker : [this.state.flag],
      share : share_array,
      none : none_array, 
      face1 : face1_array,
      selection : selection_array,
      face2 : face2_array,
      annotation : annotation_array,
      seq_in_index:selected_card_seq,
      type: this.props.card_type_name
    })
    .then(res => {
      console.log('after submit:', res.data)
      this.props.updateContentsState(res.data.cardlist)
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({card_add:false})
  }
  render() {
    console.log('aslkdfjasldfjasldfkajsdklfj:', this.props.card_type_name)
    const config={
      editorClass:"editor_try",
      quickInsertEnabled: false,
      imageUploadURL: 'api/card/upload_image',
      saveParam: 'content',
      width: 'auto',
      theme: "gray",
      tabSpaces: 0,
      toolbarContainer: '#toolbarContainer',
      attribution: false,
      charCounterCount: false,
      language: 'ko',
      toolbarButtons: ['fullscreen', 'bold', 'italic', 'underline', 'subscript', 'superscript', 
                       'fontFamily', 'fontSize', 'color', 
                       'align', 'formatOL', 'formatUL', 'outdent', 'indent',
                       'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', 
                       'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting',
                       'help', 'html', 'undo', 'redo'],
    }
console.log('arrayForEditor:', this.props.arrayForEditor)
    const editorList = this.props.arrayForEditor.map((item,index)=>{
      return (
                <div key={index} style={{display:"flex", marginTop:"5px", alignItems:"center"}}>
                  <label className="editor_label" style={{width:"80px"}}>{item}</label>
                  <FroalaEditorComponent
                    tag='textarea'
                    config={config}
                    model={this.state['editor'+(index+1).toString()]}
                    onModelChange={this['handleModelChangeEditor'+(index+1).toString()]}
                    width={100}
                  />
                </div>
        )
      })

    return (
      <>
      <div id="editor" style={{border:"1px solid black", borderRadius:"10px"}}>
        <div id="toolbarContainer"></div>
        <div style={{padding:"10px"}}>
          <div style={{display:"flex", alignItems:"center"}}>
          {this.props.card_type_name === "read"  &&  <><label className="editor_label" style={{width:"80px"}}>사용자플래그  </label>
          <input type="number" min="1" max="5" maxLength="1" value={this.state.flag} onChange={this.handleModelChangeFlag} style={{border:"1px solid lightgrey", borderRadius:"5px", width:"50px"}}/>숫자 1 ~ 5</>}
          {this.props.card_type_name === "flip-normal"  &&  <><label className="editor_label" style={{width:"80px"}}>사용자플래그  </label>
          <input type="number" min="1" max="5" maxLength="1" value={this.state.flag} onChange={this.handleModelChangeFlag} style={{border:"1px solid lightgrey", borderRadius:"5px", width:"50px"}}/>숫자 1 ~ 5</>}
          {this.props.card_type_name === "none"  &&  ''}
          {this.props.card_type_name === "share"  &&  ''}
          </div>
          {editorList}
        </div>
        <DefaultButton onClick={this.handleSubmit} id="saveButton">저장</DefaultButton><DefaultButton onClick={this.props.cardAddStateHandler} id="cancelButton">취소</DefaultButton>
      </div>
      </>
    )
  }
}

export default EditorTry
