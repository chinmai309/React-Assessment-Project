import React from 'react';
import { Pagination } from 'antd';
import './Pagination.css'

const PaginationComponent = ({ pageSize, total, current, onChange }) => {
  return (
    <Pagination
      align='end'
      pageSize={pageSize}
      total={total}
      current={current} 
      onChange={onChange} 
      style={{ marginTop: 20, textAlign: 'center', marginBottom: 20 }}
    />
  );
};

export default PaginationComponent;
