import Header from '../Header/Header';

const withHeader = (Component) =>
  function togetherHeader(props) {
    return (
      <div>
        <Header />
        <Component {...props} />
      </div>
    );
  };

export default withHeader;
