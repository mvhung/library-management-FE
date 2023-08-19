import { useState, useRef, useEffect } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import SoftInput from 'components/SoftInput';

import { useDebounce } from 'hooks';
import BookService from 'services/book.service';

function Search() {
    const [resultsSearch, setResultsSearch] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const debounceValue = useDebounce(valueSearch, 500);

    const inputRef = useRef();

    useEffect(() => {
        if (!debounceValue.trim()) {
            setResultsSearch([]);
            return;
        }

        const getApi = async () => {
            try {
                setLoading(true);
                const result = await BookService.searchBook(debounceValue);
                console.log(result);
                setResultsSearch(result.data.content);

                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        getApi();
    }, [debounceValue]);

    const handleClose = () => {
        setValueSearch('');
        setResultsSearch([]);
        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (searchValue.startsWith(' ')) return;
        setValueSearch(searchValue);
    };

    const handleClickItem = () => {
        setShowResult(false);
    };

    console.log(resultsSearch);
    return (
        <div>
            <HeadlessTippy
                visible={showResult && resultsSearch.length > 0}
                interactive={true}
                render={(attrs) => (
                    <div className={''} tabIndex="-1" {...attrs}>
                        <div style={{ position: 'absolute' }}>
                            {resultsSearch.map((item, index) => (
                                <div key={index}>
                                    <img src={item.bookImageLink} />
                                    <div>
                                        <h4>{item.bookTitle}</h4>
                                        <p>{item.bookPublishedYear}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={''}>
                    {/* <input
                        placeholder="Search accounts and videos"
                        className={cx('input')}
                        value={valueSearch}
                        spellCheck={false}
                        ref={inputRef}
                        onChange={handleChange}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                    /> */}
                    <SoftInput
                        placeholder="Search some book..."
                        icon={{ component: 'search', direction: 'left', onMouseDown: (e) => e.preventDefault() }}
                        value={valueSearch}
                        spellCheck={false}
                        ref={inputRef}
                        onChange={handleChange}
                        onFocus={() => {
                            setShowResult(true);
                        }}
                    />

                    {/* <button className={cx('btn-search')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button> */}
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
