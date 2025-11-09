import React from 'react';
import CustomerForm from '../components/CustomerForm';

const CustomerEdit: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <CustomerForm mode="edit" />
    </div>
  );
};

export default CustomerEdit;