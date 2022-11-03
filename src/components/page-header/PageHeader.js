import bg from "../../assets/footer-bg.jpg";

import "./page-header.scss";

function PageHeader({ children }) {
  return (
    <div className="page-header" style={{ backgroundImage: `url(${bg})` }}>
      <h2>{children}</h2>
    </div>
  );
}

export default PageHeader;
