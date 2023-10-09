import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Input,
  Select,
  Text,
  VStack,
  HStack,
  Textarea,
} from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios"
import { Link  } from "react-router-dom";

const Content = () => {
  const { authState } = useContext(AuthContext);

  const [selectedType, setSelectedType] = useState("shayari");
  const [keyword, setKeyword] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [favorites, setFavorites] = useState([]);

  const handleGenerateContent = async () => {
    console.log("s");
    try {
      const response = await axios.post(`https://powerful-cyan-duckling.cyclic.app/gcontent`,{ keyword, content_type: selectedType }, {
        headers: {
          authorization: ` ${authState.token}`,
          "Content-Type": "application/json",
        },
       
      });

      const data =  response;
      console.log(data);
      setGeneratedContent(data.data.content_type);
    } catch (error) {
      console.error(error);
      setGeneratedContent("Failed to fetch content");
    }
  };

  const handleAddToFavorites = () => {
    const newFavorite = {
      type: selectedType,
      keyword,
      content: generatedContent,
    };

    const updatedFavorites = [...favorites, newFavorite];
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <VStack spacing={4} pt={"150px"}>
      <Box>
        <Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {" "}
          <option>All</option>
          <option value="shayari">Shayari</option>
          <option value="jokes">Jokes</option>
          <option value="quotes">Quotes</option>
          <option value="stories">Stories</option>
        </Select>
      </Box>
      <Box>
        <Input
          type="text"
          placeholder="Enter keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Box>
      <Box>
        <Button onClick={handleGenerateContent}>Generate Content</Button>
      </Box>
      {generatedContent && (
        <Box>
            <Textarea w={"800px"} h={"400px"} value={generatedContent} readOnly />
          <HStack spacing={4}>
            <Button onClick={handleAddToFavorites}>Add to Favorites</Button>
         
            <Button onClick={() => (window.location.href = "/favorites")}>
              Go to Favorites
            </Button>
         
          </HStack>
        </Box>
      )}
    </VStack>
  );
};

export default Content;
