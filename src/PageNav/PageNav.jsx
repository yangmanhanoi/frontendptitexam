import React from 'react'

const PageNav = (props) => {
    const pages = []
    const { totalPages, currentPage, maxPageLimit, minPageLimit } = props;
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
    }
    const handlePrevClick = () => {
        props.onPrevClick();
    }

    const handleNextClick = () => {
        props.onNextClick();
    }
    const handlePageClick = (e) => {
        props.onPageChange(Number(e.target.id));
    }

    const pageNumbers = pages.map(page => {

        if (page <= maxPageLimit && page > minPageLimit) {
            return (
                <a key={page} id={page} onClick={handlePageClick}
                    className={currentPage === page ? 'current paginate_button' : 'paginate_button'}>
                    {page}
                </a>
            );
        } else {
            return null;
        }
    }

    );

    // page ellipses
    let pageIncrementEllipses = null;
    if (pages.length > maxPageLimit) {
        pageIncrementEllipses = <a onClick={handleNextClick}>&hellip;</a>
    }
    let pageDecremenEllipses = null;
    if (minPageLimit >= 1) {
        pageDecremenEllipses = <a onClick={handlePrevClick}>&hellip;</a>
    }
    return (
        <>
            <a className={currentPage === pages[0] ? "paginate_button previous disabled" : 'paginate_button previous'} aria-controls="dataTable"
                data-dt-idx="0" tabIndex="0" id="dataTable_previous" onClick={handlePrevClick}>Previous
            </a>
            {pageDecremenEllipses}
            <span className='page-nav'>
                
                {pageNumbers}
                
            </span>
            {pageIncrementEllipses}
            <a className={currentPage === pages[pages.length - 1] ? "paginate_button next disabled" : 'paginate_button next'} aria-controls="dataTable"
                data-dt-idx="4" tabIndex="0" id="dataTable_next" onClick={handleNextClick}>Next
            </a>
        </>
    )
}

export default PageNav