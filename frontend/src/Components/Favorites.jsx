import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  VStack,
  HStack,
  IconButton,

} from "@chakra-ui/react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Retrieve favorites from local storage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <VStack spacing={4} pt={"50px"} w={"800px"}justifyContent={"center"}>
      {favorites.map((favorite, index) => (
        <Box
          key={index}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          borderColor="gray.300"
        >
          <Text fontSize="lg" fontWeight="bold">
            {favorite.type}
          </Text>
          <Text>{favorite.keyword}</Text>
          <Text>{favorite.content}</Text>
          
        </Box>
      ))}
    </VStack>
  );
};

export default Favorites;
