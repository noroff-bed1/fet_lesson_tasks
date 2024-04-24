import NavBar from '../NavBar';

function PageHeader() {
  return (
    <header>
      <div className="container flex justify-between mx-auto">
        <div>LOGO</div>
        <NavBar />
      </div>
    </header>
  );
}

export default PageHeader;
