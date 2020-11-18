import React from 'react';
import { Table } from 'antd';
import { StarTwoTone,StarOutlined,EyeOutlined,EyeInvisibleOutlined,ArrowUpOutlined,ArrowDownOutlined,EditOutlined} from '@ant-design/icons';

const columns = [
  {
    title: '카테고리',
    dataIndex: 'category',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '책이름',
    dataIndex: 'book_title',
  },
  {
    title: '학습완료율',
    dataIndex: 'progress',
  },
  {
    title: '남은 신규카드',
    dataIndex: 'remain_new',
  },
  {
    title: '오늘 복습카드',
    dataIndex: 'today_review',
  },
  {
    title: '최근학습일',
    dataIndex: 'recent_study',
  },
  {
    title: '일일 학습목표',
    dataIndex: 'today_goal',
  },
  {
    title: '즐겨찾기',
    dataIndex: 'like',
    render: () => <><StarTwoTone onClick={()=>this.props.onClickLike({value:'true',bookId:this.props.bookInfo._id})} twoToneColor="#52c41a" style={{fontSize:'14px'}}/></>
,
  },
  {
    title: '순서이동',
    dataIndex: 'reorder',
    render: () => <><ArrowUpOutlined onClick={()=>this.props.listOrderHandler({action: 'up', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/>
    <ArrowDownOutlined onClick={()=>this.props.listOrderHandler({action: 'down', from:'like',category_id: this.props.bookInfo.category_id._id, bookId: this.props.bookInfo._id, seq_in_like:this.props.bookInfo.seq_in_like})} style={{fontSize:'14px'}}/></>
  },
  {
    title: '숨긴책보기',
    dataIndex: 'hide',
    render: () => <><EyeOutlined onClick={()=>this.props.onClickHideOrShow({value:false,bookId:this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category,seq_in_like:this.props.bookInfo.seq_in_like, category_id:this.props.bookInfo.category_id._id})} style={{fontSize:'14px'}}/></>
    
  },
];
const data = [
  {
    key: '1',
    category: '블라블라',
    book_title : '책이름름',
    progress:'00%',
    remain_new:'00장',
    today_review:'00장',
    recent_study:'00월/00일/0000년',
    today_goal:'00장',
    like:'별모양',
    reorder: '위/아래',
    hide: '숨기기눈깔',
  },
  
]; // rowSelection object indicates the need for row selection

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === 'Disabled User',
    // Column configuration not to be checked
    name: record.name,
  }),
};

const LikeSectionContent = () => {

  return (
    <div>
      <Table
        className='study_table_list'
        rowSelection={{
          type: 'checkbox',
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
        size='small'
      />
    </div>
  );
};

export default LikeSectionContent