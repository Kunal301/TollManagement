import React from 'react';
import Layout from '../components/common/Layout';
// import TollCollection from '../components/operations/TollCollection';

const TollCollectionPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Toll Collection</h1>
        {/* <TollCollection /> */}
      </div>
    </Layout>
  );
};

export default TollCollectionPage;