import React, { Component } from 'react';
import { Table} from 'antd';

class SelectedIndexCardCount extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
      const yetArray = [];
      const holdArray = [];
      const completedArray = [];
      const ingTotal = [];
      const ingUntilNow = [];
      const ingUntilToday = [];
      const ingAfterTomorrow = [];
      var getYets = this.props.books.map(book => 
        book.index_info.map((item)=> {
          yetArray.push(item.yet)
          holdArray.push(item.hold)
          completedArray.push(item.completed)
          ingTotal.push(item.ing.total)
          ingUntilNow.push(item.ing.until_now)
          ingUntilToday.push(item.ing.until_today)
          ingAfterTomorrow.push(item.ing.after_tomorrow)

        })
        )

      const yetNum = yetArray.reduce((a, b) => a + b, 0)
      const holdNum = holdArray.reduce((a, b) => a + b, 0)
      const completedNum = completedArray.reduce((a, b) => a + b, 0)
      const ingTotalNum = ingTotal.reduce((a, b) => a + b, 0)
      const ingUntilNowNum = ingUntilNow.reduce((a, b) => a + b, 0)
      const ingUntilTodayNum = ingUntilToday.reduce((a, b) => a + b, 0)
      const ingAfterTomorrowNum = ingAfterTomorrow.reduce((a, b) => a + b, 0)
        const columns = [
            {
              title: '영역',
              key : 'key',
              dataIndex: 'selection',
              align :'center',
            },
            {
              title: '목차',
              key : 'key',
              dataIndex: 'indexSelected',
              align :'center',
            },
            {
              title: '학습완료울',
              key : 'key',
              dataIndex: 'completedRatio',
              align :'center',
            },
            {
                title: '미학습카드',
                key : 'key',
                dataIndex: 'yet',
                align :'center',
                render: (text,key) => {
                  if(key.key === "1"){
                    return <span style={{fontWeight:"700", fontSize:"12px", color:"blue"}}>{text}</span>
                  } else {
                    return <span>{text}</span>
                  }
                }
              },
              {
                title: '학습중카드',
                key : 'key',
                align :'center',
                children: [
                    {
                      title: '전체',
                      key : 'key',
                      dataIndex: 'ingTotal',
                      align :'center',
                      render: (text,key) => {
                        if(key.key === "1"){
                          return <span style={{fontWeight:"700", fontSize:"12px", color:"blue"}}>{text}</span>
                        } else {
                          return <span>{text}</span>
                        }
                      }
                    },
                    {
                        title: '금일이전 복습필요*',
                        key : 'key',
                        dataIndex: 'ingByToday',
                        align :'center',
                        render: (text,key) => <span>{text}({key.ingByNow})</span>
                        
                    },
                    {
                        title: '내일이후 복습필요',
                        key : 'key',
                        dataIndex: 'ingAfterTomorrow',
                        align :'center',
                    },
                ]
              },
              {
                title: '학습완료카드',
                key : 'key',
                dataIndex: 'completed',
                align :'center',
              },
              {
                title: '복습보류카드',
                key : 'key',
                dataIndex: 'suspend',
                align :'center',
              },
          ];
          
          const data = [
            {
              key: '1',
              selection:'00개의 책중',
              indexSelected:'목차 총 00개가 성택됨',
              completedRatio: '31%',
              yet:yetNum,
              ingTotal:ingTotalNum,
              ingByNow:ingUntilNowNum,
              ingByToday:ingUntilTodayNum,
              ingAfterTomorrow:ingAfterTomorrowNum,
              completed:completedNum,
              suspend:holdNum,
            },
            {
              key: '2',
              selection:'읽기카드',
              indexSelected:'',
              completedRatio: '31%',
              yet:10,
              ingTotal:100,
              ingByNow:40,
              ingByToday:40,
              ingAfterTomorrow:100,
              completed:0,
              suspend:0,
            },
             {
              key: '3',
              selection:'뒤집기카드',
              indexSelected:'',
              completedRatio: '31%',
              yet:10,
              ingTotal:100,
              ingByNow:40,
              ingByToday:40,
              ingAfterTomorrow:100,
              completed:0,
              suspend:0,
            },
            {
              key: '4',
              selection:'책제목',
              indexSelected:'목차 총 00개',
              completedRatio: '31%',
              yet:10,
              ingTotal:100,
              ingByNow:40,
              ingByToday:40,
              ingAfterTomorrow:100,
              completed:0,
              suspend:0,
            },
            {
              key: '5',
              selection:'현재책',
              indexSelected:'목차 총 00개 선택함',
              completedRatio: '31%',
              yet:10,
              ingTotal:100,
              ingByNow:40,
              ingByToday:40,
              ingAfterTomorrow:100,
              completed:0,
              suspend:0,
            },
          ];
        return (
            <Table columns={columns} 
                   pagination={false} 
                   dataSource={data} 
                   size='small'
                   className="choose_index_top_table"
                   bordered
                   />
          );
    }
}

export default SelectedIndexCardCount;