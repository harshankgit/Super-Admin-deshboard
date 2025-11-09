import React from 'react';
import CustomerForm from '../components/CustomerForm';

const CustomerAdd: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <CustomerForm mode="add" />
    </div>
  );
};

export default CustomerAdd;