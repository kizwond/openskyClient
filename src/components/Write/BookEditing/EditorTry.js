import React, { Component } from 'react'

import 'froala-editor/js/froala_editor.pkgd.min.js'
import 'froala-editor/css/froala_style.min.css'
import 'froala-editor/css/froala_editor.pkgd.min.css'
import 'froala-editor/css/plugins.pkgd.min.css'
import 'froala-editor/js/plugins.pkgd.min.js'
import 'froala-editor/js/languages/ko'
import 'froala-editor//css/themes/gray.min.css'

import FroalaEditorComponent from 'react-froala-wysiwyg';

import axios from 'axios'

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
    }
  }
  handleModelChangeFlag = (model) => {
    console.log(model)
    this.setState({
      flag: model
    })
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
    }
    const face1_array = [];
    const selection_array = [];
    const face2_array = [];
    const share_array = [];
    const annotation_array = [];
    if (face1 && !face2 && !annot){
      for (var i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
    }
    if (face1 && annot && !face2){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(annot){
        for ( i = face1+1; i < face1+annot+1; i++) {
          annotation_array.push(this.state['editor'+i])
        }
      }
    }

    if (face1 && face2 && !annot){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(face2){
        for ( i = face1+1; i < face1+face2+1; i++) {
          face2_array.push(this.state['editor'+i])
        }
      }
    }

    if (face1 && face2 && annot){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(face2){
        for ( i = face1+1; i < face1+face2+1; i++) {
          face2_array.push(this.state['editor'+i])
        }
        if(annot){
          for ( i = face1+face2+1; i < face1+face2+annot+1; i++) {
            annotation_array.push(this.state['editor'+i])
          }
        }
      }
    }

    if (face1 && face2 && !annot){
      for ( i = 1; i < face1+1; i++) {
        face1_array.push(this.state['editor'+i])
      }
      if(face2){
        for ( i = face1+1; i < face1+face2+1; i++) {
          face2_array.push(this.state['editor'+i])
        }
      }
    }

    if (face1 && face2 && annot){
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
    
    console.log("here?")
    console.log(this.props.contents)
    const seq_in_index = this.props.contents[0].seq_in_index 
    console.log('seq_in_index',seq_in_index)
    const book_id = sessionStorage.getItem('book_id')
    axios.post('api/card/create-card', {
      book_id : book_id,
      cardtype_id:this.props.current_card_type,
      index_id:this.props.index_id,
      maker_flag : [this.state.flag],
      share : share_array,
      face1 : face1_array,
      selection : selection_array,
      face2 : face2_array,
      annotation : annotation_array,
      seq_in_index: seq_in_index
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
    const config={
      imageUploadURL: 'api/create/upload_image',
      saveParam: 'content',
      width: 'auto',
      theme: "gray",
      tabSpaces: 4,
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

    const editorList = this.props.arrayForEditor.map((item,index)=>{
      return (
                <div key={index}>
                  <label className="control-label">{item}</label>
                  <FroalaEditorComponent
                    tag='textarea'
                    config={config}
                    model={this.state['editor'+(index+1).toString()]}
                    onModelChange={this['handleModelChangeEditor'+(index+1).toString()]}
                  />
                </div>
        )
      })

    return (
      <>
      <div  id="editor">
        <div>
          <label className="control-label">사용자플래그</label>
          <input type="number" onChange={this.props.handleModelChangeFlag} />
        </div>
        {editorList}
        <button onClick={this.handleSubmit} id="saveButton">Save</button>
      </div>
      </>
    )
  }
}

export default EditorTry
