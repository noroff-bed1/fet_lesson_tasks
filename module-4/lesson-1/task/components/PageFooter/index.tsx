import PageContainer from '../PageContainer';

function PageFooter() {
  return (
    <footer>
      <PageContainer> Copyright {new Date().getFullYear()}</PageContainer>
    </footer>
  );
}

export default PageFooter;
