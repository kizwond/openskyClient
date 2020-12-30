import React, { Component } from 'react';
import { Table} from 'antd';

class SelectedIndexCardCount extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const columns = [
            {
              title: '영역',
              dataIndex: 'selection',
              align :'center',
            },
            {
              title: '목차',
              dataIndex: 'indexSelected',
              align :'center',
            },
            {
              title: '학습완료울',
              dataIndex: 'completedRatio',
              align :'center',
            },
            {
                title: '미학습카드',
                dataIndex: 'yet',
                align :'center',
              },
              {
                title: '기학습카드',
                dataIndex: 'ing',
                align :'center',
                children: [
                    {
                      title: '모든키학습카드',
                      dataIndex: 'ingTotal',
                      align :'center',
                    },
                    {
                        title: '현시간기준',
                        dataIndex: 'ingByNow',
                        align :'center',
                    },
                    {
                        title: '오늘기준',
                        dataIndex: 'ingByToday',
                        align :'center',
                    },
                ]
              },
              {
                title: '완료',
                dataIndex: 'completed',
                align :'center',
              },
              {
                title: '보류',
                dataIndex: 'suspend',
                align :'center',
              },
          ];
          
          const data = [
            {
              key: '1',
              selection:'현재책',
              indexSelected:'목차 총 100개',
              completedRatio: '31%',
              yet:10,
              ing:20,
              ingTotal:100,
              ingByNow:40,
              ingByToday:40,
              completed:0,
              suspend:0,
            },
            {
              key: '2',
              selection:'현재책에서 선택영역',
              indexSelected:'목차 8개 선택함',
              completedRatio: '31%',
              yet:10,
              ing:20,
              ingTotal:100,
              ingByNow:40,
              ingByToday:40,
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