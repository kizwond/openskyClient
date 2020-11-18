import React, { useState } from 'react';
import { Table, Radio, Divider } from 'antd';
const columns = [
  {
    title: '카테고리',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '책이름',
    dataIndex: 'age',
  },
  {
    title: '학습완료율',
    dataIndex: 'address',
  },
  {
    title: '남은 신규카드',
    dataIndex: 'age',
  },
  {
    title: '오늘 복습카드',
    dataIndex: 'address',
  },
  {
    title: '최근학습일',
    dataIndex: 'address',
  },
  {
    title: '일일 학습목표',
    dataIndex: 'address',
  },
  {
    title: '즐겨찾기',
    dataIndex: 'address',
  },
  {
    title: '순서이동',
    dataIndex: 'address',
  },
  {
    title: '숨긴책보기',
    dataIndex: 'address',
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
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
  const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <div>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </div>
  );
};

export default LikeSectionContent