const BuildPage = (index) => (
    <>
      <h3>Page {index}</h3>
      <div>
        Page {index} content: lalala
      </div>
    </>
  );
  
  export const PageOne = () => BuildPage(1);
  export const PageTwo = () => BuildPage(2);