import Button from './Button.jsx';
//pagination component
function Pagination({ page, setPage }) {

    //handler for next button
    function handleNext() {
        setPage(page + 1);
    };
    //handler for next button
    function handlePrevious() {
        setPage(page - 1);
    };
  return (
      <div className="flex items-center justify-center">
            
          <Button onClick={handlePrevious} disabled={page <= 1 }>Previous</Button>
          <Button active={true}>{page}</Button>

          {/*need to disable it when it is on the last page*/}
          <Button onClick={handleNext}>Next</Button>

      </div>
  );
}

export default Pagination;