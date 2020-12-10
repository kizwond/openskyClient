import React from 'react';
import { Table,Avatar,Progress } from 'antd';
import { ApiOutlined,UserOutlined} from '@ant-design/icons';

const columns = [
  {
    title: '책',
    dataIndex: 'category',
  },
  {
    title: '멘토',
    dataIndex: 'book_title',
    width:'150px',
    render: (text) => <a><Avatar size={15} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} /> {text}</a>,
  },
  {
    title: '학습완료율',
    dataIndex: 'progress',
    render: (text) => <Progress size="large" style={{fontSize:"10px"}} percent={text} showInfo={false}/>,
  },
  {
    title: '평균레벨',
    dataIndex: 'average_lev',
    align: 'right',
  },
  {
    title: '최근학습일',
    dataIndex: 'recent_study',
    align: 'right',
  },
  {
    title: '최근100회 학습시간 그래프',
    dataIndex: 'graph',
    align: 'right',
  },
  {
    title: '일일평균 학습횟수',
    dataIndex: 'average_daily',
    align: 'right',
  },
  {
    title: '일일평균 완료카드 수',
    dataIndex: 'completed',
    align: 'right',
  },
  {
    title: '카드총합(미학습/복습/완료/보류/졸업)',
    dataIndex: 'card_total',
    align: 'right',
  },
  {
    title: '멘토링취소',
    dataIndex: 'hide',
    align: 'right',
    render: () => <><ApiOutlined style={{fontSize:'14px'}}/></>
    
  },
];
const data = [
  {
    key: '1',
    category: '수능영어독해',
    book_title : '김아무개',
    progress:'30',
    average_lev:'00 Lev.',
    graph:'그래프',
    recent_study:'2020-10-30',
    completed:'00장',
    average_daily:'00회',
    card_total: '480(00/00/00/00)',
    hide: '숨기기눈깔',
  },
  {
    key: '2',
    category: '수능 영어듣기',
    book_title : '윤아무개',
    progress:'30',
    average_lev:'00 Lev.',
    graph:'그래프',
    recent_study:'2020-10-30',
    completed:'00장',
    average_daily:'00회',
    card_total: '480(00/00/00/00)',
    hide: '숨기기눈깔',
  },
  {
    key: '3',
    category: '한국사',
    book_title : '주아무개',
    progress:'30',
    average_lev:'00 Lev.',
    graph:'그래프',
    recent_study:'2020-10-30',
    completed:'00장',
    average_daily:'00회',
    card_total: '480(00/00/00/00)',
    hide: '숨기기눈깔',
  },
  
]; 

const MentorList = () => {

  return (
    <div style={{maxHeight:"150px", overflow:"auto"}}>
      <Table
        className='study_table_list'
        columns={columns}
        dataSource={data}
        pagination={false}
        size='small'
      />
    </div>
  );
};

export default MentorList