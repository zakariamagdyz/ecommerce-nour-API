import { createGlobalStyle } from "styled-components";
import RouterConfig from "./components/RouterConfig";

import { getUserState } from "./redux/user/actions";
import { useEffect } from "react";

import mediaDevices from "./style/mediaDevices";
//Types
import { useAppDispatch } from "./redux/hooks";

///////////////////////////////////////////////////////

const global = { createGlobalStyle };

const GlobalStyle = global.createGlobalStyle`

*,*::after,*::before{
  padding:0;
  margin:0;
  box-sizing: inherit;
}


:root{
  --err-color:#ff0000;
  --success-color:#4BB543 ;
}

html {
    // make font-size relative to broswser default font-size
   font-size:calc((10 / 16 * 100) * 1%);

  
   @media ${mediaDevices.tabLand}{
    font-size :calc((9/ 16 * 100) * 1%);
   }
  

   @media ${mediaDevices.tabPort}{
    font-size :calc((8 / 16 * 100) * 1%);
   }
 
  
   @media ${mediaDevices.bigDesktop}{
    font-size :calc((12 / 16 * 100) * 1%);
   }
  
  }


body{
  font-family: 'Open Sans Condensed', sans-serif;
  box-sizing: border-box;
  font-size:1.6rem;



}


`;

///////////////////////////////////////////////////////

const App = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserState());
  }, [dispatch]);

  return (
    <div>
      <GlobalStyle />
      <RouterConfig />
    </div>
  );
};

export default App;
