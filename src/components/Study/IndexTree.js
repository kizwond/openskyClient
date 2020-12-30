import React, { Component } from 'react';
import { Tree,Progress } from 'antd';
import { CarryOutOutlined } from '@ant-design/icons';
import "./IndexTree.css"


class IndexTree extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    // const onSelect = this.props.onSelect
    const onCheck = (checkedKeys, info) => {
      console.log('onCheck', checkedKeys, info);
    };

    console.log('index : ',this.props.book)
    let level_all =[];
    const contentsTableList = this.props.book.map((table, index)=>{
      console.log('try this : ',table)
        if(table){
          if(table.level === 1){
            let level = {
              title: (<><div>{table.name}</div> 
                        <div style={{fontSize:"10px",width:"440px", display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
                          <span style={{width:"70px"}}><Progress size="large" style={{fontSize:"10px"}} percent={table.completed} /></span> 
                          <span style={{width:"70px"}}>{table.yet}</span> 
                          <span style={{width:"100px"}}>{table.ing.total}</span>
                          <span style={{width:"70px"}}>{table.ing.until_now}</span>
                          <span style={{width:"60px"}}>{table.ing.until_today}</span>
                          <span style={{width:"35px"}}>{table.completed}</span>
                          <span style={{width:"35px", marginRight:"8px"}}>{table.hold}</span>
                        </div></>),
              index_id:table.index_id,
              book_id:this.props.book_id,
              key: table.seq,
              level: 1,
              icon: <CarryOutOutlined />,
              children: [],}
              level_all.push(level)
          } else if(table.level === 2){
            let level = {
              title: (<><div>{table.name}</div> 
                        <div style={{fontSize:"10px",width:"440px", display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
                          <span style={{width:"70px"}}><Progress size="large" style={{fontSize:"10px"}} percent={table.completed} /></span> 
                          <span style={{width:"70px"}}>{table.yet}</span> 
                          <span style={{width:"100px"}}>{table.ing.total}</span>
                          <span style={{width:"70px"}}>{table.ing.until_now}</span>
                          <span style={{width:"60px"}}>{table.ing.until_today}</span>
                          <span style={{width:"35px"}}>{table.completed}</span>
                          <span style={{width:"35px", marginRight:"8px"}}>{table.hold}</span>
                        </div></>),
              index_id:table.index_id,
              book_id:this.props.book_id,
              key: table.seq,
              level: 2,
              icon: <CarryOutOutlined />,
              children: [],}
              level_all.push(level)
          } else if(table.level === 3){
            let level = {
              title: (<><div>{table.name}</div> 
                        <div style={{fontSize:"10px",width:"440px", display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
                          <span style={{width:"70px"}}><Progress size="large" style={{fontSize:"10px"}} percent={table.completed} /></span> 
                          <span style={{width:"70px"}}>{table.yet}</span> 
                          <span style={{width:"100px"}}>{table.ing.total}</span>
                          <span style={{width:"70px"}}>{table.ing.until_now}</span>
                          <span style={{width:"60px"}}>{table.ing.until_today}</span>
                          <span style={{width:"35px"}}>{table.completed}</span>
                          <span style={{width:"35px", marginRight:"8px"}}>{table.hold}</span>
                        </div></>),
              index_id:table.index_id,
              book_id:this.props.book_id,
              key: table.seq,
              level: 3,
              icon: <CarryOutOutlined />,
              children: [],}
              level_all.push(level)
          } else if(table.level === 4){
            let level = {
              title: (<><div>{table.name}</div> 
                        <div style={{fontSize:"10px",width:"440px", display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
                          <span style={{width:"70px"}}><Progress size="large" style={{fontSize:"10px"}} percent={table.completed} /></span> 
                          <span style={{width:"70px"}}>{table.yet}</span> 
                          <span style={{width:"100px"}}>{table.ing.total}</span>
                          <span style={{width:"70px"}}>{table.ing.until_now}</span>
                          <span style={{width:"60px"}}>{table.ing.until_today}</span>
                          <span style={{width:"35px"}}>{table.completed}</span>
                          <span style={{width:"35px", marginRight:"8px"}}>{table.hold}</span>
                        </div></>),
              index_id:table.index_id,
              book_id:this.props.book_id,
              key: table.seq,
              level: 4,
              icon: <CarryOutOutlined />,
              children: [],}
              level_all.push(level)
          } else if(table.level === 5){
            let level = {
              title: (<><div>{table.name}</div> 
                        <div style={{fontSize:"10px",width:"440px", display:"flex", flexDirection:"row",justifyContent:"space-between"}}>
                          <span style={{width:"70px"}}><Progress size="large" style={{fontSize:"10px"}} percent={table.completed} /></span> 
                          <span style={{width:"70px"}}>{table.yet}</span> 
                          <span style={{width:"100px"}}>{table.ing.total}</span>
                          <span style={{width:"70px"}}>{table.ing.until_now}</span>
                          <span style={{width:"60px"}}>{table.ing.until_today}</span>
                          <span style={{width:"35px"}}>{table.completed}</span>
                          <span style={{width:"35px", marginRight:"8px"}}>{table.hold}</span>
                        </div></>),
              index_id:table.index_id,
              book_id:this.props.book_id,
              key: table.seq,
              level: 5,
              icon: <CarryOutOutlined />,
              children: [],}
              level_all.push(level)
          }     
        } 
        return null
      }
    )
    console.log(contentsTableList)
    const level_5 = obj => obj.level === 5;
    const level_4 = obj => obj.level === 4;
    const level_3 = obj => obj.level === 3;
    const level_2 = obj => obj.level === 2;
    if(level_all.length > 0){
      let level_5_exist = level_all.some(level_5)
      let level_4_exist = level_all.some(level_4)
      let level_3_exist = level_all.some(level_3)
      let level_2_exist = level_all.some(level_2)

      //level_5 exist
      if(level_5_exist === true){
        let temp_data_4 = []

        for(var i = 0; i < level_all.length; i += 1) {
          if(level_all[i]['level'] === 4) {
            temp_data_4.push(level_all[i])
          } else if(level_all[i]['level'] === 5 && temp_data_4.length > 0) {
            for(var a = 0; a < temp_data_4.length; a += 1) {
              temp_data_4[temp_data_4.length - 1]['children'].push(level_all[i])
              break;
            }
          } 
        }
         i = 0;
        while (i < level_all.length) {
          if (level_all[i]['level'] === 5) {
            level_all.splice(i, 1);
          } else {
            ++i;
          }
        }

        if(temp_data_4.length > 0){
          let temp_data_3 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 3) {
              temp_data_3.push(level_all[i])
            } else if(level_all[i]['level'] === 4) {
              for( a = 0; a < temp_data_3.length; a += 1) {
                temp_data_3[temp_data_3.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_3.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 4) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
    
          let temp_data_2 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 2) {
              temp_data_2.push(level_all[i])
            } else if(level_all[i]['level'] === 3) {
              for( a = 0; a < temp_data_2.length; a += 1) {
                temp_data_2[temp_data_2.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_2.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 3) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
    
          let temp_data_1 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 1) {
              temp_data_1.push(level_all[i])
            } else if(level_all[i]['level'] === 2) {
              for( a = 0; a < temp_data_1.length; a += 1) {
                temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_1.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
        }
        //level_4 exist
      } else if(level_4_exist === true){
        let temp_data_3 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 3) {
              temp_data_3.push(level_all[i])
            } else if(level_all[i]['level'] === 4) {
              for( a = 0; a < temp_data_3.length; a += 1) {
                temp_data_3[temp_data_3.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
        
        if(temp_data_3.length > 0){
           i = 0;
          while (i < level_all.length) {
            if (level_all[i]['level'] === 4) {
              level_all.splice(i, 1);
            } else {
              ++i;
            }
          }

          let temp_data_2 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 2) {
              temp_data_2.push(level_all[i])
            } else if(level_all[i]['level'] === 3) {
              for( a = 0; a < temp_data_2.length; a += 1) {
                temp_data_2[temp_data_2.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_2.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 3) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
    
          let temp_data_1 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 1) {
              temp_data_1.push(level_all[i])
            } else if(level_all[i]['level'] === 2) {
              for( a = 0; a < temp_data_1.length; a += 1) {
                temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_1.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
        }
        //level_3 exist
      } else if(level_3_exist === true){
        let temp_data_2 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 2) {
              temp_data_2.push(level_all[i])
            } else if(level_all[i]['level'] === 3) {
              for( a = 0; a < temp_data_2.length; a += 1) {
                temp_data_2[temp_data_2.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
        
        if(temp_data_2.length > 0){
           i = 0;
          while (i < level_all.length) {
            if (level_all[i]['level'] === 3) {
              level_all.splice(i, 1);
            } else {
              ++i;
            }
          }
    
          let temp_data_1 = []
          for( i = 0; i < level_all.length; i += 1) {
            if(level_all[i]['level'] === 1) {
              temp_data_1.push(level_all[i])
            } else if(level_all[i]['level'] === 2) {
              for( a = 0; a < temp_data_1.length; a += 1) {
                temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
                break;
              }
            } 
          }
          
          if(temp_data_1.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
          }
        }
        //level_2 exist
      } else if(level_2_exist === true){

        let temp_data_1 = []
        for( i = 0; i < level_all.length; i += 1) {
          if(level_all[i]['level'] === 1) {
            temp_data_1.push(level_all[i])
          } else if(level_all[i]['level'] === 2) {
            for( a = 0; a < temp_data_1.length; a += 1) {
              temp_data_1[temp_data_1.length - 1]['children'].push(level_all[i])
              break;
            }
          } 
        }

        if(temp_data_1.length > 0){
             i = 0;
            while (i < level_all.length) {
              if (level_all[i]['level'] === 2) {
                level_all.splice(i, 1);
              } else {
                ++i;
              }
            }
        }

      }
    }

    if(level_all.length > 0){
      var treeData = level_all
    }
    
    return (
      <Tree
        checkable
        // multiple={true}
        // showLine={true}
        showIcon={true}
        defaultExpandAll={true}
        // onSelect={onSelect}
        onCheck={onCheck}
        treeData={treeData}
        style={{width:"100%", height:"68vh", fontSize:"11px", backgroundColor:"#dfecf6"}}
      />
    );
  }
}

export default IndexTree;