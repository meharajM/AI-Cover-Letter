import { useCallback, useState } from 'react';

const Popup = () => {
  const [content, setContent] = useState<string>('');
  const [loader, setLoader] = useState<boolean>(false);
  const clickHandler = useCallback(() => {
    setLoader(true)
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'readPageContent' }, (response) => {
        console.log("response", response)
        setContent(response);
        setLoader(false)
      });
    });
  }, []);


  return (
    <div className='w-300px'>
      {loader && <div>loading...</div>}
      <button onClick={clickHandler}>Get job details</button>
      {content && <div>{content}</div>}
    </div>
  );
}

export default Popup;
