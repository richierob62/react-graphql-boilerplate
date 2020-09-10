import Layout from '../components/Layout';
import dynamic from 'next/dynamic';

const DynamicComponent = dynamic(
  () => import('../components/LoadedComponent'),
  {
    loading: () => <p>loading...</p>,
    ssr: false, // to force loading on client side only
  }
);

function Foo() {
  return (
    <div>
      <Layout>
        <DynamicComponent />
      </Layout>
    </div>
  );
}

export default Foo;
