//Импорт всех необходимых модулей и компонентов
import React from 'react';
// eslint-disable-next-line
import { BrowserRouter } from 'react-router-dom';
import './css/mycss.css';
import SocialNetworks from './social_networks/SocialNetworks';
import LeftBlock from './left_block/LeftBlock';
import Header from './header/Header';
import RightBlock from './right_block/RightBlock';
import './right_block/right_block.css';
import Footer from './footer/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line
export const toastView = (type, text) => {
  switch (type) {
    case 'info':
      toast.info(text, {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case 'success':
      toast.success(text, {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case 'warning':
      toast.warning(text, {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    case 'error':
      toast.error(text, {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      break;
    default:
      toast.info('Уведомление вызванно без каких либо параметров.', {
        position: 'bottom-right',
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }
};

function App() {
  return (
    <div className="container-fluid">
      <div className="row">
        <SocialNetworks />
        <LeftBlock />
        <div className="col rightBlock">
          <Header />
          <RightBlock />
          <Footer />
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default App;
