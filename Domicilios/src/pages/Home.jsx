import Graficas from '../components/graficas/Graficas'
import HomeCliente from '../components/layout/HomeCliente'
import Layout from "../components/template/Layout";

const Home = () => {

  const userType = localStorage.getItem('userType');

  return (
  <>

    {userType === 'negocio' || userType === 'particular' ? 
    <>
    <HomeCliente/>
    </> 
    : 
    <>
      <Layout>
        <Graficas/>
      </Layout> 
    </>}

  </>
  );
};

export default Home;
