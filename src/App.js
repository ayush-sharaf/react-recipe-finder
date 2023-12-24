import styled from 'styled-components';
import axios from 'axios';
import {Header,AppNameComponent,AppIcon,SearchComponent,SearchIcon,SearchInput} from './components/headerComponent'
import {RecipeListContainer,RecipeContainer,CoverImage,RecipeName,IngredientsText,SeeMoreText} from './components/recipeComponent'
import { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions'; 
import React from 'react';

const APP_ID="0401fbf3";
const APP_KEY="8744c12d1f4366e0205613d8078d9ede";

const Container=styled.div`
display:flex;
flex-direction:column;
`;
function App() {
  const [timeoutId,updateTimeoutId]=useState();
  const [recipeList,updateRecipeList]=useState([]);
  const fetchRecipe=async(searchString)=>{
    const response = await axios.get(`https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  
  updateRecipeList(response.data.hits); 
  };
  
  const onTextChange=(event)=>{
    clearTimeout(timeoutId);
    const timeout=setTimeout(()=> fetchRecipe(event.target.value),500);
    updateTimeoutId(timeout);
  };
  const Placeholder=styled.img`
  width:120px;
  height:120px;
  opacity:50%;
  margin:auto;
  padding:200px;
  `;
  const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const StyledHead = styled.thead`
  background-color: #333;
  color: #fff;
`;

const StyledRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

const StyledCell = styled.td`
padding: 10px;
text-align: left;
background-color: #f5f5f5;
color: #000;
`;
  const RecipeComponent = (props) => {
    const [show,setShow]=React.useState(false);
    console.log(props);
      const {recipeObj} = props;
    return (
      <>
      <Dialog open={show} >
      <DialogTitle>Ingredients</DialogTitle>
      <DialogContent>
      <StyledTable>
      <StyledHead>
        <tr>
          <th>Ingredients</th>
          <th>Weight</th>
        </tr>
      </StyledHead>
      <tbody>
        {recipeObj.ingredients.map((ingredientObj) => (
          <StyledRow key={ingredientObj.id}>
            <StyledCell>{ingredientObj.text}</StyledCell>
            <StyledCell>{ingredientObj.weight}</StyledCell>
          </StyledRow>
        ))}
      </tbody>
    </StyledTable>
      </DialogContent>
      <DialogActions>
        <IngredientsText onClick={()=> window.open(recipeObj.url)}>See More</IngredientsText>
        <SeeMoreText onClick={()=> setShow(false)}>Close</SeeMoreText>
      </DialogActions>
      </Dialog>
      <RecipeContainer >
        
      <CoverImage src={recipeObj.image}/>
    <RecipeName>{recipeObj.label}</RecipeName>
   <IngredientsText onClick={()=>setShow(true)}>Ingredients</IngredientsText>
   <SeeMoreText onClick={()=>window.open(recipeObj.url)}>See Complete Recipe</SeeMoreText>
      </RecipeContainer>
      </>
    );
  };
  return (
    

   <Container>
    <Header>
      <AppNameComponent><AppIcon src="/hamburger.svg"/>Recipe Finder</AppNameComponent>
      <SearchComponent>
        <SearchIcon src="/search-icon.svg"/>
        <SearchInput placeholder='Search Recipe' onChange={onTextChange}/>
      </SearchComponent>
    </Header>
    <RecipeListContainer>
      {recipeList.length ? recipeList.map((recipeObj)=> (
      <RecipeComponent recipeObj={recipeObj.recipe} />
      )): <Placeholder src="hamburger.svg"/>};
      
      
    </RecipeListContainer>
    
    </Container>
  );
}

export default App;
