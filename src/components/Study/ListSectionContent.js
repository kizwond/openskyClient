import React, {Component} from 'react';
import { Table } from 'antd';
import { StarTwoTone,StarOutlined,EyeOutlined,EyeInvisibleOutlined,ArrowUpOutlined,ArrowDownOutlined,EditOutlined} from '@ant-design/icons';


class ListSectionContent extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    const columns = [
      {
        title: '카테고리',
        dataIndex: 'category',
      },
      {
        title: '책이름',
        dataIndex: 'book_title',
        width:'100px',
        render: (text) => <a>{text}</a>,
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
        render: (text, record) => {
          if(record.like === true){
              return <StarTwoTone onClick={()=>this.props.onClickLike({value:'true',bookId:this.props.bookInfo._id})} twoToneColor="#52c41a" style={{fontSize:'14px'}}/>
          } else {
            return <StarOutlined onClick={()=>this.props.onClickLike({value:'false',bookId:this.props.bookInfo._id})} style={{fontSize:'14px'}}/>
          }
        }
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
        render: (text, record) => {
          if(record.hide === true){
              return <EyeOutlined onClick={()=>this.props.onClickHideOrShow({value:false,bookId:this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category,seq_in_like:this.props.bookInfo.seq_in_like, category_id:this.props.bookInfo.category_id._id})} style={{fontSize:'14px'}}/>
          } else {
            return <EyeInvisibleOutlined onClick={()=>this.props.onClickHideOrShow({value:true,bookId:this.props.bookInfo._id, seq_in_category:this.props.bookInfo.seq_in_category,seq_in_like:this.props.bookInfo.seq_in_like, category_id:this.props.bookInfo.category_id._id})} style={{fontSize:'14px'}}/>
          }
        }
      },
    ];


    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
      }),
    };

    if(this.props.category.length > 0){
      var plz = []
      var categoryArray = this.props.category.map(book => book.book_ids.map((item)=> plz.push(item)))

      var data = plz.map(book =>({
        key: book._id,
        category: book.category_id.name,
        book_title : book.title,
        progress:'00%',
        remain_new:'00장',
        today_review:'00장',
        recent_study:'00월/00일/0000년',
        today_goal:'00장',
        like:book.like,
        reorder: '위/아래',
        hide: book.hide_or_show,
      }))
      
    }
    

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
  }
}

export default ListSectionContent;